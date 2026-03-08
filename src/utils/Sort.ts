/* ============================================================
   UTILITY — sortByYear
   Sorts an array of projects from most recent to oldest.
   Handles both numeric years (2024) and range strings ("2021–2022").
   Extracts the last 4-digit year found in the value.
   ============================================================ */

import type { Project } from "../types/project"

/**
 * Extracts the most recent year from a year value.
 * "2021–2022" → 2022  |  2024 → 2024  |  "2015–2017" → 2017
 */
function extractLatestYear(year: Project["year"]): number {
  const str = String(year)
  const matches = str.match(/\d{4}/g)
  if (!matches) return 0
  return Math.max(...matches.map(Number))
}

/** Returns a new array sorted most-recent first */
export function sortByYearDesc(items: Project[]): Project[] {
  return [...items].sort(
    (a, b) => extractLatestYear(b.year) - extractLatestYear(a.year)
  )
}