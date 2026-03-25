from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Appointment, AvailabilitySlot
from .serializers import AppointmentSerializer, AvailabilitySlotSerializer


class AvailabilitySlotViewSet(viewsets.ModelViewSet):
    serializer_class = AvailabilitySlotSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return AvailabilitySlot.objects.all().select_related("solicitor__user")


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "solicitor":
            return Appointment.objects.filter(solicitor__user=user).select_related("solicitor__user", "customer")
        return Appointment.objects.filter(customer=user).select_related("solicitor__user", "customer")

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    @action(detail=True, methods=["post"])
    def confirm(self, request, pk=None):
        appointment = self.get_object()
        appointment.status = "confirmed"
        appointment.reminder_sent = True
        appointment.save(update_fields=["status", "reminder_sent", "updated_at"])
        return Response(self.get_serializer(appointment).data)

    @action(detail=False, methods=["get"])
    def summary(self, request):
        queryset = self.get_queryset()
        return Response(
            {
                "total": queryset.count(),
                "upcoming": queryset.filter(status__in=["pending", "confirmed"]).count(),
                "completed": queryset.filter(status="completed").count(),
            }
        )
