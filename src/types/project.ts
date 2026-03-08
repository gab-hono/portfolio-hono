/* ============================================================
   TYPES — Project data model
   ============================================================ */

export type ProjectLink = {
  label: string
  url: string
}

export type ProjectCredit = {
  role: string
  name: string
}

export type ProjectImage = {
  src: string       // relative path from /public
  alt?: string
  caption?: string
}

export type ProjectCategory =
  | "theatre-performance"
  | "audiovisual"
  | "sound"
  | "code"

export type Project = {
  id: string
  title: string
  year: number | string
  category: ProjectCategory
  type: string
  roles: string[]
  description: string
  credits: ProjectCredit[]
  links: ProjectLink[]
  images: ProjectImage[]
}