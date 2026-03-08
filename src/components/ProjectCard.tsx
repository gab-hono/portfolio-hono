/* ============================================================
   COMPONENT — ProjectCard
   Reusable card linking to a project detail page.
   Used both on CategoryPage and Home (featured variant).
   ============================================================ */

import { Link } from "react-router"
import type { Project } from "../types/project"
import "../styles/ProjectCard.css"

type ProjectCardProps = {
  project: Project
  /** When true, renders with accent border (used on Home page) */
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const firstImage = project.images?.[0]

  return (
    <Link
      to={`/projects/${project.id}`}
      className={`project-card${featured ? " project-card--featured" : ""}`}
      aria-label={`View project: ${project.title}`}
    >
      {/* ── Thumbnail ── */}
      <div
        className={`project-card__thumb${!firstImage ? " project-card__thumb--empty" : ""}`}
      >
        {firstImage ? (
          <img src={firstImage.src} alt={firstImage.alt ?? project.title} loading="lazy" />
        ) : (
          /* Fallback icon when no image is available */
          <span aria-hidden="true">🗂</span>
        )}

        {/* Category badge overlaid on the thumbnail */}
        <span className="project-card__category-tag">
          {formatCategoryShort(project.category)}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="project-card__body">
        <span className="project-card__type">{project.type}</span>
        <h2 className="project-card__title">{project.title}</h2>
        <span className="project-card__year">{project.year}</span>
        <p className="project-card__description">{project.description}</p>
      </div>

      {/* ── Footer: roles ── */}
      {project.roles.length > 0 && (
        <div className="project-card__footer">
          {project.roles.map((role) => (
            <span key={role} className="project-card__role">
              {role}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}

/* ── Helpers ── */

/** Short label for the category badge on thumbnail */
function formatCategoryShort(category: Project["category"]): string {
  switch (category) {
    case "theatre-performance": return "Theatre"
    case "audiovisual":         return "AV"
    case "sound":               return "Sound"
    case "code":                return "Code"
    default:                    return category
  }
}