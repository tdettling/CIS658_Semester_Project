# crud.py
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from typing import List
# parsing
import ast
from fastapi import FastAPI, Depends, HTTPException, Body
from datetime import datetime



'''
*******************************************************************************************************
CREATE
*******************************************************************************************************
'''

def create_inventory_item(db: Session, new_item: dict):
    # get the current highest stock_id
    result = db.execute(text("SELECT MAX(stock_id) FROM ADMIN.INVENTORY_DATA")).fetchone()
    highest_stock_id = result[0] or 0
    new_stock_id = highest_stock_id + 1

    
    insert_query = text("""
        INSERT INTO ADMIN.INVENTORY_DATA (
            stock_id, product_name, sku, po, price,
            quantity_ordered, quantity_arrived, quantity_available,
            vendor, status, serial_numbers, category
        ) VALUES (
            :stock_id, :product_name, :sku, :po, :price,
            :quantity_ordered, :quantity_arrived, :quantity_available,
            :vendor, :status, :serial_numbers, :category
        )
    """)

    db.execute(insert_query, {
        "stock_id": new_stock_id,
        "product_name": new_item["product_name"],
        "sku": new_item["sku"],
        "po": new_item["po"],
        "price": new_item["price"],
        "quantity_ordered": new_item["quantity_ordered"],
        "quantity_arrived": new_item["quantity_arrived"],
        "quantity_available": new_item["quantity_available"],
        "vendor": new_item["vendor"],
        "status": new_item["status"],
        "serial_numbers": new_item["serial_numbers"],
        "category": new_item["category"]
    })

    db.commit()
    return {"message": "Item added successfully", "stock_id": new_stock_id}

def create_fulfillment_lines(db:Session, fulfillment_data: dict):
    query = text("""
        INSERT INTO ADMIN.ISD_FULFILLMENTS (
            isd_number,
            fulfilled_sku,
            fulfilled_po,
            fulfilled_quantity,
            fulfilled_price,
            fulfillment_date,
            memo,
            stock_id
        ) VALUES (
            :isd_number,
            :fulfilled_sku,
            :fulfilled_po,
            :fulfilled_quantity,
            :fulfilled_price,
            :fulfillment_date,
            :memo,
            :stock_id
        )
    """)
    
    db.execute(query, fulfillment_data)
    db.commit()

'''
*******************************************************************************************************
READ
*******************************************************************************************************
'''

def get_test_table(db: Session):
    result = db.execute(text("SELECT * FROM ADMIN.INVENTORY_DATA")).fetchall()
    return {"data": [dict(row._mapping) for row in result]}

def get_all_ISDs(db: Session):
    result = db.execute(text("SELECT * FROM ADMIN.ISD_ORDERS")).fetchall()
    return {"data": [dict(row._mapping) for row in result]}




def get_inventory_item_by_stock_id(db: Session, stock_id: int):
    query = text("""
        SELECT * FROM ADMIN.INVENTORY_DATA WHERE stock_id = :stock_id
    """)
    result = db.execute(query, {"stock_id": stock_id}).fetchone()

    if result:
        return dict(result._mapping)
    return None


def get_single_ISD(db: Session, isd_number: int):
    query = text("""
        SELECT * FROM ADMIN.ISD_ORDERS WHERE isd_number = :isd_number
    """)
    result = db.execute(query, {"isd_number": isd_number}).fetchone()

    if result:
        return dict(result._mapping)
    return None

def get_ISDs_by_status(db: Session, status: str):
    query = text("""
        SELECT * FROM ADMIN.ISD_ORDERS WHERE status = :status
    """)
    result = db.execute(query, {"status": status}).fetchall()

    return {"data": [dict(row._mapping) for row in result]}


def get_fufillment_by_ISD(db: Session, isd_number: int):
    query = text("""
        SELECT * FROM ADMIN.ISD_FULFILLMENTS WHERE isd_number = :isd_number
    """)
    result = db.execute(query, {"isd_number": isd_number}).fetchall()

    return {"data": [dict(row._mapping) for row in result]}

'''
*******************************************************************************************************
UPDATE
*******************************************************************************************************
'''

def update_inventory_item(db: Session, stock_id: int, updated_item: dict):
    update_query = text("""
        UPDATE ADMIN.INVENTORY_DATA
        SET 
            product_name = :product_name,
            sku = :sku,
            po = :po,
            price = :price,
            quantity_ordered = :quantity_ordered,
            quantity_arrived = :quantity_arrived,
            quantity_available = :quantity_available,
            vendor = :vendor,
            status = :status,
            serial_numbers = :serial_numbers,
            category = :category
        WHERE stock_id = :stock_id
    """)

    db.execute(update_query, {
        "stock_id": stock_id,
        "product_name": updated_item["product_name"],
        "sku": updated_item["sku"],
        "po": updated_item["po"],
        "price": updated_item["price"],
        "quantity_ordered": updated_item["quantity_ordered"],
        "quantity_arrived": updated_item["quantity_arrived"],
        "quantity_available": updated_item["quantity_available"],
        "vendor": updated_item["vendor"],
        "status": updated_item["status"],
        "serial_numbers": updated_item["serial_numbers"],
        "category": updated_item["category"]
    })

    db.commit() 

    return {"message": "Item updated successfully", "stock_id": stock_id}





