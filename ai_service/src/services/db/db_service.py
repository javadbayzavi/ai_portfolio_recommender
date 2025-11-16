from services.db.db_orm import current_session
from services.db.db_models import Portfolio, Asset
from sqlalchemy.sql import select

def get_portfolios_for_asset(asset_name:str):
    with current_session() as conn:
        stmt = (
                select(Portfolio)
                .select_from(Portfolio)
                .join(Asset, Portfolio.id == Asset.portfolio_id)
                .where(Asset.symbol == asset_name.upper())
        )
        return conn.scalars(stmt).all()


