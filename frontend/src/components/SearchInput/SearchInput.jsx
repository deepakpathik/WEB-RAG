import { useState } from 'react'
import './SearchInput.css'

function SearchInput({ onSubmit, isLoading }) {
    const [question, setQuestion] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (question.trim() && !isLoading) {
            onSubmit(question.trim())
        }
    }

    return (
        <form className="search-input" onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask any research question..."
                    disabled={isLoading}
                    className="search-field"
                />
            </div>
            <button
                type="submit"
                disabled={!question.trim() || isLoading}
                className="search-button"
            >
                {isLoading ? 'Researching...' : 'Research'}
            </button>
        </form>
    )
}

export default SearchInput
