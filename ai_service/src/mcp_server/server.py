from mcp.server import FastMCP
from environment import MCP_SERVER_PORT, MCP_SERVER_HOST
from contextlib import asynccontextmanager
import logging

logger = logging.getLogger("MCP Server")

@asynccontextmanager
async def mcp_app_lifespan(app: FastMCP):
    logger.info("MCP Server Started")
    yield
    logger.info("Shutting down MCP Server")

    yield


server = FastMCP(__name__, port=MCP_SERVER_PORT, host=MCP_SERVER_HOST, lifespan=mcp_app_lifespan)

@server.custom_route("/tools", methods=["GET"],name="get_tools")
async def get_tools():
    return server.list_tools() 

