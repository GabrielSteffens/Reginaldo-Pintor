# Diagnóstico de Pintura Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive, multi-step "Diagnóstico de Pintura" tool to the Reginaldo Pinturas Residenciais site — a full-screen wizard that qualifies a visitor's painting need across 6 steps, shows a plain-language summary + hedged recommendation, and hands off to the existing WhatsApp quote flow.

**Architecture:** A new Astro component (`Diagnostic.astro`) renders both an in-page teaser section and a native `<dialog>` wizard, reusing existing design tokens/components (`SwatchPanel`, `Icon`, `.btn`, `.chip`) and the site's established vanilla-JS + `data-*` attribute interaction pattern (same style as `Transformation.astro`/`WorkProcess.astro`). Six steps of data-driven options (`src/data/diagnostic.ts`) feed the wizard; a small pure-function module (`diagnosticSummary.ts`) derives a hedged recommendation sentence and a WhatsApp summary message, reusing the existing `whatsappHref()` handoff every other CTA on the site already relies on.

**Tech Stack:** Astro 4.16, TypeScript, vanilla client-side `<script>` (no framework, no client router). Vitest is added as a new devDependency solely to unit-test the one piece of branching logic in this feature (`diagnosticSummary.ts`) — there is no existing test framework in this repo, and UI components remain verified by type-checking (`astro check`) plus manual browser walkthrough, matching this project's existing testing culture.

**Spec:** `docs/superpowers/specs/2026-09-18-diagnostico-pintura-design.md`

## Global Constraints

- Never invent or display prices; never promise an exact quote from the diagnostic alone (spec §1, §3.3). All recommendation copy uses hedged language ("pode envolver"), never "vai custar" or a number.
- All new UI copy is Portuguese (pt-BR), matching every other string in `src/content/copy.ts`.
- No new UI framework or client-side router — vanilla `<script>` + `data-*` attributes only, matching `Transformation.astro`/`WorkProcess.astro`/`Contact.astro`.
- Every new color/spacing/radius/motion value must come from `src/styles/tokens.css` custom properties — no hardcoded hex/px values for anything already tokenized.
- Mobile-first; the project's existing breakpoint is `(min-width: 900px)`, used consistently across `Header.astro`, `WorkProcess.astro`, `Contact.astro` — reuse it (plus one extra `560px` breakpoint already used nowhere else but needed for the option grid, documented per-task below).
- Answers persist only in memory for the page session (no `localStorage`/`sessionStorage`), per spec §2.
- WhatsApp CTAs must reuse `whatsappHref()` / `isWhatsappConfigured()` from `src/utils/whatsapp.ts` and fall back to `#contato` exactly like `Contact.astro` already does when `businessConfig.whatsappNumber` is `null` — never a dead link, never a fake number.
- Respect `prefers-reduced-motion` — the global rule in `src/styles/global.css` already collapses all CSS transitions; any JS-driven timing (e.g. the step-transition delay) must also check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` and skip the delay, not just the CSS.
- This repository was just initialized with `git init` (see baseline commit `7213807`). Commit after every task as specified below.

---

### Task 1: New icons for property type, areas, and size categories

**Files:**
- Modify: `src/components/Icon.astro`

**Interfaces:**
- Produces: `export type IconName` (union of all valid `name` values, existing 11 + 12 new: `house`, `building`, `store`, `moreHorizontal`, `sofa`, `bed`, `cookingPot`, `bathtub`, `facade`, `garage`, `layers`, `grid`). Later tasks import this type from `../components/Icon.astro`.

- [ ] **Step 1: Export the icon name union as a named type**

  In `src/components/Icon.astro`, replace the inline `name` union inside `Props` with an exported type alias, so other files can import it:

  ```astro
  ---
  export type IconName =
    | "roller"
    | "brush"
    | "drop"
    | "wallCorner"
    | "tape"
    | "check"
    | "phone"
    | "clipboard"
    | "whatsapp"
    | "chevronDown"
    | "arrows"
    | "house"
    | "building"
    | "store"
    | "moreHorizontal"
    | "sofa"
    | "bed"
    | "cookingPot"
    | "bathtub"
    | "facade"
    | "garage"
    | "layers"
    | "grid";

  interface Props {
    name: IconName;
    size?: number;
    class?: string;
  }

  const { name, size = 20, class: className } = Astro.props;
  ---
  ```

- [ ] **Step 2: Add the 12 new icon render blocks**

  Append these directly after the existing `arrows` block (before the closing of the file), following the exact same conditional-render pattern:

  ```astro
  {
    name === "house" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <path d="M4 11 12 4l8 7" />
        <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
        <path d="M10 20v-6h4v6" />
      </svg>
    )
  }
  {
    name === "building" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <rect x="6" y="3" width="12" height="18" rx="1" />
        <line x1="9" y1="7" x2="9" y2="9.5" />
        <line x1="15" y1="7" x2="15" y2="9.5" />
        <line x1="9" y1="12" x2="9" y2="14.5" />
        <line x1="15" y1="12" x2="15" y2="14.5" />
        <line x1="10" y1="21" x2="10" y2="17" />
        <line x1="14" y1="21" x2="14" y2="17" />
      </svg>
    )
  }
  {
    name === "store" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <path d="M4 9 5 4h14l1 5" />
        <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
        <path d="M4 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
        <line x1="10" y1="20" x2="10" y2="14" />
        <line x1="14" y1="20" x2="14" y2="14" />
      </svg>
    )
  }
  {
    name === "moreHorizontal" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <circle cx="5" cy="12" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  {
    name === "sofa" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <path d="M5 12V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
        <rect x="3" y="12" width="18" height="6" rx="1.5" />
        <line x1="5" y1="18" x2="5" y2="20" />
        <line x1="19" y1="18" x2="19" y2="20" />
      </svg>
    )
  }
  {
    name === "bed" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <path d="M3 19v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
        <path d="M3 16h18" />
        <rect x="5" y="10" width="6" height="4" rx="1" />
        <line x1="3" y1="19" x2="3" y2="21" />
        <line x1="21" y1="19" x2="21" y2="21" />
      </svg>
    )
  }
  {
    name === "cookingPot" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <path d="M4 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3Z" />
        <line x1="2" y1="11" x2="4" y2="11" />
        <line x1="20" y1="11" x2="22" y2="11" />
        <line x1="9" y1="8" x2="9" y2="5" />
        <line x1="15" y1="8" x2="15" y2="5" />
      </svg>
    )
  }
  {
    name === "bathtub" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3Z" />
        <path d="M5 12V8a2 2 0 0 1 2-2h1" />
        <line x1="6" y1="7" x2="6" y2="9" />
        <line x1="3" y1="19" x2="3" y2="21" />
        <line x1="21" y1="19" x2="21" y2="21" />
      </svg>
    )
  }
  {
    name === "facade" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <rect x="7" y="7" width="4" height="4" />
        <rect x="13" y="7" width="4" height="4" />
        <path d="M10 20v-6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6" />
      </svg>
    )
  }
  {
    name === "garage" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <path d="M3 10 12 4l9 6" />
        <path d="M4 10v10h16V10" />
        <rect x="7" y="12" width="10" height="8" />
        <line x1="7" y1="15" x2="17" y2="15" />
        <line x1="7" y1="18" x2="17" y2="18" />
      </svg>
    )
  }
  {
    name === "layers" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <path d="M12 3 21 8 12 13 3 8Z" />
        <path d="M3 13l9 5 9-5" />
        <path d="M3 18l9 5 9-5" />
      </svg>
    )
  }
  {
    name === "grid" && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </svg>
    )
  }
  ```

- [ ] **Step 3: Type-check**

  Run: `npm run check`
  Expected: passes with no new errors (existing icon usages elsewhere in the codebase are unaffected — this is a purely additive change).

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/Icon.astro
  git commit -m "feat(icons): add property, area, and space icons for the diagnostic tool"
  ```

