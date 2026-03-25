from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.common.models import TimeStampedModel


class User(AbstractUser):
    ROLE_CHOICES = (
        ("customer", "Customer"),
        ("solicitor", "Solicitor"),
        ("admin", "Admin"),
    )

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="customer")
    phone = models.CharField(max_length=30, blank=True)
    address = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    terms_accepted = models.BooleanField(default=False)
    email_verified = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


class CustomerProfile(TimeStampedModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="customer_profile")
    legal_preferences = models.JSONField(default=dict, blank=True)
    bio = models.TextField(blank=True)
    city = models.CharField(max_length=120, blank=True)
    country = models.CharField(max_length=120, blank=True)
    preferred_contact_method = models.CharField(max_length=30, blank=True)
    preferred_budget_band = models.CharField(max_length=50, blank=True)


class SavedSolicitor(TimeStampedModel):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="saved_solicitors")
    solicitor = models.ForeignKey(
        "solicitors.SolicitorProfile",
        on_delete=models.CASCADE,
        related_name="saved_by_customers",
    )

    class Meta:
        unique_together = ("customer", "solicitor")
