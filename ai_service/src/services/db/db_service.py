from services.db.db_orm import current_session
from services.db.db_models import portfolios, users, assets
from sqlalchemy.sql import select

def get_portfolios_for_asset(asset_name:str):
    with current_session() as conn:
        stmt = (
                select(portfolios)
                .select_from(portfolios)
                .join(assets, portfolios.id == assets.portfolio_id)
                .where(assets.symbol == asset_name.upper())
        )
        return conn.scalars(stmt).all()


