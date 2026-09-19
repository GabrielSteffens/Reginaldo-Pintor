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

export interface ServiceImage {
  src: string;
  alt: string;
  label: string;
}

export interface Service {
  id: string;
  enabled: boolean;
  title: string;
  shortDescription: string;
  icon: ServiceIcon;
  /** Real photo path once available; falls back to a swatch panel when null. */
  image: string | null;
  gallery?: ServiceImage[];
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
    image: "/images/services/interna/foto-1.jpg",
    gallery: [
      {
        src: "/images/services/interna/foto-1.jpg",
        alt: "Pintura interna residencial - Reginaldo Pintor",
        label: "Paredes e Tetos • Acabamento Fino",
      },
      {
        src: "/images/services/interna/foto-2.jpg",
        alt: "Preparação e acabamento de ambientes internos",
        label: "Pintura Residencial • Cobertura Homogênea",
      },
      {
        src: "/images/services/interna/foto-3.jpg",
        alt: "Pintura interna com recortes precisos",
        label: "Recortes e Alinhamentos Precisos",
      },
      {
        src: "/images/services/interna/foto-4.jpg",
        alt: "Proteção de rodapés e pintura uniforme",
        label: "Cuidado com Pisos e Rodapés",
      },
      {
        src: "/images/services/interna/foto-5.jpg",
        alt: "Acabamento de alto padrão em pintura interna",
        label: "Tons Suaves e Acabamento Limpo",
      },
      {
        src: "/images/services/interna/foto-6.jpg",
        alt: "Ambiente residencial renovado",
        label: "Ambiente Concluído com Brilho Uniforme",
      },
    ],
    swatchColor: "accent",
    category: "interior",
    featured: false,
    order: 1,
    details: [
      "Proteção total de pisos, rodapés e móveis",
      "Correção e lixamento prévio de imperfeições",
      "Aplicação de demãos para acabamento homogêneo",
    ],
  },
  {
    id: "pintura-externa",
    enabled: true,
    title: "Pintura externa",
    shortDescription: "Pintura de fachadas, muros e áreas externas residenciais.",
    icon: "brush",
    image: "/images/services/externa/foto-1.jpg",
    gallery: [
      {
        src: "/images/services/externa/foto-1.jpg",
        alt: "Pintura externa de fachada residencial - Reginaldo Pintor",
        label: "Fachada Residencial • Proteção Climática",
      },
      {
        src: "/images/services/externa/foto-2.jpg",
        alt: "Pintura de muro e perímetro externo",
        label: "Muros e Perímetro • Acabamento Resistente",
      },
      {
        src: "/images/services/externa/foto-3.jpg",
        alt: "Pintura de beirais e paredes externas",
        label: "Proteção contra Sol e Chuva",
      },
      {
        src: "/images/services/externa/foto-4.jpg",
        alt: "Pintura externa de sobrado residencial",
        label: "Fachadas e Áreas Externas",
      },
    ],
    swatchColor: "accentOchre",
    category: "exterior",
    featured: false,
    order: 2,
    details: [
      "Tratamento de trincas, fissuras e impermeabilização",
      "Tintas premium resistentes a sol e chuva",
      "Pintura completa de fachadas, muros e beirais",
    ],
  },
  {
    id: "retoques-repintura",
    enabled: false,
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
