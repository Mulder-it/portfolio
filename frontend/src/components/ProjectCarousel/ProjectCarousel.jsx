import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {getProjects} from '../../api/projects'
import './ProjectCarousel.css'

const STATUS_LABELS = {
    in_progress: 'En cours',
    completed: 'Terminé',
}

function ProjectCarousel() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
    })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [snapCount, setSnapCount] = useState(0)

    useEffect(() => {
        getProjects()
            .then(setProjects)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))

    }, [])

    const updateSelection = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setSnapCount(emblaApi.scrollSnapList().length)
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        updateSelection()
        emblaApi.on('select', updateSelection)
        emblaApi.on('reInit', updateSelection)
        return () => {
            emblaApi.off('select', updateSelection)
            emblaApi.off('reInit', updateSelection)
        }
    }, [emblaApi, updateSelection])

    return (
        <section id="projects" className="projects">
            <h2>Projets</h2>

            {loading && <p className="projects-message">Chargement...</p>}
            {error && (
                <p className="projects-message">
                    Impossible de charger les projets ({error}).
                </p>
            )}
            {!loading && !error && projects.length === 0 && (
                <p className="projects-message">Aucun projet publié pour le moment.</p>
            )}

            {projects.length > 0 && (
                <>
                    <div className="carousel" ref={emblaRef}>
                        <div className="carousel-track">
                            {projects.map((project) => (
                                <div className="carousel-slide" key={project.slug}>
                                    <article className="project-card">
                                        <span className="project-card-status">
                                            {STATUS_LABELS[project.status] ?? project.status}
                                        </span>
                                        <h3>{project.title}</h3>
                                        <p className="project-card-sumary">{project.summary}</p>
                                        <ul className="project-card-tags">
                                            {project.technologies.map((tech) => (
                                                <li key={tech.name}>{tech.name}</li>
                                            ))}
                                        </ul>
                                        <span className="project-card-link">Voir le projet &rarr;</span>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-controls">
                        <button
                            className="carousel-arrow"
                            onClick={() => emblaApi?.scrollPrev()}
                            aria-label="Projet précédent"
                        >
                            &lsaquo;
                        </button>
                        <div className="carousel-dots">
                            {Array.from({length: snapCount}).map((_, index) => (
                                <button
                                    key={index}
                                    className={`carousel-dot ${index === selectedIndex ? 'active' : ''}`}
                                    onClick={() => emblaApi?.scrollTo(index)}
                                    aria-label={`Aller au projet ${index + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            className="carousel-arrow"
                            onClick={() => emblaApi?.scrollNext()}
                            aria-label="Projet suivant"
                        >
                            &rsaquo;
                        </button>
                    </div>
                </>
            )}
        </section>
    )
}

export default ProjectCarousel