---

### Task 2: Diagnostic step data model

**Files:**
- Create: `src/data/diagnostic.ts`

**Interfaces:**
- Consumes: `IconName` from `src/components/Icon.astro` (Task 1).
- Produces:
  - `export interface DiagnosticOption { value: string; label: string; icon?: IconName }`
  - `export interface DiagnosticStep { id: "propertyType" | "areas" | "condition" | "objective" | "size" | "finish"; question: string; multiSelect: boolean; options: DiagnosticOption[] }`
  - `export interface DiagnosticAnswers { propertyType: string | null; areas: string[]; condition: string | null; objective: string | null; size: string | null; finish: string | null }`
  - `export const diagnosticSteps: DiagnosticStep[]` — exactly 6 steps, in this order: `propertyType`, `areas`, `condition`, `objective`, `size`, `finish`. `size` and `finish` options MUST stay in this exact order (index 0–3): small/medium/large/full-property, and matte/satin/gloss/unknown respectively — later tasks (Diagnostic.astro) map option index to a visual swatch style positionally.
  - Every `value` string here is authoritative — `diagnosticSummary.ts` (Task 3) matches against these exact strings.

- [ ] **Step 1: Create the data file**

  ```ts
  // src/data/diagnostic.ts
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
  ```

- [ ] **Step 2: Type-check**

  Run: `npm run check`
  Expected: passes with no errors (confirms every `icon` value used above is a valid `IconName` from Task 1).

- [ ] **Step 3: Commit**

  ```bash
  git add src/data/diagnostic.ts
  git commit -m "feat(diagnostic): add step/option data model for the painting diagnostic"
  ```

---

### Task 3: Recommendation & WhatsApp summary logic (TDD)

