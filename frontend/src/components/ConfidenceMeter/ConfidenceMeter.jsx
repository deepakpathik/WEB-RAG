import './ConfidenceMeter.css'

function ConfidenceMeter({ confidence, isSufficient }) {
    const percentage = Math.round(confidence * 100)

    const getLevel = () => {
        if (percentage >= 80) return 'high'
        if (percentage >= 50) return 'medium'
        return 'low'
    }

    return (
        <div className="confidence-meter">
            <div className="confidence-header">
                <span className="confidence-label">Confidence</span>
                <span className={`confidence-value ${getLevel()}`}>{percentage}%</span>
            </div>
            <div className="confidence-bar">
                <div
                    className={`confidence-fill ${getLevel()}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {!isSufficient && (
                <p className="insufficient-warning">
                    ⚠️ Limited information available for this topic
                </p>
            )}
        </div>
    )
}

export default ConfidenceMeter
