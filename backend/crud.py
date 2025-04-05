# crud.py
from sqlalchemy.orm import Session
from sqlalchemy.sql import text

def get_test_table(db: Session):
    result = db.execute(text("SELECT * FROM ADMIN.INVENTORY_DATA")).fetchall()
    return {"data": [dict(row._mapping) for row in result]}

def create_inventory_item(db: Session, new_item: dict):
    # Step 1: Get the current highest stock_id
    result = db.execute(text("SELECT MAX(stock_id) FROM ADMIN.INVENTORY_DATA")).fetchone()
    highest_stock_id = result[0] or 0
    new_stock_id = highest_stock_id + 1

    # Step 2: Insert the new item
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



def get_inventory_item_by_stock_id(db: Session, stock_id: int):
    query = text("""
        SELECT * FROM ADMIN.INVENTORY_DATA WHERE stock_id = :stock_id
    """)
    result = db.execute(query, {"stock_id": stock_id}).fetchone()

    if result:
        return dict(result._mapping)
    return None

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