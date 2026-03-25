from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.accounts.models import CustomerProfile, SavedSolicitor
from apps.accounts.serializers import (
    CustomerProfileSerializer,
    EmailTokenSerializer,
    FindasolicitorTokenSerializer,
    PasswordResetConfirmSerializer,
    RegisterSerializer,
    SavedSolicitorSerializer,
    UserSerializer,
)
from apps.cases.models import Case
from apps.messaging.models import Conversation
from apps.notifications.models import Notification

User = get_user_model()


class AuthViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all()

    def get_permissions(self):
        if self.action in {"register", "login", "verify_email", "request_password_reset", "reset_password"}:
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=["post"])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = default_token_generator.make_token(user)
        return Response(
            {
                "user": UserSerializer(user).data,
                "verification": {
                    "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                    "token": token,
                },
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["post"])
    def login(self, request):
        view = TokenObtainPairView.as_view(serializer_class=FindasolicitorTokenSerializer)
        return view(request._request)

    @action(detail=False, methods=["get"])
    def me(self, request):
        return Response(UserSerializer(request.user).data)

    @action(detail=False, methods=["post"])
    def verify_email(self, request):
        uid = request.data.get("uid")
        token = request.data.get("token")
        user = User.objects.get(pk=urlsafe_base64_decode(uid).decode())
        if default_token_generator.check_token(user, token):
            user.email_verified = True
            user.save(update_fields=["email_verified"])
            return Response({"detail": "Email verified."})
        return Response({"detail": "Invalid verification link."}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["post"])
    def request_password_reset(self, request):
        serializer = EmailTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.filter(email=serializer.validated_data["email"]).first()
        if not user:
            return Response({"detail": "If the account exists, a reset email will be sent."})
        return Response(
            {
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "token": default_token_generator.make_token(user),
            }
        )

    @action(detail=False, methods=["post"])
    def reset_password(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(pk=urlsafe_base64_decode(serializer.validated_data["uid"]).decode())
        if not default_token_generator.check_token(user, serializer.validated_data["token"]):
            return Response({"detail": "Invalid reset token."}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(serializer.validated_data["password"])
        user.save(update_fields=["password"])
        return Response({"detail": "Password updated."})


class CustomerProfileViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = CustomerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile, _ = CustomerProfile.objects.get_or_create(user=self.request.user)
        return profile

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        return Response(serializer.data)

    @action(detail=False, methods=["get", "patch"], url_path="me")
    def me(self, request):
        profile = self.get_object()
        if request.method.lower() == "get":
            return Response(self.get_serializer(profile).data)

        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class SavedSolicitorViewSet(viewsets.ModelViewSet):
    serializer_class = SavedSolicitorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedSolicitor.objects.filter(customer=self.request.user).select_related("solicitor__user")

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)


class DashboardSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        case_count = Case.objects.filter(customer=user).count()
        message_count = Conversation.objects.filter(participants=user).count()
        notification_count = Notification.objects.filter(user=user, is_read=False).count()
        top_cases = list(
            Case.objects.filter(customer=user)
            .order_by("-updated_at")
            .values("id", "title", "status")[:5]
        )
        return Response(
            {
                "user": UserSerializer(user).data,
                "metrics": {
                    "cases": case_count,
                    "conversations": message_count,
                    "unread_notifications": notification_count,
                },
                "top_cases": top_cases,
            }
        )
