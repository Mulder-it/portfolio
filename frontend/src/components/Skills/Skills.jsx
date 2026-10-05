import { useEffect, useState } from "react"
import { getTechnologies } from "../../api/technologies"
import "./Skills.css"

const CATEGORIES = [
    { value: 'language', label: 'Langages' },
    { value: 'framework', label: 'Frameworks'},
    { value: 'tool', label: 'Outils & méthodologies' },
]

function Skills() {
    const [technologies, setTechnologies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getTechnologies()
            .then(setTechnologies)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])


    return (
        <section id="skills" className="skills">
            <h2>Compétences</h2>

            {!loading && !error && (
                <div className="skills-groups">
                    {CATEGORIES.map(({value, label}) => {
                        const items = technologies.filter((tech) => tech.category === value)
                        if (items.length === 0) return null

                        return (
                            <div className="skills-group" key={value}>
                                <h3>{label}</h3>
                                <ul className="skills-badges">
                                    {items.map((tech) => (
                                        <li key={tech.name}>{tech.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}

export default Skills