from django.conf import settings
from django.db import models

from apps.common.models import TimeStampedModel


class Payment(TimeStampedModel):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("failed", "Failed"),
        ("refunded", "Refunded"),
    )

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="payments")
    solicitor = models.ForeignKey("solicitors.SolicitorProfile", on_delete=models.CASCADE, related_name="payments")
    case = models.ForeignKey("cases.Case", on_delete=models.SET_NULL, null=True, blank=True, related_name="payments")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="GBP")
    stripe_payment_intent = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    payment_type = models.CharField(max_length=50, default="consultation")
    description = models.CharField(max_length=255, blank=True)
    paid_at = models.DateTimeField(null=True, blank=True)
