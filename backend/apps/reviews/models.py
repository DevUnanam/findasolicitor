from django.conf import settings
from django.db import models

from apps.common.models import TimeStampedModel


class Review(TimeStampedModel):
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews")
    solicitor = models.ForeignKey("solicitors.SolicitorProfile", on_delete=models.CASCADE, related_name="reviews")
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField(blank=True)
    title = models.CharField(max_length=120, blank=True)
    would_recommend = models.BooleanField(default=True)

    class Meta:
        unique_together = ("customer", "solicitor")
