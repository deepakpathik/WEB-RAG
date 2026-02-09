import './SourceCard.css'

function SourceCard({ source }) {
    return (
        <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-card"
        >
            <div className="source-header">
                <span className="source-id">{source.id}</span>
                <span className="source-domain">{source.domain}</span>
            </div>
            <h3 className="source-title">{source.title}</h3>
            <p className="source-snippet">{source.snippet}</p>
            <div className="source-link">
                <span>Read more</span>
                <span className="arrow">→</span>
            </div>
        </a>
    )
}

export default SourceCard
