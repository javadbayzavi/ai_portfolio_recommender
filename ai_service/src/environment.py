from dotenv import load_dotenv
from os import getenv
from typing import Sequence
load_dotenv()
AI_SERVICE_HOST = getenv("AI_SERVICE_HOST", None)
AI_SERVICW_PORT = getenv("AI_SERVICW_PORT", 9876)

MCP_SERVER_PORT = getenv("MCP_SERVER_PORT", None)
MCP_SERVER_HOST = getenv("MCP_SERVER_HOST", None)

ALLOWED_ORIGINS: Sequence[str]  = getenv("ALLOWED_ORIGINS", None).split(",")
ALLOWED_METHODS: Sequence[str] = getenv("ALLOWED_METHODS", None).split(",")
