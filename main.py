from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas.response_models import ResearchResponse, QuestionRequest
from services.research_service import run_research


app = FastAPI(
    title="Research Assistant API",
    description="AI-powered research assistant with web search and citation support",
    version="1.0.0"
)

# Add CORS middleware for browser access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "message": "Research Assistant API is running",
        "version": "1.0.0",
        "endpoints": {
            "POST /ask": "Submit a research question",
            "GET /health": "Health check"
        }
    }


@app.get("/health")
async def health():
    """Detailed health check."""
    return {"status": "healthy", "service": "research-assistant"}


@app.post("/ask", response_model=ResearchResponse)
async def ask_question(request: QuestionRequest) -> ResearchResponse:
    """
    Submit a research question and receive a synthesized answer with citations.
    
    The assistant will:
    1. Break down your question into search queries
    2. Search the web for relevant information
    3. Synthesize findings into a coherent answer
    4. Cite all sources used
    
    Args:
        request: QuestionRequest with the question field
        
    Returns:
        ResearchResponse with answer, sources, and metadata
    """
    try:
        if not request.question or not request.question.strip():
            raise HTTPException(
                status_code=400,
                detail="Question cannot be empty"
            )
        
        response = run_research(request.question)
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Research failed: {str(e)}"
        )


@app.post("/ask/simple")
async def ask_question_simple(request: QuestionRequest) -> dict:
    """
    Simplified endpoint that returns just the answer string.
    For backward compatibility and simple integrations.
    """
    try:
        response = run_research(request.question)
        return {"answer": response.answer}
    except Exception as e:
        return {"answer": f"Error: {str(e)}"}