from rest_framework import serializers

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.get_full_name", read_only=True)
    solicitor_name = serializers.CharField(source="solicitor.user.get_full_name", read_only=True)

    class Meta:
        model = Review
        fields = (
            "id",
            "customer",
            "customer_name",
            "solicitor",
            "solicitor_name",
            "title",
            "rating",
            "comment",
            "would_recommend",
            "created_at",
        )
        read_only_fields = ("customer",)
