from django.conf import settings
from django.db import models

from apps.common.models import TimeStampedModel


class Conversation(TimeStampedModel):
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="conversations")
    case = models.ForeignKey("cases.Case", on_delete=models.SET_NULL, null=True, blank=True, related_name="conversations")
    subject = models.CharField(max_length=200, blank=True)


class Message(TimeStampedModel):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_messages")
    content = models.TextField()
    is_read = models.BooleanField(default=False)

