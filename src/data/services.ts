/**
 * Services catalog — see docs §14.
 *
 * `enabled: false` entries are real candidates from the brief, modeled so
 * they can be switched on with one field change, but they never render
 * until the business confirms they're actually offered. Only flip
 * `enabled` — never invent a description to go with it.
 */

export type ServiceCategory = "interior" | "exterior" | "specialty";
export type SwatchColor = "accent" | "accentOchre" | "putty";
export type ServiceIcon = "roller" | "brush" | "drop" | "wallCorner" | "tape";

export interface Service {
  id: string;
  enabled: boolean;
  title: string;
  shortDescription: string;
  icon: ServiceIcon;
  /** Real photo path once available; falls back to a swatch panel when null. */
  image: string | null;
  swatchColor: SwatchColor;
  details: string[] | null;
  ctaLabel?: string;
  category: ServiceCategory;
  featured?: boolean;
  order: number;
}

export const services: Service[] = [
  {
    id: "pintura-interna",
    enabled: true,
    title: "Pintura interna",
    shortDescription:
      "Pintura de paredes e tetos internos, com preparo completo da superfície.",
    icon: "roller",
    image: null,
    swatchColor: "accent",
    category: "interior",
    featured: true,
    order: 1,
    details: [
      "Proteção de móveis e pisos",
      "Correção de imperfeições na superfície",
      "Aplicação das demãos necessárias para um acabamento uniforme",
    ],
  },
  {
    id: "pintura-externa",
    enabled: true,
    title: "Pintura externa",
    shortDescription: "Pintura de fachadas e áreas externas residenciais.",
    icon: "brush",
    image: null,
    swatchColor: "accentOchre",
    category: "exterior",
    order: 2,
    details: null,
  },
  {
    id: "retoques-repintura",
    enabled: true,
    title: "Retoques e repintura",
    shortDescription:
      "Renovação de ambientes já pintados, com acabamento uniforme.",
    icon: "drop",
    image: null,
    swatchColor: "putty",
    category: "specialty",
    order: 3,
    details: null,
  },
  // Candidates from the brief — pending confirmation with the business (docs §14).
  {
    id: "pintura-teto",
    enabled: false,
    title: "Pintura de teto",
    shortDescription: "",
    icon: "roller",
    image: null,
    swatchColor: "accent",
    category: "interior",
    order: 4,
    details: null,
  },
  {
    id: "portas-esquadrias",
    enabled: false,
    title: "Pintura de portas e esquadrias",
    shortDescription: "",
    icon: "wallCorner",
    image: null,
    swatchColor: "accent",
    category: "interior",
    order: 5,
    details: null,
  },
];

export const enabledServices = () =>
  services.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
