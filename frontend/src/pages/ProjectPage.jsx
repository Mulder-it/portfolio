import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProject } from "../api/projects"
import './ProjectPage.css'

const STATUS_LABELS = {
    in_progress: 'En cours',
    completed: 'Terminé',
}

function ProjectPage() {
    const { slug } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        getProject(slug)
            .then(setProject)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [slug])

    return (
        <div className="project-page">
            <Link className="project-back" to={{ pathname: `/`, hash: '#projects' }}>
                &larr; Retour aux projets
            </Link>

            {loading && <p className="project-message">Chargement...</p>}
            {error && (
                <p className="project-message">
                    Impossible de charger le projet ({error}).
                </p>
            )}
            {!loading && !error && !project && (
                <p className="project-message">Ce projet n'existe pas</p>
            )}

            {project && (
                <article>
                    <span className="project-status">
                        {STATUS_LABELS[project.status] ?? project.status}
                    </span>
                    <h1>{project.title}</h1>
                    <p className="project-summary">{project.summary}</p>

                    <ul className="project-tags">
                        {project.technologies.map((tech) =>(
                            <li key={tech.name}>{tech.name}</li>
                        ))}
                    </ul>

                    <div className="project-description">{project.description}</div>

                    <div className="project-links">
                        {project.github_url && (
                            <a
                                className="btn btn-secondary"
                                href={project.github_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Code sur Github
                            </a>
                        )}
                        {project.live_url && (
                            <a
                                className="btn btn-primary"
                                href={project.live_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Voir le site
                            </a>
                        )}
                    </div>
                </article>
            )}
        </div>
    )
}

export default ProjectPage