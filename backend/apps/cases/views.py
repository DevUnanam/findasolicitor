from rest_framework import permissions, viewsets

from .models import Case
from .serializers import CaseSerializer


class CaseViewSet(viewsets.ModelViewSet):
    serializer_class = CaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "solicitor":
            return Case.objects.filter(solicitor__user=user).select_related("solicitor__user", "customer")
        if user.role == "admin":
            return Case.objects.all().select_related("solicitor__user", "customer")
        return Case.objects.filter(customer=user).select_related("solicitor__user", "customer")

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)
