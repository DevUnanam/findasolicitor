from rest_framework import serializers

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.get_full_name", read_only=True)

    class Meta:
        model = Review
        fields = ("id", "customer", "customer_name", "solicitor", "rating", "comment", "created_at")
        read_only_fields = ("customer",)

