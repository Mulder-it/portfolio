import './About.css'

function About() {
    return (
    <section id="about" className="about">
        <h2>A propos</h2>

        <div className="about-layout">
            <div className="about-photo" aria-label="Emplacement de la photo">
                <span>photo</span>
            </div>

            <div className="about-text">
                <p>
                    [Texte provisoire] Premier paragraphe : Parcours et formation
                </p>
                <p>
                    [Texte provisoire] Deuxième paragraphe : Motivations
                </p>
                <p>
                    [Texte provisoire] Troisième paragraphe : Objectifs
                </p>
            </div>
        </div>
    </section>
    )
}

export default About