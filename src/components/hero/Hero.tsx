import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Hero.css"

const ROLE_ROTATION = [
  "Building AI-powered products",
  "Designing scalable backend systems",
  "Shipping delightful web experiences",
]

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLE_ROTATION.length)
    }, 2600)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <section className="hero-v2" aria-labelledby="hero-title">
      <div className="hero-v2__container">
        <div className="hero-v2__content">
          <p className="hero-v2__kicker">FULL STACK AI ENGINEER</p>

          <h1 className="hero-v2__title" id="hero-title">
            I build production AI systems that feel effortless to use.
          </h1>

          <p className="hero-v2__summary">
            End-to-end engineering across modern frontend, cloud-native backend, and practical machine learning to turn ideas into real products.
          </p>

          <p className="hero-v2__role" aria-live="polite">
            <span className="hero-v2__role-label">Now focused on</span>
            <span key={roleIndex} className="hero-v2__role-value">
              {ROLE_ROTATION[roleIndex]}
            </span>
          </p>

          <div className="hero-v2__actions" role="group" aria-label="Primary actions">
            <Link to="/projects" className="hero-v2__btn hero-v2__btn--primary">
              Explore Projects
            </Link>
            <Link to="/contact" className="hero-v2__btn hero-v2__btn--ghost">
              Book a Call
            </Link>
          </div>

          <ul className="hero-v2__metrics" aria-label="Key highlights">
            <li>
              <strong>12+</strong>
              <span>Production Releases</span>
            </li>
            <li>
              <strong>4</strong>
              <span>AI Domains</span>
            </li>
            <li>
              <strong>99.9%</strong>
              <span>Uptime Mindset</span>
            </li>
          </ul>
        </div>

        <div className="hero-v2__visual" aria-hidden="true">
          <div className="ai-core">
            <div className="ai-core__ring ai-core__ring--outer" />
            <div className="ai-core__ring ai-core__ring--mid" />
            <div className="ai-core__ring ai-core__ring--inner" />
            <div className="ai-core__pulse" />
            <div className="ai-core__center">AI</div>
          </div>

          <div className="hero-v2__glass hero-v2__glass--top">React + Node + Python</div>
          <div className="hero-v2__glass hero-v2__glass--bottom">LLM Apps | APIs | Cloud Deployments</div>
        </div>
      </div>
    </section>
  )
}

export default Hero
