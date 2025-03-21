from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

import inventoryData as Inventory


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend's origin
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Adjust as needed
    allow_headers=["*"],  # Allow all headers
)

# Serve React app
app.mount("/static", StaticFiles(directory="build/static"), name="static")

@app.get("/", response_class=HTMLResponse)
def read_root():
    with open(os.path.join("build", "index.html")) as f:
        return HTMLResponse(content=f.read())
    
@app.get("/inventory")
def get_inventory():
    return Inventory.get_inventory()
