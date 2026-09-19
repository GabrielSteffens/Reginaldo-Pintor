# Diagnóstico de Pintura — Design Spec

Date: 2026-09-18
Status: Approved by user (sections confirmed interactively), ready for implementation planning.

## 1. Goal

Add an interactive, multi-step "painting diagnostic" tool to the Reginaldo
Pinturas Residenciais site. It qualifies a visitor's painting need (property
type, areas, surface condition, objective, size, finish preference), shows
them a plain-language summary of their "painting profile" plus a softly
hedged recommendation, and hands them off to the existing WhatsApp quote
flow. It must feel like a native part of this site — same tokens, same
component conventions, same interaction vocabulary already established by
`Transformation.astro`, `WorkProcess.astro`, and `Faq.astro` — not a bolted-on
widget.

Explicitly **not** a price calculator: no numbers, no promises of an exact
quote. The diagnostic's only job is to prepare the customer for a
personalized quote conversation.

## 2. Where it lives

- New component: `src/components/Diagnostic.astro`, imported into
  `src/pages/index.astro` and placed after `WhyProfessional` /
  `ServiceAreas`, before `Testimonials` / `Faq` / `FinalCta` / `Contact`.
  Rationale: by that point in the scroll the visitor already understands the
  business; the tool gives them something to *do*, and its own conversion
  step feeds straight into the existing `Contact` section.
- `src/components/Header.astro`: add one entry to `nav.links` in
  `src/content/copy.ts` — `{ href: "#diagnostico", label: "Diagnóstico" }`.
  No special-casing in `Header.astro` itself; it's just another anchor like
  `#servicos`.
- The component renders two things:
  1. A normal in-flow `<section id="diagnostico" class="section
     section--surface">` teaser: heading, one-line pitch, a `SwatchPanel`
     visual, and a "Começar diagnóstico" button.
  2. A `<dialog>` element (hidden until opened) containing the full 6-step
     wizard + result screen.
- The teaser button calls `dialog.showModal()`. Native `<dialog>` gives us
  focus trapping, ESC-to-close, and backdrop dismissal for free — no custom
  focus-trap JS needed.
- Answers live in a single in-memory JS object for the lifetime of the page
  (not `localStorage`/`sessionStorage`). Closing and reopening the dialog
  within the same page load resumes where the user left off; a full page
  reload resets it, same as the rest of the site's non-persisted state.
- No new dependencies. Same vanilla `<script>` + `data-*` attribute pattern
  used throughout the codebase (see `Transformation.astro`,
  `WorkProcess.astro`) — no framework, no client-side router.

## 3. Data & content model

Following the project's existing split (`CONTENT_GUIDE.md`'s content-type
table): structural UI copy in `src/content/copy.ts`, hard data in
`src/data/*.ts`.

### 3.1 `src/data/diagnostic.ts`

```ts
export interface DiagnosticOption {
  value: string;
  label: string;
  icon?: IconName; // only set for steps that use icons
  hint?: string;    // optional one-line descriptor, used on condition/objective cards
}

export interface DiagnosticStep {
  id: "propertyType" | "areas" | "condition" | "objective" | "size" | "finish";
  question: string;
  multiSelect: boolean;
  options: DiagnosticOption[];
}

export const diagnosticSteps: DiagnosticStep[];
```

Six steps, content exactly as specified by the business owner:

1. **`propertyType`** (single-select) — "Que tipo de imóvel é?"
   Casa · Apartamento · Comercial · Outro
2. **`areas`** (multi-select) — "Quais áreas precisam de pintura?"
   Sala de estar · Quarto · Cozinha · Banheiro · Fachada / área externa ·
   Garagem · Paredes e tetos · Imóvel inteiro · Outro
3. **`condition`** (single-select) — "Qual é o estado atual da superfície?"
   Boa condição, só precisa de nova cor · Desbotada ou manchada · Com
   rachaduras · Descascando · Mofo / manchas de umidade · Muitas
   imperfeições · Precisa de preparo grande
4. **`objective`** (single-select) — "O que você quer alcançar?"
   Mudar a cor · Renovar a cor atual · Reparar e repintar · Reformar
   completamente o ambiente · Pintar a fachada · Preparar o imóvel para
   venda/aluguel
5. **`size`** (single-select) — "Qual o tamanho aproximado?"
   Pequeno · Médio · Grande · Imóvel inteiro
6. **`finish`** (single-select) — "Qual acabamento você prefere?"
   Fosco · Acetinado · Brilhante · Não sei / quero uma recomendação

### 3.2 `src/content/copy.ts` — new `diagnostic` export

