from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.cases.models import Case

from .models import Conversation, Message
from .serializers import ConversationCreateSerializer, ConversationSerializer, MessageSerializer


class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Conversation.objects.filter(participants=self.request.user)
            .prefetch_related("messages", "participants")
            .order_by("-last_message_at", "-updated_at")
        )

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def create(self, request, *args, **kwargs):
        serializer = ConversationCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        conversation = Conversation.objects.create(
            subject=serializer.validated_data.get("subject", ""),
            case_id=serializer.validated_data.get("case_id"),
        )
        participant_ids = set(serializer.validated_data["participant_ids"] + [request.user.id])
        conversation.participants.add(*participant_ids)

        response_serializer = self.get_serializer(conversation)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def mark_read(self, request, pk=None):
        conversation = self.get_object()
        updated = conversation.messages.exclude(sender=request.user).filter(is_read=False).update(is_read=True)
        return Response({"detail": f"{updated} messages marked as read."})


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(conversation__participants=self.request.user).select_related("sender", "conversation")

    def perform_create(self, serializer):
        message = serializer.save(sender=self.request.user)
        message.conversation.last_message_at = timezone.now()
        message.conversation.save(update_fields=["last_message_at", "updated_at"])

    @action(detail=False, methods=["get"])
    def summary(self, request):
        conversations = Conversation.objects.filter(participants=request.user)
        unread = Message.objects.filter(conversation__in=conversations).exclude(sender=request.user).filter(is_read=False).count()
        latest = conversations.order_by("-last_message_at").first()
        return Response(
            {
                "conversation_count": conversations.count(),
                "unread_count": unread,
                "latest_subject": latest.subject if latest else None,
            }
        )
