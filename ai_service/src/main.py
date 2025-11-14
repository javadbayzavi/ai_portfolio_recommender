from  uvicorn import Config, Server
from ai_api.api import app
from mcp_server.server import server
from environment import AI_SERVICE_HOST, AI_SERVICE_PORT, MCP_SERVER_HOST, MCP_SERVER_PORT
import logging
import asyncio

logger = logging.getLogger("AI Service")

async def start_ai_service():
    logger.info("Starting AI Server")
    logger.info(f"Listening on {AI_SERVICE_HOST}:{AI_SERVICE_PORT}")
    config = Config(
        app,
        host=AI_SERVICE_HOST,
        port=AI_SERVICE_PORT,
        log_level="error"
    )
    ai_server = Server(config=config)
    await ai_server.serve()
    logger.info("AI Service Started")


async def start_mcp_server():
    logger.info("Starting MCP Server")
    logger.info(f"Listening on {MCP_SERVER_HOST}:{MCP_SERVER_PORT}")
    await server.run_sse_async()
    logger.info("MCP Server Started")

async def main():
    await asyncio.gather(start_ai_service(), start_mcp_server())

if __name__ == "__main__":
    asyncio.run(main())

