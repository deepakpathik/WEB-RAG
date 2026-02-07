from fastapi import FastAPI
from schemas.request_models import QuestionRequest
from services.research_service import run_research
from utils.error_handler import safe_execute

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Server is running"}


@app.post("/ask")
async def ask_question(request: QuestionRequest):
    answer = safe_execute(run_research, request.question)
    return {"answer": answer}