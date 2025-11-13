from mcp.server import FastMCP
server = FastMCP(__name__)

@server.custom_route("/tools")
async def get_tools():
    return server.list_tools() 

