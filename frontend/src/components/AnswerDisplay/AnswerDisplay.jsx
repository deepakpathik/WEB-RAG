import './AnswerDisplay.css'
import SourceCard from '../SourceCard/SourceCard'
import ConfidenceMeter from '../ConfidenceMeter/ConfidenceMeter'
import QueryTags from '../QueryTags/QueryTags'

function AnswerDisplay({ response }) {
    const formatAnswer = (text) => {
        const parts = text.split(/(\[\d+\])/)
        return parts.map((part, index) => {
            if (/^\[\d+\]$/.test(part)) {
                return <span key={index} className="citation">{part}</span>
            }
            return part
        })
    }

    const mainAnswer = response.answer.split('---')[0].trim()

    return (
        <div className="answer-display">
            <ConfidenceMeter
                confidence={response.confidence}
                isSufficient={response.is_sufficient}
            />

            <QueryTags queries={response.queries_used} />

            <div className="answer-section">
                <h2 className="section-title">Answer</h2>
                <div className="answer-content">
                    <p>{formatAnswer(mainAnswer)}</p>
                </div>
            </div>

            {response.sources && response.sources.length > 0 && (
                <div className="sources-section">
                    <h2 className="section-title">
                        Sources
                        <span className="source-count">{response.sources.length}</span>
                    </h2>
                    <div className="sources-grid">
                        {response.sources.map((source, index) => (
                            <SourceCard
                                key={source.id || index}
                                source={source}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnswerDisplay
