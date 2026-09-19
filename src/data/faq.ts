/**
 * FAQ — see docs §19.
 *
 * `answerType`:
 *  - "process"  answerable today from the defined workflow (src/data/process.ts)
 *  - "derived"  computed from another data source, never authored separately
 *  - "pending"  depends on a confirmed business policy that doesn't exist yet;
 *               answered honestly without guessing, and invites direct contact
 */

import { businessConfig } from "../config/business";
import { enabledServices } from "./services";

export type FaqAnswerType = "process" | "derived" | "pending";

export interface FaqItem {
  id: string;
  question: string;
  answerType: FaqAnswerType;
  answer: string;
  order: number;
}

function servicesAnswer(): string {
  const cats = new Set(enabledServices().map((s) => s.category));
  const hasInterior = cats.has("interior");
  const hasExterior = cats.has("exterior");
  if (hasInterior && hasExterior) {
    return "Sim — trabalhamos com pintura interna e externa.";
  }
  if (hasInterior) return "No momento, trabalhamos com pintura interna.";
  if (hasExterior) return "No momento, trabalhamos com pintura externa.";
  return "Fale com a gente para saber quais serviços estão disponíveis no momento.";
}

const baseFaqs: Omit<FaqItem, "answer">[] = [
  { id: "orcamento", question: "Como funciona o orçamento?", answerType: "process", order: 1 },
  { id: "tinta", question: "Preciso comprar a tinta?", answerType: "pending", order: 2 },
  { id: "prazo", question: "Quanto tempo leva um projeto de pintura?", answerType: "pending", order: 3 },
  { id: "preparo", question: "O que é necessário preparar antes?", answerType: "process", order: 4 },
  { id: "cores", question: "Vocês ajudam a escolher as cores?", answerType: "pending", order: 5 },
  { id: "interior-exterior", question: "Vocês pintam interior e exterior?", answerType: "derived", order: 6 },
  { id: "moveis", question: "Como devo lidar com os móveis?", answerType: "process", order: 7 },
  { id: "preco", question: "Como o preço final é calculado?", answerType: "pending", order: 8 },
];

const answers: Record<string, string> = {
  orcamento:
    "Um primeiro contato para entender o que você precisa, seguido de uma avaliação do ambiente e um orçamento sem compromisso.",
  tinta:
    "Isso costuma ser combinado durante o orçamento, de acordo com o que funciona melhor para você. É uma das primeiras coisas que a gente alinha na conversa.",
  prazo:
    "O prazo varia bastante de acordo com o tamanho e a complexidade do ambiente, e isso fica claro já no orçamento.",
  preparo:
    "O ideal é afastar móveis pequenos e objetos de valor das paredes — a proteção do restante e a preparação da superfície fazem parte do trabalho.",
  cores: "Fale com a gente sobre isso — contamos certinho como funciona para o seu projeto.",
  moveis: "A proteção de móveis e pisos faz parte da preparação do ambiente.",
  preco:
    "O valor é definido após a avaliação do ambiente, considerando tamanho e condição da superfície — sem sustos depois.",
};

export function getFaqs(): FaqItem[] {
  const items: FaqItem[] = baseFaqs.map((item) => ({
    ...item,
    answer: item.id === "interior-exterior" ? servicesAnswer() : answers[item.id],
  }));

  // The guarantee question only appears once the business has confirmed a
  // policy — the FAQ list itself is data-driven, not a fixed set (§19).
  if (businessConfig.guarantee.offered && businessConfig.guarantee.description) {
    items.push({
      id: "garantia",
      question: "Vocês oferecem garantia?",
      answerType: "process",
      answer: businessConfig.guarantee.description,
      order: 9,
    });
  }

  return items.sort((a, b) => a.order - b.order);
}
