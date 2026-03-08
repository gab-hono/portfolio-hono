/* ============================================================
   PAGE — ProjectPage
   Full detail view for a single project: header, description,
   image gallery (with lightbox), credits table, and links.
   ============================================================ */

import { useState } from "react"
import { useParams, Link } from "react-router"
import { projects } from "../data"
import Lightbox from "../components/Lightbox"
import { IconExpand } from "../components/Icons"
import "../styles/ProjectPage.css"

export default function ProjectPage() {
  /* ── Resolve project from URL param ── */
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  /* ── Lightbox state: null = closed, number = open at that index ── */
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  /* ── 404 state ── */
  if (!project) {
    return (
      <div className="project-page">
        <Link to="/" className="project-page__back">Home</Link>
        <h1>Project not found</h1>
      </div>
    )
  }

  const categoryPath  = CATEGORY_PATHS[project.category]
  const categoryLabel = CATEGORY_LABELS[project.category]

  return (
    <article className="project-page">

      {/* ── Back navigation ── */}
      <Link to={categoryPath} className="project-page__back">
        Back to {categoryLabel}
      </Link>

      {/* ── Project header ── */}
      <header className="project-header">
        <div className="project-header__left">
          <div className="project-header__meta">
            <span className="project-header__type">{project.type}</span>
            {project.year && (
              <>
                <span aria-hidden="true">·</span>
                <span className="project-header__year">{project.year}</span>
              </>
            )}
          </div>
          <h1 className="project-header__title">{project.title}</h1>
        </div>

        {project.roles.length > 0 && (
          <div className="project-header__roles" aria-label="Roles">
            {project.roles.map((role) => (
              <span key={role} className="project-header__role-tag">{role}</span>
            ))}
          </div>
        )}
      </header>

      {/* ── Description ── */}
      <section aria-label="Project description">
        <p className="project-description">{project.description}</p>
      </section>

      {/* ── Image gallery ── */}
      {project.images.length > 0 && (
        <section aria-label="Project images">
          <div className="project-gallery">
            {project.images.map((image, index) => (
              <button
                key={index}
                className="project-gallery__item"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open image ${index + 1} in full screen`}
              >
                <img
                  src={image.src}
                  alt={image.alt ?? `${project.title} — image ${index + 1}`}
                  loading="lazy"
                />
                {/* Hover hint overlay */}
                <span className="project-gallery__hint" aria-hidden="true">
                  <IconExpand width={16} height={16} />
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Credits + Links ── */}
      {(project.credits.length > 0 || project.links.length > 0) && (
        <section className="project-info" aria-label="Credits and links">

          {project.credits.length > 0 && (
            <div className="project-credits">
              <p className="project-credits__heading">Credits</p>
              {project.credits.map((credit, index) => (
                <div key={index} className="project-credits__item">
                  <span className="project-credits__role">{credit.role}</span>
                  <span className="project-credits__name">{credit.name}</span>
                </div>
              ))}
            </div>
          )}

          {project.links.length > 0 && (
            <div className="project-links">
              <p className="project-links__heading">Links</p>
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="project-link-item"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

        </section>
      )}

      {/* ── Lightbox: rendered at root level when open ── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={project.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

    </article>
  )
}

/* ── Routing helpers ── */

const CATEGORY_PATHS: Record<string, string> = {
  "theatre-performance": "/theatre",
  audiovisual:           "/audiovisual",
  sound:                 "/sound",
  code:                  "/code",
}

const CATEGORY_LABELS: Record<string, string> = {
  "theatre-performance": "Theatre & Performance",
  audiovisual:           "Audiovisual",
  sound:                 "Sound",
  code:                  "Code",
}