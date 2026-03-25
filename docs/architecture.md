# Findasolicitor Architecture Plan

## Principles

- Domain-driven app boundaries
- Clear separation between infrastructure and business logic
- API-first backend that can support web and future mobile clients
- Recruiter-friendly, production-style structure without unnecessary complexity

## Backend modules

- `accounts`: custom user model, auth, profile management, saved solicitors
- `solicitors`: solicitor onboarding, verification, search metadata
- `matching`: questionnaire and recommendation logic
- `cases`: case creation, assignment, attachments, progress tracking
- `messaging`: conversations, participants, real-time chat
- `appointments`: availability and booking workflows
- `payments`: payment records and solicitor earnings
- `reviews`: ratings and feedback
- `notifications`: in-app alerts and unread states
- `common`: shared mixins, choices, pagination, permissions, base models

## Frontend modules

- `app`: router and providers
- `components`: shared UI building blocks
- `features`: role-based product domains
- `layouts`: reusable dashboard structure
- `lib`: API client and utilities
- `pages`: recruiter-friendly routed screens
