import uvicorn
from ai_api.api import app


if __name__ == "__main__":
    uvicorn.run(app=app, port=9876, host="127.0.0.1", log_level="error")