Teaser heading/intro/button label, dialog chrome labels ("Voltar",
"Avançar", "Passo {n} de 6"), result screen heading ("Seu perfil de
pintura"), conversion heading ("Quer transformar esse diagnóstico em um
orçamento?"), and the two CTA labels ("Calcular meu orçamento" / "Falar com
o Reginaldo"). All freely re-editable without touching component logic, same
convention as every other `copy.ts` entry.

### 3.3 `src/utils/diagnosticSummary.ts`

Pure function `buildRecommendation(answers): string`. Composes one hedged
sentence from two lookup tables:

- **Objective clause** (keyed by `objective` value) — e.g. `"Mudar a cor"` →
  `"pintura de mudança de cor"`; `"Reformar completamente o ambiente"` →
  `"uma reforma completa de pintura"`; etc. — one clause per of the 6
  objective options.
- **Prep clause** — prepended only when `condition` is anything other than
  "Boa condição, só precisa de nova cor" (i.e. any of the other 6 condition
  values): `"preparo de superfície seguido de "`.

Final sentence shape: `"Com base nas suas respostas, seu projeto pode
envolver {prepClause}{objectiveClause}."` — always "pode envolver" /
never a number, never "vai custar", satisfying the "no precise diagnosis, no
prices" requirement. Also exports `buildWhatsappSummary(answers): string`,
which formats all 6 answers into the WhatsApp message lines (see §5).

## 4. Wizard UI

### 4.1 Progress indicator

Adapts the paint-fill rail from `WorkProcess.astro` (same visual language:
a track + filled segment using `--color-line` / `--color-accent`), but
driven by `currentStep / 6` instead of scroll position — updates instantly
on step change. Rendered at the top of the dialog with an
`aria-live="polite"` "Passo X de 6" label for both sighted users and screen
readers.

### 4.2 Option cards

`<button>` elements (state toggles, not navigation — unlike the `<a>`
service cards elsewhere), in a responsive grid (1 column on mobile, 2
columns once the dialog is wide enough). Each card: optional `Icon`, label,
optional `hint` line, and a selected-state indicator — reusing the small
square dot from `Faq.astro`'s accordion indicator, filling with
`--color-accent` when the option is chosen. This is the one consistent
"you picked this" affordance across every step, iconed or not.

- Single-select steps: `role="radiogroup"` on the grid, `role="radio"` +
  `aria-checked` on each card.
  - Selecting a card replaces the current single answer.
- Multi-select step (`areas`): `role="group"` on the grid, `aria-pressed` on
  each card. Selecting toggles that option in/out of the answer set.

### 4.3 Per-step visual treatment

- **`propertyType`** and **`areas`**: icon + label cards. New icons added to
  `Icon.astro` (see §6).
- **`condition`** and **`objective`**: title + one-line `hint` text, no
  icon — same texture as `WhyProfessional.astro`'s point list. These are
  conceptual states, not physical objects, so an icon would be decorative
  rather than functional (violates `Icon.astro`'s own stated rule).
- **`size`**: no icons — three squares of increasing CSS size (small /
  medium / large) plus a full-width bar for "Imóvel inteiro". A self-
  explanatory visual metaphor, no new SVGs.
- **`finish`**: circular "paint blob" swatches with simulated sheen — flat
  fill for Fosco, soft gradient for Acetinado, sharp specular highlight for
  Brilhante, plus a neutral dashed-outline circle for "Não sei". Reuses the
  "paint swatch, not tech palette" language already established by
  `tokens.css`'s comment and `SwatchPanel.astro`.

### 4.4 Navigation & transitions

- "Voltar" (`.btn--secondary`) / "Avançar" (`.btn--primary`) buttons, exact
  classes already defined in `global.css` — no new button variants.
- "Avançar" is `disabled` until the current step has a valid selection (≥1
  for multi-select, exactly 1 for single-select). No auto-advance on
  selection — explicit navigation only, per the stated requirement.
- Step transitions: a quick opacity/translate crossfade using the existing
  `--motion-quick` / `--ease-reveal` tokens. Automatically collapses to
  instant under `prefers-reduced-motion` via the global rule already in
  `global.css` (`*` selector) — no extra reduced-motion handling needed in
  this component.

### 4.5 Responsive behavior

- Mobile (default): dialog is `100dvh` full-bleed, progress bar sticky at
  top, Voltar/Avançar buttons sticky at bottom (thumb-reachable), option
  grid scrolls in between.
- Desktop (`≥900px`, the breakpoint already used everywhere else on this
  site): dialog becomes a large centered panel (~700px wide, `max-height:
  85dvh`, internal scroll), visible dimmed backdrop.

## 5. Result screen & conversion

- **Heading**: "Seu perfil de pintura".
- **Summary**: 6 rows, one per step. Each row shows the step's icon/label
  (where applicable) and the chosen value(s) rendered as `.chip` pills
  (existing class from `global.css`). Each row has a small "Editar" text
  link (styled like the FAQ closing link — underlined, `--color-accent`)
  that jumps straight back to that step with all other answers intact —
  this is the mechanism for "allow users to change previous answers," no
  separate edit mode needed.
- **Recommendation**: the one-sentence output of
  `buildRecommendation(answers)` from §3.3.
- **Conversion block**: heading "Quer transformar esse diagnóstico em um
  orçamento?", then:
  - Primary: "Calcular meu orçamento" (`.btn--primary`) → opens WhatsApp via
    `whatsappHref(buildWhatsappSummary(answers))`. Message lists all 6
    answers, formatted the same way `Contact.astro`'s form already composes
    its message (array of lines, `.filter(Boolean).join(" ")`, then
    `whatsappHref(...)`).
  - Secondary: "Falar com o Reginaldo" (`.btn--secondary`) →
    `whatsappHref("Olá! Tenho uma dúvida sobre pintura residencial.")`,
    same generic-message pattern as the FAQ closing link.
  - Both buttons rely on `whatsappHref()`'s existing fallback: if
    `businessConfig.whatsappNumber` is `null`, they link to `#contato`
    instead (checked via the same `isWhatsappConfigured()` guard
    `Contact.astro` uses) — never a dead link, never a fake number.
  - Buttons stack on mobile, sit side by side on desktop — same pattern as
    `FinalCta.astro`.
- Dialog close button (×) top-right throughout the entire flow (all steps
  and the result screen). Backdrop click and ESC also close it (native
  `<dialog>` behavior) — safe, since in-memory state means reopening
  resumes progress rather than losing it.

## 6. New icons (`src/components/Icon.astro`)

Extends the existing single-weight line-icon set (same `stroke-width="1.5"`,
`stroke-linecap="round"`, 24×24 viewBox convention). Added only for options
representing real physical things:

- `house` — Casa (propertyType)
- `building` — Apartamento (propertyType)
- `store` — Comercial (propertyType)
- `moreHorizontal` — Outro (propertyType, areas)
- `sofa` — Sala de estar (areas)
- `bed` — Quarto (areas)
- `cookingPot` — Cozinha (areas)
- `bathtub` — Banheiro (areas)
- `facade` — Fachada / área externa (areas)
- `garage` — Garagem (areas)
- `layers` — Paredes e tetos (areas)
- `grid` — Imóvel inteiro (areas)

Existing icons are **not** reused for diagnostic options where the meaning
would be a stretch (e.g. `roller`/`brush`/`drop` stay reserved for their
current contexts in `WorkProcess`/`Services`) — the new icons above are
purpose-built instead, avoiding overloaded meaning.

## 7. Accessibility

- Native `<dialog>` → built-in focus trap, ESC-to-close, correct modal
  semantics for AT.
- Focus moves to the dialog's heading on open.
- `aria-live="polite"` region announces step changes ("Passo 2 de 6: Quais
  áreas precisam de pintura?").
- `role="radiogroup"`/`role="radio"`/`aria-checked` for single-select steps;
  `role="group"`/`aria-pressed` for the multi-select `areas` step.
- All interactive elements keyboard-reachable and operable (Enter/Space on
  cards, Tab order follows visual order).
- Color contrast: reuses existing tokens already audited elsewhere in this
  codebase (e.g. `--color-muted` over `--color-putty` per the comment in
  `tokens.css`) — no new color combinations introduced.
- Respects `prefers-reduced-motion` automatically via the existing global
  rule.

## 8. Non-goals

- No price calculation, no numeric estimates anywhere in the flow or
  result.
- No backend/server — same static-site, WhatsApp-handoff model as the rest
  of the site.
- No persistence across page reloads (no `localStorage`).
- No new page/route — everything lives inside `index.astro` via one new
  component.
- No new button/CTA visual variants — reuses `.btn--primary`/`.btn--secondary`.

## 9. Files touched

- New: `src/components/Diagnostic.astro`
- New: `src/data/diagnostic.ts`
- New: `src/utils/diagnosticSummary.ts`
- Edit: `src/components/Icon.astro` (12 new icon cases)
- Edit: `src/content/copy.ts` (new `diagnostic` export; add nav link to
  `nav.links`)
- Edit: `src/pages/index.astro` (import + place `<Diagnostic />`)

No other existing component needs modification — `Header.astro`,
`whatsapp.ts`, and `global.css` are consumed as-is.
