from typing import List, Optional
from pydantic import BaseModel, Field


class SourceResponse(BaseModel):
    """A single source in the response."""
    id: str = Field(..., description="Unique source identifier like [1], [2], etc.")
    url: str = Field(..., description="Source URL")
    title: str = Field(..., description="Source page title")
    snippet: str = Field(..., description="Relevant excerpt from the source")
    domain: str = Field(..., description="Domain name of the source")


class ResearchResponse(BaseModel):
    answer: str = Field(
        ..., 
        description="The synthesized answer with inline citations like [1], [2]"
    )
    sources: List[SourceResponse] = Field(
        default_factory=list,
        description="List of sources used in the answer"
    )
    is_sufficient: bool = Field(
        default=True,
        description="Whether sufficient information was found to answer the question"
    )
    confidence: float = Field(
        default=0.8,
        ge=0.0,
        le=1.0,
        description="Confidence score from 0.0 to 1.0"
    )
    queries_used: List[str] = Field(
        default_factory=list,
        description="Search queries that were executed"
    )
    original_question: str = Field(
        default="",
        description="The original user question"
    )


class QuestionRequest(BaseModel):
    """Request model for the /ask endpoint."""
    question: str = Field(..., description="The research question to answer")
    detailed: bool = Field(
        default=False,
        description="Whether to include detailed metadata in response"
    )
