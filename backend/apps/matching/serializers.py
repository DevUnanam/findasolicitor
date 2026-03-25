from rest_framework import serializers

from apps.solicitors.models import SolicitorProfile

from .models import MatchQuestionnaire


class MatchQuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchQuestionnaire
        fields = (
            "id",
            "legal_issue",
            "location",
            "urgency",
            "budget_band",
            "service_mode",
            "language_preference",
            "preferred_contact_method",
            "needs_verified_solicitor",
            "needs_immediate_availability",
            "case_summary",
            "goals",
            "notes",
            "created_at",
        )


class MatchQuestionnaireSchemaSerializer(serializers.Serializer):
    legal_issues = serializers.ListField(child=serializers.CharField())
    urgency_levels = serializers.ListField(child=serializers.CharField())
    budget_bands = serializers.ListField(child=serializers.CharField())
    service_modes = serializers.ListField(child=serializers.CharField())
    contact_methods = serializers.ListField(child=serializers.CharField())
    goals = serializers.ListField(child=serializers.CharField())


def recommend_solicitors(questionnaire):
    queryset = SolicitorProfile.objects.select_related("user").all()
    scored_matches = []

    for solicitor in queryset:
        score = 0
        reasons = []

        if questionnaire.legal_issue and questionnaire.legal_issue.lower() in solicitor.specialization.lower():
            score += 35
            reasons.append("Specialization aligns with the legal issue")

        if questionnaire.location and questionnaire.location.lower() in solicitor.location.lower():
            score += 15
            reasons.append("Located in the preferred area")

        if questionnaire.service_mode and questionnaire.service_mode in solicitor.service_modes:
            score += 12
            reasons.append("Supports the preferred service mode")

        if questionnaire.language_preference and questionnaire.language_preference in solicitor.languages:
            score += 10
            reasons.append("Matches the preferred language")

        if questionnaire.needs_verified_solicitor and solicitor.verification_status == "verified":
            score += 12
            reasons.append("Already verified by the platform")

        if questionnaire.needs_immediate_availability and solicitor.is_available:
            score += 10
            reasons.append("Currently available for new work")

        if solicitor.average_rating >= 4.7:
            score += 8
            reasons.append("Strong client rating history")

        if solicitor.years_of_experience >= 10:
            score += 8
            reasons.append("Deep relevant experience")

        if questionnaire.urgency.lower() in {"high", "urgent"} and solicitor.response_time_hours <= 8:
            score += 8
            reasons.append("Fast response time for urgent matters")

        if score > 0:
            scored_matches.append(
                {
                    "profile": solicitor,
                    "score": min(score, 100),
                    "reasons": reasons[:4],
                }
            )

    return sorted(scored_matches, key=lambda item: (-item["score"], -item["profile"].average_rating, -item["profile"].years_of_experience))[:6]
