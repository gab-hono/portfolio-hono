/* ============================================================
   VERCEL SERVERLESS FUNCTION — /api/contact
   Receives form POST and sends email via Resend.

   FILE LOCATION : /api/contact.ts  (project ROOT, not /src)

   INSTALL DEPS  : npm install resend
                   npm install --save-dev @types/node

   ENV VARIABLE  : set RESEND_API_KEY in Vercel dashboard
                   Settings → Environment Variables
   ============================================================ */

import type { IncomingMessage, ServerResponse } from "node:http"
import { Resend } from "resend"

/* ── Destination email ── */
const MY_EMAIL = "gabrielhono.o@gmail.com"

/* ── Helper: read the full request body as a string ── */
function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ""
    req.on("data", (chunk: Buffer) => { data += chunk.toString() })
    req.on("end",  () => resolve(data))
    req.on("error", reject)
  })
}

/* ── Main handler ── */
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {

  /* ── Only accept POST ── */
  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Method not allowed" }))
    return
  }

  /* ── Parse body ── */
  let body: { name?: string; email?: string; phone?: string; message?: string }
  try {
    const raw = await readBody(req)
    body = JSON.parse(raw)
  } catch {
    res.writeHead(400, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Invalid JSON body" }))
    return
  }

  const { name, email, phone, message } = body

  /* ── Validate required fields ── */
  if (!name || !email || !message) {
    res.writeHead(400, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Name, email and message are required." }))
    return
  }

  /* ── Basic email format check ── */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    res.writeHead(400, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Invalid email address." }))
    return
  }

  /* ── Build HTML email ── */
  const html = `
    <h2 style="font-family:sans-serif">New message from your portfolio</h2>
    <table style="border-collapse:collapse;width:100%;font-family:monospace;font-size:14px">
      <tr>
        <td style="padding:8px;color:#888;width:120px;border-bottom:1px solid #eee">Name</td>
        <td style="padding:8px;border-bottom:1px solid #eee">${name}</td>
      </tr>
      <tr>
        <td style="padding:8px;color:#888;border-bottom:1px solid #eee">Email</td>
        <td style="padding:8px;border-bottom:1px solid #eee">
          <a href="mailto:${email}">${email}</a>
        </td>
      </tr>
      ${phone
        ? `<tr>
             <td style="padding:8px;color:#888;border-bottom:1px solid #eee">Phone</td>
             <td style="padding:8px;border-bottom:1px solid #eee">${phone}</td>
           </tr>`
        : ""
      }
      <tr>
        <td style="padding:8px;color:#888;vertical-align:top">Message</td>
        <td style="padding:8px;white-space:pre-line">${message}</td>
      </tr>
    </table>
  `

  /* ── Send via Resend ── */
  try {
    /* process.env is available at runtime in Vercel Node functions */
    const resend = new Resend(process.env["RESEND_API_KEY"])

    await resend.emails.send({
      /*
        Before verifying a domain → use: from: "onboarding@resend.dev"
        After verifying your domain → use: from: "contact@yourdomain.com"
      */
      from:    "Portfolio Contact <onboarding@resend.dev>",
      to:      MY_EMAIL,
      replyTo: email,          // Reply in Gmail goes straight to the sender
      subject: `[Portfolio] Message from ${name}`,
      html,
    })

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ ok: true }))
  } catch (err) {
    console.error("Resend error:", err)
    res.writeHead(500, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Failed to send. Please try again." }))
  }
}