**Files:**
- Create: `src/utils/diagnosticSummary.ts`
- Create: `src/utils/diagnosticSummary.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `DiagnosticAnswers` from `src/data/diagnostic.ts` (Task 2).
- Produces:
  - `export function buildRecommendation(answers: DiagnosticAnswers): string` — one hedged sentence, never a number or "R$".
  - `export function buildWhatsappSummary(answers: DiagnosticAnswers): string` — one message listing every answered field, suitable for `whatsappHref()`.

- [ ] **Step 1: Add vitest and a test script**

  In `package.json`, add to `"scripts"`:
  ```json
  "test": "vitest run"
  ```
  and add to `"devDependencies"`:
  ```json
  "vitest": "^2.1.8"
  ```

- [ ] **Step 2: Install**

  Run: `npm install`
  Expected: installs cleanly, `vitest` appears in `node_modules`.

- [ ] **Step 3: Add a minimal Vitest config**

  ```ts
  // vitest.config.ts
  import { defineConfig } from "vitest/config";

  export default defineConfig({
    test: {
      include: ["src/**/*.test.ts"],
    },
  });
  ```

- [ ] **Step 4: Write the failing tests**

  ```ts
  // src/utils/diagnosticSummary.test.ts
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
  ```

- [ ] **Step 5: Run tests, verify they fail**

  Run: `npm run test`
  Expected: FAIL — `Cannot find module './diagnosticSummary'` (file doesn't exist yet).

- [ ] **Step 6: Implement**

  ```ts
  // src/utils/diagnosticSummary.ts
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
  ```

- [ ] **Step 7: Run tests, verify they pass**

  Run: `npm run test`
  Expected: PASS — all 5 tests green.

- [ ] **Step 8: Type-check**

  Run: `npm run check`
  Expected: passes with no errors.

- [ ] **Step 9: Commit**

  ```bash
  git add package.json package-lock.json vitest.config.ts src/utils/diagnosticSummary.ts src/utils/diagnosticSummary.test.ts
  git commit -m "feat(diagnostic): add recommendation and WhatsApp summary logic with tests"
  ```

---

### Task 4: Copy additions and nav entry

**Files:**
- Modify: `src/content/copy.ts`

**Interfaces:**
- Produces: `export const diagnostic` object consumed by `Diagnostic.astro` (Task 5), with this exact shape:
  ```ts
  {
    teaserHeading: string;
    teaserIntro: string;
    teaserCtaLabel: string;
    closeLabel: string;
    backLabel: string;
    nextLabel: string;
    resultCtaLabel: string;
    stepLabel: (current: number, total: number) => string;
    resultHeading: string;
    editLabel: string;
    conversionHeading: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  }
  ```
- `nav.links` gets one more entry, used automatically by `Header.astro` (no changes needed there — it already maps generically over `nav.links`).

- [ ] **Step 1: Add the nav entry**

  In `src/content/copy.ts`, edit the existing `nav.links` array — insert `{ href: "#diagnostico", label: "Diagnóstico" }` between the `#portfolio` and `#faq` entries (matching the page position `Diagnostic.astro` will occupy — after `Portfolio`, before `Faq`):

  ```ts
  export const nav = {
    brandHref: "#topo",
    links: [
      { href: "#servicos", label: "Serviços" },
      { href: "#transformacao", label: "Transformação" },
      { href: "#processo", label: "Como funciona" },
      { href: "#portfolio", label: "Portfólio" },
      { href: "#diagnostico", label: "Diagnóstico" },
      { href: "#faq", label: "Dúvidas" },
    ],
    ctaLabel: "Solicitar orçamento",
  };
  ```

- [ ] **Step 2: Add the `diagnostic` copy export**

  Append this new export anywhere after `portfolio` and before `whyProfessional` in `src/content/copy.ts` (keeps it near the sections it neighbors on the page):

  ```ts
  export const diagnostic = {
    teaserHeading: "Diagnóstico de pintura",
    teaserIntro:
      "Responda 6 perguntas rápidas e veja um resumo do seu projeto antes de pedir um orçamento.",
    teaserCtaLabel: "Começar diagnóstico",
    closeLabel: "Fechar",
    backLabel: "Voltar",
    nextLabel: "Avançar",
    resultCtaLabel: "Ver resultado",
    stepLabel: (current: number, total: number) => `Passo ${current} de ${total}`,
    resultHeading: "Seu perfil de pintura",
    editLabel: "Editar",
    conversionHeading: "Quer transformar esse diagnóstico em um orçamento?",
    primaryCtaLabel: "Calcular meu orçamento",
    secondaryCtaLabel: "Falar com o Reginaldo",
  };
  ```

- [ ] **Step 3: Type-check**

  Run: `npm run check`
  Expected: passes with no errors.

- [ ] **Step 4: Commit**

  ```bash
  git add src/content/copy.ts
  git commit -m "feat(diagnostic): add nav entry and copy for the diagnostic tool"
  ```

---

### Task 5: Diagnostic.astro component + page integration

**Files:**
- Create: `src/components/Diagnostic.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes:
  - `diagnosticSteps`, `type DiagnosticStep`, `type DiagnosticAnswers` from `src/data/diagnostic.ts` (Task 2)
  - `diagnostic as diagnosticCopy` from `src/content/copy.ts` (Task 4)
  - `buildRecommendation`, `buildWhatsappSummary` from `src/utils/diagnosticSummary.ts` (Task 3)
  - `whatsappHref`, `isWhatsappConfigured` from `src/utils/whatsapp.ts` (existing)
  - `Icon` (Task 1), `SwatchPanel` (existing)
- Produces: `<Diagnostic />` — a self-contained component with no props, rendering the `#diagnostico` teaser section and the wizard `<dialog>`. `index.astro` renders it once.

