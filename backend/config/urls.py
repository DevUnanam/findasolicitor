from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.accounts.views import (
    AuthViewSet,
    CustomerProfileViewSet,
    DashboardSummaryView,
    SavedSolicitorViewSet,
)
from apps.appointments.views import AppointmentViewSet, AvailabilitySlotViewSet
from apps.cases.views import CaseViewSet
from apps.matching.views import MatchQuestionnaireView, MatchResultView
from apps.messaging.views import ConversationViewSet, MessageViewSet
from apps.notifications.views import NotificationViewSet
from apps.payments.views import PaymentViewSet
from apps.reviews.views import ReviewViewSet
from apps.solicitors.views import SolicitorProfileViewSet

router = DefaultRouter()
router.register("auth", AuthViewSet, basename="auth")
router.register("profile", CustomerProfileViewSet, basename="profile")
router.register("saved-solicitors", SavedSolicitorViewSet, basename="saved-solicitors")
router.register("solicitors", SolicitorProfileViewSet, basename="solicitors")
router.register("cases", CaseViewSet, basename="cases")
router.register("conversations", ConversationViewSet, basename="conversations")
router.register("messages", MessageViewSet, basename="messages")
router.register("appointments", AppointmentViewSet, basename="appointments")
router.register("availability", AvailabilitySlotViewSet, basename="availability")
router.register("payments", PaymentViewSet, basename="payments")
router.register("reviews", ReviewViewSet, basename="reviews")
router.register("notifications", NotificationViewSet, basename="notifications")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/dashboard/summary/", DashboardSummaryView.as_view(), name="dashboard-summary"),
    path("api/matching/questionnaire/", MatchQuestionnaireView.as_view(), name="matching-questionnaire"),
    path("api/matching/results/", MatchResultView.as_view(), name="matching-results"),
]
