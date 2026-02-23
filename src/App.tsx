import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProjectsPage from "./pages/ProjectsPage"
import ContactPage from "./pages/ContactPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App