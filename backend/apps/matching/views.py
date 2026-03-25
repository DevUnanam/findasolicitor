from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MatchQuestionnaire
from .serializers import MatchQuestionnaireSerializer, recommend_solicitors


class MatchQuestionnaireView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
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
                        "id": item.id,
                        "full_name": item.user.get_full_name(),
                        "specialization": item.specialization,
                        "location": item.location,
                        "average_rating": item.average_rating,
                        "verification_status": item.verification_status,
                    }
                    for item in matches
                ],
            }
        )
