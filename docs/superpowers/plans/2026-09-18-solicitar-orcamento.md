# Solicitar Orçamento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive, multi-step "Solicitar Orçamento" section for Reginaldo Pinturas Residenciais, replacing the generic contact form with a 7-step wizard featuring progressive disclosure, dual-mode area estimation, summary review with inline editing, and formatted WhatsApp message generation.

**Architecture:** A new Astro component (`QuoteWizard.astro`) is embedded into `Contact.astro` (`#contato`). Data definitions live in `src/data/quote.ts` and `src/types/quote.ts`. Pure logic for summary composition and WhatsApp message generation lives in `src/utils/quoteSummary.ts`, tested via Vitest. Client-side state is handled with vanilla JavaScript and `data-*` attributes adhering to WCAG accessibility and design tokens in `tokens.css`.

**Tech Stack:** Astro 4.16, TypeScript 5.6, CSS Design Tokens, Vanilla JS, Vitest 2.1.

**Spec:** `docs/superpowers/specs/2026-09-18-solicitar-orcamento-design.md`

## Global Constraints

- Never invent or display exact prices; never promise a fixed quote without an on-site visit. Include the required transparency disclaimer: "Esta solicitação não substitui uma avaliação do local. O orçamento final depende das condições reais da superfície, metragem, preparação necessária e materiais."
- All new UI copy must be in Portuguese (pt-BR), matching `src/content/copy.ts`.
- Zero UI framework runtime: vanilla `<script>` with `data-*` attributes only.
- Reuse design tokens from `src/styles/tokens.css` (e.g. `--color-surface`, `--color-accent`, `--radius-control`, `--shadow-warm-soft`).
- Maintain mobile-first responsive layout with existing breakpoints (`min-width: 640px` and `min-width: 900px`).
- When `businessConfig.whatsappNumber` is null, degrade gracefully without breaking links.

---

### Task 1: Type Definitions and Data Model

**Files:**
- Create: `src/types/quote.ts`
- Create: `src/data/quote.ts`
- Modify: `src/content/copy.ts`

**Interfaces:**
- Produces: `PropertyType`, `ServiceType`, `SizeOption`, `SurfaceCondition`, `PreparationOption`, `ColorsOption`, `QuoteAnswers`, `quoteSteps` array, and `quoteWizard` copy object.

- [ ] **Step 1: Create type definitions in `src/types/quote.ts`**

```ts
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
```

- [ ] **Step 2: Create data options in `src/data/quote.ts`**

```ts
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
```

- [ ] **Step 3: Add `quoteWizard` copy to `src/content/copy.ts`**

Add to `src/content/copy.ts`:
```ts
export const quoteWizard = {
  heading: "Solicitar Orçamento",
  intro: "Monte os detalhes do seu projeto em poucos passos para receber uma estimativa personalizada.",
  stepCounter: (current: number, total: number) => `Passo ${current} de ${total}`,
  backLabel: "Voltar",
  nextLabel: "Avançar",
  summaryHeading: "Resumo do seu projeto",
  editLabel: "Editar",
  submitLabel: "Solicitar orçamento",
  colorAdviceTip: "O Reginaldo pode levar catálogos físicos e amostras de cores na visita técnica para ajudar você a definir a paleta ideal.",
  colorAdviceLink: "Ver dicas de cores",
  photoTip: "Dica: você também pode enviar fotos dos ambientes diretamente no WhatsApp com o Reginaldo após enviar a solicitação.",
  disclaimer: "Esta solicitação não substitui uma avaliação do local. O orçamento final depende das condições reais da superfície, metragem, preparação necessária e materiais.",
  labels: {
    property: "Tipo de imóvel",
    services: "Serviços",
    size: "Área aproximada",
    condition: "Estado atual",
    preparation: "Preparação",
    colors: "Cores",
    contact: "Contato e Região",
  },
};
```

- [ ] **Step 4: Type-check with `npm run check`**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 5: Commit changes**

```bash
git add src/types/quote.ts src/data/quote.ts src/content/copy.ts
git commit -m "feat(quote): add types, data options and copy for Solicitar Orcamento"
```

---

### Task 2: Utility Functions & Unit Test Suite

**Files:**
- Create: `src/utils/quoteSummary.ts`
- Create: `src/utils/quoteSummary.test.ts`

**Interfaces:**
- Produces: `buildQuoteWhatsappMessage(answers: QuoteAnswers): string` and `formatSizeSummary(answers: QuoteAnswers): string`

- [ ] **Step 1: Write unit tests in `src/utils/quoteSummary.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import {
  buildQuoteWhatsappMessage,
  formatSizeSummary,
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
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/utils/quoteSummary.test.ts`
Expected: FAIL with "Cannot find module ./quoteSummary"

- [ ] **Step 3: Implement `src/utils/quoteSummary.ts`**

```ts
import type { QuoteAnswers } from "../types/quote";

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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/utils/quoteSummary.test.ts`
Expected: 4 passed.

- [ ] **Step 5: Commit changes**

```bash
git add src/utils/quoteSummary.ts src/utils/quoteSummary.test.ts
git commit -m "feat(quote): add quote summary and WhatsApp message formatter with tests"
```

---

### Task 3: Interactive Quote Wizard Component

**Files:**
- Create: `src/components/QuoteWizard.astro`

**Interfaces:**
- Produces: Complete responsive 7-step wizard with dual size selector, progress bar, summary view with edit links, keyboard navigation, and WhatsApp redirection.

- [ ] **Step 1: Implement `src/components/QuoteWizard.astro`**

The component will render:
1. Progress bar with step counter text.
2. Step 1: Property Type (single select cards with icons).
3. Step 2: Service Selection (multi-select cards with icons).
4. Step 3: Size Estimation (Simple buttons vs Advanced m² numeric input).
5. Step 4: Surface Condition (single select cards).
6. Step 5: Preparation Level (single select cards).
7. Step 6: Color Planning (single select cards + callout banner for combination suggestions).
8. Step 7: Customer Info Form (Name, WhatsApp with mask, Neighborhood, Message).
9. Step 8: Project Summary (Structured breakdown, inline edit links per item, disclaimer, and "Solicitar orçamento" CTA).
10. Vanilla JS handling state transitions, validations, summary calculation, and WhatsApp URL generation.

- [ ] **Step 2: Type-check and build component**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 3: Commit changes**

```bash
git add src/components/QuoteWizard.astro
git commit -m "feat(quote): create interactive QuoteWizard component"
```

---

### Task 4: Integrate Wizard into Contact Section & Update Layout

**Files:**
- Modify: `src/components/Contact.astro`

**Interfaces:**
- Replaces the generic static form with `<QuoteWizard />` while maintaining direct contact chips (phone, WhatsApp, hours) and service area details.

- [ ] **Step 1: Update `src/components/Contact.astro`**

Embed `<QuoteWizard />` inside `#contato`, adjust section container styles to support the hybrid header + centered stepper card layout.

- [ ] **Step 2: Type-check with `npm run check`**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 3: Commit changes**

```bash
git add src/components/Contact.astro
git commit -m "feat(contact): integrate QuoteWizard into contact section"
```

---

### Task 5: End-to-End Verification & Static Build

**Files:**
- Test suite and build artifacts.

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: All tests passing (diagnosticSummary and quoteSummary).

- [ ] **Step 2: Run Astro type check**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Run static production build**

Run: `npm run build`
Expected: Complete build in `dist/` with 0 errors.
