import './index.css'
import Hero from './components/Hero/Hero'
import ProjectCarousel from "./components/ProjectCarousel/ProjectCarousel";
import Skills from "./components/Skills/Skills";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact.jsx";

function App() {
  return (
      <main>
        <Hero />
        <ProjectCarousel />
        <Skills />
        <About />
        <Contact />
      </main>
  )
}
export default App