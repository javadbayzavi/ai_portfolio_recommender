from sqlalchemy import create_engine
from sqlalchemy.orm.session import Session
from environment import DB_NAME, DB_PASS, DB_SERVER, DB_USER, DB_PORT
from services.db.db_models import Base

DATA_BASE_URI = f"postgresql+psycopg2://{DB_USER}:{DB_PASS}@{DB_SERVER}:{DB_PORT}/{DB_NAME}"

db_engine = create_engine(url=DATA_BASE_URI, echo=True, future=True)

def current_session():
    return Session(bind=db_engine)
