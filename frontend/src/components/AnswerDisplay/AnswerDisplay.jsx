import './AnswerDisplay.css'
import SourceCard from '../SourceCard/SourceCard'
import ConfidenceMeter from '../ConfidenceMeter/ConfidenceMeter'
import QueryTags from '../QueryTags/QueryTags'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function AnswerDisplay({ response }) {
    // Process text to turn [1] into markdown links [[1]](#source-1)
    const processText = (text) => {
        return text.replace(/\[(\d+)\]/g, '[[$1]](#source-$1)')
    }

    const mainAnswer = response.answer.split('---')[0].trim()
    const processedAnswer = processText(mainAnswer)

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
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            a: (props) => {
                                if (props.href && props.href.startsWith('#source-')) {
                                    return (
                                        <a {...props} className="citation">
                                            {props.children}
                                        </a>
                                    )
                                }
                                return <a {...props} target="_blank" rel="noopener noreferrer" />
                            }
                        }}
                    >
                        {processedAnswer}
                    </ReactMarkdown>
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
                            <div key={source.id || index} id={`source-${source.id || index + 1}`}>
                                <SourceCard source={source} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnswerDisplay
