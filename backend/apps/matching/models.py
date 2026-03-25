from django.conf import settings
from django.db import models

from apps.common.models import TimeStampedModel


class MatchQuestionnaire(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="match_questionnaires")
    legal_issue = models.CharField(max_length=120)
    location = models.CharField(max_length=120)
    urgency = models.CharField(max_length=50)
    budget_band = models.CharField(max_length=50, blank=True)
    service_mode = models.CharField(max_length=50, blank=True)
    language_preference = models.CharField(max_length=50, blank=True)
    preferred_contact_method = models.CharField(max_length=50, blank=True)
    needs_verified_solicitor = models.BooleanField(default=True)
    needs_immediate_availability = models.BooleanField(default=False)
    case_summary = models.TextField(blank=True)
    goals = models.JSONField(default=list, blank=True)
    notes = models.TextField(blank=True)
