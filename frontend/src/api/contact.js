const API_URL = import.meta.env.VITE_API_URL ?? ""

export async function sendContactMessage(data){
    const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })

    if (response.status === 422){
        throw new Error("Vérifiez les champs du formulaire.")
    }

    if (response.status === 429){
        throw new Error("Trop de messages envoyés. Veuillez réessayer plus tard.")
    }

    if (!response.ok){
        throw new Error(`Erreur ${response.status}`)
    }

    return response.json()
}