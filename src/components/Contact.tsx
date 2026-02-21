import "./Contact.css"

function Contact() {
  return (
    <section className="contact" id="contact">
      <h2 className="contact-title">Contact Me</h2>

      <div className="contact-container">
        <p>
          Open to AI collaborations, backend architecture consulting,
          and DevOps infrastructure projects.
        </p>

        <div className="contact-links">
          <a href="mailto:yourmail@example.com">Email</a>
          <a href="https://github.com/yourgithub" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/yourlinkedin" target="_blank">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}

export default Contact