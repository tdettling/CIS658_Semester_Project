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
https://stackoverflow.com/questions/39491420/python-jsonexpecting-property-name-enclosed-in-double-quotes



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

'''
*******************************************************************************************************
CONFIG AND TEST
*******************************************************************************************************
'''

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







'''
*******************************************************************************************************
CREATE
*******************************************************************************************************
'''

@app.post("/inventory/add")
def add_inventory_item(newInventoryItem: dict = Body(...), db: Session = Depends(database.get_db)):
    return crud.create_inventory_item(db, newInventoryItem)



'''
*******************************************************************************************************
READ
*******************************************************************************************************
'''


@app.get("/get_inventory")
def get_test_table(db: Session = Depends(database.get_db)):
    return crud.get_test_table(db)




@app.get("/inventory/{stock_id}")
def get_inventory_item(stock_id: int, db: Session = Depends(database.get_db)):
    item = crud.get_inventory_item_by_stock_id(db, stock_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item



@app.get("/ISDs/{isd_number}")
def get_single_ISD(isd_number: int, db: Session = Depends(database.get_db)):
    item = crud.get_single_ISD(db, isd_number)
    if item is None:
        raise HTTPException(status_code=404, detail="ISD not found")
    return item





@app.get("/ISDs/all")
def get_all_ISDs(db: Session = Depends(database.get_db)):
    return crud.get_all_ISDs(db)





@app.get("/ISDs/status/{status}")
def get_ISDs_by_status(status: str, db: Session = Depends(database.get_db)):
    return crud.get_ISDs_by_status(db, status)





@app.get("/ISDs/fufillment/{isd_number}")
def get_fufillment_by_ISD(isd_number: int, db: Session = Depends(database.get_db)):
    return crud.get_fufillment_by_ISD(db, isd_number)




'''
*******************************************************************************************************
UPDATE
*******************************************************************************************************
'''

@app.put("/inventory/update/{stock_id}")
def update_inventory(stock_id: int, updated_item: dict, db: Session = Depends(database.get_db)):
    updated_item_data = crud.update_inventory_item(db, stock_id, updated_item)
    if updated_item_data["message"] == "Item updated successfully":
        return updated_item_data
    raise HTTPException(status_code=404, detail="Item not found")



'''
            return {
                isd_number: isd_number,
                fulfilled_sku: formData.get("fulfilled_sku"),
                fulfilled_po: formData.get("fulfilled_po"),
                fulfilled_quantity: formData.get("fulfilled_quantity"),
                fulfilled_price: formData.get("fulfilled_price"),
                fulfilled_memo: formData.get("fulfilled_memo"),
                fulfilled_date: formData.get("fulfilled_date"),
                stock_id: inventoryItem ? inventoryItem.stock_id : null, // Add stock_id from inventory
            };
'''
@app.put("/ISDs/fulfillment/submit/{isd_number}")
def update_fulfillment_table_from_ISD(
    isd_number: int, 
    item_rows: dict,  # This will expect the body to be a list of JSON objects
    db: Session = Depends(database.get_db)
):
    # Log the received data to verify it's a list of dictionaries
    print("Received item_rows:", item_rows)

    # Proceed with your logic, assuming item_rows is a list of dicts
    delete_result = crud.delete_fulfillment_line_items(db, isd_number)

    if delete_result["detail"] == "Items deleted":
        updated_fulfillment_result = crud.update_fulfillment_table_from_ISD(db, isd_number, item_rows)

        # After updating inventory, add the rows to the fulfillment table
        crud.insert_fulfillment(db, item_rows)

        if updated_fulfillment_result["message"] == "Item updated successfully":
            return updated_fulfillment_result
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        raise HTTPException(status_code=404, detail="Items could not be deleted for replacement")
    




@app.put("/ISDs/fulfillment/submit/test/{isd_number}")
def update_fulfillment_table_from_ISD(isd_number: str, fulfillment_data: dict = Body(...), db: Session = Depends(database.get_db)):
    try:
        item_rows = fulfillment_data.get("item_rows", [])
        for item in item_rows:
            # Example processing logic
            isd_number = item["isd_number"]
            sku = item["fulfilled_sku"]
            po = item["fulfilled_po"]
            quantity = item["fulfilled_quantity"]
            unit_price = item["fulfilled_price"]
            date = item["fulfilled_date"] 
            memo = item.get("fulfilled_memo")
            stock_id = item["stock_id"]

            # Call the function to update the database
            result = crud.update_fulfillment_table_from_ISD_tester(db, isd_number, sku, po, quantity, unit_price, date, memo, stock_id)
        
        return {"message": "Fulfillment data processed successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))







'''
*******************************************************************************************************
DELETE
*******************************************************************************************************
'''


@app.delete("/inventory/delete/{stock_id}")
def delete_inventory(stock_id: int, db: Session = Depends(database.get_db)):
    result = crud.delete_stock_item(db, stock_id)
    if result["detail"] == "Item not found":
        raise HTTPException(status_code=404, detail="Item not found")
    return result









