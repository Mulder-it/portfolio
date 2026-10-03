import { useEffect } from 'react'
import './index.css'
import Hero from './components/Hero/Hero'
import { getProjects} from "./api/projects";
import ProjectList from './components/ProjectCarousel/ProjectCarousel'
import ProjectCarousel from "./components/ProjectCarousel/ProjectCarousel";

function App() {
    useEffect(() => {
        getProjects().then(console.log).catch(console.error)
    }, [])
  return (
      <main>
        <Hero />
        <ProjectCarousel />
      </main>
  )
}
export default App