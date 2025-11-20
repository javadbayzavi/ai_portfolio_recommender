# AI Portfolio Recommender

AI-powered portfolio recommendation demo built with **FastAPI**, **SQLAlchemy**, **PostgreSQL**, and a lightweight **MCP server** to simulate multi-service orchestration.

This project demonstrates:
- Managing **users → portfolios → assets** relationships
- Recommending assets based on **co-occurrence** patterns
- Running dual services:  
  - **AI Service (FastAPI)**  
  - **MCP Server (SSE-based)**  
- Using SQLAlchemy ORM for clean DB modeling
- Clean service architecture with controllers, services, models, and database layers

---

## 🚀 Features

### 1. **Portfolio & Asset API**
- Create users, portfolios, and assets
- Retrieve portfolios containing specific assets
- Explore relationships between assets

### 2. **Recommendation Engine (Rule-Based Prototype)**
- Given an asset → find other assets frequently paired within user portfolios.
- Fully DB-driven, no LLM required.
- Modular structure, ready for future ML/LLM integration.

### 3. **Dual-Service Architecture**
- **AI Service (FastAPI)** handles REST APIs.
- **MCP Server** streams recommendations or asynchronous events.

Both run together cleanly using `asyncio.gather()`.

---

## 📂 Project Structure

```
ai_portfolio_recommender/
│
├── ai_api/
│   ├── api.py              # FastAPI routes
│   ├── main.py             # Service entrypoint
│   ├── models/             # ORM + Pydantic models
│   ├── services/           # Business logic
│   └── ...
│
├── mcp_server/
│   ├── server.py           # SSE-based MCP server
│   └── ...
│
├── db/
│   ├── database.py         # Engine/session creation
│   └── init.sql            # Sample DB schema
│
├── README.md               # ← You are reading this :)
└── requirements.txt
```

---

## 🛠️ Technology Stack

- **FastAPI** — REST API framework  
- **SQLAlchemy 2.0** — ORM  
- **PostgreSQL** — Persistent store  
- **Uvicorn** — ASGI server  
- **MCP Server** — Event-driven module  
- **Python 3.13**  

---

## ▶️ How to Run

### **1. Install dependencies**
```bash
pip install -r requirements.txt
```

### **2. Start PostgreSQL (local or container)**
```bash
docker run -d -p 5432:5432   -e POSTGRES_USER=postgres   -e POSTGRES_PASSWORD=postgres   -e POSTGRES_DB=portfolio   postgres
```

### **3. Run the services**
```bash
python -m ai_api.main
```

Both servers will start:

```
AI Service → localhost:9876
MCP Server → localhost:7654
```

---

## 🧪 Example: Get Portfolios Containing an Asset

### SQLAlchemy lookup:
```python
stmt = (
    select(Portfolio)
    .join(Asset, Portfolio.id == Asset.portfolio_id)
    .where(Asset.name == asset_name)
)
```

### FastAPI endpoint will return:
```json
{
  "response": {
    "asset": "BTC",
    "portfolios": [...]
  }
}
```

---

## 🧭 Roadmap

- [ ] Improve recommendation logic  
- [ ] Add trend-based recommendations  
- [ ] Add portfolio similarity scoring  
- [ ] Introduce LLM-based reasoning  

---

## 📜 License
MIT — feel free to fork and experiment.

---

## 🧑‍💻 Author
**Javad Bayzavi**  
Senior Software Engineer  
Berlin, Germany
