from rest_framework import serializers

from apps.solicitors.models import SolicitorProfile

from .models import MatchQuestionnaire


class MatchQuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchQuestionnaire
        fields = ("id", "legal_issue", "location", "urgency", "budget_band", "notes", "created_at")


def recommend_solicitors(questionnaire):
    queryset = SolicitorProfile.objects.filter(
        specialization__icontains=questionnaire.legal_issue,
        is_available=True,
    )
    if questionnaire.location:
        queryset = queryset.filter(location__icontains=questionnaire.location)
    return queryset.order_by("-average_rating", "-years_of_experience")[:6]

