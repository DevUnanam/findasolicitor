from rest_framework import serializers

from apps.solicitors.serializers import SolicitorProfileSerializer

from .models import Case, CaseAttachment, CaseUpdate


class CaseAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseAttachment
        fields = ("id", "file", "label", "attachment_type", "uploaded_by", "created_at")
        read_only_fields = ("uploaded_by",)


class CaseUpdateSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.get_full_name", read_only=True)

    class Meta:
        model = CaseUpdate
        fields = ("id", "title", "body", "visibility", "author", "author_name", "created_at")
        read_only_fields = ("author",)


class CaseSerializer(serializers.ModelSerializer):
    attachments = CaseAttachmentSerializer(many=True, read_only=True)
    updates = CaseUpdateSerializer(many=True, read_only=True)
    solicitor_name = serializers.CharField(source="solicitor.user.get_full_name", read_only=True)
    solicitor_profile = SolicitorProfileSerializer(source="solicitor", read_only=True)

    class Meta:
        model = Case
        fields = (
            "id",
            "customer",
            "solicitor",
            "solicitor_name",
            "title",
            "legal_category",
            "description",
            "status",
            "priority",
            "budget",
            "preferred_contact_method",
            "desired_outcome",
            "client_notes",
            "internal_summary",
            "next_step",
            "opened_at",
            "closed_at",
            "attachments",
            "updates",
            "solicitor_profile",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("customer",)


class CaseStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Case.STATUS_CHOICES)


class CaseAssignmentSerializer(serializers.Serializer):
    solicitor_id = serializers.IntegerField()
