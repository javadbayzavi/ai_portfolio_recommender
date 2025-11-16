from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import String, Date as SQL_DATE, DECIMAL, Integer

class Base(DeclarativeBase):
    def get_dict(self):
        return {
            column.name : getattr(self, column.name)
            for column in self.__table__.columns
        }

class User(Base):
    __tablename__ = "User"
    id: Mapped[str] = mapped_column(primary_key=True, type_=UUID)
    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    created_at: Mapped[str] = mapped_column(SQL_DATE)

class Portfolio(Base):
    __tablename__ = "Portfolio"
    id: Mapped[str] = mapped_column(primary_key=True, type_=UUID)
    name: Mapped[str] = mapped_column(String)
    created_at: Mapped[str] = mapped_column(SQL_DATE)
    updated_at: Mapped[str] = mapped_column(SQL_DATE)
    user_id: Mapped[str] = mapped_column(UUID)

class Asset(Base):
    __tablename__ = "Asset"
    id: Mapped[str] = mapped_column(primary_key=True, type_=UUID)
    name: Mapped[str] = mapped_column(String)
    symbol: Mapped[str] = mapped_column(String)
    type: Mapped[str] = mapped_column(String)
    price: Mapped[float] = mapped_column(DECIMAL)
    quantity: Mapped[int] = mapped_column(Integer)
    portfolio_id: Mapped[str] = mapped_column(UUID)