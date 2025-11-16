from dotenv import load_dotenv
from os import getenv
from typing import Sequence
load_dotenv()
AI_SERVICE_HOST = getenv("AI_SERVICE_HOST", None)
AI_SERVICE_PORT = int(getenv("AI_SERVICW_PORT", 9876))

MCP_SERVER_PORT = getenv("MCP_SERVER_PORT", None)
MCP_SERVER_HOST = getenv("MCP_SERVER_HOST", None)

ALLOWED_ORIGINS: Sequence[str]  = getenv("ALLOWED_ORIGINS", None).split(",")
ALLOWED_METHODS: Sequence[str] = getenv("ALLOWED_METHODS", None).split(",")

DB_SERVER = getenv('DB_SERVER', None)
DB_PORT = getenv('DB_PORT', None)
DB_USER = getenv('DB_USER', None)
DB_PASS = getenv('DB_PASS', None)
DB_NAME = getenv('DB_NAME', None)

CACHE_HOST = getenv('CACHE_HOST', None)
CACHE_PORT = getenv('CACHE_PORT', None)
CACHE_DB = getenv('CACHE_DB', None)
