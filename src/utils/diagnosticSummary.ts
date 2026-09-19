import type { DiagnosticAnswers } from "../data/diagnostic";

const NO_PREP_CONDITION = "Boa condição, só precisa de nova cor";

const OBJECTIVE_CLAUSES: Record<string, string> = {
  "Mudar a cor": "pintura de mudança de cor",
  "Renovar a cor atual": "uma renovação da cor atual",
  "Reparar e repintar": "reparo pontual seguido de repintura",
  "Reformar completamente o ambiente": "uma reforma completa de pintura",
  "Pintar a fachada": "pintura externa da fachada",
  "Preparar o imóvel para venda ou aluguel": "pintura de preparação para venda ou aluguel",
};

const FALLBACK_OBJECTIVE_CLAUSE = "um projeto de pintura personalizado";

export function buildRecommendation(answers: DiagnosticAnswers): string {
  const objectiveClause = answers.objective
    ? OBJECTIVE_CLAUSES[answers.objective] ?? FALLBACK_OBJECTIVE_CLAUSE
    : FALLBACK_OBJECTIVE_CLAUSE;

  const needsPrep = Boolean(answers.condition) && answers.condition !== NO_PREP_CONDITION;
  const prepClause = needsPrep ? "preparo de superfície seguido de " : "";

  return `Com base nas suas respostas, seu projeto pode envolver ${prepClause}${objectiveClause}.`;
}

export function buildWhatsappSummary(answers: DiagnosticAnswers): string {
  const lines = [
    "Olá! Fiz o diagnóstico de pintura no site e meu perfil é:",
    answers.propertyType ? `Tipo de imóvel: ${answers.propertyType}.` : null,
    answers.areas.length > 0 ? `Áreas: ${answers.areas.join(", ")}.` : null,
    answers.condition ? `Condição da superfície: ${answers.condition}.` : null,
    answers.objective ? `Objetivo: ${answers.objective}.` : null,
    answers.size ? `Tamanho aproximado: ${answers.size}.` : null,
    answers.finish ? `Acabamento preferido: ${answers.finish}.` : null,
    "Gostaria de solicitar um orçamento.",
  ];
  return lines.filter((line): line is string => Boolean(line)).join(" ");
}
