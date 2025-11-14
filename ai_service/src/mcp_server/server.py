from mcp.server import FastMCP
from environment import MCP_SERVER_PORT, MCP_SERVER_HOST

server = FastMCP(__name__, port=MCP_SERVER_PORT, host=MCP_SERVER_HOST)

@server.custom_route("/tools")
async def get_tools():
    return server.list_tools() 

