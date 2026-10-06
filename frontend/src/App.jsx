import './index.css'
import Hero from './components/Hero/Hero'
import ProjectCarousel from "./components/ProjectCarousel/ProjectCarousel";
import Skills from "./components/Skills/Skills";
import About from "./components/About/About";

function App() {
  return (
      <main>
        <Hero />
        <ProjectCarousel />
        <Skills />
        <About />
      </main>
  )
}
export default App