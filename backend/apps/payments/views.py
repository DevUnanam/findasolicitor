from rest_framework import permissions, viewsets

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

