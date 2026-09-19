export type PropertyType = "Casa" | "Apartamento" | "Comércio" | "Outro";

export type ServiceType =
  | "Paredes internas"
  | "Tetos"
  | "Fachada"
  | "Muros"
  | "Portas"
  | "Janelas"
  | "Garagem"
  | "Ambiente completo"
  | "Imóvel completo";

export type SizeOption =
  | "Até 50 m²"
  | "50–100 m²"
  | "100–200 m²"
  | "200–300 m²"
  | "Mais de 300 m²";

export type SurfaceCondition =
  | "Pintura em bom estado"
  | "Precisa apenas de uma nova pintura"
  | "Possui pequenas imperfeições"
  | "Possui rachaduras ou descascamentos"
  | "Possui manchas ou sinais de umidade"
  | "Precisa de bastante preparação"
  | "Não sei informar";

export type PreparationOption =
  | "Apenas pintura"
  | "Pintura + pequenos reparos"
  | "Pintura + preparação completa"
  | "Não sei, preciso de avaliação";

export type ColorsOption =
  | "Sim, já escolhi"
  | "Quero manter a cor atual"
  | "Quero mudar completamente"
  | "Ainda não sei"
  | "Quero sugestões de combinação";

export interface QuoteAnswers {
  propertyType: PropertyType | null;
  services: ServiceType[];
  sizeMode: "simple" | "advanced";
  sizeSimple: SizeOption | null;
  sizeAdvancedM2: number | null;
  condition: SurfaceCondition | null;
  preparation: PreparationOption | null;
  colors: ColorsOption | null;
  customerName: string;
  customerWhatsapp: string;
  customerLocation: string;
  customerMessage?: string;
}
