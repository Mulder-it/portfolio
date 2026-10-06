import './Hero.css'

function Hero() {
    return (
        <header className="hero">
            <nav className="hero-nav">
                <span className="hero-logo">
                    JDM<span className="accent">.</span>
                </span>

                <div className="hero-links">
                    <a href="#projects">Projets</a>
                    <a href="#skills">Compétences</a>
                    <a href="#about">À propos</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>

            <div className="hero-content">
                <p className="hero-kicker">Bonjour, je suis</p>
                <h1>Jérôme De Mulder</h1>
                <p className="hero-subtitle">
                    Développeur full-stack - Python, Django, React
                </p>
                <div className="hero-actions">
                    <a href="#projects" className="btn btn-primary">
                        Voir mes projets
                    </a>
                    <a href="#contact" className="btn btn-secondary">
                        Me contacter
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Hero