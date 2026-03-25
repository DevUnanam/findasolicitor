from django.conf import settings
from django.db import models

from apps.common.models import TimeStampedModel


class Case(TimeStampedModel):
    STATUS_CHOICES = (
        ("open", "Open"),
        ("in_review", "In Review"),
        ("assigned", "Assigned"),
        ("active", "Active"),
        ("closed", "Closed"),
    )

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cases")
    solicitor = models.ForeignKey(
        "solicitors.SolicitorProfile",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_cases",
    )
    title = models.CharField(max_length=255)
    legal_category = models.CharField(max_length=120)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)


class CaseAttachment(TimeStampedModel):
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name="attachments")
    file = models.FileField(upload_to="case_attachments/")
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    label = models.CharField(max_length=120, blank=True)

