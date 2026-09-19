import type { IconName } from "../types/icons";
import type {
  PropertyType,
  ServiceType,
  SizeOption,
  SurfaceCondition,
  PreparationOption,
  ColorsOption,
} from "../types/quote";

export interface OptionItem<T extends string> {
  value: T;
  label: string;
  icon?: IconName;
  hint?: string;
}

export const propertyOptions: OptionItem<PropertyType>[] = [
  { value: "Casa", label: "Casa", icon: "house" },
  { value: "Apartamento", label: "Apartamento", icon: "building" },
  { value: "Comércio", label: "Comércio", icon: "store" },
  { value: "Outro", label: "Outro", icon: "moreHorizontal" },
];

export const serviceOptions: OptionItem<ServiceType>[] = [
  { value: "Paredes internas", label: "Paredes internas", icon: "roller" },
  { value: "Tetos", label: "Tetos", icon: "layers" },
  { value: "Fachada", label: "Fachada", icon: "facade" },
  { value: "Muros", label: "Muros", icon: "wallCorner" },
  { value: "Portas", label: "Portas", icon: "wallCorner" },
  { value: "Janelas", label: "Janelas", icon: "grid" },
  { value: "Garagem", label: "Garagem", icon: "garage" },
  { value: "Ambiente completo", label: "Ambiente completo", icon: "sofa" },
  { value: "Imóvel completo", label: "Imóvel completo", icon: "house" },
];

export const sizeSimpleOptions: OptionItem<SizeOption>[] = [
  { value: "Até 50 m²", label: "Até 50 m²" },
  { value: "50–100 m²", label: "50–100 m²" },
  { value: "100–200 m²", label: "100–200 m²" },
  { value: "200–300 m²", label: "200–300 m²" },
  { value: "Mais de 300 m²", label: "Mais de 300 m²" },
];

export const conditionOptions: OptionItem<SurfaceCondition>[] = [
  { value: "Pintura em bom estado", label: "Pintura em bom estado" },
  { value: "Precisa apenas de uma nova pintura", label: "Precisa apenas de uma nova pintura" },
  { value: "Possui pequenas imperfeições", label: "Possui pequenas imperfeições" },
  { value: "Possui rachaduras ou descascamentos", label: "Possui rachaduras ou descascamentos" },
  { value: "Possui manchas ou sinais de umidade", label: "Possui manchas ou sinais de umidade" },
  { value: "Precisa de bastante preparação", label: "Precisa de bastante preparação" },
  { value: "Não sei informar", label: "Não sei informar" },
];

export const preparationOptions: OptionItem<PreparationOption>[] = [
  { value: "Apenas pintura", label: "Apenas pintura" },
  { value: "Pintura + pequenos reparos", label: "Pintura + pequenos reparos" },
  { value: "Pintura + preparação completa", label: "Pintura + preparação completa" },
  { value: "Não sei, preciso de avaliação", label: "Não sei, preciso de avaliação" },
];

export const colorsOptions: OptionItem<ColorsOption>[] = [
  { value: "Sim, já escolhi", label: "Sim, já escolhi" },
  { value: "Quero manter a cor atual", label: "Quero manter a cor atual" },
  { value: "Quero mudar completamente", label: "Quero mudar completamente" },
  { value: "Ainda não sei", label: "Ainda não sei" },
  { value: "Quero sugestões de combinação", label: "Quero sugestões de combinação" },
];
