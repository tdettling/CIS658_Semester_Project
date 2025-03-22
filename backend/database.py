from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import cx_Oracle
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Oracle Database Credentials from .env file
ORACLE_USERNAME = os.getenv("ORACLE_USERNAME")
ORACLE_PASSWORD = os.getenv("ORACLE_PASSWORD")
ORACLE_HOST = os.getenv("ORACLE_HOST")
ORACLE_PORT = os.getenv("ORACLE_PORT", "1521")
ORACLE_SERVICE = os.getenv("ORACLE_SERVICE")  # Use service name

# Create DSN (Data Source Name)
dsn = cx_Oracle.makedsn(ORACLE_HOST, ORACLE_PORT, service_name=ORACLE_SERVICE)

# Create SQLAlchemy Engine
DATABASE_URL = f"oracle+cx_oracle://{ORACLE_USERNAME}:{ORACLE_PASSWORD}@{dsn}"
engine = create_engine(DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def test_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute("SELECT table_name FROM all_tables WHERE owner='ADMIN'")
            tables = result.fetchall()
            print("Tables in ADMIN schema:", tables)
    except Exception as e:
        print("Error connecting to Oracle DB:", e)

# Uncomment to test the connection
test_connection()
