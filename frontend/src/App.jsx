import { useEffect, useState } from 'react';

function App() {
  const [projects, setProjects] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects')
        .then((response) => response.json())
        .then((data) => setProjects(data))
        .catch((err) => setError(err.message))
  }, [])

  if (error) return <p>Erreur : {error}</p>
  if (!projects) return  <p>Chargement...</p>

  return <pre>{JSON.stringify(projects, null, 2)}</pre>
}

export default App