from langchain.agents import initialize_agent, AgentType
from core.llm import llm
from tools.search_tool import google_search

tools = [google_search]

research_agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)
