'''
L Dettling
CIS 658

Sources: 
https://docs.sqlalchemy.org/en/20/core/engines.html
https://www.geeksforgeeks.org/connecting-to-sql-database-using-sqlalchemy-in-python/
https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/connecting-python-mtls.html
https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/connecting-python-mtls.html#GUID-70853600-E169-4C46-909C-39E9DE443850
https://www.oracle.com/a/ocom/docs/database/adb-ssis-sdt.pdf

https://www.geeksforgeeks.org/connecting-to-sql-database-using-sqlalchemy-in-python/
https://docs.sqlalchemy.org/en/20/orm/session_basics.html
https://stackoverflow.com/questions/59470558/how-to-create-local-database-connection-using-mysql-connector-python-sqlalchem


https://www.youtube.com/watch?v=MWrD-99xqzs
https://www.youtube.com/watch?v=BCLsb-AdrhQ
https://www.youtube.com/watch?v=YnsN52hB8EY

'''


import oracledb
import app_settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base 

# SQLAlchemy Base for models
Base = declarative_base()  

# Load app settings
settings = app_settings.get_settings()

CONFIG_DIR = r"C:\Users\tdett\OracleDB"  
WALLET_DIR = r"C:\Users\tdett\OracleDB"  

oracle_username = settings.ORACLE_DB_USERNAME
oracle_password = settings.ORACLE_DB_PASSWORD
oracle_wallet_password = settings.ORACLE_WALLET_PASSWORD

oracledb.init_oracle_client(config_dir=CONFIG_DIR)

DATABASE_URL = f"oracle+oracledb://{oracle_username}:{oracle_password}@zjerw393z01twmro_low"

# https://www.geeksforgeeks.org/connecting-to-sql-database-using-sqlalchemy-in-python/
engine = create_engine(DATABASE_URL, pool_size=5, max_overflow=10)

#https://docs.sqlalchemy.org/en/20/orm/session_basics.html
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()