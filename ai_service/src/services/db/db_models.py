from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import String, Date as SQL_DATE, DECIMAL, Integer
class Base(DeclarativeBase):
    pass

class users(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(primary_key=True, type_=UUID)
    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    created_at: Mapped[str] = mapped_column(SQL_DATE)

class portfolios(Base):
    __tablename__ = "portfolios"
    id: Mapped[str] = mapped_column(primary_key=True, type_=UUID)
    name: Mapped[str] = mapped_column(String)
    created_at: Mapped[str] = mapped_column(SQL_DATE)
    updated_at: Mapped[str] = mapped_column(SQL_DATE)
    user_id: Mapped[str] = mapped_column(UUID)

class assets(Base):
    __tablename__ = "assets"
    id: Mapped[str] = mapped_column(primary_key=True, type_=UUID)
    name: Mapped[str] = mapped_column(String)
    symbol: Mapped[str] = mapped_column(String)
    type: Mapped[str] = mapped_column(String)
    price: Mapped[float] = mapped_column(DECIMAL)
    quantity: Mapped[int] = mapped_column(Integer)
    portfolio_id: Mapped[str] = mapped_column(UUID)
