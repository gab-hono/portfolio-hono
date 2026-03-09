/// <reference types="vite/client" />

/* ── CSS module declarations ──
   Tells TypeScript that importing a .css file is valid.
   Vite handles the actual CSS injection at runtime.
   Without this, tsc throws TS2307 on every CSS import.     */
declare module "*.css" {
  const styles: Record<string, string>
  export default styles
}