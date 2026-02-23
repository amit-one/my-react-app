import { useEffect, useRef, useState } from "react"
import "./About.css"

function About() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(node)
        }
      },
      {
        threshold: 0.25,
      }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      className={`about-v2 ${isVisible ? "is-visible" : ""}`}
      id="about"
      ref={sectionRef}
      aria-labelledby="about-title"
    >
      <div className="about-v2__container">
        <div className="about-v2__profile" aria-hidden="true">
          <div className="about-v2__avatar">AI</div>
          <div className="about-v2__status">Open to impactful engineering roles</div>
          <div className="about-v2__meta-grid">
            <div>
              <span className="about-v2__meta-label">Primary Focus</span>
              <strong>AI Product Engineering</strong>
            </div>
            <div>
              <span className="about-v2__meta-label">Stack</span>
              <strong>React, Node, Python</strong>
            </div>
            <div>
              <span className="about-v2__meta-label">Mindset</span>
              <strong>Reliable, measurable, scalable</strong>
            </div>
          </div>
        </div>

        <div className="about-v2__content">
          <p className="about-v2__kicker">ABOUT</p>
          <h2 className="about-v2__title" id="about-title">
            I turn complex AI ideas into dependable products people actually use.
          </h2>

          <p className="about-v2__description">
            I am a Full Stack AI Engineer focused on building systems that are both technically strong and practical in production. I care about clean architecture, useful user experience, and measurable business outcomes.
          </p>

          <p className="about-v2__description">
            My approach blends frontend clarity, backend reliability, and applied machine learning so teams can ship faster without sacrificing quality or trust.
          </p>

          <ul className="about-v2__pillars" aria-label="Core strengths">
            <li>End-to-end product thinking from interface to infrastructure</li>
            <li>Production-first AI integration with observability and guardrails</li>
            <li>Scalable API and data workflows built for growth</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
