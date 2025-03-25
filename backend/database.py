'''
L Dettling
CIS 658
Half-Semester Project

Sources for this file:
https://docs.public.oneportal.content.oci.oraclecloud.com/en-us/iaas/autonomous-database/doc/python-application.html#GUID-96321769-5D8F-41ED-BA9D-6C3092CA51D9

creating a connection and executing:
https://oracle.github.io/python-cx_Oracle/samples/tutorial/Python-and-Oracle-Database-Scripting-for-the-Future.html

good tutoirals for making conneciton and getitng FastAPI working:
https://www.youtube.com/watch?v=0N6oWoosxxE
https://www.youtube.com/watch?v=MtrbexY7NkQ

'''
import oracledb
import app_settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Load app settings
settings = app_settings.get_settings()

# Define paths
CONFIG_DIR = r"C:\Users\tdett\OracleDB"  
WALLET_DIR = r"C:\Users\tdett\OracleDB"  

# Oracle credentials
oracle_username = settings.ORACLE_DB_USERNAME
oracle_password = settings.ORACLE_DB_PASSWORD
oracle_wallet_password = settings.ORACLE_WALLET_PASSWORD

# Initialize Oracle client
oracledb.init_oracle_client(config_dir=CONFIG_DIR)

# SQLAlchemy connection string
DATABASE_URL = f"oracle+oracledb://{oracle_username}:{oracle_password}@zjerw393z01twmro_low"

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, pool_size=5, max_overflow=10)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency function for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
