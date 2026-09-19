import { describe, it, expect } from "vitest";
import {
  buildQuoteWhatsappMessage,
  formatSizeSummary,
  buildQuoteSummaryItems,
} from "./quoteSummary";
import type { QuoteAnswers } from "../types/quote";

describe("quoteSummary", () => {
  const baseAnswers: QuoteAnswers = {
    propertyType: "Casa",
    services: ["Fachada", "Muros"],
    sizeMode: "simple",
    sizeSimple: "100–200 m²",
    sizeAdvancedM2: null,
    condition: "Possui pequenas imperfeições",
    preparation: "Pintura + pequenos reparos",
    colors: "Ainda não sei",
    customerName: "Gabriel",
    customerWhatsapp: "(11) 99999-9999",
    customerLocation: "Jardins",
    customerMessage: "Preferência para início nas próximas semanas.",
  };

  it("formats size summary for simple mode", () => {
    expect(formatSizeSummary(baseAnswers)).toBe("100–200 m²");
  });

  it("formats size summary for advanced mode", () => {
    const advancedAnswers: QuoteAnswers = {
      ...baseAnswers,
      sizeMode: "advanced",
      sizeSimple: null,
      sizeAdvancedM2: 145,
    };
    expect(formatSizeSummary(advancedAnswers)).toBe("Aproximadamente 145 m²");
  });

  it("builds structured WhatsApp message matching the approved format", () => {
    const message = buildQuoteWhatsappMessage(baseAnswers);
    expect(message).toContain("Olá, Reginaldo! Gostaria de solicitar um orçamento para pintura.");
    expect(message).toContain("Tipo de imóvel:\nCasa");
    expect(message).toContain("Serviços:\nFachada + Muros");
    expect(message).toContain("Área aproximada:\n100–200 m²");
    expect(message).toContain("Estado atual:\nPossui pequenas imperfeições");
    expect(message).toContain("Preparação:\nPintura + pequenos reparos");
    expect(message).toContain("Cores:\nAinda não sei");
    expect(message).toContain("Cliente: Gabriel");
    expect(message).toContain("Contato: (11) 99999-9999");
    expect(message).toContain("Região: Jardins");
    expect(message).toContain("Mensagem: Preferência para início nas próximas semanas.");
  });

  it("omits message line when customerMessage is empty or whitespace", () => {
    const noMessageAnswers: QuoteAnswers = {
      ...baseAnswers,
      customerMessage: "",
    };
    const message = buildQuoteWhatsappMessage(noMessageAnswers);
    expect(message).not.toContain("Mensagem:");
  });

  it("builds summary items with proper step indices for editing", () => {
    const items = buildQuoteSummaryItems(baseAnswers);
    expect(items).toHaveLength(7);
    expect(items[0]).toEqual({
      label: "Tipo de imóvel",
      value: "Casa",
      stepIndex: 0,
    });
    expect(items[1]).toEqual({
      label: "Serviços",
      value: "Fachada + Muros",
      stepIndex: 1,
    });
    expect(items[2]).toEqual({
      label: "Área aproximada",
      value: "100–200 m²",
      stepIndex: 2,
    });
  });
});
