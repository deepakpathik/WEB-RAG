from typing import List
from pydantic import BaseModel
from core.llm import llm


class DecomposedQueries(BaseModel):
    """Result of query decomposition."""
    original_question: str
    queries: List[str]
    is_complex: bool


DECOMPOSITION_PROMPT = """You are an expert research assistant that breaks down complex questions into focused search queries.

Given a user question, analyze it and generate 1-5 search queries that would help gather comprehensive information to answer the question.

Rules:
1. For simple factual questions, return just 1 query (possibly the original question)
2. For complex multi-part questions, break into 2-5 focused queries
3. Each query should be self-contained and searchable
4. Avoid redundant queries
5. Order queries by importance

Return your response in this exact format:
COMPLEXITY: [simple|complex]
QUERIES:
- [First search query]
- [Second search query]
...

Question: {question}
"""


def decompose_question(question: str) -> DecomposedQueries:
    """
    Analyze a question and break it into focused search queries.
    
    Args:
        question: The user's research question
        
    Returns:
        DecomposedQueries with the original question and list of search queries
    """
    if not question or not question.strip():
        return DecomposedQueries(
            original_question=question,
            queries=[],
            is_complex=False
        )
    
    prompt = DECOMPOSITION_PROMPT.format(question=question.strip())
    
    try:
        response = llm.invoke(prompt)
        content = response.content if hasattr(response, 'content') else str(response)
        
        # Parse the response
        queries = []
        is_complex = False
        
        lines = content.strip().split('\n')
        for line in lines:
            line = line.strip()
            if line.startswith('COMPLEXITY:'):
                is_complex = 'complex' in line.lower()
            elif line.startswith('- '):
                query = line[2:].strip()
                if query:
                    queries.append(query)
        
        # Fallback: if parsing failed, use the original question
        if not queries:
            queries = [question.strip()]
            
        # Limit to 5 queries max
        queries = queries[:5]
        
        return DecomposedQueries(
            original_question=question,
            queries=queries,
            is_complex=is_complex
        )
        
    except Exception as e:
        # On error, fall back to original question
        print(f"Query decomposition failed: {e}")
        return DecomposedQueries(
            original_question=question,
            queries=[question.strip()],
            is_complex=False
        )
