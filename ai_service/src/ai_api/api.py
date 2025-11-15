from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_api.models.response_model import ResponseModel
from ai_api.models.request_model import RequestModel
from ai_api.process_requester import process_request
from ai_api.process_command import AICommand
from environment import ALLOWED_METHODS, ALLOWED_ORIGINS
import logging
from ai_api.routes.recommend import assets, portfolios, trends, users

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



@app.get("/")
async def root():
    return ResponseModel(
            response={"message": "Hello from AI Service"}
        )


app.include_router(assets.router)
app.include_router(portfolios.router)
app.include_router(trends.router)
app.include_router(users.router)