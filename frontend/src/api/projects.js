const API_URL = import.meta.env.VITE_API_URL ?? ""

export async function getProjects() {
    const response = await fetch(`${API_URL}/api/projects`)

    if (!response.ok) {
        throw new Error(`Erreur API : ${response.status}`)
    }

    return response.json()
}

export async function getProject(slug) {
    const response = await fetch(`${API_URL}/api/projects/${encodeURIComponent(slug)}`,)

    if (response.status === 404) {
        return null
    }

    if (!response.ok) {
        throw new Error(`Erreur API : ${response.status}`)
    }

    return response.json()
}


