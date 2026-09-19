/**
 * Before & After pairs — see docs §15.
 *
 * `status` drives everything: a "placeholder" pair renders generated
 * texture panels (see BeforeAfterSlider.astro) and forces `location` /
 * `description` to stay hidden regardless of what's in the data, plus a
 * persistent "Exemplo ilustrativo" badge. Swapping in a real project is
 * just changing `status` to "real" and setting the two image paths.
 */

export type ProjectCategory = "interior" | "exterior" | "specialty";

export interface BeforeAfterMetadata {
  roomType?: string;
  area?: string;
  duration?: string;
  finish?: string;
}

export interface BeforeAfterPair {
  id: string;
  status: "placeholder" | "real";
  beforeImage: string | null;
  afterImage: string | null;
  beforeAlt: string;
  afterAlt: string;
  category: ProjectCategory;
  location: string | null;
  description: string | null;
  metadata: BeforeAfterMetadata | null;
  order: number;
}

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "exemplo-interior",
    status: "placeholder",
    beforeImage: null,
    afterImage: null,
    beforeAlt: "Parede antes da pintura — exemplo ilustrativo",
    afterAlt: "Parede depois da pintura — exemplo ilustrativo",
    category: "interior",
    location: null,
    description: null,
    metadata: null,
    order: 1,
  },
  {
    id: "exemplo-externo",
    status: "placeholder",
    beforeImage: null,
    afterImage: null,
    beforeAlt: "Fachada antes da pintura — exemplo ilustrativo",
    afterAlt: "Fachada depois da pintura — exemplo ilustrativo",
    category: "exterior",
    location: null,
    description: null,
    metadata: null,
    order: 2,
  },
];
