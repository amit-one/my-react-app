import "./TechStack.css"

function TechStack() {
  return (
    <section className="tech" id="tech">
      <h2 className="tech-title">Tech Stack</h2>

      <div className="tech-grid">
        <div className="tech-item">Python</div>
        <div className="tech-item">FastAPI</div>
        <div className="tech-item">React</div>
        <div className="tech-item">TypeScript</div>
        <div className="tech-item">Docker</div>
        <div className="tech-item">Kubernetes</div>
        <div className="tech-item">AWS</div>
        <div className="tech-item">PostgreSQL</div>
      </div>
    </section>
  )
}

export default TechStack