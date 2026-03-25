from django.utils import timezone
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Payment
from .serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "solicitor":
            return Payment.objects.filter(solicitor__user=user).select_related("solicitor__user", "customer")
        return Payment.objects.filter(customer=user).select_related("solicitor__user", "customer")

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    @action(detail=True, methods=["post"])
    def mark_paid(self, request, pk=None):
        payment = self.get_object()
        payment.status = "paid"
        payment.paid_at = timezone.now()
        payment.save(update_fields=["status", "paid_at", "updated_at"])
        return Response(self.get_serializer(payment).data)

    @action(detail=False, methods=["get"])
    def summary(self, request):
        queryset = self.get_queryset()
        return Response(
            {
                "total_transactions": queryset.count(),
                "paid_total": sum(item.amount for item in queryset.filter(status="paid")),
                "pending_total": sum(item.amount for item in queryset.filter(status="pending")),
            }
        )
