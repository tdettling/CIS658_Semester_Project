# crud.py
from sqlalchemy.orm import Session
from sqlalchemy.sql import text



def get_test_table(db: Session):
    result = db.execute(text("SELECT * FROM ADMIN.INVENTORY_DATA")).fetchall()
    return {"data": [dict(row._mapping) for row in result]}