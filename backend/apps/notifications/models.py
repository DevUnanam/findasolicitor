from django.conf import settings
from django.db import models

from apps.common.models import TimeStampedModel


class Notification(TimeStampedModel):
    TYPE_CHOICES = (
        ("message", "Message"),
        ("case", "Case"),
        ("appointment", "Appointment"),
        ("payment", "Payment"),
        ("system", "System"),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications")
    title = models.CharField(max_length=160)
    body = models.TextField()
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="system")
    is_read = models.BooleanField(default=False)
    link = models.CharField(max_length=255, blank=True)

