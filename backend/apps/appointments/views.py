from rest_framework import permissions, viewsets

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
