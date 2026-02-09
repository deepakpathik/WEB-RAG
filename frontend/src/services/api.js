const API_BASE_URL = 'http://localhost:8000'

export async function askQuestion(question) {
    const response = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.detail || 'Failed to get response from server')
    }

    return response.json()
}

export async function checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`)
    return response.json()
}
