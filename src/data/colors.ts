import type {
  FacadeArea,
  ColorGroup,
  ColorSwatch,
  PresetCombination,
  FacadePalette,
} from "../types/colors";

export const facadeAreas: FacadeArea[] = [
  {
    id: "wall",
    label: "Paredes principais",
    defaultColor: "#ECE8E1",
    description: "A cor base de maior superfície da fachada.",
  },
  {
    id: "details",
    label: "Detalhes e molduras",
    defaultColor: "#DFD5C6",
    description: "Frisos, colunas, pórticos e beirais.",
  },
  {
    id: "windows",
    label: "Esquadrias / Janelas",
    defaultColor: "#36393E",
    description: "Batentes, caixilhos e molduras de vidro.",
  },
  {
    id: "door",
    label: "Porta de entrada",
    defaultColor: "#6E4A35",
    description: "Ponto focal nobre da entrada principal.",
  },
  {
    id: "garage",
    label: "Portão da garagem",
    defaultColor: "#4A4D52",
    description: "Portão basculante ou seccionado.",
  },
  {
    id: "fence",
    label: "Muro e muretas",
    defaultColor: "#D8CEBE",
    description: "Muros frontais e divisórias da calçada.",
  },
  {
    id: "roof",
    label: "Telhado / Platibanda",
    defaultColor: "#544E48",
    description: "Telhas cerâmicas, telhado aparente ou cumeeira.",
  },
];

export const colorGroups: ColorGroup[] = [
  { id: "neutros", label: "Neutros" },
  { id: "terrosos", label: "Terrosos" },
  { id: "verdes", label: "Verdes" },
  { id: "azuis", label: "Azuis" },
  { id: "destaques", label: "Destaques" },
];

export const colorSwatches: ColorSwatch[] = [
  // Neutros
  { id: "branco-neve", name: "Branco Neve", hex: "#F8F9FA", group: "neutros" },
  { id: "off-white", name: "Off-white", hex: "#ECE8E1", group: "neutros" },
  { id: "areia-real", name: "Areia Real", hex: "#D8CEBE", group: "neutros" },
  { id: "bege-conforto", name: "Bege Conforto", hex: "#DFD5C6", group: "neutros" },
  { id: "cinza-platina", name: "Cinza Platina", hex: "#D6D9DC", group: "neutros" },
  { id: "cinza-medio", name: "Cinza Médio", hex: "#8F9499", group: "neutros" },
  { id: "grafite-moderno", name: "Grafite", hex: "#4A4D52", group: "neutros", dark: true },

  // Terrosos
  { id: "terracota", name: "Terracota", hex: "#B85D43", group: "terrosos", dark: true },
  { id: "caramelo", name: "Caramelo Quente", hex: "#C1854F", group: "terrosos" },
  { id: "marrom-cafe", name: "Marrom Café", hex: "#5C4033", group: "terrosos", dark: true },
  { id: "taupe", name: "Taupe Elegante", hex: "#968778", group: "terrosos" },

  // Verdes
  { id: "verde-salvia", name: "Verde Sálvia", hex: "#8A9A86", group: "verdes" },
  { id: "verde-oliva", name: "Verde Oliva", hex: "#6E7A5E", group: "verdes" },
  { id: "verde-escuro", name: "Verde Floresta", hex: "#2F483A", group: "verdes", dark: true },

  // Azuis
  { id: "azul-claro", name: "Azul Névoa", hex: "#AEC2CE", group: "azuis" },
  { id: "azul-nordico", name: "Azul Acinzentado", hex: "#688294", group: "azuis" },
  { id: "azul-petroleo", name: "Azul Petróleo", hex: "#244053", group: "azuis", dark: true },

  // Destaques
  { id: "preto-absoluto", name: "Preto Fosco", hex: "#1F2124", group: "destaques", dark: true },
  { id: "grafite-escuro", name: "Grafite Escuro", hex: "#36393E", group: "destaques", dark: true },
  { id: "madeira-nobre", name: "Madeira Nobre", hex: "#6E4A35", group: "destaques", dark: true },
  { id: "terracota-viva", name: "Terracota Viva", hex: "#9E452E", group: "destaques", dark: true },
  { id: "azul-marinho", name: "Azul Noturno", hex: "#1B2E3D", group: "destaques", dark: true },
];

