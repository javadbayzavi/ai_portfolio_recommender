# AI Portfolio Recommender

A dual-backend system for portfolio and asset management plus AI-driven recommendations, built with:
-	Backend (NestJS + Prisma) — Manages users, portfolios, assets
-	AI Service (FastAPI + FastMCP) — Executes recommendation logic from Python
-	PostgreSQL + Redis — Persistent storage + caching
-	LocalStack + Testcontainers — For local AWS-compatible testing
-	Fast, modular architecture that supports multiple types of recommendations


## 📂 Project Structure
```

ai_portfolio_recommender/
│
├── backend/                 # NestJS project
│   ├── prisma/              # Prisma schema & migrations
│   ├── src/
│   │   ├── user/            # User controller/service
│   │   ├── portfolio/       # Portfolio controller/service
│   │   ├── asset/           # Asset controller/service
│   │   ├── recommender/     # Forwards requests to Python AI service
│   │   ├── common/          # Shared modules, DTOs, guards
│   │   └── app.module.ts
│   └── ...
│
└── ai_service/              # Python FastAPI + MCP service
    ├── ai_api/
    │   ├── api.py           # REST endpoints
    │   ├── models/          # Pydantic models
    │   ├── services/        # Recommendation logic
    │   └── ...
    └── main.py

```

## ⚙️ Components Overview


### 1. NestJS Backend

Handles all data management:

#### User Management
-	Create / update / delete users
-	Authentication-ready design

#### Portfolio Management
-	Retrieve full portfolios
-	Create portfolios and manage related assets

#### Asset Management
-	Add/remove assets
-	Update prices, quantities, symbols, types

#### Recommendation Request Forwarding
Backend never computes recommendations itself.
Instead, it sends two kinds of requests to the AI service:

Type A: Data-based recommendations
	•	Asset
	•	Asset list
	•	Portfolio
	•	Portfolio list

Backend forwards structured data → AI Service returns suggestions.

Type B: Prompt-based recommendations
Raw text prompt from user → AI response.

⸻

### 2. AI Service (Python FastAPI + FastMCP)

Lightweight recommendation engine.

#### Responsibilities
-	Receive structured data (assets, portfolios)
-	Look up correlations / coincidences in PostgreSQL
-	Apply custom rules
-	Produce recommendation sets
-	Cache hot responses in Redis
-	Expose endpoints for Nest backend

### FastMCP

Used to provide modular, pluggable AI tools.


## 🗄️ Databases & Infra

### PostgreSQL
-	Primary storage
-	Accessed via Prisma (Nest) and SQLAlchemy (Python)

### Redis
-	Used for caching
-	Deployed locally with Testcontainers or Docker

### LocalStack
-	Used to emulate AWS for development/testing
-	Useful for future extensions (SQS, SNS, S3, Lambda integration)

### Testcontainers

Used heavily in tests:
-	PostgreSQL container
-	Redis container
-	LocalStack container
-	Future: service containers for test orchestration


🔗 Recommendation Types (Target APIs)

These will be implemented across the backend and AI service:

1. Recommend per asset

Given a single asset, find related assets from other portfolios.

2. Recommend per asset list

Analyse relationships and produce a recommendation set.

3. Recommend per portfolio

Look for portfolios with similar asset patterns.

4. Recommend per portfolio list

Cluster-based or correlation-based recommendations.

5. Recommend per user

Based on user portfolio history.

6. Recommend trends between users

Pattern-based cross-user insights.

7. Recommend hots

Global trending assets across all users.

⸻

## 🚀 Running Locally

### Backend
```
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```
### AI Service
```
cd ai_service
pip install -r requirements.txt
python main.py
```
### With Testcontainers

Run tests normally — dependencies launch automatically.

With LocalStack

Ensure LocalStack is running:

localstack start


## 🛠️ Testing

Each service includes isolated tests using:
- Jest (Nest)
- Pytest (Python)
- Testcontainers for infrastructure dependencies


## 📌 Current Development Status
- Nest backend fully manages users, portfolios, assets.
- AI service running FastAPI + SQLAlchemy + FastMCP.
- Basic recommendation pipelines defined.
- Working DB connections for both services.
- LocalStack + Testcontainers integration ready.
- Next step: advanced recommendation logic.


## 📄 License

MIT (or add your preferred license)