- [ ] **Step 1: Create the component — frontmatter and teaser section**

  ```astro
  ---
  // src/components/Diagnostic.astro
  import { diagnosticSteps } from "../data/diagnostic";
  import { diagnostic as diagnosticCopy } from "../content/copy";
  import Icon from "./Icon.astro";
  import SwatchPanel from "./SwatchPanel.astro";

  const totalSteps = diagnosticSteps.length;
  const SIZE_MODIFIERS = ["small", "medium", "large", "full"];
  const FINISH_MODIFIERS = ["matte", "satin", "gloss", "unknown"];
  ---

  <section id="diagnostico" class="section section--surface diagnostic-teaser">
    <div class="container diagnostic-teaser__grid">
      <SwatchPanel color="accentOchre" ratio="4 / 3" class="diagnostic-teaser__visual">
        <Icon name="clipboard" size={40} />
      </SwatchPanel>
      <div class="diagnostic-teaser__body">
        <h2>{diagnosticCopy.teaserHeading}</h2>
        <p>{diagnosticCopy.teaserIntro}</p>
        <button type="button" class="btn btn--primary" data-diag-open>
          {diagnosticCopy.teaserCtaLabel}
        </button>
      </div>
    </div>
  </section>
  ```

- [ ] **Step 2: Add the dialog markup**

  Append directly after the teaser `</section>`:

  ```astro
  <dialog class="diag-dialog" data-diag-dialog aria-labelledby="diag-dialog-title">
    <div class="diag-dialog__inner">
      <h2 id="diag-dialog-title" class="visually-hidden">{diagnosticCopy.teaserHeading}</h2>

      <header class="diag-header">
        <div class="diag-progress" role="progressbar" aria-valuemin="1" aria-valuemax={totalSteps} aria-valuenow="1" data-diag-progress>
          <span class="diag-progress__track">
            <span class="diag-progress__fill" data-diag-progress-fill></span>
          </span>
          <span class="diag-progress__label" data-diag-progress-label></span>
        </div>
        <button type="button" class="diag-close" data-diag-close aria-label={diagnosticCopy.closeLabel}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <p class="visually-hidden" role="status" aria-live="polite" data-diag-announce></p>

      <div class="diag-panels" data-diag-panels>
        {diagnosticSteps.map((step, index) => (
          <section class="diag-panel" data-diag-panel data-step-index={index} data-step-id={step.id} hidden={index !== 0}>
            <h3 class="diag-panel__question">{step.question}</h3>

            <div class:list={["diag-options", { "diag-options--compact": step.id === "size" || step.id === "finish" }]} role="group" aria-label={step.question}>
              {step.options.map((option, optionIndex) => (
                <button type="button" class="diag-option" data-diag-option data-value={option.value} aria-pressed="false">
                  {step.id === "size" && (
                    <span class={`diag-size-swatch diag-size-swatch--${SIZE_MODIFIERS[optionIndex]}`} aria-hidden="true"></span>
                  )}
                  {step.id === "finish" && (
                    <span class={`diag-finish-swatch diag-finish-swatch--${FINISH_MODIFIERS[optionIndex]}`} aria-hidden="true"></span>
                  )}
                  {step.id !== "size" && step.id !== "finish" && option.icon && (
                    <Icon name={option.icon} size={26} class="diag-option__icon" />
                  )}
                  <span class="diag-option__label">{option.label}</span>
                  <span class="diag-option__indicator" aria-hidden="true"></span>
                </button>
              ))}
            </div>
          </section>
        ))}

        <section class="diag-panel" data-diag-panel data-step-index={totalSteps} hidden>
          <h3 class="diag-panel__question">{diagnosticCopy.resultHeading}</h3>

          <ul class="diag-summary" data-diag-summary></ul>

          <p class="diag-recommendation" data-diag-recommendation></p>

          <div class="diag-conversion">
            <h4>{diagnosticCopy.conversionHeading}</h4>
            <div class="diag-conversion__actions">
              <a class="btn btn--primary" data-diag-primary-cta href="#contato">{diagnosticCopy.primaryCtaLabel}</a>
              <a class="btn btn--secondary" data-diag-secondary-cta href="#contato">{diagnosticCopy.secondaryCtaLabel}</a>
            </div>
          </div>
        </section>
      </div>

      <footer class="diag-footer">
        <button type="button" class="btn btn--secondary" data-diag-back>{diagnosticCopy.backLabel}</button>
        <button type="button" class="btn btn--primary" data-diag-next disabled>{diagnosticCopy.nextLabel}</button>
      </footer>
    </div>
  </dialog>
  ```

