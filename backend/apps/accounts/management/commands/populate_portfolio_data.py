import random
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from apps.accounts.models import CustomerProfile, User
from apps.appointments.models import Appointment, AvailabilitySlot
from apps.cases.models import Case, CaseUpdate
from apps.messaging.models import Conversation, Message
from apps.notifications.models import Notification
from apps.payments.models import Payment
from apps.reviews.models import Review
from apps.solicitors.models import SolicitorProfile

LAW_FIELDS = [
    "Family Law",
    "Criminal Law",
    "Corporate Law",
    "Property Law",
    "Immigration Law",
    "Labour and Employment Law",
    "Intellectual Property Law",
    "Tax Law",
    "Human Rights Law",
    "Energy Law",
]

NIGERIAN_CITIES = [
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Ibadan",
    "Kano",
    "Enugu",
    "Benin City",
    "Abeokuta",
    "Jos",
    "Ilorin",
]

FIRST_NAMES = [
    "Adebayo", "Chiamaka", "Tolu", "Ifeoma", "Obinna", "Temitope", "Zainab", "Amina",
    "Kelechi", "Nneka", "Bolanle", "Ayomide", "Favour", "Uche", "Oluwaseun", "Halima",
    "Amarachi", "Mofe", "Inioluwa", "Efe", "Mariam", "David", "Grace", "Samuel",
]

LAST_NAMES = [
    "Adeyemi", "Okafor", "Balogun", "Eze", "Afolayan", "Nwosu", "Danjuma", "Ibrahim",
    "Ogundele", "Bassey", "Okonkwo", "Abdullahi", "Akinola", "Onyeka", "Salami", "Udo",
    "Bello", "Nnamdi", "Adejumo", "Lawal", "Okorie", "Ogunleye", "Akinyemi", "Duru",
]

REVIEW_TITLES = [
    "Clear and practical advice",
    "Very responsive and professional",
    "Strong courtroom preparation",
    "Thoughtful support throughout the case",
    "Helped me understand the legal options",
]

REVIEW_COMMENTS = [
    "The solicitor explained the process clearly and gave practical next steps.",
    "Communication was steady and professional from start to finish.",
    "I felt supported and well advised during a stressful matter.",
    "The legal strategy was easy to understand and well structured.",
    "Turnaround time was strong and the advice felt commercially sound.",
]

CASE_TEMPLATES = [
    ("Custody and support guidance", "Family Law"),
    ("Bail application support", "Criminal Law"),
    ("Commercial contract review", "Corporate Law"),
    ("Land purchase due diligence", "Property Law"),
    ("Visa refusal appeal", "Immigration Law"),
    ("Wrongful termination dispute", "Labour and Employment Law"),
    ("Trademark infringement response", "Intellectual Property Law"),
    ("Tax compliance advisory", "Tax Law"),
]


