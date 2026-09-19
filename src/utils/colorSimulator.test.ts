import { describe, it, expect } from "vitest";
import {
  findColorName,
  buildColorSummary,
  buildColorQuoteWhatsappMessage,
  getSmartRecommendations,
} from "./colorSimulator";
import { defaultFacadePalette } from "../data/colors";

describe("colorSimulator", () => {
  it("finds color name from hex correctly", () => {
    expect(findColorName("#ECE8E1")).toBe("Off-white");
    expect(findColorName("#B85D43")).toBe("Terracota");
    expect(findColorName("#999999")).toBe("#999999");
  });

  it("builds complete color summary for all 7 facade areas", () => {
    const summary = buildColorSummary(defaultFacadePalette);
    expect(summary).toHaveLength(7);
    expect(summary[0]).toEqual({
      areaId: "wall",
      areaLabel: "Paredes principais",
      colorName: "Off-white",
      hex: "#ECE8E1",
    });
    expect(summary.find((s) => s.areaId === "door")?.colorName).toBe("Madeira Nobre");
  });

  it("builds WhatsApp message containing all selected colors and professional tone", () => {
    const msg = buildColorQuoteWhatsappMessage(defaultFacadePalette);
    expect(msg).toContain("Olá, Reginaldo! Estive experimentando cores no simulador");
    expect(msg).toContain("• Paredes principais: Off-white");
    expect(msg).toContain("• Porta de entrada: Madeira Nobre");
    expect(msg).toContain("Gostaria de solicitar um orçamento para avaliar a pintura com essas cores");
  });

  it("returns smart recommendations based on wall color tone", () => {
    // Gray tone -> should recommend Moderno first
    const grayRecs = getSmartRecommendations("#D6D9DC");
    expect(grayRecs[0].id).toBe("moderno");

    // Earthy tone -> should recommend Natural or Aconchegante
    const warmRecs = getSmartRecommendations("#DFD5C6");
    expect(warmRecs[0].id).toBe("natural");
  });
});
