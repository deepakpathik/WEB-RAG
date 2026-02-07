from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/ask")
async def ask():    
    return {"message": "This is the ask endpoint"}