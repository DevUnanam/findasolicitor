from rest_framework import serializers

from .models import SolicitorProfile


class SolicitorProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="user.get_full_name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    user_profile = serializers.SerializerMethodField()

    class Meta:
        model = SolicitorProfile
        fields = (
            "id",
            "user",
            "full_name",
            "email",
            "sra_number",
            "specialization",
            "location",
            "years_of_experience",
            "verification_status",
            "hourly_rate",
            "consultation_fee",
            "about",
            "documents",
            "is_available",
            "average_rating",
            "service_modes",
            "firm_name",
            "languages",
            "response_time_hours",
            "user_profile",
        )
        read_only_fields = ("user", "average_rating", "verification_status")

    def get_user_profile(self, obj):
        return {
            "first_name": obj.user.first_name,
            "last_name": obj.user.last_name,
            "phone": obj.user.phone,
            "address": obj.user.address,
            "avatar": obj.user.avatar.url if obj.user.avatar else None,
        }


class SolicitorVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitorProfile
        fields = ("verification_status",)
