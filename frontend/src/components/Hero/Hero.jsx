import { useState } from "react";
import './Hero.css'

function Hero() {
    const [menuOpen, setMenuOpen] = useState(false)

    const closeMenu = () => setMenuOpen(false)

    return (
        <header className="hero">
            <nav className="hero-nav">
                <span className="hero-logo">
                    JDM<span className="accent">.</span>
                </span>

                <button
                    type="button"
                    className="hero-menu-toggle"
                    aria-expanded={menuOpen}
                    aria-controls="hero-links"
                    aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className="hero-menu-bar" />
                    <span className="hero-menu-bar" />
                    <span className="hero-menu-bar" />
                </button>

                <div id="hero-links" className={`hero-links ${menuOpen ? 'open' : ''}`}>
                    <a href="#projects" onClick={closeMenu}>
                        Projets
                    </a>
                    <a href="#skills" onClick={closeMenu}>
                        Compétences
                    </a>
                    <a href="#about" onClick={closeMenu}>
                        À propos
                    </a>
                    <a href="#contact" onClick={closeMenu}>
                        Contact
                    </a>
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