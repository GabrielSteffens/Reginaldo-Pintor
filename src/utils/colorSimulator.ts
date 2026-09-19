import type { FacadeAreaId, FacadePalette, PresetCombination } from "../types/colors";
import { facadeAreas, colorSwatches, presetCombinations } from "../data/colors";

export interface ColorSummaryItem {
  areaId: FacadeAreaId;
  areaLabel: string;
  colorName: string;
  hex: string;
}

export function findColorName(hex: string): string {
  const normalized = hex.toUpperCase();
  const found = colorSwatches.find((s) => s.hex.toUpperCase() === normalized);
  return found ? found.name : hex;
}

export function buildColorSummary(palette: FacadePalette): ColorSummaryItem[] {
  return facadeAreas.map((area) => {
    const hex = palette[area.id] || area.defaultColor;
    return {
      areaId: area.id,
      areaLabel: area.label,
      colorName: findColorName(hex),
      hex,
    };
  });
}

export function buildColorQuoteWhatsappMessage(palette: FacadePalette): string {
  const summaryItems = buildColorSummary(palette);
  const itemsText = summaryItems
    .map((item) => `• ${item.areaLabel}: ${item.colorName}`)
    .join("\n");

  return [
    "Olá, Reginaldo! Estive experimentando cores no simulador do seu site e montei uma combinação que gostei muito para minha fachada:",
    "",
    itemsText,
    "",
    "Gostaria de solicitar um orçamento para avaliar a pintura com essas cores na minha casa.",
  ].join("\n");
}

export function getSmartRecommendations(currentWallHex: string): PresetCombination[] {
  const hex = currentWallHex.toUpperCase();

  // If wall is grayish
  if (hex === "#D6D9DC" || hex === "#8F9499" || hex === "#4A4D52") {
    return [
      presetCombinations.find((p) => p.id === "moderno")!,
      presetCombinations.find((p) => p.id === "nordico")!,
      presetCombinations.find((p) => p.id === "contemporaneo")!,
    ].filter(Boolean);
  }

  // If wall is earthy or warm
  if (hex === "#D8CEBE" || hex === "#DFD5C6" || hex === "#B85D43" || hex === "#C1854F") {
    return [
      presetCombinations.find((p) => p.id === "natural")!,
      presetCombinations.find((p) => p.id === "aconchegante")!,
      presetCombinations.find((p) => p.id === "classico")!,
    ].filter(Boolean);
  }

  // Default: Off-white / white / general
  return [
    presetCombinations.find((p) => p.id === "contemporaneo")!,
    presetCombinations.find((p) => p.id === "classico")!,
    presetCombinations.find((p) => p.id === "moderno")!,
  ].filter(Boolean);
}
