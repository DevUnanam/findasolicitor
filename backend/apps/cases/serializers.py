from rest_framework import serializers

from .models import Case, CaseAttachment


class CaseAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseAttachment
        fields = ("id", "file", "label", "uploaded_by", "created_at")
        read_only_fields = ("uploaded_by",)


class CaseSerializer(serializers.ModelSerializer):
    attachments = CaseAttachmentSerializer(many=True, read_only=True)
    solicitor_name = serializers.CharField(source="solicitor.user.get_full_name", read_only=True)

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
            "budget",
            "attachments",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("customer",)