- [ ] **Step 3: Add the client script**

  Append directly after the `</dialog>`:

  ```astro
  <script>
    import { diagnosticSteps, type DiagnosticStep, type DiagnosticAnswers } from "../data/diagnostic";
    import { buildRecommendation, buildWhatsappSummary } from "../utils/diagnosticSummary";
    import { whatsappHref, isWhatsappConfigured } from "../utils/whatsapp";
    import { diagnostic as diagnosticCopy } from "../content/copy";

    const dialog = document.querySelector<HTMLDialogElement>("[data-diag-dialog]");
    const openBtn = document.querySelector<HTMLButtonElement>("[data-diag-open]");
    const closeBtn = document.querySelector<HTMLButtonElement>("[data-diag-close]");
    const backBtn = document.querySelector<HTMLButtonElement>("[data-diag-back]");
    const nextBtn = document.querySelector<HTMLButtonElement>("[data-diag-next]");
    const panelsWrapper = document.querySelector<HTMLElement>("[data-diag-panels]");
    const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-diag-panel]"));
    const progressFill = document.querySelector<HTMLElement>("[data-diag-progress-fill]");
    const progressLabel = document.querySelector<HTMLElement>("[data-diag-progress-label]");
    const progressBar = document.querySelector<HTMLElement>("[data-diag-progress]");
    const announce = document.querySelector<HTMLElement>("[data-diag-announce]");
    const summaryList = document.querySelector<HTMLElement>("[data-diag-summary]");
    const recommendationEl = document.querySelector<HTMLElement>("[data-diag-recommendation]");
    const primaryCta = document.querySelector<HTMLAnchorElement>("[data-diag-primary-cta]");
    const secondaryCta = document.querySelector<HTMLAnchorElement>("[data-diag-secondary-cta]");

    const ready =
      dialog && openBtn && closeBtn && backBtn && nextBtn && panelsWrapper &&
      progressFill && progressLabel && progressBar && announce &&
      summaryList && recommendationEl && primaryCta && secondaryCta;

    if (ready) {
      const totalSteps = diagnosticSteps.length;
      const RESULT_INDEX = totalSteps;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const answers: DiagnosticAnswers = {
        propertyType: null,
        areas: [],
        condition: null,
        objective: null,
        size: null,
        finish: null,
      };

      let currentIndex = 0;

      function setSingleAnswer(step: DiagnosticStep, value: string) {
        switch (step.id) {
          case "propertyType":
            answers.propertyType = value;
            break;
          case "condition":
            answers.condition = value;
            break;
          case "objective":
            answers.objective = value;
            break;
          case "size":
            answers.size = value;
            break;
          case "finish":
            answers.finish = value;
            break;
          default:
            break;
        }
      }

      function toggleAreaAnswer(value: string) {
        const idx = answers.areas.indexOf(value);
        if (idx >= 0) answers.areas.splice(idx, 1);
        else answers.areas.push(value);
      }

      function getAnswerValue(step: DiagnosticStep): string | string[] | null {
        switch (step.id) {
          case "propertyType":
            return answers.propertyType;
          case "areas":
            return answers.areas;
          case "condition":
            return answers.condition;
          case "objective":
            return answers.objective;
          case "size":
            return answers.size;
          case "finish":
            return answers.finish;
          default:
            return null;
        }
      }

      function isStepAnswered(index: number): boolean {
        const step = diagnosticSteps[index];
        if (!step) return true;
        return step.multiSelect ? answers.areas.length > 0 : Boolean(getAnswerValue(step));
      }

      function renderOptionsState(panel: HTMLElement, step: DiagnosticStep) {
        const value = getAnswerValue(step);
        panel.querySelectorAll<HTMLButtonElement>("[data-diag-option]").forEach((btn) => {
          const optValue = btn.dataset.value ?? "";
          const selected = Array.isArray(value) ? value.includes(optValue) : value === optValue;
          btn.classList.toggle("diag-option--selected", selected);
          btn.setAttribute("aria-pressed", String(selected));
        });
      }

      function renderSummary() {
        summaryList.innerHTML = "";
        diagnosticSteps.forEach((step, index) => {
          const value = getAnswerValue(step);
          const displayValue = Array.isArray(value) ? value.join(", ") : value;
          if (!displayValue) return;

          const li = document.createElement("li");
          li.className = "diag-summary__row";

          const question = document.createElement("span");
          question.className = "diag-summary__question";
          question.textContent = step.question;

          const chip = document.createElement("span");
          chip.className = "chip diag-summary__value";
          const swatch = document.createElement("span");
          swatch.className = "chip__swatch chip__swatch--accent";
          chip.append(swatch, document.createTextNode(displayValue));

          const editBtn = document.createElement("button");
          editBtn.type = "button";
          editBtn.className = "diag-summary__edit";
          editBtn.textContent = diagnosticCopy.editLabel;
          editBtn.addEventListener("click", () => goToStep(index));

          li.append(question, chip, editBtn);
          summaryList.appendChild(li);
        });

        recommendationEl.textContent = buildRecommendation(answers);

        const configured = isWhatsappConfigured();
        const summaryMessage = buildWhatsappSummary(answers);
        primaryCta.href = configured ? whatsappHref(summaryMessage) : "#contato";
        secondaryCta.href = configured
          ? whatsappHref("Olá! Tenho uma dúvida sobre pintura residencial.")
          : "#contato";
      }

      function updateFooter() {
        const onResult = currentIndex === RESULT_INDEX;
        backBtn.disabled = currentIndex === 0;
        nextBtn.hidden = onResult;
        if (!onResult) {
          nextBtn.textContent =
            currentIndex === totalSteps - 1 ? diagnosticCopy.resultCtaLabel : diagnosticCopy.nextLabel;
          nextBtn.disabled = !isStepAnswered(currentIndex);
        }
      }

      function updateProgress() {
        const shownStep = Math.min(currentIndex + 1, totalSteps);
        const pct = (shownStep / totalSteps) * 100;
        progressFill.style.width = `${pct}%`;
        const label =
          currentIndex === RESULT_INDEX
            ? diagnosticCopy.resultHeading
            : diagnosticCopy.stepLabel(shownStep, totalSteps);
        progressLabel.textContent = label;
        progressBar.setAttribute("aria-valuenow", String(shownStep));
        announce.textContent =
          currentIndex === RESULT_INDEX
            ? diagnosticCopy.resultHeading
            : `${label}: ${diagnosticSteps[currentIndex]?.question ?? ""}`;
      }

      function applyStep(index: number) {
        currentIndex = index;
        panels.forEach((panel) => {
          panel.hidden = Number(panel.dataset.stepIndex) !== index;
        });
        if (index === RESULT_INDEX) renderSummary();
        updateFooter();
        updateProgress();
        const activePanel = panels.find((panel) => Number(panel.dataset.stepIndex) === index);
        const heading = activePanel?.querySelector<HTMLElement>("h3");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus();
        }
      }

      function showStep(index: number, animate: boolean) {
        if (!animate || reduceMotion) {
          applyStep(index);
          return;
        }
        panelsWrapper.classList.add("diag-panels--transitioning");
        window.setTimeout(() => {
          applyStep(index);
          requestAnimationFrame(() => panelsWrapper.classList.remove("diag-panels--transitioning"));
        }, 160);
      }

      function goToStep(index: number) {
        showStep(Math.max(0, Math.min(index, RESULT_INDEX)), true);
      }

      panels.forEach((panel) => {
        const stepIndex = Number(panel.dataset.stepIndex);
        const step = diagnosticSteps[stepIndex];
        if (!step) return;

        panel.querySelectorAll<HTMLButtonElement>("[data-diag-option]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const value = btn.dataset.value ?? "";
            if (step.multiSelect) toggleAreaAnswer(value);
            else setSingleAnswer(step, value);
            renderOptionsState(panel, step);
            updateFooter();
          });
        });
      });

      openBtn.addEventListener("click", () => {
        dialog.showModal();
        showStep(currentIndex, false);
      });

      closeBtn.addEventListener("click", () => dialog.close());

      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });

      backBtn.addEventListener("click", () => goToStep(currentIndex - 1));
      nextBtn.addEventListener("click", () => goToStep(currentIndex + 1));
    }
  </script>
  ```

