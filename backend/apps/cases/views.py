from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.solicitors.models import SolicitorProfile

from .models import Case, CaseAttachment, CaseUpdate
from .serializers import (
    CaseAssignmentSerializer,
    CaseAttachmentSerializer,
    CaseSerializer,
    CaseStatusSerializer,
    CaseUpdateSerializer,
)


class CaseViewSet(viewsets.ModelViewSet):
    serializer_class = CaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "solicitor":
            return Case.objects.filter(solicitor__user=user).select_related("solicitor__user", "customer")
        if user.role == "admin":
            return Case.objects.all().select_related("solicitor__user", "customer")
        return Case.objects.filter(customer=user).select_related("solicitor__user", "customer")

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    @action(detail=True, methods=["post"])
    def add_update(self, request, pk=None):
        case = self.get_object()
        serializer = CaseUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(case=case, author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def add_attachment(self, request, pk=None):
        case = self.get_object()
        serializer = CaseAttachmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(case=case, uploaded_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def assign_solicitor(self, request, pk=None):
        case = self.get_object()
        serializer = CaseAssignmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        solicitor = SolicitorProfile.objects.filter(pk=serializer.validated_data["solicitor_id"]).first()
        if not solicitor:
            return Response({"detail": "Solicitor not found."}, status=status.HTTP_404_NOT_FOUND)
        case.solicitor = solicitor
        case.status = "assigned"
        case.next_step = "Solicitor to review intake and acknowledge the matter."
        case.save(update_fields=["solicitor", "status", "next_step", "updated_at"])
        return Response(self.get_serializer(case).data)

    @action(detail=True, methods=["post"])
    def change_status(self, request, pk=None):
        case = self.get_object()
        serializer = CaseStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        case.status = serializer.validated_data["status"]
        if case.status == "closed":
            case.closed_at = timezone.now()
        if case.status != "closed":
            case.closed_at = None
        case.save(update_fields=["status", "closed_at", "updated_at"])
        return Response(self.get_serializer(case).data)

    @action(detail=False, methods=["get"])
    def summary(self, request):
        queryset = self.get_queryset()
        return Response(
            {
                "counts": {
                    "total": queryset.count(),
                    "open": queryset.filter(status="open").count(),
                    "active": queryset.filter(status="active").count(),
                    "closed": queryset.filter(status="closed").count(),
                },
                "recent_cases": self.get_serializer(queryset.order_by("-updated_at")[:5], many=True).data,
            }
        )
