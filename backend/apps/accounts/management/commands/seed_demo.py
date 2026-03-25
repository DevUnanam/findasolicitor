from django.core.management.base import BaseCommand

from apps.accounts.models import CustomerProfile, User
from apps.cases.models import Case
from apps.notifications.models import Notification
from apps.solicitors.models import SolicitorProfile


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
            Case.objects.get_or_create(
                customer=customer,
                title=f"Demo Case {case_index}",
                defaults={
                    "solicitor": solicitor,
                    "legal_category": "Family Law",
                    "description": f"Portfolio sample case {case_index}.",
                    "status": "active" if case_index == 1 else "open",
                    "budget": 2000,
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

