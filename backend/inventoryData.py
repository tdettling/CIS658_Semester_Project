# Data is here until I can connect to Oracle database. 
# Fake data for now. 

#statuses - On-Order, Delivered, Closed
# On-Order - We ordered stock for TA inventory but it is not here
# Delivered - Stock is delivered and quanity is more than 0
# Closed - We have run out of stock, the PO is closed out. 
inventory_data = [
    {
        "stock_number": 1,
        "product_name": "Dell Latitude 5550",
        "sku": "5550",
        "PO": "1011222",
        "price": 1210.00,
        "quantity": 10,
        "vendor": "DELL HP",
        "status": "Delivered",
        "serial_numbers": [
            "SN100001", "SN100002", "SN100003", "SN100004", "SN100005",
            "SN100006", "SN100007", "SN100008", "SN100009", "SN100010"
        ]
    },
    {
        "stock_number": 2,
        "product_name": "Dell Latitude 7450",
        "sku": "7450",
        "PO": "1017558",
        "price": 1275.00,
        "quantity": 10,
        "vendor": "DELL HP",
        "status": "On-Order",
        "serial_numbers": []
    },
    {
        "stock_number": 3,
        "product_name": "Dell 24-inch USB-C Hub Monitor",
        "sku": "P2425HE",
        "PO": "1012336",
        "price": 196.00,
        "quantity": 5,
        "vendor": "DELL HP",
        "status": "Delivered",
        "serial_numbers": [
            "SN100001", "SN100002", "SN100003", "SN100004", "SN100005"
        ]
    },
    {
        "stock_number": 4,
        "product_name": "Dell 27-inch USB-C Hub Monitor",
        "sku": "P2725HE",
        "PO": "1012336",
        "price": 210.00,
        "quantity": 5,
        "vendor": "DELL HP",
        "status": "On-Order",
        "serial_numbers": []
    },
    {
        "stock_number": 5,
        "product_name": "Belkin Ethernet Adapter",
        "sku": "BEF345",
        "PO": "1019855",
        "price": 27.95,
        "quantity": 40,
        "vendor": "B&H",
        "status": "Delivered",
        "serial_numbers": []
    }
]



'''
CRUD -- CREATE functions
'''

def create_stock_item(prod_name, prod_sku, prod_po, prod_price, prod_quantity, prod_vendor, prod_status = "On-Order", prod_serial_nums = []):
    
    # need to grab all of the stock id's, find out which is the biggest, 
    # then add 1 to make a new stock id for the new item.
    highest_stock_id = None
    for stock_item in inventory_data:
        if highest_stock_id is None or stock_item["stock_id"] > highest_stock_id:
            highest_stock_id = stock_item["stock_id"]

    prod_stock_id = highest_stock_id + 1

    new_item = {
    "stock_id": prod_stock_id,
    "product_name": prod_name,
    "sku": prod_sku,
    "PO": prod_po,
    "price": prod_price,
    "quantity": prod_quantity,
    "vendor": prod_vendor,
    "status": prod_status,
    "serial_numbers": prod_serial_nums
    }

    inventory_data.append(new_item)



'''
CRUD -- READ functions
'''
# get it all
def get_inventory():
    return inventory_data

#grab by id
def get_item_by_id(item_id):
    list_items = []
    for stock_item in inventory_data:
        if stock_item["stock_id"] == item_id: 
            list_items.append(stock_item)  

    return list_items


# grab item by name

# grab item by SKU

# grab item by PO

# grab item by vendor

'''
CRUD -- UPDATE functions
'''

def update_stock_item(prod_stock_id, prod_name, prod_sku, prod_po, prod_price, prod_quantity, prod_vendor, prod_status, prod_serial_nums):
    # find the stock item. If we see it, update
    for stock_item in inventory_data:
        if stock_item["stock_id"] == prod_stock_id:

            stock_item["product_name"] = prod_name
            stock_item["sku"] = prod_sku
            stock_item["PO"] = prod_po
            stock_item["price"] = prod_price
            stock_item["quantity"] = prod_quantity
            stock_item["vendor"] = prod_vendor
            stock_item["status"] = prod_status
            stock_item["serial_numbers"] = prod_serial_nums

            return stock_item 
    # we didn't find anything, return None
    return None

'''
CRUD -- DELETE functions
'''
def delete_stock_item(prod_stock_id):
    for stock_item in inventory_data:
        if stock_item["stock_id"] == prod_stock_id:
            inventory_data.remove(stock_item) 
            return stock_item 
    return None
