import type { QuoteAnswers } from "../types/quote";

export interface QuoteSummaryItem {
  label: string;
  value: string;
  stepIndex: number;
}

export function formatSizeSummary(answers: QuoteAnswers): string {
  if (answers.sizeMode === "advanced" && answers.sizeAdvancedM2) {
    return `Aproximadamente ${answers.sizeAdvancedM2} m²`;
  }
  return answers.sizeSimple ?? "Não informado";
}

export function buildQuoteWhatsappMessage(answers: QuoteAnswers): string {
  const sections: string[] = [
    "Olá, Reginaldo! Gostaria de solicitar um orçamento para pintura.",
    "",
    "Tipo de imóvel:",
    answers.propertyType ?? "Não informado",
    "",
    "Serviços:",
    answers.services.length > 0 ? answers.services.join(" + ") : "Não informado",
    "",
    "Área aproximada:",
    formatSizeSummary(answers),
    "",
    "Estado atual:",
    answers.condition ?? "Não informado",
    "",
    "Preparação:",
    answers.preparation ?? "Não informado",
    "",
    "Cores:",
    answers.colors ?? "Não informado",
    "",
    `Cliente: ${answers.customerName || "Não informado"}`,
    `Contato: ${answers.customerWhatsapp || "Não informado"}`,
    `Região: ${answers.customerLocation || "Não informado"}`,
  ];

  if (answers.customerMessage && answers.customerMessage.trim().length > 0) {
    sections.push(`Mensagem: ${answers.customerMessage.trim()}`);
  }

  return sections.join("\n");
}

export function buildQuoteSummaryItems(answers: QuoteAnswers): QuoteSummaryItem[] {
  return [
    {
      label: "Tipo de imóvel",
      value: answers.propertyType ?? "Não selecionado",
      stepIndex: 0,
    },
    {
      label: "Serviços",
      value: answers.services.length > 0 ? answers.services.join(" + ") : "Nenhum selecionado",
      stepIndex: 1,
    },
    {
      label: "Área aproximada",
      value: formatSizeSummary(answers),
      stepIndex: 2,
    },
    {
      label: "Estado atual",
      value: answers.condition ?? "Não selecionado",
      stepIndex: 3,
    },
    {
      label: "Preparação",
      value: answers.preparation ?? "Não selecionado",
      stepIndex: 4,
    },
    {
      label: "Cores",
      value: answers.colors ?? "Não selecionado",
      stepIndex: 5,
    },
    {
      label: "Contato e Região",
      value: `${answers.customerName || "—"} • ${answers.customerWhatsapp || "—"} • ${answers.customerLocation || "—"}`,
      stepIndex: 6,
    },
  ];
}
