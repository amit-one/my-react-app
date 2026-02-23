import { useEffect, useMemo, useRef, useState } from "react"
import "./Showcase.css"

type FilterKey = "all" | "ai" | "web" | "systems"

type Project = {
  id: string
  title: string
  impact: string
  description: string
  results: string[]
  links: {
    github: string
    demo: string
  }
  categories: FilterKey[]
  stack: Array<{
    label: string
    items: string[]
  }>
}

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI" },
  { key: "web", label: "Web" },
  { key: "systems", label: "Systems" },
]

const PROJECTS: Project[] = [
  {
    id: "medicore",
    title: "MediCore Assistant",
    impact: "Reduced triage response time by 42% in pilot workflows.",
    description:
      "An AI-enabled clinical support platform that combines retrieval-augmented generation with human-in-the-loop review and audit logging.",
    results: [
      "P95 API latency under 280ms at peak load",
      "Role-based access and encrypted PHI pipeline",
      "Evaluation harness for prompt and model regressions",
    ],
    links: {
      github: "https://github.com/",
      demo: "https://example.com",
    },
    categories: ["ai", "systems"],
    stack: [
      { label: "Frontend", items: ["React", "TypeScript", "Vite"] },
      { label: "Backend", items: ["FastAPI", "Node.js", "Redis"] },
      { label: "AI/ML", items: ["Transformers", "RAG", "LangChain"] },
      { label: "Database", items: ["PostgreSQL", "pgvector"] },
      { label: "DevOps", items: ["Docker", "Kubernetes", "AWS"] },
    ],
  },
  {
    id: "observa",
    title: "Observa Stream",
    impact: "Enabled real-time product telemetry across 12+ services.",
    description:
      "A full-stack event analytics system with stream ingestion, anomaly detection, and interactive operational dashboards for engineering teams.",
    results: [
      "Sub-second dashboard updates via WebSocket channels",
      "Auto-scaling event workers for traffic spikes",
      "SLA alerts integrated with incident workflows",
    ],
    links: {
      github: "https://github.com/",
      demo: "https://example.com",
    },
    categories: ["web", "systems"],
    stack: [
      { label: "Frontend", items: ["React", "TypeScript", "Recharts"] },
      { label: "Backend", items: ["Node.js", "FastAPI", "WebSockets"] },
      { label: "AI/ML", items: ["Time-Series Detection", "Python"] },
      { label: "Database", items: ["PostgreSQL", "ClickHouse"] },
      { label: "DevOps", items: ["Docker", "Terraform", "GitHub Actions"] },
    ],
  },
  {
    id: "agentforge",
    title: "AgentForge Workspace",
    impact: "Cut internal workflow automation time by 55%.",
    description:
      "A multi-agent productivity workspace that orchestrates planning, retrieval, and execution pipelines through structured tool APIs.",
    results: [
      "Modular agent runtime with policy controls",
      "Context caching for lower token and compute cost",
      "Typed API contracts across frontend and services",
    ],
    links: {
      github: "https://github.com/",
      demo: "https://example.com",
    },
    categories: ["ai", "web"],
    stack: [
      { label: "Frontend", items: ["React", "TypeScript", "TanStack Query"] },
      { label: "Backend", items: ["FastAPI", "Node.js", "gRPC"] },
      { label: "AI/ML", items: ["LLM Routing", "Prompt Eval", "Embedding Search"] },
      { label: "Database", items: ["PostgreSQL", "Redis"] },
      { label: "DevOps", items: ["Docker", "AWS", "OpenTelemetry"] },
    ],
  },
]

function Showcase() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

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
      { threshold: 0.2 }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return PROJECTS
    }

    return PROJECTS.filter((project) => project.categories.includes(activeFilter))
  }, [activeFilter])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`showcase ${isVisible ? "is-visible" : ""}`}
      aria-labelledby="showcase-title"
    >
      <div className="showcase__container">
        <header className="showcase__header">
          <p className="showcase__kicker">ENGINEERING SHOWCASE</p>
          <h2 className="showcase__title" id="showcase-title">
            Selected Work & Architecture
          </h2>
          <p className="showcase__subtitle">
            Real projects built with a systems mindset. Each build shows how product outcomes and technical architecture connect.
          </p>
          <div className="showcase__underline" aria-hidden="true" />
        </header>

        <div className="showcase__filters" role="tablist" aria-label="Filter projects by domain">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.key}
              className={`showcase__filter ${activeFilter === filter.key ? "is-active" : ""}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="showcase__list">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="showcase-card"
              style={{ transitionDelay: `${index * 90}ms` }}
              aria-label={project.title}
            >
              <div className="showcase-card__content">
                <h3>{project.title}</h3>
                <p className="showcase-card__impact">{project.impact}</p>
                <p className="showcase-card__description">{project.description}</p>

                <ul className="showcase-card__results" aria-label="Key results">
                  {project.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>

                <div className="showcase-card__links">
                  <a href={project.links.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  <a href={project.links.demo} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                </div>
              </div>

              <div className="showcase-card__architecture" aria-label="Technology architecture">
                <div className="arch-diagram" aria-hidden="true">
                  <span className="arch-node arch-node--left">UI</span>
                  <span className="arch-node arch-node--center">API</span>
                  <span className="arch-node arch-node--right">AI</span>
                </div>

                {project.stack.map((group) => (
                  <div key={group.label} className="tech-group">
                    <p className="tech-group__label">{group.label}</p>
                    <div className="tech-group__tags">
                      {group.items.map((item) => (
                        <span key={item} className="tech-tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Showcase
