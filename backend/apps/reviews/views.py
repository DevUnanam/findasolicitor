from django.db.models import Avg
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Review
from .serializers import ReviewSerializer
from apps.solicitors.models import SolicitorProfile


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Review.objects.all().select_related("customer", "solicitor__user")

    def perform_create(self, serializer):
        review = serializer.save(customer=self.request.user)
        self._update_solicitor_rating(review.solicitor_id)

    def perform_update(self, serializer):
        review = serializer.save()
        self._update_solicitor_rating(review.solicitor_id)

    @action(detail=False, methods=["get"])
    def summary(self, request):
        queryset = self.get_queryset()
        return Response(
            {
                "total_reviews": queryset.count(),
                "average_rating": queryset.aggregate(avg=Avg("rating"))["avg"],
            }
        )

    def _update_solicitor_rating(self, solicitor_id):
        solicitor = SolicitorProfile.objects.get(pk=solicitor_id)
        avg = Review.objects.filter(solicitor_id=solicitor_id).aggregate(avg=Avg("rating"))["avg"] or 0
        solicitor.average_rating = round(avg, 2)
        solicitor.save(update_fields=["average_rating", "updated_at"])
