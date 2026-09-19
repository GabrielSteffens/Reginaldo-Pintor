import { describe, it, expect } from "vitest";
import { buildRecommendation, buildWhatsappSummary } from "./diagnosticSummary";
import type { DiagnosticAnswers } from "../data/diagnostic";

const baseAnswers: DiagnosticAnswers = {
  propertyType: null,
  areas: [],
  condition: null,
  objective: null,
  size: null,
  finish: null,
};

describe("buildRecommendation", () => {
  it("omits the prep clause when the surface is already in good condition", () => {
    const answers: DiagnosticAnswers = {
      ...baseAnswers,
      condition: "Boa condição, só precisa de nova cor",
      objective: "Mudar a cor",
    };
    expect(buildRecommendation(answers)).toBe(
      "Com base nas suas respostas, seu projeto pode envolver pintura de mudança de cor."
    );
  });

  it("prepends a surface-prep clause for any other condition", () => {
    const answers: DiagnosticAnswers = {
      ...baseAnswers,
      condition: "Com rachaduras",
      objective: "Reparar e repintar",
    };
    expect(buildRecommendation(answers)).toBe(
      "Com base nas suas respostas, seu projeto pode envolver preparo de superfície seguido de reparo pontual seguido de repintura."
    );
  });

  it("falls back to a generic clause when the objective is unanswered", () => {
    const answers: DiagnosticAnswers = { ...baseAnswers, condition: "Com rachaduras" };
    expect(buildRecommendation(answers)).toBe(
      "Com base nas suas respostas, seu projeto pode envolver preparo de superfície seguido de um projeto de pintura personalizado."
    );
  });

  it("never mentions a price", () => {
    const answers: DiagnosticAnswers = {
      ...baseAnswers,
      condition: "Mofo ou manchas de umidade",
      objective: "Reformar completamente o ambiente",
    };
    expect(buildRecommendation(answers)).not.toMatch(/R\$|\d/);
  });
});

describe("buildWhatsappSummary", () => {
  it("includes every answered field and omits unanswered ones", () => {
    const answers: DiagnosticAnswers = {
      propertyType: "Casa",
      areas: ["Sala de estar", "Quarto"],
      condition: "Desbotada ou manchada",
      objective: null,
      size: "Médio",
      finish: null,
    };
    const message = buildWhatsappSummary(answers);
    expect(message).toContain("Tipo de imóvel: Casa.");
    expect(message).toContain("Áreas: Sala de estar, Quarto.");
    expect(message).toContain("Condição da superfície: Desbotada ou manchada.");
    expect(message).not.toContain("Objetivo:");
    expect(message).toContain("Tamanho aproximado: Médio.");
    expect(message).not.toContain("Acabamento preferido:");
    expect(message).toContain("Gostaria de solicitar um orçamento.");
  });
});
