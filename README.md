# Findasolicitor

Findasolicitor is a full-stack legal services marketplace that connects customers with vetted solicitors for legal support, case collaboration, secure messaging, appointments, payments, and reviews.

## Architecture

```text
findasolicitor-1/
|-- backend/
|   |-- apps/
|   |   |-- accounts/
|   |   |-- appointments/
|   |   |-- cases/
|   |   |-- common/
|   |   |-- matching/
|   |   |-- messaging/
|   |   |-- notifications/
|   |   |-- payments/
|   |   |-- reviews/
|   |   `-- solicitors/
|   |-- config/
|   |-- manage.py
|   |-- requirements.txt
|   `-- .env.example
|-- frontend/
|   |-- public/
|   |-- src/
|   |-- .env.example
|   |-- index.html
|   |-- package.json
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   `-- vite.config.js
`-- docs/
    `-- architecture.md
```

## Setup

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

## Phase 2 progress

- Customer profile workspace and saved solicitor view
- Solicitor onboarding and richer solicitor profile data model
- Advanced solicitor search filters for specialization, location, rating, availability, and service mode
- Solicitor detail experience ready for reviews, booking, and messaging integration

## Phase 3 progress

- Questionnaire-driven solicitor matching flow
- Explainable recommendation scoring with fit percentages and match reasons
- Dedicated frontend matching experience connected to discovery flows

## Phase 4 progress

- Case intake workflow and richer case lifecycle data
- Case detail view with updates, attachments, and next-step context
- Dashboard case management experience aligned with legal operations workflows

## Phase 5 progress

- Conversation-based messaging workspace with unread context
- Case-linked professional chat UI and secure message composer
- Backend conversation summaries, unread actions, and message metadata support