class Command(BaseCommand):
    help = "Populate portfolio data with customers, Nigerian solicitors, cases, reviews, and linked history."

    def add_arguments(self, parser):
        parser.add_argument("--customers", type=int, default=60)
        parser.add_argument("--solicitors", type=int, default=100)
        parser.add_argument("--reset", action="store_true")

    @transaction.atomic
    def handle(self, *args, **options):
        random.seed(42)
        customer_count = options["customers"]
        solicitor_count = options["solicitors"]

        if options["reset"]:
            self._reset_seeded_data()

        admin = self._get_or_create_admin()
        customers = self._create_customers(customer_count)
        solicitors = self._create_solicitors(solicitor_count)
        self._create_histories(customers, solicitors)
        self._create_admin_notifications(admin)

        self.stdout.write(
            self.style.SUCCESS(
                f"Portfolio data populated: {len(customers)} customers, {len(solicitors)} Nigerian solicitors."
            )
        )

    def _reset_seeded_data(self):
        Review.objects.filter(customer__email__contains="@findasolicitor.ng").delete()
        Payment.objects.filter(customer__email__contains="@findasolicitor.ng").delete()
        Appointment.objects.filter(customer__email__contains="@findasolicitor.ng").delete()
        AvailabilitySlot.objects.filter(solicitor__user__email__contains="@findasolicitor.ng").delete()
        Message.objects.filter(sender__email__contains="@findasolicitor.ng").delete()
        Conversation.objects.filter(participants__email__contains="@findasolicitor.ng").distinct().delete()
        CaseUpdate.objects.filter(author__email__contains="@findasolicitor.ng").delete()
        Case.objects.filter(customer__email__contains="@findasolicitor.ng").delete()
        Notification.objects.filter(user__email__contains="@findasolicitor.ng").delete()
        SolicitorProfile.objects.filter(user__email__contains="@findasolicitor.ng").delete()
        CustomerProfile.objects.filter(user__email__contains="@findasolicitor.ng").delete()
        User.objects.filter(email__contains="@findasolicitor.ng").delete()

    def _get_or_create_admin(self):
        admin, _ = User.objects.get_or_create(
            email="admin@findasolicitor.ng",
            defaults={
                "username": "findasolicitor_admin",
                "first_name": "Admin",
                "last_name": "Team",
                "role": "admin",
                "is_staff": True,
                "is_superuser": True,
                "terms_accepted": True,
                "email_verified": True,
            },
        )
        admin.set_password("Password123!")
        admin.save()
        return admin

    def _create_customers(self, count):
        customers = []
        for index in range(count):
            first_name = FIRST_NAMES[index % len(FIRST_NAMES)]
            last_name = LAST_NAMES[(index * 3) % len(LAST_NAMES)]
            email = f"customer{index + 1:03d}@findasolicitor.ng"
            user, _ = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": f"customer_{index + 1:03d}",
                    "first_name": first_name,
                    "last_name": last_name,
                    "role": "customer",
                    "terms_accepted": True,
                    "email_verified": True,
                    "phone": f"+23480{random.randint(10000000, 99999999)}",
                    "address": f"{random.randint(5, 90)} Example Street, {random.choice(NIGERIAN_CITIES)}",
                },
            )
            user.set_password("Password123!")
            user.save()
            CustomerProfile.objects.get_or_create(
                user=user,
                defaults={
                    "bio": "Portfolio-generated customer account",
                    "city": random.choice(NIGERIAN_CITIES),
                    "country": "Nigeria",
                    "preferred_contact_method": random.choice(["Email", "Phone", "Video call"]),
                    "preferred_budget_band": random.choice(
                        ["Below NGN250,000", "NGN250,000 - NGN750,000", "NGN750,000+"]
                    ),
                    "legal_preferences": {"interests": random.sample(LAW_FIELDS, k=2)},
                },
            )
            customers.append(user)
        return customers

    def _create_solicitors(self, count):
        solicitors = []
        for index in range(count):
            first_name = FIRST_NAMES[(index * 2) % len(FIRST_NAMES)]
            last_name = LAST_NAMES[(index * 5) % len(LAST_NAMES)]
            email = f"solicitor{index + 1:03d}@findasolicitor.ng"
            specialization = LAW_FIELDS[index % len(LAW_FIELDS)]
            location = NIGERIAN_CITIES[index % len(NIGERIAN_CITIES)]
            years = random.randint(3, 22)

            user, _ = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": f"solicitor_{index + 1:03d}",
                    "first_name": first_name,
                    "last_name": last_name,
                    "role": "solicitor",
                    "terms_accepted": True,
                    "email_verified": True,
                    "phone": f"+23481{random.randint(10000000, 99999999)}",
                    "address": f"{random.randint(10, 120)} Chambers Road, {location}",
                },
            )
            user.set_password("Password123!")
            user.save()
            profile, _ = SolicitorProfile.objects.get_or_create(
                user=user,
                defaults={
                    "sra_number": f"NGBAR{index + 1000}",
                    "specialization": specialization,
                    "location": location,
                    "years_of_experience": years,
                    "verification_status": "verified" if index % 7 else "pending",
                    "hourly_rate": random.randint(30000, 150000),
                    "consultation_fee": random.randint(10000, 50000),
                    "about": f"{first_name} {last_name} advises clients on {specialization.lower()} matters across {location} and surrounding areas.",
                    "documents": ["Bar certificate", "Chambers identification"],
                    "is_available": index % 5 != 0,
                    "service_modes": random.sample(["Virtual", "In Person"], k=random.randint(1, 2)),
                    "firm_name": f"{last_name} Legal Practice",
                    "languages": random.sample(["English", "Yoruba", "Igbo", "Hausa"], k=2),
                    "response_time_hours": random.choice([4, 8, 12, 24]),
                    "average_rating": 0,
                },
            )
            solicitors.append(profile)
        return solicitors

    def _create_histories(self, customers, solicitors):
        now = timezone.now()
        for customer in customers:
            linked_solicitors = random.sample(solicitors, k=random.randint(1, 4))
            for solicitor in linked_solicitors:
                template_title, template_category = random.choice(CASE_TEMPLATES)
                opened_at = now - timedelta(days=random.randint(7, 400))
                case = Case.objects.create(
                    customer=customer,
                    solicitor=solicitor,
                    title=f"{template_title} for {customer.first_name}",
                    legal_category=template_category,
                    description=f"{customer.get_full_name()} needs support with {template_category.lower()} and portfolio-generated historical records.",
                    status=random.choice(["closed", "active", "assigned", "in_review"]),
                    priority=random.choice(["low", "medium", "high", "urgent"]),
                    budget=random.randint(150000, 2500000),
                    preferred_contact_method=random.choice(["Email", "Phone", "Video call"]),
                    desired_outcome="Obtain clear legal guidance and practical representation.",
                    client_notes="Generated seeded case for portfolio realism.",
                    internal_summary="Historical matter generated for demos and recruiter walkthroughs.",
                    next_step=random.choice(
                        [
                            "Awaiting final review from solicitor.",
                            "Client to approve draft filing.",
                            "Matter closed with recommendations delivered.",
                        ]
                    ),
                    opened_at=opened_at,
                    closed_at=opened_at + timedelta(days=random.randint(10, 120)),
                )
                CaseUpdate.objects.create(
                    case=case,
                    author=customer,
                    title="Case intake submitted",
                    body="Initial supporting information was submitted through the client portal.",
                    visibility="shared",
                )
                CaseUpdate.objects.create(
                    case=case,
                    author=solicitor.user,
                    title="Solicitor review completed",
                    body="Matter was assessed and initial legal direction was prepared.",
                    visibility="shared",
                )

                slot_start = now + timedelta(days=random.randint(1, 30), hours=random.randint(8, 16))
                slot, _ = AvailabilitySlot.objects.get_or_create(
                    solicitor=solicitor,
                    start_time=slot_start,
                    end_time=slot_start + timedelta(hours=1),
                    defaults={"is_booked": True},
                )
                Appointment.objects.get_or_create(
                    customer=customer,
                    solicitor=solicitor,
                    slot=slot,
                    defaults={
                        "notes": f"Consultation for {template_title.lower()}",
                        "status": random.choice(["pending", "confirmed", "completed"]),
                        "meeting_type": random.choice(["video", "phone", "in_person"]),
                        "meeting_link": "https://meet.findasolicitor.ng/demo-room",
                        "fee_amount": random.randint(10000, 50000),
                        "reminder_sent": random.choice([True, False]),
                    },
                )

                payment_amount = random.randint(25000, 250000)
                Payment.objects.get_or_create(
                    customer=customer,
                    solicitor=solicitor,
                    case=case,
                    amount=payment_amount,
                    defaults={
                        "status": random.choice(["paid", "pending", "paid", "paid"]),
                        "payment_type": random.choice(["consultation", "retainer", "case_fee"]),
                        "description": f"Payment for {template_title.lower()}",
                        "paid_at": now - timedelta(days=random.randint(1, 60)),
                        "stripe_payment_intent": f"pi_demo_{customer.id}_{solicitor.id}",
                    },
                )

                conversation = Conversation.objects.create(
                    case=case,
                    subject=f"{template_title} discussion",
                    last_message_at=now - timedelta(days=random.randint(0, 15)),
                )
                conversation.participants.add(customer, solicitor.user)
                Message.objects.create(
                    conversation=conversation,
                    sender=customer,
                    content="Hello, I wanted to follow up on the documents I shared for this matter.",
                    is_read=True,
                )
                Message.objects.create(
                    conversation=conversation,
                    sender=solicitor.user,
                    content="Thank you. I have reviewed the file and will outline the most practical next step.",
                    is_read=random.choice([True, False]),
                )

                Review.objects.get_or_create(
                    customer=customer,
                    solicitor=solicitor,
                    defaults={
                        "title": random.choice(REVIEW_TITLES),
                        "rating": random.randint(3, 5),
                        "comment": random.choice(REVIEW_COMMENTS),
                        "would_recommend": random.choice([True, True, True, False]),
                    },
                )
                Notification.objects.get_or_create(
                    user=customer,
                    title=f"Update on {template_title}",
                    body="A generated case activity update is available in your dashboard.",
                    notification_type="case",
                    link=f"/cases/{case.id}",
                )

        for solicitor in solicitors:
            ratings = list(Review.objects.filter(solicitor=solicitor).values_list("rating", flat=True))
            if ratings:
                solicitor.average_rating = round(sum(ratings) / len(ratings), 2)
                solicitor.save(update_fields=["average_rating", "updated_at"])

    def _create_admin_notifications(self, admin):
        Notification.objects.get_or_create(
            user=admin,
            title="Portfolio data loaded",
            defaults={
                "body": "Customers, Nigerian solicitors, historical cases, and reviews have been populated.",
                "notification_type": "system",
                "link": "/admin",
            },
        )
