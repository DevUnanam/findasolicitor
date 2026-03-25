from django.db.models import Q
from rest_framework import filters, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.common.permissions import IsAdminRole, IsSolicitorRole

from .models import SolicitorProfile
from .serializers import SolicitorProfileSerializer, SolicitorVerificationSerializer


class SolicitorProfileViewSet(viewsets.ModelViewSet):
    serializer_class = SolicitorProfileSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["specialization", "location", "user__first_name", "user__last_name"]
    ordering_fields = ["average_rating", "years_of_experience", "hourly_rate"]

    def get_permissions(self):
        if self.action in {"update", "partial_update", "create", "me"}:
            return [permissions.IsAuthenticated(), IsSolicitorRole()]
        if self.action in {"verification_queue", "set_verification"}:
            return [permissions.IsAuthenticated(), IsAdminRole()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = SolicitorProfile.objects.select_related("user").all()
        q = self.request.query_params.get("q")
        specialization = self.request.query_params.get("specialization")
        location = self.request.query_params.get("location")
        availability = self.request.query_params.get("availability")
        min_rating = self.request.query_params.get("rating")
        verified = self.request.query_params.get("verified")
        service_mode = self.request.query_params.get("service_mode")
        ordering = self.request.query_params.get("sort")
        min_experience = self.request.query_params.get("min_experience")
        if specialization:
            queryset = queryset.filter(specialization__icontains=specialization)
        if location:
            queryset = queryset.filter(location__icontains=location)
        if availability:
            queryset = queryset.filter(is_available=availability.lower() == "true")
        if min_rating:
            queryset = queryset.filter(average_rating__gte=min_rating)
        if verified:
            queryset = queryset.filter(verification_status="verified" if verified.lower() == "true" else "pending")
        if service_mode:
            queryset = queryset.filter(service_modes__contains=[service_mode])
        if min_experience:
            queryset = queryset.filter(years_of_experience__gte=min_experience)
        if q:
            queryset = queryset.filter(
                Q(specialization__icontains=q)
                | Q(location__icontains=q)
                | Q(firm_name__icontains=q)
                | Q(user__first_name__icontains=q)
                | Q(user__last_name__icontains=q)
            )
        if ordering in {"rating", "experience", "price_low", "price_high"}:
            ordering_map = {
                "rating": "-average_rating",
                "experience": "-years_of_experience",
                "price_low": "hourly_rate",
                "price_high": "-hourly_rate",
            }
            queryset = queryset.order_by(ordering_map[ordering])
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get"])
    def me(self, request):
        profile = SolicitorProfile.objects.filter(user=request.user).first()
        if not profile:
            return Response({"detail": "Solicitor profile not created yet."}, status=status.HTTP_404_NOT_FOUND)
        return Response(self.get_serializer(profile).data)

    @action(detail=False, methods=["get"])
    def verification_queue(self, request):
        queryset = SolicitorProfile.objects.select_related("user").filter(verification_status="pending")
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def set_verification(self, request, pk=None):
        profile = self.get_object()
        serializer = SolicitorVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile.verification_status = serializer.validated_data["verification_status"]
        profile.save(update_fields=["verification_status"])
        return Response(self.get_serializer(profile).data)
