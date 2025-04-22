'''
L Dettling
CIS 658

Sources for this file:
https://docs.public.oneportal.content.oci.oraclecloud.com/en-us/iaas/autonomous-database/doc/python-application.html#GUID-96321769-5D8F-41ED-BA9D-6C3092CA51D9

creating a connection and executing:
https://oracle.github.io/python-cx_Oracle/samples/tutorial/Python-and-Oracle-Database-Scripting-for-the-Future.html

good tutoirals for making conneciton and getitng FastAPI working:
https://www.youtube.com/watch?v=0N6oWoosxxE
https://www.youtube.com/watch?v=MtrbexY7NkQ

JWT Auth
https://www.youtube.com/watch?v=YpvcqxYiyNE

POST Requests StackOverflow:
https://stackoverflow.com/questions/73759718/how-to-post-json-data-from-javascript-frontend-to-fastapi-backend
https://stackoverflow.com/questions/39491420/python-jsonexpecting-property-name-enclosed-in-double-quotes


https://stackoverflow.com/questions/77696337/a-formdata-field-called-local-kw-is-added-automatically-as-a-mandatory-argument
https://www.youtube.com/watch?v=YpvcqxYiyNE
https://www.youtube.com/watch?v=0A_GCXBCNUQ
https://www.youtube.com/watch?v=HpWANiK0fBo


'''

from fastapi import FastAPI, Depends, HTTPException, Body, status
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from models import User
from database import SessionLocal, engine
from pydantic import BaseModel




from sqlalchemy.orm import Session
from sqlalchemy.sql import text

import database
import inventoryData as Inventory
import crud


from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from models import User
from models import UserProfile
from database import SessionLocal, engine
from pydantic import BaseModel
from sqlalchemy.orm import Session


app = FastAPI()

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


'''
*******************************************************************************************************
AUTHENTICATION
*******************************************************************************************************
'''

'''
Followed tutorial for JWT Auth - https://www.youtube.com/watch?v=YpvcqxYiyNE
'''
# Security and Token Config
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated=["auto"])
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 300


    

# Dependency for the database session
def get_session_local():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class UserCreate(BaseModel):
    username: str
    password: str



def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_session_local)):
    username = decode_token(token)  
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user



def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()



def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    

    sql = text('SELECT "ADMIN".USER_ID_SEQ.nextval FROM dual')
    result = db.execute(sql)
    user_id = result.scalar()  
    
    # create the user with the generated ID
    db_user = User(id=user_id, username=user.username, hashed_password=hashed_password)
    
    db.add(db_user)
    db.commit()
    return "Complete"



def authenticate_user(username: str, password: str, db: Session):
    user = get_user_by_username(db, username)
    if not user or not pwd_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return payload
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")

# Routes
@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_session_local)):
    db_user = get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db, user)


@app.post("/token")
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_session_local)
):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/verify-token")
def verify_user_token(token: str = Depends(oauth2_scheme)):
    verify_token(token)
    return {"message": "Token is valid"}



def decode_token(token: str):
    try:
        # Decode the JWT token to get user ID or username
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"] 
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")



def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_session_local)):
    username = decode_token(token)
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user



@app.get("/user/profile", response_model=UserProfile)
async def get_user_profile(current_user: User = Depends(get_current_user)):
    return UserProfile(
        id=current_user.id,
        username=current_user.username
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
def add_inventory_item(
    newInventoryItem: dict = Body(...),
    db: Session = Depends(get_session_local),
    _: dict = Depends(verify_token)
):
    return crud.create_inventory_item(db, newInventoryItem)




@app.post("/ISDs/new")
def create_ISD(newISDItem: dict = Body(...), db: Session = Depends(database.get_db) ,
    _: dict = Depends(verify_token)):
    return crud.create_ISD(db, newISDItem)



'''
*******************************************************************************************************
READ
*******************************************************************************************************
'''


@app.get("/get_inventory")
def get_test_table(db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    return crud.get_test_table(db)




@app.get("/inventory/{stock_id}")
def get_inventory_item(stock_id: int, db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    item = crud.get_inventory_item_by_stock_id(db, stock_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item



@app.get("/ISDs/{isd_number}")
def get_single_ISD(isd_number: int, db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    item = crud.get_single_ISD(db, isd_number)
    if item is None:
        raise HTTPException(status_code=404, detail="ISD not found")
    return item





@app.get("/ISDs")
def get_all_ISDs(db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    return crud.get_all_ISDs(db)





@app.get("/ISDs/status/{status}")
def get_ISDs_by_status(status: str, db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    return crud.get_ISDs_by_status(db, status)





@app.get("/ISDs/fufillment/{isd_number}")
def get_fufillment_by_ISD(isd_number: int, db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    return crud.get_fufillment_by_ISD(db, isd_number)




@app.get("/ISDs/fufillment")
def get_fufillments(db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    return crud.get_fufillments(db)





'''
*******************************************************************************************************
UPDATE
*******************************************************************************************************
'''

@app.put("/inventory/update/{stock_id}")
def update_inventory(stock_id: int, updated_item: dict, db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
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
    item_rows: dict, 
    db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)
):
    # verify it's a list of dictionaries
    print("Received item_rows:", item_rows)

    delete_result = crud.delete_fulfillment_line_items(db, isd_number)

    if delete_result["detail"] == "Items deleted":
        updated_fulfillment_result = crud.update_fulfillment_table_from_ISD(db, isd_number, item_rows)

        #add the rows to the fulfillment table
        crud.insert_fulfillment(db, item_rows)

        if updated_fulfillment_result["message"] == "Item updated successfully":
            return updated_fulfillment_result
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        raise HTTPException(status_code=404, detail="Items could not be deleted for replacement")
    




@app.put("/ISDs/fulfillment/submit/test/{isd_number}")
def update_fulfillment_table_from_ISD(isd_number: str, fulfillment_data: dict = Body(...), db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    crud.delete_ISD_Fulfillment_data(db, isd_number)
    try:
        item_rows = fulfillment_data.get("item_rows", [])
        for item in item_rows:

            isd_number = item["isd_number"]
            sku = item["fulfilled_sku"]
            print("now updating: " + sku)
            po = item["fulfilled_po"]
            quantity = item["fulfilled_quantity"]
            unit_price = item["fulfilled_price"]
            date = item["fulfilled_date"] 
            memo = item.get("fulfilled_memo")
            stock_id = item["stock_id"]


            result = crud.update_fulfillment_table_from_ISD_tester(db, isd_number, sku, po, quantity, unit_price, date, memo, stock_id)
        
        return {"message": "Fulfillment data processed successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.put("/ISDs/{newStatus}/{isd_number}")
def update_ISD_Status(newStatus: str, isd_number: str, db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    crud.update_ISD_Status(db, isd_number, newStatus)




'''
*******************************************************************************************************
DELETE
*******************************************************************************************************
'''


@app.delete("/inventory/delete/{stock_id}")
def delete_inventory(stock_id: int, db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    result = crud.delete_stock_item(db, stock_id)
    if result["detail"] == "Item not found":
        raise HTTPException(status_code=404, detail="Item not found")
    return result





@app.delete("/ISDs/delete/{isd_number}")
def delete_ISD(isd_number: int, db: Session = Depends(database.get_db),
    _: dict = Depends(verify_token)):
    result = crud.delete_ISD(db, isd_number)
    if result["detail"] == "Item not found":
        raise HTTPException(status_code=404, detail="Item not found")
    return result








if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
