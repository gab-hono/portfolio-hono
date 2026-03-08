/* ============================================================
   MAIN — Application entry point
   Mounts the React app and injects global styles.
   ============================================================ */

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { router } from "./router"
import "./styles/global.css"

const root = document.getElementById("root")

if (!root) {
  throw new Error("Root element #root not found in index.html")
}

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)