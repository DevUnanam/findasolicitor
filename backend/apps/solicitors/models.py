from django.conf import settings
from django.db import models

from apps.common.models import TimeStampedModel


class SolicitorProfile(TimeStampedModel):
    VERIFICATION_CHOICES = (
        ("pending", "Pending"),
        ("verified", "Verified"),
        ("rejected", "Rejected"),
    )

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="solicitor_profile")
    sra_number = models.CharField(max_length=100, unique=True)
    specialization = models.CharField(max_length=120)
    location = models.CharField(max_length=120)
    years_of_experience = models.PositiveIntegerField(default=0)
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_CHOICES, default="pending")
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    about = models.TextField(blank=True)
    documents = models.JSONField(default=list, blank=True)
    is_available = models.BooleanField(default=True)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)

