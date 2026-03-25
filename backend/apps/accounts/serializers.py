from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.accounts.models import CustomerProfile, SavedSolicitor
from apps.cases.models import Case

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "phone",
            "address",
            "avatar",
            "role",
            "terms_accepted",
            "email_verified",
        )
        read_only_fields = ("email_verified",)


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = (
            "email",
            "username",
            "first_name",
            "last_name",
            "password",
            "role",
            "terms_accepted",
        )

    def validate_terms_accepted(self, value):
        if not value:
            raise serializers.ValidationError("Terms must be accepted.")
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        if user.role == "customer":
            CustomerProfile.objects.get_or_create(user=user)
        return user


class EmailTokenSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField()
    uid = serializers.CharField()
    password = serializers.CharField(min_length=8)


class CustomerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    saved_solicitors = serializers.SerializerMethodField()
    top_cases = serializers.SerializerMethodField()

    class Meta:
        model = CustomerProfile
        fields = (
            "id",
            "user",
            "legal_preferences",
            "bio",
            "city",
            "country",
            "preferred_contact_method",
            "preferred_budget_band",
            "saved_solicitors",
            "top_cases",
        )

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        for attr, value in user_data.items():
            setattr(instance.user, attr, value)
        instance.user.save()
        return super().update(instance, validated_data)

    def get_saved_solicitors(self, obj):
        saved = (
            obj.user.saved_solicitors.select_related("solicitor__user")
            .order_by("-created_at")[:6]
        )
        return SavedSolicitorSerializer(saved, many=True).data

    def get_top_cases(self, obj):
        return list(
            Case.objects.filter(customer=obj.user)
            .order_by("-updated_at")
            .values("id", "title", "status", "legal_category")[:5]
        )


class SavedSolicitorSerializer(serializers.ModelSerializer):
    solicitor_name = serializers.CharField(source="solicitor.user.get_full_name", read_only=True)

    class Meta:
        model = SavedSolicitor
        fields = ("id", "customer", "solicitor", "solicitor_name", "created_at")
        read_only_fields = ("customer",)


class FindasolicitorTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["role"] = user.role
        token["email"] = user.email
        return token
