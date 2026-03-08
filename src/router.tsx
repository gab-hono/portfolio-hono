/* ============================================================
   ROUTER — Application routes
   ============================================================ */

import { createBrowserRouter } from "react-router"
import App from "./App"
import Home from "./pages/Home"
import CategoryPage from "./pages/CategoryPage"
import ProjectPage from "./pages/ProjectPage"
import ContactPage from "./pages/ContactPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true,           element: <Home /> },
      { path: "theatre",       element: <CategoryPage category="theatre-performance" /> },
      { path: "sound",         element: <CategoryPage category="sound" /> },
      { path: "code",          element: <CategoryPage category="code" /> },
      { path: "audiovisual",   element: <CategoryPage category="audiovisual" /> },
      { path: "contact",       element: <ContactPage /> },
      { path: "projects/:id",  element: <ProjectPage /> },
    ],
  },
])