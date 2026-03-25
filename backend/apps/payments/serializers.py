from rest_framework import serializers

from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = (
            "id",
            "customer",
            "solicitor",
            "case",
            "amount",
            "currency",
            "stripe_payment_intent",
            "status",
            "payment_type",
            "description",
            "paid_at",
            "created_at",
        )
        read_only_fields = ("customer",)
