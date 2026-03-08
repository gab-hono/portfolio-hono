/* ============================================================
   PAGE — Home
   Landing page with:
     1. Hero terminal window (identity)
     2. Technical stack (four columns — recruiter focus)
     3. Featured code projects (recruiter focus)
     4. Category navigation tiles (theatre, sound, code)
   ============================================================ */

import { Link } from "react-router"
import { projects } from "../data"
import ProjectCard from "../components/ProjectCard"
import { IconTheatre, IconSound, IconCode } from "../components/Icons"
import { sortByYearDesc } from "../utils/Sort"
import "../styles/Home.css"

export default function Home() {
  /* ── Derive data ── */

  // Code projects featured prominently for recruiters, sorted most-recent first
  const codeProjects = sortByYearDesc(
    projects.filter((p) => p.category === "code")
  )

  // Project counts per category for the nav tiles
  const countByCategory = {
    theatre: projects.filter((p) => p.category === "theatre-performance").length,
    sound:   projects.filter((p) => p.category === "sound").length,
    code:    codeProjects.length,
  }

  return (
    <div className="home">

      {/* ── 1. Hero terminal window ── */}
      <section className="home-hero" aria-label="Introduction">
        <TerminalBar path="~/gabriel-hono/portfolio" />

        <div className="home-hero__body">
          <p className="home-hero__prompt">whoami</p>

          <h1 className="home-hero__name">
            Gabriel <span>Hono</span>
          </h1>

          <p className="home-hero__tagline">
  Hi ! :)<br />
  I'm a Full-Stack Developer based in Paris.<br />
  Before starting my coding journey, I worked on the arts field (doing mainly Theatre) and Sound Engineering. <br />
  Welcome to my portfolio page, where you can take a peak of my diverse projects !
</p>

          {/* Role badges */}
          <div className="home-hero__roles">
            <Link to="/code"><span className="role-badge role-badge--pink">Full-Stack Dev</span></Link>
            <Link to="/sound"><span className="role-badge role-badge--blue">Sound Engineer</span></Link>
            <Link to="/theatre"><span className="role-badge">Theatre Director</span></Link>
            <span className="role-badge">Paris, FR</span>
          </div>
        </div>
      </section>

      {/* ── 2. Technical stack (four columns) ── */}
      <section className="tech-stack" aria-labelledby="stack-heading">
        <p className="section-heading" id="stack-heading">
          <span>//</span> Technical Stack
        </p>

        <div className="tech-stack__grid">

          {/* Front-end */}
          <div className="tech-stack__column">
            <div className="tech-stack__col-header">Front-End</div>
            <div className="tech-stack__col-body">
              <span className="tech-stack__item tech-stack__item--highlight">JavaScript / TypeScript</span>
              <span className="tech-stack__item tech-stack__item--highlight">React</span>
              <span className="tech-stack__item tech-stack__item--highlight">Next.js</span>
              <span className="tech-stack__item">HTML5 / CSS3</span>
              <span className="tech-stack__item">Responsive Design</span>
              <span className="tech-stack__item">Tailwind CSS</span>
            </div>
          </div>

          {/* Back-end */}
          <div className="tech-stack__column">
            <div className="tech-stack__col-header">Back-End</div>
            <div className="tech-stack__col-body">
              <span className="tech-stack__item tech-stack__item--highlight">Node.js / Express.js</span>
              <span className="tech-stack__item tech-stack__item--highlight">REST APIs</span>
              <span className="tech-stack__item">Architecture MVC</span>
              <span className="tech-stack__item">Auth / JWT</span>
              <span className="tech-stack__item">Middleware, CORS</span>
            </div>
          </div>

          {/* Database */}
          <div className="tech-stack__column">
            <div className="tech-stack__col-header">Database</div>
            <div className="tech-stack__col-body">
              <span className="tech-stack__item tech-stack__item--highlight">PostgreSQL / SQL</span>
              <span className="tech-stack__item">CRUD, modelling</span>
              <span className="tech-stack__item tech-stack__item--highlight">Neon (serverless PG)</span>
              <span className="tech-stack__item">Prisma / Sequelize</span>
            </div>
          </div>

          {/* Tools & Methods */}
          <div className="tech-stack__column">
            <div className="tech-stack__col-header">Tools &amp; Methods</div>
            <div className="tech-stack__col-body">
              <span className="tech-stack__item tech-stack__item--highlight">Git &amp; GitHub</span>
              <span className="tech-stack__item tech-stack__item--highlight">Vercel (deployment)</span>
              <span className="tech-stack__item">Vitest (unit tests)</span>
              <span className="tech-stack__item">Agile / Scrum</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. Featured code projects ── */}
      <section aria-labelledby="code-heading">
        <p className="section-heading" id="code-heading">
          <span>//</span> Featured Code Projects
        </p>

        <div className="featured-grid">
          {codeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>
      </section>

      {/* ── 4. Category navigation tiles ── */}
      <section aria-labelledby="explore-heading">
        <p className="section-heading" id="explore-heading">
          <span>//</span> Explore all work
        </p>

        <nav className="category-tiles" aria-label="Project categories">

          {/* Theatre tile */}
          <Link to="/theatre" className="category-tile category-tile--theatre">
            <span className="category-tile__icon" aria-hidden="true">
              <IconTheatre />
            </span>
            <span className="category-tile__label">Theatre</span>
            <span className="category-tile__count">{countByCategory.theatre} projects</span>
          </Link>

          {/* Sound tile */}
          <Link to="/sound" className="category-tile category-tile--sound">
            <span className="category-tile__icon" aria-hidden="true">
              <IconSound />
            </span>
            <span className="category-tile__label">Sound</span>
            <span className="category-tile__count">{countByCategory.sound} projects</span>
          </Link>

          {/* Code tile */}
          <Link to="/code" className="category-tile category-tile--code">
            <span className="category-tile__icon" aria-hidden="true">
              <IconCode />
            </span>
            <span className="category-tile__label">Code</span>
            <span className="category-tile__count">{countByCategory.code} projects</span>
          </Link>

        </nav>
      </section>

    </div>
  )
}

/* ============================================================
   Sub-components
   ============================================================ */

/* ── TerminalBar: macOS-style title bar ── */
type TerminalBarProps = { path: string }

function TerminalBar({ path }: TerminalBarProps) {
  return (
    <div className="terminal-bar" aria-hidden="true">
      <div className="terminal-bar__dots">
        {/* Colors use trans flag: pink / white / blue */}
        <span className="terminal-bar__dot terminal-bar__dot--red" />
        <span className="terminal-bar__dot terminal-bar__dot--yellow" />
        <span className="terminal-bar__dot terminal-bar__dot--green" />
      </div>
      <span className="terminal-bar__title">{path}</span>
    </div>
  )
}