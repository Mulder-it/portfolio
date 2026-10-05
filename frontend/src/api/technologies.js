const API_URL = import.meta.env.VITE_API_URL

export async function getTechnologies() {
    const response = await fetch(`${API_URL}/api/technologies`)

    if(!response.ok) {
        throw new Error(`Erreur API : ${response.status}`)
    }

    return response.json()
}