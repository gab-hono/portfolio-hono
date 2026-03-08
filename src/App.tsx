/* ============================================================
   APP — Root layout
   Persistent shell: sticky header with nav, main outlet, footer.
   ============================================================ */

import { Outlet, Link, NavLink } from "react-router"
import "../src/styles/App.css"

export default function App() {
  return (
    <>
      {/* ── Top navigation header ── */}
      <header className="app-header">
        <Link to="/" className="app-header__logo" aria-label="Gabriel Hono – home">
          gabriel hono
        </Link>

        <nav className="app-header__nav" aria-label="Main navigation">
          <NavLink to="/theatre">Theatre</NavLink>
          <NavLink to="/sound">Sound</NavLink>
          <NavLink to="/code">Code</NavLink>
          <NavLink to="/contact" className="app-header__nav-contact">Contact</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        © {new Date().getFullYear()} Gabriel Hono — Paris, FR
      </footer>
    </>
  )
}