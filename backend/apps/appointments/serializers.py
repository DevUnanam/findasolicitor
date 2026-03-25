from rest_framework import serializers

from .models import Appointment, AvailabilitySlot


class AvailabilitySlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailabilitySlot
        fields = ("id", "solicitor", "start_time", "end_time", "is_booked")


class AppointmentSerializer(serializers.ModelSerializer):
    solicitor_name = serializers.CharField(source="solicitor.user.get_full_name", read_only=True)

    class Meta:
        model = Appointment
        fields = (
            "id",
            "customer",
            "solicitor",
            "slot",
            "solicitor_name",
            "notes",
            "status",
            "meeting_type",
            "meeting_link",
            "fee_amount",
            "reminder_sent",
            "created_at",
        )
        read_only_fields = ("customer",)
