from langchain.tools import tool
from langchain_google_community import GoogleSearchAPIWrapper

search = GoogleSearchAPIWrapper()

@tool
def google_search(query: str) -> str:
    return search.run(query)
