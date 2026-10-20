import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'

function App() {
  return (
      <BrowserRouter>
          <main>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/projets/:slug" element={<ProjectPage />} />
                  <Route path="*" element={<p>Page introuvable.</p>} />
              </Routes>
          </main>
      </BrowserRouter>
  )
}
export default App