from rest_framework import filters, permissions, viewsets

from apps.common.permissions import IsSolicitorRole

from .models import SolicitorProfile
from .serializers import SolicitorProfileSerializer


class SolicitorProfileViewSet(viewsets.ModelViewSet):
    serializer_class = SolicitorProfileSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["specialization", "location", "user__first_name", "user__last_name"]
    ordering_fields = ["average_rating", "years_of_experience", "hourly_rate"]

    def get_permissions(self):
        if self.action in {"update", "partial_update", "create"}:
            return [permissions.IsAuthenticated(), IsSolicitorRole()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = SolicitorProfile.objects.select_related("user").all()
        specialization = self.request.query_params.get("specialization")
        location = self.request.query_params.get("location")
        availability = self.request.query_params.get("availability")
        min_rating = self.request.query_params.get("rating")
        if specialization:
            queryset = queryset.filter(specialization__icontains=specialization)
        if location:
            queryset = queryset.filter(location__icontains=location)
        if availability:
            queryset = queryset.filter(is_available=availability.lower() == "true")
        if min_rating:
            queryset = queryset.filter(average_rating__gte=min_rating)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

