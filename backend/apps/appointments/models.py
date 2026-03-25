from django.conf import settings
from django.db import models

from apps.common.models import TimeStampedModel


class AvailabilitySlot(TimeStampedModel):
    solicitor = models.ForeignKey("solicitors.SolicitorProfile", on_delete=models.CASCADE, related_name="availability_slots")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_booked = models.BooleanField(default=False)


class Appointment(TimeStampedModel):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    )

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="appointments")
    solicitor = models.ForeignKey("solicitors.SolicitorProfile", on_delete=models.CASCADE, related_name="appointments")
    slot = models.ForeignKey(AvailabilitySlot, on_delete=models.SET_NULL, null=True, blank=True, related_name="appointments")
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

