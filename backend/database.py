import oracledb
import os
import app_settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base 

# SQLAlchemy Base for models
Base = declarative_base()  

# Load app settings
settings = app_settings.get_settings()

oracle_username = settings.ORACLE_DB_USERNAME
oracle_password = settings.ORACLE_DB_PASSWORD

# Thin mode init (optional, but safe to include)
# oracledb.init_oracle_client(lib_dir=None)

wallet_path = os.path.join(os.getcwd(), "wallet")
os.environ["TNS_ADMIN"] = wallet_path

# Oracle connection string - must match the TNS name in `tnsnames.ora`
DATABASE_URL = (
    f"oracle+oracledb://{os.getenv('ORACLE_USER')}:{os.getenv('ORACLE_PASSWORD')}@zjerw393z01twmro_low"
)


engine = create_engine(DATABASE_URL, pool_size=5, max_overflow=10)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
