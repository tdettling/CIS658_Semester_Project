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


POST Requests StackOverflow:
https://stackoverflow.com/questions/73759718/how-to-post-json-data-from-javascript-frontend-to-fastapi-backend

'''

from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


from sqlalchemy.orm import Session
from sqlalchemy.sql import text

import database
import inventoryData as Inventory
import crud


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Serve React app
app.mount("/static", StaticFiles(directory="build/static"), name="static")

@app.get("/", response_class=HTMLResponse)
def read_root():
    return {"message": "API is running!"}
    
@app.get("/inventory")
def get_inventory():
    return Inventory.get_inventory()


@app.get('/testOracle')
def test_db_connection(db: Session = Depends(database.get_db)):
    try:
        result = db.execute(text("SELECT sysdate FROM dual")) 
        return {"message": "Database connection successful!", "sysdate": result.fetchone()[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@app.get("/test_table")
def get_test_table(db: Session = Depends(database.get_db)):
    result = db.execute(text("SELECT * FROM ADMIN.TEST_TABLE")).fetchall()
    return {"data": [dict(row._mapping) for row in result]}

@app.get("/get_inventory")
def get_test_table(db: Session = Depends(database.get_db)):
    return crud.get_test_table(db)


@app.get("/inventory/{stock_id}")
def get_inventory_item(stock_id: int, db: Session = Depends(database.get_db)):
    item = crud.get_inventory_item_by_stock_id(db, stock_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.put("/inventory/update/{stock_id}")
def update_inventory(stock_id: int, updated_item: dict, db: Session = Depends(database.get_db)):
    updated_item_data = crud.update_inventory_item(db, stock_id, updated_item)
    if updated_item_data["message"] == "Item updated successfully":
        return updated_item_data
    raise HTTPException(status_code=404, detail="Item not found")



@app.post("/inventory/add")
def add_inventory_item(newInventoryItem: dict = Body(...), db: Session = Depends(database.get_db)):
    return crud.create_inventory_item(db, newInventoryItem)


@app.post("/inventory/add-fake")
def add_fake_inventory_item(db: Session = Depends(database.get_db)):
    fake_item = {
        "product_name": "Test Widget",
        "sku": "TEST-001",
        "po": "PO-TEST",
        "price": 9.99,
        "quantity_ordered": 50,
        "quantity_arrived": 25,
        "quantity_available": 25,
        "vendor": "TestVendor Inc.",
        "status": "On-Order",
        "serial_numbers": "SN123456789",
        "category": "Testing"
    }
    return crud.create_inventory_item(db, fake_item)



@app.get("/db_check")
def db_check(db: Session = Depends(database.get_db)):
    result = db.execute(text("SELECT sysdate FROM dual")).fetchone()
    return {"sysdate": str(result[0])}