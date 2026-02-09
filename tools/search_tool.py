from typing import List, Dict
from langchain.tools import tool
from langchain_community.utilities import DuckDuckGoSearchAPIWrapper


ddg_search = DuckDuckGoSearchAPIWrapper(max_results=5)


def search_with_metadata(query: str, max_results: int = 5) -> List[Dict]:
    if not query or not query.strip():
        return []
    
    try:
        raw_results = ddg_search.results(query, max_results=max_results)
        
        structured_results = []
        for result in raw_results:
            url = result.get('link', '')
            domain = ''
            if url:
                try:
                    from urllib.parse import urlparse
                    parsed = urlparse(url)
                    domain = parsed.netloc
                    if domain.startswith('www.'):
                        domain = domain[4:]
                except Exception:
                    domain = 'unknown'
            
            structured_results.append({
                'title': result.get('title', 'Untitled'),
                'snippet': result.get('snippet', ''),
                'url': url,
                'domain': domain
            })
        
        return structured_results
        
    except Exception as e:
        print(f"Search error: {e}")
        return []


def search_multiple_queries(queries: List[str], results_per_query: int = 3) -> List[Dict]:
    all_results = []
    for query in queries:
        results = search_with_metadata(query, max_results=results_per_query)
        all_results.extend(results)
    return all_results


@tool("web_search", return_direct=False)
def web_search_tool(query: str) -> str:
    """Search the web for current information on any topic."""
    results = search_with_metadata(query, max_results=5)
    
    if not results:
        return "No search results found."
    
    formatted = []
    for i, r in enumerate(results, 1):
        formatted.append(f"{i}. {r['title']}")
        formatted.append(f"   URL: {r['url']}")
        formatted.append(f"   {r['snippet']}\n")
    
    return "\n".join(formatted)


@tool("google_search", return_direct=False)
def google_search(query: str) -> str:
    """Search the web using DuckDuckGo."""
    return web_search_tool.invoke(query)
