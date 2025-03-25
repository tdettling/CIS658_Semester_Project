'''
L Dettling
CIS 658

Tutorial for Oracle Connections, and these settings, 
https://www.youtube.com/watch?v=MWrD-99xqzs
'''
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    ORACLE_DB_USERNAME = os.getenv("ORACLE_DB_USERNAME", "default_user")
    ORACLE_DB_PASSWORD = os.getenv("ORACLE_DB_PASSWORD", "default_pass")
    ORACLE_DB_DSN = os.getenv("ORACLE_DB_DSN", "default_dsn")
    ORACLE_WALLET_PASSWORD = os.getenv("ORACLE_WALLET_PASSWORD", "default_wallet_pass")

def get_settings():
    return Settings()  

settings = get_settings()


