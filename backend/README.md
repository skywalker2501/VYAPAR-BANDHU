# Vyapar Bandhu (व्यापार बंधु) - Backend

This is the production-ready Spring Boot backend for the Vyapar Bandhu SIH project.

## Architecture Guidelines
- **AI IS NOT THE SOURCE OF TRUTH.** Financial capacity, loan math, and scheme tracking are enforced via deterministic domains (`LoanCalculatorService`, `EligibilityEngine`).
- **PostgreSQL** handles persistent transactional ERP and scheme configuration rules.
- **Spring Security (JWT)** protects all routes.

## Prerequisites
- Java 21+
- Docker (for PostgreSQL)
- Node.js (for running the React frontend)

## Environment Variables
Create a local `.env` file (or let `application.yml` use defaults):
```env
JWT_SECRET=super_secure_random_base64_string_required_min_256_bits_for_vyaparbandhu!!!
LLM_API_KEY=your_openai_or_provider_key
```

## Running the Application Locally

1. **Start PostgreSQL Database**
Make sure Docker Desktop is running, then execute:
```bash
docker-compose up -d
```
*This spins up a local Postgres instance on port 5432 with db: `vyaparbandhu`.*

2. **Run Spring Boot Backend**
From this `backend` directory, run:
```bash
./gradlew bootRun
```
*The API will start at `http://localhost:8080/api/v1/...`*

3. **Start the Frontend**
Open a new terminal tab at the root of the workspace (`../`) and run:
```bash
npm run dev
```

## Available APIs
- **Auth:** `POST /api/v1/auth/send-otp` | `POST /api/v1/auth/verify`
- **Finance (Strict Math):** `POST /api/v1/finance/calculate`
- **AI Assistant:** `POST /api/v1/ai/ask`
