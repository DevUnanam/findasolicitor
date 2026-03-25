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

