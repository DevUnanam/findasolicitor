from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MatchQuestionnaire
from .serializers import (
    MatchQuestionnaireSchemaSerializer,
    MatchQuestionnaireSerializer,
    recommend_solicitors,
)

QUESTIONNAIRE_SCHEMA = {
    "legal_issues": ["Family Law", "Corporate Law", "Immigration", "Property Law"],
    "urgency_levels": ["Low", "Medium", "High", "Urgent"],
    "budget_bands": ["Below GBP1,000", "GBP1,000 - GBP3,000", "GBP3,000 - GBP7,500", "GBP7,500+"],
    "service_modes": ["Virtual", "In Person"],
    "contact_methods": ["Email", "Phone", "Video call"],
    "goals": [
        "Fast first consultation",
        "Strong courtroom or negotiation experience",
        "Predictable pricing",
        "Long-term case support",
    ],
}


class MatchQuestionnaireView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.query_params.get("schema") == "true":
            return Response(MatchQuestionnaireSchemaSerializer(QUESTIONNAIRE_SCHEMA).data)

        latest = MatchQuestionnaire.objects.filter(user=request.user).order_by("-created_at").first()
        serializer = MatchQuestionnaireSerializer(latest)
        return Response(serializer.data if latest else {})

    def post(self, request):
        serializer = MatchQuestionnaireSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        questionnaire = serializer.save(user=request.user)
        return Response(MatchQuestionnaireSerializer(questionnaire).data)


class MatchResultView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        questionnaire = MatchQuestionnaire.objects.filter(user=request.user).order_by("-created_at").first()
        if not questionnaire:
            return Response({"detail": "Complete the questionnaire first."}, status=400)
        matches = recommend_solicitors(questionnaire)
        return Response(
            {
                "questionnaire": MatchQuestionnaireSerializer(questionnaire).data,
                "matches": [
                    {
                        "id": item["profile"].id,
                        "full_name": item["profile"].user.get_full_name(),
                        "specialization": item["profile"].specialization,
                        "location": item["profile"].location,
                        "average_rating": item["profile"].average_rating,
                        "verification_status": item["profile"].verification_status,
                        "hourly_rate": item["profile"].hourly_rate,
                        "fit_score": item["score"],
                        "reasons": item["reasons"],
                    }
                    for item in matches
                ],
            }
        )


class MatchHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        history = MatchQuestionnaire.objects.filter(user=request.user).order_by("-created_at")[:5]
        return Response(MatchQuestionnaireSerializer(history, many=True).data)
