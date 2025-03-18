from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import os

import inventoryData as Inventory


app = FastAPI()

# Serve React app
app.mount("/static", StaticFiles(directory="build/static"), name="static")

@app.get("/", response_class=HTMLResponse)
def read_root():
    with open(os.path.join("build", "index.html")) as f:
        return HTMLResponse(content=f.read())
    
@app.get("/inventory")
def get_inventory():
    return Inventory.get_inventory()
