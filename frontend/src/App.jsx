import { useState } from 'react'
import './App.css'
import SearchInput from './components/SearchInput/SearchInput'

function App() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (question) => {
    console.log('Searching for:', question)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
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
            {isLoading ? (
              <p className="placeholder-text">Searching...</p>
            ) : (
              <p className="placeholder-text">Enter a question to start researching</p>
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
