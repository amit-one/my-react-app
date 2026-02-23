import { useMemo, useState } from "react"
import type { FormEvent } from "react"
import "./Contact.css"

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = "Please enter your name."
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address."
  }

  if (values.subject.trim().length > 120) {
    errors.subject = "Subject should be under 120 characters."
  }

  if (!values.message.trim()) {
    errors.message = "Please write a message."
  } else if (values.message.trim().length < 20) {
    errors.message = "Message should be at least 20 characters."
  }

  return errors
}

function Contact() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const remainingMessage = useMemo(() => 500 - values.message.length, [values.message.length])

  const onChange = (field: keyof FormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setIsSuccess(false)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => {
      window.setTimeout(resolve, 1200)
    })

    setIsSubmitting(false)
    setIsSuccess(true)
    setValues(INITIAL_VALUES)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@yourdomain.com")
      setIsCopied(true)
      window.setTimeout(() => {
        setIsCopied(false)
      }, 1400)
    } catch {
      setIsCopied(false)
    }
  }

  return (
    <section className="contact-v2" id="contact" aria-labelledby="contact-title">
      <div className="contact-v2__container">
        <div className="contact-v2__intro">
          <p className="contact-v2__kicker">CONTACT</p>
          <h2 className="contact-v2__title" id="contact-title">
            Let&apos;s Build Something Great
          </h2>
          <p className="contact-v2__text">
            I am open to full-time roles, product collaborations, and high-impact AI engineering projects. If you are building something meaningful, I would love to hear about it.
          </p>

          <div className="contact-v2__signals" aria-label="Trust signals">
            <p><strong>Email:</strong> hello@yourdomain.com</p>
            <p><strong>Location:</strong> Remote, India</p>
            <p><strong>Response:</strong> Usually within 24 hours</p>
          </div>

          <div className="contact-v2__socials" aria-label="Social links">
            <a href="https://github.com/yourgithub" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noreferrer">LinkedIn</a>
            <button type="button" onClick={copyEmail} aria-live="polite">
              {isCopied ? "Email copied" : "Copy email"}
            </button>
          </div>
        </div>

        <form className="contact-v2__form" onSubmit={onSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={values.name}
              onChange={(event) => onChange("name", event.target.value)}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              placeholder="Your name"
            />
            {errors.name ? <p className="field-error" id="contact-name-error">{errors.name}</p> : null}
          </div>

          <div className="field-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={values.email}
              onChange={(event) => onChange("email", event.target.value)}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              placeholder="you@company.com"
            />
            {errors.email ? <p className="field-error" id="contact-email-error">{errors.email}</p> : null}
          </div>

          <div className="field-group">
            <label htmlFor="contact-subject">Subject (optional)</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={(event) => onChange("subject", event.target.value)}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "contact-subject-error" : undefined}
              placeholder="Project idea, role, or collaboration"
            />
            {errors.subject ? <p className="field-error" id="contact-subject-error">{errors.subject}</p> : null}
          </div>

          <div className="field-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={values.message}
              onChange={(event) => onChange("message", event.target.value.slice(0, 500))}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : "contact-message-help"}
              placeholder="Tell me about the problem you are solving and what success looks like."
              rows={6}
            />
            <div className="field-meta" id="contact-message-help">
              <span>Minimum 20 characters</span>
              <span>{remainingMessage} left</span>
            </div>
            {errors.message ? <p className="field-error" id="contact-message-error">{errors.message}</p> : null}
          </div>

          <button type="submit" className="contact-v2__submit" disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner" aria-hidden="true" /> : null}
            {isSubmitting ? "Sending" : "Send Message"}
          </button>

          {isSuccess ? (
            <p className="contact-v2__success" role="status">
              Thanks for reaching out. Your message is queued and I will get back to you soon.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

export default Contact