- [ ] **Step 4: Add the component styles**

  Append this `<style>` block at the end of the file:

  ```astro
  <style>
    .diagnostic-teaser__grid {
      display: grid;
      gap: var(--space-4);
      align-items: center;
    }

    .diagnostic-teaser__visual {
      max-width: 22rem;
    }

    .diagnostic-teaser__body p {
      margin-bottom: var(--space-3);
    }

    .diag-dialog {
      border: none;
      padding: 0;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      background: var(--color-surface);
      color: var(--color-ink);
    }

    .diag-dialog::backdrop {
      background: rgba(42, 36, 32, 0.55);
    }

    .diag-dialog[open] {
      display: flex;
    }

    .diag-dialog__inner {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: var(--space-2);
      overflow: hidden;
    }

    .diag-header {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding-bottom: var(--space-2);
      flex-shrink: 0;
    }

    .diag-progress {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .diag-progress__track {
      flex: 1;
      height: 4px;
      background: var(--color-line);
      border-radius: var(--radius-pill);
      overflow: hidden;
    }

    .diag-progress__fill {
      display: block;
      height: 100%;
      width: 0%;
      background: var(--color-accent);
      transition: width var(--motion-quick) var(--ease-reveal);
    }

    .diag-progress__label {
      font-size: var(--size-small);
      color: var(--color-muted);
      white-space: nowrap;
    }

    .diag-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.4em;
      color: var(--color-ink);
      flex-shrink: 0;
      display: inline-flex;
    }

    .diag-panels {
      flex: 1;
      overflow-y: auto;
      padding-block: var(--space-2);
      transition: opacity var(--motion-quick) var(--ease-reveal), transform var(--motion-quick) var(--ease-reveal);
    }

    .diag-panels--transitioning {
      opacity: 0;
      transform: translateY(6px);
    }

    .diag-panel__question {
      margin-bottom: var(--space-3);
    }

    .diag-options {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-2);
    }

    .diag-option {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      text-align: left;
      padding: var(--space-2);
      border: 1.5px solid var(--color-line);
      border-radius: var(--radius-control);
      background: var(--color-canvas);
      cursor: pointer;
      transition: border-color var(--motion-instant) var(--ease-reveal),
        background-color var(--motion-instant) var(--ease-reveal);
    }

    .diag-option:hover {
      border-color: var(--color-putty);
    }

    .diag-option--selected {
      border-color: var(--color-accent);
      background: var(--color-surface);
    }

    .diag-option__icon {
      flex-shrink: 0;
      color: var(--color-accent);
    }

    .diag-option__label {
      flex: 1;
      font-weight: 500;
    }

    .diag-option__indicator {
      flex-shrink: 0;
      width: 0.7rem;
      height: 0.7rem;
      border: 1.5px solid var(--color-accent);
      transition: background-color var(--motion-instant) var(--ease-reveal);
    }

    .diag-option--selected .diag-option__indicator {
      background: var(--color-accent);
    }

    .diag-size-swatch {
      display: inline-block;
      background: var(--color-accent-ochre);
      border-radius: var(--radius-sharp);
      flex-shrink: 0;
    }

    .diag-size-swatch--small {
      width: 14px;
      height: 14px;
    }

    .diag-size-swatch--medium {
      width: 22px;
      height: 22px;
    }

    .diag-size-swatch--large {
      width: 30px;
      height: 30px;
    }

    .diag-size-swatch--full {
      width: 30px;
      height: 18px;
      border-radius: var(--radius-control);
    }

    .diag-finish-swatch {
      display: inline-block;
      width: 26px;
      height: 26px;
      border-radius: var(--radius-pill);
      flex-shrink: 0;
    }

    .diag-finish-swatch--matte {
      background: var(--color-accent-ochre);
    }

    .diag-finish-swatch--satin {
      background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.55), var(--color-accent-ochre) 65%);
    }

    .diag-finish-swatch--gloss {
      background: radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.9), var(--color-accent-ochre) 45%);
      box-shadow: var(--shadow-warm-soft);
    }

    .diag-finish-swatch--unknown {
      background: var(--color-canvas);
      border: 1.5px dashed var(--color-putty);
    }

    .diag-summary {
      list-style: none;
      margin: 0 0 var(--space-3);
      padding: 0;
      display: grid;
      gap: var(--space-2);
    }

    .diag-summary__row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-1) var(--space-2);
      padding-bottom: var(--space-1);
      border-bottom: 1px solid var(--color-line);
    }

    .diag-summary__question {
      flex: 1 1 12rem;
      font-size: var(--size-small);
      color: var(--color-muted);
    }

    .diag-summary__value {
      font-weight: 500;
    }

    .diag-summary__edit {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-accent);
      text-decoration: underline;
      text-underline-offset: 3px;
      font-size: var(--size-small);
      padding: 0;
    }

    .diag-recommendation {
      background: var(--color-canvas);
      padding: var(--space-2);
      border-radius: var(--radius-control);
      margin-bottom: var(--space-3);
    }

    .diag-conversion h4 {
      font-family: var(--font-display);
      font-size: var(--size-h3);
      margin-bottom: var(--space-2);
    }

    .diag-conversion__actions {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .diag-footer {
      display: flex;
      justify-content: space-between;
      gap: var(--space-2);
      padding-top: var(--space-2);
      border-top: 1px solid var(--color-line);
      flex-shrink: 0;
    }

    @media (min-width: 560px) {
      .diag-options {
        grid-template-columns: repeat(2, 1fr);
      }

      .diag-options--compact {
        grid-template-columns: repeat(4, 1fr);
      }

      .diag-conversion__actions {
        flex-direction: row;
      }
    }

    @media (min-width: 900px) {
      .diagnostic-teaser__grid {
        grid-template-columns: 1fr 1.3fr;
      }

      .diag-dialog {
        width: min(700px, 92vw);
        height: auto;
        max-height: 85dvh;
        border-radius: var(--radius-frame);
        margin: auto;
      }

      .diag-dialog__inner {
        padding: var(--space-4);
      }
    }
  </style>
  ```

