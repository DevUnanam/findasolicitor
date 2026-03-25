from rest_framework import serializers

from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    solicitor_name = serializers.CharField(source="solicitor.user.get_full_name", read_only=True)
    case_title = serializers.CharField(source="case.title", read_only=True)

    class Meta:
        model = Payment
        fields = (
            "id",
            "customer",
            "solicitor",
            "case",
            "solicitor_name",
            "case_title",
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