def update_stock_quantity(db: Session, stock_id: int, quantity_difference: int, serial_nums: List):
    # pseudo code for complexity
    # pull the current stock line
    query = text("""
        SELECT * FROM ADMIN.INVENTORY_DATA WHERE stock_id = :stock_id
    """)
    result = db.execute(query, {"stock_id": stock_id}).fetchone()

    # validate item exists and quantity check
    if not result:
        return {"message": "Failure - stock item not found", "stock_id": stock_id}

    # if the desired removed quantity exceeds what we have in stock, then that's bad

    quantity_difference = int(quantity_difference)
    print("quantity difference var: ")
    print(type(quantity_difference))
    print("database quantity available: ")
    print(type(result.quantity_available))

    if (quantity_difference > result.quantity_available):
        return {"message": "Failure - the desired removed quantity exceeds what we have in stock.", "stock_id": stock_id}

    # grab serial numbers from database, and remove the ones we are removing
    # Keep the serial_numbers as None if it's NULL in the database
    '''
    parsed_database_serial_list = result.serial_numbers if result.serial_numbers is not None else None

    if not helper_is_pulling_serial_nums_valid(serial_nums, parsed_database_serial_list):
        return {"message": "Failure - serial numbers are not valid for this stock item.", "stock_id": stock_id}

    # remove the pulled serials from the list
    new_serial_list = [item for item in parsed_database_serial_list if item not in serial_nums]
    new_serial_nums = str(new_serial_list)
    '''

    # pull quantity from stock
    new_available_quantity = result.quantity_available - quantity_difference

    # if we have run out of the stock, we need to change the status
    if new_available_quantity == 0:
        new_status = 'Closed'
    else:
        new_status = result.status

    # update statement, only changing relevant fields
    update_query = text("""
        UPDATE ADMIN.INVENTORY_DATA
        SET 
            quantity_available = :quantity_available,
            status = :status
        WHERE stock_id = :stock_id
    """)

    db.execute(update_query, {
        "stock_id": stock_id,
        "quantity_available": new_available_quantity,
        "status": new_status,
    })

    db.commit()

    return {"message": "Stock item quantity updated successfully", "stock_id": stock_id}



def update_fulfillment_table_from_ISD(db: Session, isd_number: int, fulfillment_data: dict = Body(...)):
    # Loop through each item in fulfillment_data to grab each new line added to an order
    for item in fulfillment_data:
        stock_id = item.get("stock_id")
        quantity = item.get("fulfilled_quantity")
        #serial_numbers = item.get("serial_numbers")
        serial_numbers = []

        # Update stock quantity 
        result = update_stock_quantity(db, stock_id, quantity, serial_numbers)

        # make sure it suceeds
        if result["message"] != "Item updated successfully":
            return {"message": f"Failure - {result['message']}", "isd_number": isd_number}
        
        # now actually add row to database

    
    return {"message": "Fulfillment table updated successfully", "isd_number": isd_number}





def update_fulfillment_table_from_ISD_tester(db: Session, isd_number: int, sku: str, po: str, quantity: int, unit_price: float, date: str, memo: str, stock_id: int):
    # Convert the date string to the correct format
    try:
        formatted_date = datetime.strptime(date, '%Y-%m-%d').date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Expected YYYY-MM-DD.")
    

    stock_pulling_result = update_stock_quantity(db, stock_id, quantity, [])
    print(stock_pulling_result)
    
    query = text("""
        INSERT INTO ADMIN.ISD_FULFILLMENTS (
            isd_number,
            fulfilled_sku,
            fulfilled_po,
            fulfilled_quantity,
            fulfilled_price,
            fulfillment_date,
            memo
        ) VALUES (
            :isd_number,
            :sku,
            :po,
            :quantity,
            :unit_price,
            :date,
            :memo
        )
    """)
    
    db.execute(query, {
        'isd_number': isd_number,
        'sku': sku,
        'po': po,
        'quantity': quantity,
        'unit_price': unit_price,
        'date': formatted_date,
        'memo': memo
    })
    db.commit()





'''
*******************************************************************************************************
DELETE/DESTROY
*******************************************************************************************************
'''


# deleting a stock item
def delete_stock_item(db: Session, stock_id: int):
    # check existence first just inn case
    result = db.execute(
        text("SELECT * FROM ADMIN.INVENTORY_DATA WHERE STOCK_ID = :stock_id"),
        {"stock_id": stock_id}
    ).fetchone()
    
    if result:
        db.execute(
            text("DELETE FROM ADMIN.INVENTORY_DATA WHERE STOCK_ID = :stock_id"),
            {"stock_id": stock_id}
        )
        db.commit()
        return {"detail": "Item deleted"}
    
    return {"detail": "Item not found"}


def delete_fulfillment_line_items(db: Session, isd_number: int):
    # Check existence first
    result = db.execute(
        text("SELECT * FROM ADMIN.ISD_FULFILLMENTS WHERE ISD_NUMBER = :isd_number"),
        {"isd_number": isd_number}
    ).fetchall()

    # If rows exist, delete them; if no rows exist, it's fine, just continue
    if result:
        db.execute(
            text("DELETE FROM ADMIN.ISD_FULFILLMENTS WHERE isd_number = :isd_number"),
            {"isd_number": isd_number}
        )
        db.commit()
        return {"detail": "Items deleted"}
    
    # If no rows found, just return a message indicating no items to delete
    return {"detail": "No items to delete"}



'''
*******************************************************************************************************
HELPER FUNCTIONS
*******************************************************************************************************
'''

def helper_is_pulling_serial_nums_valid(fulfillment_serial_nums, database_serial_nums):
    # if we are tyring to pull more serial numbers than we actually have avaiable
    # or
    # if any of the serial numbers we are tyring tpo pull are not availble in our database
    # or
    # if we never had any serials in the first place
    if len(fulfillment_serial_nums) > len(database_serial_nums) or any(item not in database_serial_nums for item in fulfillment_serial_nums) or len(database_serial_nums) == 0:
        return False
    else:
        return True
    
    

