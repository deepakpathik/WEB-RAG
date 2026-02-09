# Research Assistant with Web Search + LLM Synthesis

An AI-powered research assistant that answers questions by searching the web, gathering information, and synthesizing coherent answers with proper citations.

## Features

- **Query Decomposition**: Breaks complex questions into focused search queries
- **Web Search Integration**: Uses DuckDuckGo for real-time web search
- **Source Tracking**: Deduplicates and tracks all sources with unique IDs
- **LLM Synthesis**: Uses Google Gemini to synthesize coherent answers
- **Citation System**: Inline citations `[1]`, `[2]` with full source list
- **Confidence Scoring**: Reports confidence level (0.0-1.0) in the answer
- **Insufficient Info Handling**: Gracefully handles cases with limited information

## Architecture

```
User Question
      ↓
┌─────────────────────────┐
│  Query Decomposer       │ → Breaks question into 1-5 search queries
└─────────────────────────┘
      ↓
┌─────────────────────────┐
│  Search Tool            │ → Executes parallel web searches
└─────────────────────────┘
      ↓
┌─────────────────────────┐
│  Source Manager         │ → Deduplicates and tracks sources
└─────────────────────────┘
      ↓
┌─────────────────────────┐
│  Synthesis Engine       │ → LLM generates answer with citations
└─────────────────────────┘
      ↓
Structured Response with Sources
```

## Installation

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn langchain langchain-google-genai langchain-community duckduckgo-search python-dotenv pydantic
   ```
4. Create `.env` file with your API keys:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

## Running the Server

```bash
fastapi dev main.py
```

The server will start at `http://localhost:8000`

## API Endpoints

### POST /ask
Submit a research question and receive a structured response.

**Request:**
```json
{
  "question": "What are the benefits of renewable energy?"
}
```

**Response:**
```json
{
  "answer": "Renewable energy offers numerous benefits [1]. These include reduced carbon emissions [2], lower long-term costs...\n\n---\n**Sources:**\n[1] [Title](URL) - domain.com\n[2] [Title](URL) - domain.com",
  "sources": [
    {
      "id": "[1]",
      "url": "https://example.com/article",
      "title": "Benefits of Renewable Energy",
      "snippet": "Renewable energy sources...",
      "domain": "example.com"
    }
  ],
  "is_sufficient": true,
  "confidence": 0.85,
  "queries_used": ["benefits of renewable energy", "renewable energy advantages"],
  "original_question": "What are the benefits of renewable energy?"
}
```

### POST /ask/simple
Simplified endpoint returning just the answer string.

**Response:**
```json
{
  "answer": "The synthesized answer with citations..."
}
```

### GET /health
Health check endpoint.

## Project Structure

```
rag/
├── main.py                 # FastAPI application
├── core/
│   ├── config.py           # Environment configuration
│   └── llm.py              # LLM initialization
├── agents/
│   └── research_agent.py   # LangChain agent setup
├── services/
│   ├── query_decomposer.py # Query decomposition logic
│   ├── source_manager.py   # Source tracking and citations
│   ├── synthesis.py        # Answer synthesis engine
│   └── research_service.py # Pipeline orchestration
├── schemas/
│   ├── request_models.py   # Request schemas
│   └── response_models.py  # Response schemas
├── tools/
│   └── search_tool.py      # Web search integration
└── utils/
    └── error_handler.py    # Error handling utilities
```

## Technologies

- **Framework**: FastAPI
- **LLM**: Google Gemini 2.5 Flash
- **Search**: DuckDuckGo (free, no API key required)
- **Agent Framework**: LangChain
- **Validation**: Pydantic

## License

MIT
