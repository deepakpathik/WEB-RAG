import { useState } from 'react'
import './App.css'
import SearchInput from './components/SearchInput/SearchInput'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import AnswerDisplay from './components/AnswerDisplay/AnswerDisplay'
import { askQuestion } from './services/api'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = async (question) => {
    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      const result = await askQuestion(question)
      setResponse(result)
    } catch (err) {
      setError(err.message || 'An error occurred while researching')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🔬</span>
            <h1>Research Assistant</h1>
          </div>
          <p className="tagline">AI-powered research with web search and citations</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="search-section">
            <SearchInput onSubmit={handleSearch} isLoading={isLoading} />
          </div>

          <div className="results-section">
            {isLoading && <LoadingSpinner />}

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}

            {response && !isLoading && (
              <AnswerDisplay response={response} />
            )}

            {!isLoading && !response && !error && (
              <div className="empty-state">
                <span className="empty-icon">🔍</span>
                <h3>Ready to Research</h3>
                <p>Enter a question above to get AI-powered answers with citations</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Powered by Google Gemini & DuckDuckGo Search</p>
      </footer>
    </div>
  )
}

export default App
