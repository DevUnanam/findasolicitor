from rest_framework import serializers

from .models import Appointment, AvailabilitySlot


class AvailabilitySlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailabilitySlot
        fields = ("id", "solicitor", "start_time", "end_time", "is_booked")


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ("id", "customer", "solicitor", "slot", "notes", "status", "created_at")
        read_only_fields = ("customer",)

