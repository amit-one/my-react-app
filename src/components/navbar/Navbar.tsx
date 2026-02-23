import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { FiSun, FiMoon } from "react-icons/fi"
import "./Navbar.css"

type ThemeMode = "light" | "dark"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)  // isMenuOpen is variable default false and setIsMenuOpen function to update the variable
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>("dark")

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme") as ThemeMode | null
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme: ThemeMode = savedTheme ?? (systemPrefersDark ? "dark" : "light")
    setTheme(initialTheme)
    document.documentElement.setAttribute("data-theme", initialTheme)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    window.localStorage.setItem("portfolio-theme", nextTheme)
    document.documentElement.setAttribute("data-theme", nextTheme)
  }

  return (
    <>
      <header className={`navbar-shell ${isScrolled ? "is-scrolled" : ""}`}>
        <nav className="navbar" aria-label="Primary">
          <Link className="brand" to="/" onClick={closeMenu}>
            <span className="brand-dot" aria-hidden="true" />
            <span>AY Portfolio</span>
          </Link>

          <div className="desktop-nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item is-active" : "nav-item")}>
              Home
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "nav-item is-active" : "nav-item")}>
              Projects
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-item is-active" : "nav-item")}>
              Contact
            </NavLink>
          </div>

          <div className="navbar-actions">
            <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <span className="theme-icon" aria-hidden="true">
                {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
              </span>
            </button>

            <button
              type="button"
              className={`menu-toggle ${isMenuOpen ? "is-open" : ""}`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`mobile-overlay ${isMenuOpen ? "is-visible" : ""}`}
        role="presentation"
        onClick={closeMenu}
      />

      <aside className={`mobile-panel ${isMenuOpen ? "is-visible" : ""}`} aria-label="Mobile menu">
        <NavLink to="/" className={({ isActive }) => (isActive ? "mobile-item is-active" : "mobile-item")} onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? "mobile-item is-active" : "mobile-item")}
          onClick={closeMenu}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "mobile-item is-active" : "mobile-item")}
          onClick={closeMenu}
        >
          Contact
        </NavLink>
      </aside>
    </>
  )
}

export default Navbar
