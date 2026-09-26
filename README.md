# Vyapar Bandhu - SIH 2026 Production Prototype

“Your business, made simple.”

Vyapar Bandhu is a comprehensive full-stack ecosystem engineered explicitly for rural and semi-urban micro-entrepreneurs. It bridges exactly bounded financial computations natively with Government schemes to completely ban "Black Box AI hallucinations", presenting data only natively through verified JDBC mappings.

## Core Features
1. **Hyper-Local Feasibility**: Analyzes geography against explicit demand parameters tracking PMV explicitly.
2. **Deterministic Financial Bounds**: Executes rigorous mathematical rules protecting loan capacities precisely (e.g. 10% margin limiting capacities exclusively).
3. **Micro-ERP & Dashboard**: Computes explicit transactional events mapping ledgers seamlessly (Sales minus Expense against active Loan EMIs).
4. **Transparent Early Warning Health Score**: Measures exactly via strict algorithmic rule mappings preventing heuristic misrepresentations (e.g. flagging `LOAN PAYMENT RISK` if Outstandings > Revenue * 3).
5. **Strict Constrained RAG Engine**: Connects seamlessly utilizing rigorous 10-point prompts blocking all arithmetic AI generations safely.
6. **Graceful Demo Fallback Node**: Isolates explicitly network anomalies dropping securely into statically constructed exact `Dairy Farm` mock nodes mapping 15 metrics natively WITHOUT secretly hiding fake network statuses.

## Architecture Map
* **Frontend**: React.js + TailwindCSS + Vite + Axios (`VITE_API_BASE_URL`) + 8 Languages explicit i18n
* **Backend Module**: Java 21 + Spring Boot 3 + JWT Filters + PostgreSQL 15 + Dedicated JUnit 5 algorithms

---

## Local Environment Deployment

### 1. Postgres Database Setup
The backend requires an explicit connection mapping.
```bash
docker run --name vb-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vyaparbandhu -p 5432:5432 -d postgres:15
```

### 2. Backend Boot sequence
1. Navigate dynamically into the backend layout natively mapping parameters accurately.
`cd backend`
2. Ensure you have `application.yml` tracking exact LLM parameters safely locally.
3. Execute rigorous builds accurately.
`./gradlew build`
4. Spin up the server:
`./gradlew bootRun`
The server listens firmly on Port 8080 (`http://localhost:8080/api/v1`).

### 3. Frontend UI Boot sequence
Ensure `.env` hosts `VITE_API_BASE_URL=http://localhost:8080/api/v1` explicitly.
```bash
npm install
npm run dev
```

---

## Explicit Final API Mapping Core
* **Auth**: `POST /api/v1/auth/verify`
* **Health Mapping**: `GET /api/v1/health`
* **Micro-ERP Ledger Systems**: 
    - `POST /api/v1/erp/sales`
    - `POST /api/v1/erp/expenses`
    - `GET /api/v1/erp/dashboard`
* **Government Rules (RAG Mapped)**:
    - `POST /api/v1/schemes/match`
* **Financial Calculations (No AI used)**:
    - `POST /api/v1/finance/calculate`
    - `POST /api/v1/finance/loan-necessity`

### SIH Note
All mathematical logic has been surgically removed from React mapping architectures completely offloading algorithms directly onto strictly tested backend JVM engines securing SIH regulatory presentations correctly!
