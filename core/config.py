import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")      # Gemini API
GOOGLE_CSE_ID = os.getenv("GOOGLE_CSE_ID")        # Google Custom Search Engine ID