export const defaultFacadePalette: FacadePalette = {
  wall: "#ECE8E1",
  details: "#DFD5C6",
  windows: "#36393E",
  door: "#6E4A35",
  garage: "#4A4D52",
  fence: "#D8CEBE",
  roof: "#544E48",
};

export const presetCombinations: PresetCombination[] = [
  {
    id: "classico",
    name: "Clássico Atemporal",
    description: "Tons claros e acolhedores com porta amadeirada. Elegância suave que nunca sai de moda.",
    styleTag: "Suave & Nobre",
    colors: {
      wall: "#ECE8E1", // Off-white
      details: "#DFD5C6", // Bege
      windows: "#F8F9FA", // Branco
      door: "#6E4A35", // Madeira
      garage: "#DFD5C6", // Bege
      fence: "#D8CEBE", // Areia
      roof: "#7D5240", // Telha
    },
    previewColors: ["#ECE8E1", "#DFD5C6", "#F8F9FA", "#6E4A35"],
  },
  {
    id: "moderno",
    name: "Moderno Urbano",
    description: "Contraste de cinza platina com esquadrias pretas e portão grafite. Estética limpa e contemporânea.",
    styleTag: "Atual & Marcante",
    colors: {
      wall: "#D6D9DC", // Cinza platina
      details: "#8F9499", // Cinza médio
      windows: "#1F2124", // Preto
      door: "#36393E", // Grafite escuro
      garage: "#4A4D52", // Grafite
      fence: "#D6D9DC", // Cinza platina
      roof: "#36393E", // Ardósia
    },
    previewColors: ["#D6D9DC", "#8F9499", "#1F2124", "#4A4D52"],
  },
  {
    id: "natural",
    name: "Natural & Fresco",
    description: "Harmonia terrosa de areia com detalhes em verde sálvia e porta amadeirada, integrando-se à vegetação.",
    styleTag: "Orgânico & Calmo",
    colors: {
      wall: "#D8CEBE", // Areia
      details: "#8A9A86", // Verde sálvia
      windows: "#F8F9FA", // Branco
      door: "#6E4A35", // Madeira
      garage: "#968778", // Taupe
      fence: "#D8CEBE", // Areia
      roof: "#544E48", // Cinza
    },
    previewColors: ["#D8CEBE", "#8A9A86", "#F8F9FA", "#6E4A35"],
  },
  {
    id: "contemporaneo",
    name: "Contemporâneo Nobre",
    description: "Off-white refinado com detalhes marcantes em grafite e madeira na entrada social.",
    styleTag: "Destaque & Elegância",
    colors: {
      wall: "#ECE8E1", // Off-white
      details: "#4A4D52", // Grafite
      windows: "#1F2124", // Preto
      door: "#6E4A35", // Madeira
      garage: "#4A4D52", // Grafite
      fence: "#ECE8E1", // Off-white
      roof: "#36393E", // Escuro
    },
    previewColors: ["#ECE8E1", "#4A4D52", "#1F2124", "#6E4A35"],
  },
  {
    id: "aconchegante",
    name: "Aconchegante Terroso",
    description: "Paleta quente de bege com detalhes em terracota e marrom café. Calor e acolhimento residencial.",
    styleTag: "Quente & Tradicional",
    colors: {
      wall: "#DFD5C6", // Bege
      details: "#B85D43", // Terracota
      windows: "#F8F9FA", // Branco
      door: "#5C4033", // Marrom café
      garage: "#C1854F", // Caramelo
      fence: "#DFD5C6", // Bege
      roof: "#9E452E", // Telha viva
    },
    previewColors: ["#DFD5C6", "#B85D43", "#F8F9FA", "#5C4033"],
  },
  {
    id: "nordico",
    name: "Nórdico Costeiro",
    description: "Base cinza claro equilibrada por tons serenos de azul acinzentado e porta azul petróleo.",
    styleTag: "Sereno & Sofisticado",
    colors: {
      wall: "#D6D9DC", // Cinza claro
      details: "#688294", // Azul nórdico
      windows: "#F8F9FA", // Branco
      door: "#244053", // Azul petróleo
      garage: "#8F9499", // Cinza médio
      fence: "#D6D9DC", // Cinza
      roof: "#4A4D52", // Grafite
    },
    previewColors: ["#D6D9DC", "#688294", "#F8F9FA", "#244053"],
  },
];
