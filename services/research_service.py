from agents.research_agent import research_agent

def run_research(question: str) -> str:
    if not question.strip():
        return "Please provide a valid research question."

    prompt = f"""
    You are an AI research assistant.

    Use the Google Search tool when needed.
    Cite sources.
    If information is insufficient, say so.

    Question: {question}
    """

    try:
        response = research_agent.invoke({"input": prompt})
        return response["output"]
    except Exception as e:
        return f"Research failed due to an internal error: {str(e)}"
