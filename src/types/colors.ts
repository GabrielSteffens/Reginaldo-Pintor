export type FacadeAreaId =
  | "wall"
  | "details"
  | "windows"
  | "door"
  | "garage"
  | "fence"
  | "roof";

export type ColorGroupId =
  | "neutros"
  | "terrosos"
  | "verdes"
  | "azuis"
  | "destaques";

export interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
  group: ColorGroupId;
  dark?: boolean;
}

export interface ColorGroup {
  id: ColorGroupId;
  label: string;
}

export interface FacadeArea {
  id: FacadeAreaId;
  label: string;
  defaultColor: string;
  description: string;
}

export type FacadePalette = Record<FacadeAreaId, string>;

export interface PresetCombination {
  id: string;
  name: string;
  description: string;
  colors: FacadePalette;
  previewColors: string[]; // 4 colors for the badge preview
  styleTag?: string;
}