- [ ] **Step 5: Wire the component into the page**

  In `src/pages/index.astro`, add the import next to the other component imports:

  ```ts
  import Diagnostic from "../components/Diagnostic.astro";
  ```

  and place `<Diagnostic />` right after `<ServiceAreas />` and before the testimonials conditional:

  ```astro
  <ServiceAreas />
  <Diagnostic />
  {showTestimonials && <Testimonials />}
  ```

- [ ] **Step 6: Type-check**

  Run: `npm run check`
  Expected: passes with no errors.

- [ ] **Step 7: Commit**

  ```bash
  git add src/components/Diagnostic.astro src/pages/index.astro
  git commit -m "feat(diagnostic): add the Diagnostico de Pintura wizard component"
  ```

---

### Task 6: Manual verification pass

**Files:** none (verification only — no code changes expected unless a bug is found, in which case fix it in the relevant file from Tasks 1–5 and re-verify).

**Interfaces:** none — this task exercises the finished feature end-to-end.

- [ ] **Step 1: Start the dev server**

  Run: `npm run dev` (background)
  Expected: server starts on `http://localhost:4321` with no errors in the terminal output.

- [ ] **Step 2: Run the full automated check suite**

  Run: `npm run check && npm run test`
  Expected: both pass with zero errors/failures.

