import uvicorn
from ai_api.api import app
from environment import AI_SERVICE_HOST, AI_SERVICW_PORT

if __name__ == "__main__":
    print(AI_SERVICE_HOST, AI_SERVICW_PORT)
    uvicorn.run(app=app, port=AI_SERVICW_PORT, host=f"{AI_SERVICE_HOST}", log_level="error")