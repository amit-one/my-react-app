import "./Projects.css"

function Projects() {
  return (
    <section className="projects" id="projects">
      <h2 className="projects-title">Projects</h2>

      <div className="projects-grid">

        <div className="project-card">
          <h3>AI Medical Chatbot</h3>
          <p>
            Fine-tuned NLP model deployed using FastAPI with scalable inference pipeline.
          </p>
        </div>

        <div className="project-card">
          <h3>Distributed Data Pipeline</h3>
          <p>
            Built scalable ETL system with Kubernetes, Docker and cloud storage integration.
          </p>
        </div>

        <div className="project-card">
          <h3>Real-Time Analytics Dashboard</h3>
          <p>
            Full-stack system with FastAPI backend and React frontend for monitoring metrics.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Projects