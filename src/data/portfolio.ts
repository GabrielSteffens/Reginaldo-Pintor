/**
 * Portfolio projects — see docs §17.
 *
 * Empty by design at launch (no fabricated projects). The Portfolio
 * component renders the honest "em construção" empty-category state
 * whenever this array has zero entries. Adding a real project is just
 * pushing a record here — the grid, card size, and section framing never
 * change.
 */

export type ProjectCategory = "interior" | "exterior" | "commercial";

export interface PortfolioProject {
  id: string;
  title: string;
  description: string | null;
  coverImage: string;
  photos: string[];
  category: ProjectCategory;
  roomType: string[] | null;
  projectType: "nova" | "repintura" | null;
  location: string | null;
  date: string | null;
  hasBeforeAfter: boolean;
  beforeAfterId: string | null;
  order: number;
  featured?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [];

// Categories shown as empty "em breve" shells while portfolioProjects is empty.
// Commercial stays out entirely — never shown as a category until confirmed
// the business actually takes on commercial work (docs §17).
export const portfolioCategoryShells: { id: ProjectCategory; label: string }[] = [
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
];
