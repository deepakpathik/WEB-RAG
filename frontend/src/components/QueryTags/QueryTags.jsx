import './QueryTags.css'

function QueryTags({ queries }) {
    if (!queries || queries.length === 0) return null

    return (
        <div className="query-tags">
            <span className="query-label">Search queries used:</span>
            <div className="tags-list">
                {queries.map((query, index) => (
                    <span key={index} className="tag">
                        🔍 {query}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default QueryTags
