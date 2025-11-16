from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ai_api.models.response_model import ResponseModel
from environment import ALLOWED_METHODS, ALLOWED_ORIGINS
import logging
from ai_api.routes.recommend import assets, portfolios, trends, users
from ai_api.rate_limiter import RateLimiter

from contextlib import asynccontextmanager

logger = logging.getLogger("AI Service")

@asynccontextmanager
async def ai_app_lifespan(app: FastAPI):
    logger.info("AI Service Started")
    yield
    logger.info("Shutting down AI Service")


app = FastAPI(
        lifespan=ai_app_lifespan,
        title="Recommender AI Service",
        version="1.0",
        description="This service provides an AI Based recomendation APIs"
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=ALLOWED_METHODS,
    allow_headers=["*"]
    )

@app.middleware("http")
async def check_rate_limit(request: Request, client_callback):
    client_id = request.client.host
    is_allowed = await RateLimiter().allow_client(client_id=client_id)
    if not is_allowed:
       return JSONResponse(
            status_code=429,
            content={"detail": "Too Many Requests"}
        )
    
    return await client_callback(request)

@app.get("/")
async def root():
    return ResponseModel(
            response={"message": "Hello from AI Service"}
        )


app.include_router(assets.router)
app.include_router(portfolios.router)
app.include_router(trends.router)
app.include_router(users.router)