import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Hero from "../components/Hero/Hero"
import ProjectCarousel from "../components/ProjectCarousel/ProjectCarousel"
import Skills from "../components/Skills/Skills"
import About from "../components/About/About"
import Contact from "../components/Contact/Contact"

function HomePage() {
    const { hash } = useLocation()

    useEffect(() => {
        if (hash) {
            document.querySelector(hash)?.scrollIntoView({})
        }
    }, [hash])

    return (
        <>
        <Hero />
        <ProjectCarousel />
        <Skills />
        <About />
        <Contact />
        </>
    )
}

export default HomePage