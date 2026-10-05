import './index.css'
import Hero from './components/Hero/Hero'
import ProjectCarousel from "./components/ProjectCarousel/ProjectCarousel";
import Skills from "./components/Skills/Skills";

function App() {
  return (
      <main>
        <Hero />
        <ProjectCarousel />
        <Skills />
      </main>
  )
}
export default App