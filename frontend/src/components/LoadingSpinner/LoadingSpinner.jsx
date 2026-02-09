import './LoadingSpinner.css'

function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div className="spinner-container">
                <div className="spinner"></div>
                <div className="spinner-inner"></div>
            </div>
            <div className="loading-text">
                <span>Researching</span>
                <span className="dots">
                    <span>.</span><span>.</span><span>.</span>
                </span>
            </div>
            <p className="loading-subtext">Searching the web and analyzing sources</p>
        </div>
    )
}

export default LoadingSpinner
