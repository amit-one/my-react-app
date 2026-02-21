import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Projects from "../components/Projects"
import TechStack from "../components/TechStack"
import Contact from "../components/Contact"

function MainLayout() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Contact />
    </>
  )
}

export default MainLayout