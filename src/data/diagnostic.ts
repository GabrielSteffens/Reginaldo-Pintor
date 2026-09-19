import type { IconName } from "../components/Icon.astro";

export interface DiagnosticOption {
  value: string;
  label: string;
  icon?: IconName;
}

export interface DiagnosticStep {
  id: "propertyType" | "areas" | "condition" | "objective" | "size" | "finish";
  question: string;
  multiSelect: boolean;
  options: DiagnosticOption[];
}

export interface DiagnosticAnswers {
  propertyType: string | null;
  areas: string[];
  condition: string | null;
  objective: string | null;
  size: string | null;
  finish: string | null;
}

export const diagnosticSteps: DiagnosticStep[] = [
  {
    id: "propertyType",
    question: "Que tipo de imóvel é?",
    multiSelect: false,
    options: [
      { value: "Casa", label: "Casa", icon: "house" },
      { value: "Apartamento", label: "Apartamento", icon: "building" },
      { value: "Comercial", label: "Comercial", icon: "store" },
      { value: "Outro", label: "Outro", icon: "moreHorizontal" },
    ],
  },
  {
    id: "areas",
    question: "Quais áreas precisam de pintura?",
    multiSelect: true,
    options: [
      { value: "Sala de estar", label: "Sala de estar", icon: "sofa" },
      { value: "Quarto", label: "Quarto", icon: "bed" },
      { value: "Cozinha", label: "Cozinha", icon: "cookingPot" },
      { value: "Banheiro", label: "Banheiro", icon: "bathtub" },
      { value: "Fachada / área externa", label: "Fachada / área externa", icon: "facade" },
      { value: "Garagem", label: "Garagem", icon: "garage" },
      { value: "Paredes e tetos", label: "Paredes e tetos", icon: "layers" },
      { value: "Imóvel inteiro", label: "Imóvel inteiro", icon: "grid" },
      { value: "Outro", label: "Outro", icon: "moreHorizontal" },
    ],
  },
  {
    id: "condition",
    question: "Qual é o estado atual da superfície?",
    multiSelect: false,
    options: [
      { value: "Boa condição, só precisa de nova cor", label: "Boa condição, só precisa de nova cor" },
      { value: "Desbotada ou manchada", label: "Desbotada ou manchada" },
      { value: "Com rachaduras", label: "Com rachaduras" },
      { value: "Com tinta descascando", label: "Com tinta descascando" },
      { value: "Com mofo ou manchas de umidade", label: "Com mofo ou manchas de umidade" },
      { value: "Muitas imperfeições", label: "Muitas imperfeições" },
      { value: "Precisa de preparo grande", label: "Precisa de preparo grande" },
    ],
  },
  {
    id: "objective",
    question: "O que você quer alcançar?",
    multiSelect: false,
    options: [
      { value: "Mudar a cor", label: "Mudar a cor" },
      { value: "Renovar a cor atual", label: "Renovar a cor atual" },
      { value: "Reparar e repintar", label: "Reparar e repintar" },
      { value: "Reformar completamente o ambiente", label: "Reformar completamente o ambiente" },
      { value: "Pintar a fachada", label: "Pintar a fachada" },
      { value: "Preparar o imóvel para venda ou aluguel", label: "Preparar o imóvel para venda ou aluguel" },
    ],
  },
  {
    id: "size",
    question: "Qual o tamanho aproximado?",
    multiSelect: false,
    options: [
      { value: "Pequeno", label: "Pequeno" },
      { value: "Médio", label: "Médio" },
      { value: "Grande", label: "Grande" },
      { value: "Imóvel inteiro", label: "Imóvel inteiro" },
    ],
  },
  {
    id: "finish",
    question: "Qual acabamento você prefere?",
    multiSelect: false,
    options: [
      { value: "Fosco", label: "Fosco" },
      { value: "Acetinado", label: "Acetinado" },
      { value: "Brilhante", label: "Brilhante" },
      { value: "Não sei / quero uma recomendação", label: "Não sei / quero uma recomendação" },
    ],
  },
];
