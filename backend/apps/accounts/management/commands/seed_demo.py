from django.core.management.base import BaseCommand

from apps.accounts.models import CustomerProfile, User
from apps.appointments.models import Appointment, AvailabilitySlot
from apps.cases.models import Case, CaseUpdate
from apps.messaging.models import Conversation, Message
from apps.notifications.models import Notification
from apps.payments.models import Payment
from apps.reviews.models import Review
from apps.solicitors.models import SolicitorProfile
from django.utils import timezone
from datetime import timedelta


class Command(BaseCommand):
    help = "Seed demo users, solicitors, and cases for portfolio screenshots."

    def handle(self, *args, **options):
        customer, _ = User.objects.get_or_create(
            email="customer@findasolicitor.com",
            defaults={
                "username": "customer_demo",
                "first_name": "Amara",
                "last_name": "Stone",
                "role": "customer",
                "terms_accepted": True,
                "email_verified": True,
            },
        )
        customer.set_password("Password123!")
        customer.save()
        CustomerProfile.objects.get_or_create(user=customer, defaults={"bio": "Demo customer account"})

        for index, spec in enumerate(["Family Law", "Corporate Law", "Immigration", "Property Law"], start=1):
            user, _ = User.objects.get_or_create(
                email=f"solicitor{index}@findasolicitor.com",
                defaults={
                    "username": f"solicitor_{index}",
                    "first_name": f"Solicitor{index}",
                    "last_name": "Demo",
                    "role": "solicitor",
                    "terms_accepted": True,
                    "email_verified": True,
                },
            )
            user.set_password("Password123!")
            user.save()
            SolicitorProfile.objects.get_or_create(
                user=user,
                defaults={
                    "sra_number": f"SRA{1000 + index}",
                    "specialization": spec,
                    "location": "London",
                    "years_of_experience": 5 + index,
                    "verification_status": "verified",
                    "hourly_rate": 150 + (index * 25),
                    "average_rating": 4.5,
                },
            )

        solicitor = SolicitorProfile.objects.filter(verification_status="verified").first()
        for case_index in range(1, 4):
            case, _ = Case.objects.get_or_create(
                customer=customer,
                title=f"Demo Case {case_index}",
                defaults={
                    "solicitor": solicitor,
                    "legal_category": "Family Law",
                    "description": f"Portfolio sample case {case_index}.",
                    "priority": "high" if case_index == 1 else "medium",
                    "status": "active" if case_index == 1 else "open",
                    "budget": 2000,
                    "preferred_contact_method": "Email",
                    "desired_outcome": "Clear guidance on the next legal step.",
                    "client_notes": "Client uploaded intake summary and supporting documents.",
                    "next_step": "Solicitor to review documents and provide initial recommendations.",
                },
            )
            CaseUpdate.objects.get_or_create(
                case=case,
                title="Case created",
                defaults={
                    "author": customer,
                    "body": "Initial intake submitted through the customer dashboard.",
                    "visibility": "shared",
                },
            )

        first_case = Case.objects.filter(customer=customer).order_by("created_at").first()
        if solicitor and first_case:
            conversation, _ = Conversation.objects.get_or_create(
                case=first_case,
                subject="Tenancy dispute case discussion",
            )
            conversation.participants.add(customer, solicitor.user)
            first_message, created = Message.objects.get_or_create(
                conversation=conversation,
                sender=customer,
                content="Hello, I have uploaded the tenancy documents and would appreciate your initial view.",
            )
            if created:
                Message.objects.create(
                    conversation=conversation,
                    sender=solicitor.user,
                    content="I have reviewed the first set of files and will share a recommended next step shortly.",
                )

            slot, _ = AvailabilitySlot.objects.get_or_create(
                solicitor=solicitor,
                start_time=timezone.now() + timedelta(days=1),
                end_time=timezone.now() + timedelta(days=1, hours=1),
                defaults={"is_booked": True},
            )
            Appointment.objects.get_or_create(
                customer=customer,
                solicitor=solicitor,
                slot=slot,
                defaults={
                    "notes": "Initial case consultation",
                    "status": "confirmed",
                    "meeting_type": "video",
                    "meeting_link": "https://example.com/meeting/findasolicitor-demo",
                    "fee_amount": 95,
                    "reminder_sent": True,
                },
            )

            Payment.objects.get_or_create(
                customer=customer,
                solicitor=solicitor,
                case=first_case,
                amount=95,
                defaults={
                    "status": "paid",
                    "payment_type": "consultation",
                    "description": "Initial consultation fee",
                    "paid_at": timezone.now(),
                },
            )

            Review.objects.get_or_create(
                customer=customer,
                solicitor=solicitor,
                defaults={
                    "title": "Clear and reassuring advice",
                    "rating": 5,
                    "comment": "The advice was practical, timely, and easy to understand.",
                    "would_recommend": True,
                },
            )

        Notification.objects.get_or_create(
            user=customer,
            title="Welcome to Findasolicitor",
            defaults={
                "body": "Your dashboard is ready with sample data.",
                "notification_type": "system",
            },
        )

        self.stdout.write(self.style.SUCCESS("Demo data seeded successfully."))
