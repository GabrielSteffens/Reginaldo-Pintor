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
    id: "transformacao-real",
    status: "real",
    beforeImage: "/images/before-after/antes.jpg",
    afterImage: "/images/before-after/depois.jpg",
    beforeAlt: "Ambiente antes da pintura e preparação",
    afterAlt: "Ambiente depois da pintura finalizada com acabamento profissional",
    category: "interior",
    location: "São José - SC",
    description: "Preparação completa da parede, lixamento e pintura com acabamento uniforme.",
    metadata: null,
    order: 1,
  },
];
