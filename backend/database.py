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

# Set TNS_ADMIN environment variable to wallet directory
wallet_path = os.path.join(os.path.dirname(__file__), "wallet")
os.environ["TNS_ADMIN"] = wallet_path

# Build your Oracle DB URL from env vars
ORACLE_USER = os.getenv("ORACLE_USER")
ORACLE_PASSWORD = os.getenv("ORACLE_PASSWORD")
TNS_NAME = "zjerw393z01twmro_low"  # Or whichever one you prefer from your tnsnames.ora

DATABASE_URL = f"oracle+oracledb://{ORACLE_USER}:{ORACLE_PASSWORD}@{TNS_NAME}"


engine = create_engine(DATABASE_URL, pool_size=5, max_overflow=10)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
