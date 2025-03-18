from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running!"}

@app.get("/test")
def test_endpoint():
    return {"message": "This is a test endpoint!"}
