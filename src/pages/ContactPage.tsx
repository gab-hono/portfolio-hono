/* ============================================================
   PAGE — ContactPage
   Contact form that sends emails via a Vercel serverless
   function using the Resend API (resend.com — free tier).

   HOW IT WORKS:
   ─────────────
   This is a pure front-end app, but Vercel lets you add
   serverless API routes inside /api/*.ts in the project root.
   The form POSTs JSON to /api/contact, which calls Resend.

   SETUP STEPS (do this once before deploying):
   1. Create a free account at https://resend.com
   2. Verify your domain (or use the free sandbox)
   3. Get your API key from the dashboard
   4. In Vercel → Project → Settings → Environment Variables:
      Add  RESEND_API_KEY = re_xxxxxxxxxxxx
   5. Create the file /api/contact.ts in your project root
      (the code is provided in a comment at the bottom of this file)
   ============================================================ */

import { useState } from "react"
import { Link } from "react-router"
import "../styles/ContactPage.css"

/* ── Form field shape ── */
type FormData = {
  name: string
  email: string
  phone: string   // optional
  message: string
}

/* ── Submission state machine ── */
type Status = "idle" | "sending" | "success" | "error"

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  /* ── Generic input change handler ── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  /* ── Form submission — POSTs to /api/contact serverless function ── */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus("success")
        setForm({ name: "", email: "", phone: "", message: "" })
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Network error. Please check your connection.")
      setStatus("error")
    }
  }

  const isSending = status === "sending"

  return (
    <div className="contact-page">

      {/* ── Page header ── */}
      <header className="contact-header">
        <p className="category-header__breadcrumb">
          <Link to="/">Home</Link>
          {" / "}
          Contact
        </p>
        <h1 className="contact-header__title">Get in touch</h1>
        <p className="contact-header__sub">
          Interested in working together, or just want to say hello?
          Fill out the form and I'll get back to you :)
        </p>
      </header>

      {/* ── Form wrapped in terminal window ── */}
      <div className="contact-form-wrap">

        {/* Terminal bar reused from Home style */}
        <div className="terminal-bar" aria-hidden="true">
          <div className="terminal-bar__dots">
            <span className="terminal-bar__dot terminal-bar__dot--red" />
            <span className="terminal-bar__dot terminal-bar__dot--yellow" />
            <span className="terminal-bar__dot terminal-bar__dot--green" />
          </div>
          <span className="terminal-bar__title">~/gabriel-hono/contact</span>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>

          {/* ── Name + Email (two columns) ── */}
          <div className="field-row">
            <div className="field-group">
              <label className="field-label" htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="field-input"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Your name here"
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="email">Your email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="field-input"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* ── Phone (optional) ── */}
          <div className="field-group">
            <label className="field-label field-label--optional" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="field-input"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              placeholder="+33 06 00 00 00 00"
            />
          </div>

          {/* ── Message ── */}
          <div className="field-group">
            <label className="field-label" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="field-textarea"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Tell me about your project, or whatever comment you might have <3"
            />
          </div>

          {/* ── Status messages ── */}
          {status === "success" && (
            <p className="contact-status contact-status--success" role="alert">
              ✓ Message sent! I'll get back to you soon.
            </p>
          )}

          {status === "error" && (
            <p className="contact-status contact-status--error" role="alert">
              ✗ {errorMsg}
            </p>
          )}

          {/* ── Submit ── */}
          <button
            type="submit"
            className="contact-submit"
            disabled={isSending}
          >
            {isSending ? "Sending…" : "Send message →"}
          </button>

        </form>
      </div>
    </div>
  )
}