import './About.css'
import photo from '../../assets/photo.jpg'

function About() {
    return (
    <section id="about" className="about">
        <h2>À propos</h2>

        <div className="about-layout">
            <img className="about-photo" src={photo} alt="Portrait De Mulder Jérôme" />

            <div className="about-text">
                <p>
                    Je me suis d'abord lancé dans la communication avant de me tourner vers l'informatique avec
                    un bachelier en informatique et systèmes à la Haute École en Hainaut.
                </p>
                <p>
                    Aujourd'hui, je pratique Python, Django, React et PostgreSQL en construisant ce site de A à Z.
                    Vous pouvez y consulter mes projets.
                </p>
                <p>
                    Je cherche actuellement un poste de développeur. Si mon profil correspond à vos besoins,
                    écrivez-moi via le formulaire ci-dessous.
                </p>
            </div>
        </div>
    </section>
    )
}

export default About