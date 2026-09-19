/**
 * Work process steps — see docs §16.
 *
 * Presented as a representative professional workflow, not a confirmed
 * account of this specific business's exact procedure (see `introLine`
 * below vs. the first-person alternative). Every field is editable data —
 * rename, reorder, split, or merge steps without touching the component.
 */

export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  shortDescription: string;
  detail: string[] | null;
  icon: "phone" | "clipboard" | "tape" | "roller" | "brush" | "check";
}

/**
 * Generic, representative framing by default. Swap to the confirmed,
 * first-person version only once the business has verified these are,
 * specifically, the steps they follow.
 */
export const processIntro = {
  generic:
    "Veja como costuma funcionar um projeto de pintura residencial bem conduzido:",
  confirmed: "Veja como funciona o nosso processo:",
  useConfirmed: false,
};

export const processSteps: ProcessStep[] = [
  {
    id: "contato",
    order: 1,
    title: "Contato",
    shortDescription: "Primeiro contato, para entender o que você precisa.",
    detail: null,
    icon: "phone",
  },
  {
    id: "entendimento",
    order: 2,
    title: "Entendimento do projeto",
    shortDescription:
      "Avaliação do ambiente, definição de escopo e orçamento, com data combinada.",
    detail: null,
    icon: "clipboard",
  },
  {
    id: "preparacao",
    order: 3,
    title: "Preparação da superfície",
    shortDescription:
      "Proteção de móveis e pisos, correção de imperfeições, preparação da parede.",
    detail: [
      "Proteção com lona e fita",
      "Lixamento e correção de trincas",
    ],
    icon: "tape",
  },
  {
    id: "pintura",
    order: 4,
    title: "Pintura",
    shortDescription:
      "Aplicação das demãos necessárias para um acabamento uniforme.",
    detail: null,
    icon: "roller",
  },
  {
    id: "acabamento",
    order: 5,
    title: "Acabamento",
    shortDescription:
      "Detalhamento de cantos e bordas, remoção de fitas, revisão de uniformidade.",
    detail: null,
    icon: "brush",
  },
  {
    id: "inspecao",
    order: 6,
    title: "Inspeção final",
    shortDescription:
      "Vistoria em conjunto com o cliente e limpeza do ambiente antes da entrega.",
    detail: null,
    icon: "check",
  },
];
