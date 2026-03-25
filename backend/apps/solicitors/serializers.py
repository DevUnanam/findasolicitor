from rest_framework import serializers

from .models import SolicitorProfile


class SolicitorProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="user.get_full_name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

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
            "about",
            "documents",
            "is_available",
            "average_rating",
        )
        read_only_fields = ("user", "average_rating", "verification_status")