- [ ] **Step 3: Desktop walkthrough (viewport ≥ 900px)**

  In a browser at `http://localhost:4321`:
  - Click "Diagnóstico" in the header nav → page scrolls to the teaser section.
  - Click "Começar diagnóstico" → dialog opens centered, backdrop dimmed, focus lands on step 1's question.
  - Step 1 (Casa/Apartamento/Comercial/Outro): "Avançar" is disabled until an option is clicked; clicking an option shows the selected-state indicator filling in; "Avançar" becomes enabled.
  - Step 2 (áreas): confirm multiple options can be selected/deselected independently; "Avançar" stays disabled with zero selected.
  - Steps 3–4 (condição/objetivo): confirm single-select behavior (picking a new option deselects the previous one), cards show text only, no icon.
  - Step 5 (tamanho): confirm the four swatches render at visibly increasing sizes plus the wide "full" bar.
  - Step 6 (acabamento): confirm the four sheen swatches are visually distinct (flat / soft gradient / sharp highlight / dashed outline) and the button reads "Ver resultado" instead of "Avançar" on this last step.
  - Result screen: all 6 answered rows appear as chips with the recorded values; click "Editar" on one row (e.g. "Qual o tamanho aproximado?") → jumps back to that step with the previous selection still highlighted; change it and navigate forward again → result screen reflects the updated value.
  - Confirm the recommendation sentence renders, reads naturally in Portuguese, and contains no numbers or "R$".
  - Inspect "Calcular meu orçamento" and "Falar com o Reginaldo" hrefs (right-click → inspect, or hover to see the status-bar URL): with `businessConfig.whatsappNumber` currently `null`, both should point to `#contato`.
  - Click "Fechar" (×) → dialog closes. Reopen via the teaser button → wizard resumes on the result screen with all answers intact (confirms in-memory persistence).
  - Click the dialog backdrop (outside the white panel) → dialog closes.

- [ ] **Step 4: Confirm the WhatsApp handoff with a real number configured**

  Temporarily edit `src/config/business.ts`, setting `whatsappNumber: "5551999999999"` (a placeholder format, not a real number — do not use a real number for this check).
  Reload the page, redo the flow, and confirm "Calcular meu orçamento" now points to `https://wa.me/5551999999999?text=...` with the URL-encoded summary message containing all 6 answers, and "Falar com o Reginaldo" points to the generic message.
  Revert the edit afterward: `git checkout -- src/config/business.ts` (discards the temporary test edit only; nothing else is staged at this point since Task 5 was already committed).

- [ ] **Step 5: Mobile viewport walkthrough**

  Resize the browser (or use device emulation) to a mobile width (≤480px):
  - Confirm the dialog fills the full viewport with no horizontal scroll.
  - Confirm the progress bar and close button stay visible at the top, and Voltar/Avançar stay reachable at the bottom without needing to scroll past the option grid.
  - Confirm option cards stack in a single column (two columns for the compact size/finish steps once ≥560px, single column below that).
  - Redo the full flow once on this viewport to confirm nothing overlaps or clips.

- [ ] **Step 6: Reduced motion check**

  Enable "prefers-reduced-motion: reduce" (via browser devtools rendering emulation, or OS-level setting) and redo a few steps.
  Expected: step transitions happen instantly, with no fade/slide delay, and no stall between clicking Avançar and the next step appearing.

- [ ] **Step 7: Keyboard-only pass**

  Using only Tab/Shift+Tab/Enter/Space/Escape (no mouse):
  - Open the dialog via the teaser button (Enter).
  - Tab through option cards, select one with Space or Enter, Tab to "Avançar", activate it.
  - Confirm focus is never lost outside the dialog while it's open (native `<dialog>` focus trap).
  - Press Escape → dialog closes.

- [ ] **Step 8: Build check**

  Run: `npm run build`
  Expected: production build completes with no errors.

- [ ] **Step 9: Final commit**

  If step 3 uncovered no bugs needing fixes, there's nothing new to commit (verification-only task). If any fix was needed, stage and commit it with a message describing the specific bug fixed, e.g.:
  ```bash
  git add <fixed files>
  git commit -m "fix(diagnostic): <specific bug found during verification>"
  ```

---

## Plan Self-Review Notes

- **Spec coverage:** every §-numbered requirement in the spec (structure/§2, data model/§3, wizard UI/§4, result & conversion/§5, icons/§6, accessibility/§7, non-goals/§8, files/§9) maps to a task above. The one deliberate refinement made during planning: the spec's §7 mention of `role="radiogroup"`/`role="radio"` for single-select steps was simplified to a uniform `role="group"` + `aria-pressed` pattern across all steps (Task 5) — using the ARIA radio role without also implementing its expected arrow-key navigation would be a worse accessibility outcome than a plain, fully keyboard-operable toggle-button group. Also, the spec's optional `hint` field on `DiagnosticOption` (§3.1) was dropped — every condition/objective option's `label` is already a complete one-line phrase, so a separate hint would just duplicate it.
- **Placeholder scan:** no TBD/TODO/"add appropriate X" phrases; every step has real, complete code or an exact command.
- **Type consistency:** `DiagnosticAnswers`, `DiagnosticStep`, `DiagnosticOption`, `IconName` are defined once (Tasks 1–2) and imported with matching names/shapes everywhere they're used (Tasks 3, 5). String literals used as lookup keys in `diagnosticSummary.ts` (Task 3) match the `value` strings in `diagnostic.ts` (Task 2) verbatim.
