import "./About.css"

function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-left">
          <h2>About Me</h2>
          <p>
            I am a professional AI Engineer and Full Stack Developer with strong
            experience in building scalable backend systems, machine learning
            pipelines, and production-grade cloud infrastructure.
          </p>
        </div>

        <div className="about-right">
          <h3>Core Skills</h3>
          <ul>
            <li>Machine Learning & Deep Learning</li>
            <li>FastAPI & Backend Architecture</li>
            <li>React & TypeScript</li>
            <li>Docker & Kubernetes</li>
            <li>AWS & Cloud Infrastructure</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About