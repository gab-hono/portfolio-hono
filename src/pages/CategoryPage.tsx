/* ============================================================
   PAGE — CategoryPage
   Displays all projects filtered by a given category,
   with a header, optional filter bar, and a responsive grid.
   ============================================================ */

import { Link } from "react-router"
import { projects } from "../data"
import type { Project } from "../types/project"
import ProjectCard from "../components/ProjectCard"
import { sortByYearDesc } from "../utils/Sort"
import "../styles/CategoryPage.css"
import { IconTheatre, IconSound, IconCode, IconAudiovisual } from "../components/Icons"


type CategoryPageProps = {
  category: Project["category"]
}

export default function CategoryPage({ category }: CategoryPageProps) {
  /* ── Filter + sort projects: most recent first ── */
  const filtered = sortByYearDesc(
    projects.filter((p) => p.category === category)
  )

  const { title, description, icon } = CATEGORY_META[category]

  return (
    <div className="category-page">

      {/* ── Page header ── */}
      <header className="category-header">
        {/* Breadcrumb */}
        <p className="category-header__breadcrumb">
          <Link to="/">Home</Link>
          {" / "}
          {title}
        </p>

        <h1 className="category-header__title">
          <span aria-hidden="true">{icon} </span>
          {title}
        </h1>

        <p className="category-header__meta">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} ∙ {description}
        </p>
      </header>

      {/* ── Projects grid ── */}
      <section aria-label={`${title} projects`}>
        <div className="category-grid">
          {filtered.length > 0
            ? filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            : (
              <p className="category-empty">No projects in this category yet.</p>
            )
          }
        </div>
      </section>

    </div>
  )
}

/* ── Category metadata: title, description, icon label ── */
// ── Tipo del metadata: icon es ahora un componente React, no un string ──
type CategoryMeta = {
  title: string
  description: string
  icon: React.ReactElement
}

const CATEGORY_META: Record<Project["category"], CategoryMeta> = {
  "theatre-performance": {
    title: "Theatre & Performance",
    description: "Direction, acting, production and interdisciplinary stage work",
    icon: <IconTheatre width={36} height={36} />,
  },
  audiovisual: {
    title: "Audiovisual",
    description: "Animated films and video creation",
    icon: <IconAudiovisual width={36} height={36} />,
  },
  sound: {
    title: "Sound",
    description: "Film sound, live concerts, installation and podcast engineering",
    icon: <IconSound width={36} height={36} />,
  },
  code: {
    title: "Code",
    description: "Full-stack and front-end development projects",
    icon: <IconCode width={36} height={36} />,
  },
}