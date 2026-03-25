from django.conf import settings
from django.db import models

from apps.common.models import TimeStampedModel


class Case(TimeStampedModel):
    STATUS_CHOICES = (
        ("open", "Open"),
        ("in_review", "In Review"),
        ("assigned", "Assigned"),
        ("active", "Active"),
        ("waiting_client", "Waiting On Client"),
        ("waiting_solicitor", "Waiting On Solicitor"),
        ("closed", "Closed"),
    )
    PRIORITY_CHOICES = (
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("urgent", "Urgent"),
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
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default="medium")
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    preferred_contact_method = models.CharField(max_length=50, blank=True)
    desired_outcome = models.TextField(blank=True)
    client_notes = models.TextField(blank=True)
    internal_summary = models.TextField(blank=True)
    next_step = models.CharField(max_length=255, blank=True)
    opened_at = models.DateTimeField(auto_now_add=True)
    closed_at = models.DateTimeField(null=True, blank=True)


class CaseAttachment(TimeStampedModel):
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name="attachments")
    file = models.FileField(upload_to="case_attachments/")
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    label = models.CharField(max_length=120, blank=True)
    attachment_type = models.CharField(max_length=50, blank=True)


class CaseUpdate(TimeStampedModel):
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name="updates")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="case_updates")
    title = models.CharField(max_length=160)
    body = models.TextField()
    visibility = models.CharField(max_length=30, default="shared")
