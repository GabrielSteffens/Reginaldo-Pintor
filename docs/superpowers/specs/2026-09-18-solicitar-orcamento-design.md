# Solicitar Orçamento — Design Spec

Date: 2026-09-18
Status: Approved by user, ready for implementation planning.

## 1. Goal

Implement an interactive, multi-step "Solicitar Orçamento" section for the Reginaldo Pinturas Residenciais website. It replaces the traditional generic contact form in the `#contato` section with a modern, progressive-disclosure wizard inspired by interactive quote flows (such as João Piscinas), redesigned specifically for residential painting services.

The section guides visitors through 7 steps of qualifications, provides a consolidated summary with inline edit links, validates customer inputs, displays an honest estimation disclaimer, and submits the structured quote request directly to Reginaldo's WhatsApp.

## 2. Where it Lives & Integration

- **Section Location**: Integrated into `src/components/Contact.astro` (`#contato`).
- **Layout (Approach A — Hybrid Header + Focused Stepper)**:
  - Header introduces "Solicitar Orçamento" with clear value copy and direct communication badges (phone call link and business hours) for visitors wanting immediate contact.
  - Centered interactive card (`max-width: ~760px`) containing the 7-step wizard + summary review.
  - Footer of the section includes business address, neighborhood coverage list, and the transparency disclaimer.
- **Navigation**:
  - The main navigation link `Solicitar orçamento` in `Header.astro` and hero CTA buttons continue pointing to `#contato`, leading visitors straight to this interactive experience.

## 3. Step-by-Step Flow Specification

### Step 1: Tipo de Imóvel (`propertyType`)
- **Question**: "Qual tipo de imóvel você quer pintar?"
- **Mode**: Single selection
- **Options**:
  - `Casa` (icon: `house`)
  - `Apartamento` (icon: `building`)
  - `Comércio` (icon: `store`)
  - `Outro` (icon: `moreHorizontal`)

### Step 2: O que você precisa pintar (`services`)
- **Question**: "O que você precisa pintar?"
- **Mode**: Multiple selection (visitor can check one or multiple)
- **Options**:
  - `Paredes internas` (icon: `roller`)
  - `Tetos` (icon: `layers`)
  - `Fachada` (icon: `facade`)
  - `Muros` (icon: `wallCorner`)
  - `Portas` (icon: `wallCorner`)
  - `Janelas` (icon: `grid`)
  - `Garagem` (icon: `garage`)
  - `Ambiente completo` (icon: `sofa`)
  - `Imóvel completo` (icon: `house`)

### Step 3: Tamanho Aproximado (`size`)
- **Question**: "Qual é o tamanho aproximado da área?"
- **Mode**: Dual-tab selector (Simple vs. Advanced) with simple mode default.
- **Simple Mode**:
  - `Até 50 m²`
  - `50–100 m²`
  - `100–200 m²`
  - `200–300 m²`
  - `Mais de 300 m²`
- **Advanced Mode**:
  - Number input allowing the customer to enter the exact or estimated `m²` (min: 5, max: 5000).

### Step 4: Estado das Superfícies (`condition`)
- **Question**: "Como estão as superfícies?"
- **Mode**: Single selection
- **Options**:
  - `Pintura em bom estado`
  - `Precisa apenas de uma nova pintura`
  - `Possui pequenas imperfeições`
  - `Possui rachaduras ou descascamentos`
  - `Possui manchas ou sinais de umidade`
  - `Precisa de bastante preparação`
  - `Não sei informar`

### Step 5: Preparação Necessária (`preparation`)
- **Question**: "A superfície precisará de preparação ou reparos?"
- **Mode**: Single selection
- **Options**:
  - `Apenas pintura`
  - `Pintura + pequenos reparos`
  - `Pintura + preparação completa`
  - `Não sei, preciso de avaliação`

### Step 6: Escolha de Cores (`colors`)
- **Question**: "Você já escolheu as cores?"
- **Mode**: Single selection
- **Options**:
  - `Sim, já escolhi`
  - `Quero manter a cor atual`
  - `Quero mudar completamente`
  - `Ainda não sei`
  - `Quero sugestões de combinação`
- **CTA / Contextual Help for Suggestions**:
  - When "Quero sugestões de combinação" is selected, display an informative callout box explaining that Reginaldo can bring physical paint swatches and color catalogs during the technical visit, with an anchor ready for `#ideias-de-cores`.

### Step 7: Dados do Cliente (`customerInfo`)
- **Question**: "Quase pronto! Onde enviamos seu orçamento?"
- **Inputs**:
  - `Nome` (text, required)
  - `WhatsApp` (tel, required, formatted mask)
  - `Bairro / Cidade` (select populated from `businessConfig.neighborhoods` with custom input option, required)
  - `Mensagem adicional` (textarea, optional)
- **Photo Upload Note**:
  - Contextual reminder: "Você também pode enviar fotos dos ambientes diretamente no WhatsApp com o Reginaldo após a solicitação."

### Step 8: Resumo do Projeto & Edição (`summary`)
- **Heading**: "Resumo do seu projeto"
- **Review Items**:
  - Tipo de imóvel (with `[Editar]` link returning to Step 1)
  - Serviços selecionados (with `[Editar]` link returning to Step 2)
  - Área aproximada (with `[Editar]` link returning to Step 3)
  - Estado da superfície (with `[Editar]` link returning to Step 4)
  - Preparação (with `[Editar]` link returning to Step 5)
  - Cores (with `[Editar]` link returning to Step 6)
  - Contato e Região (with `[Editar]` link returning to Step 7)
- **Disclaimer**:
  > "Esta solicitação não substitui uma avaliação do local. O orçamento final depende das condições reais da superfície, metragem, preparação necessária e materiais."
- **Primary CTA**:
  - "Solicitar orçamento" button.

## 4. Technical Architecture

### 4.1 Data & Types
- `src/types/quote.ts`:
  - `PropertyType`, `ServiceType`, `SizeOption`, `SurfaceCondition`, `PreparationOption`, `ColorsOption`, `QuoteAnswers`.
- `src/data/quote.ts`:
  - Step descriptors, option lists, and icon associations.
- `src/content/copy.ts`:
  - `quoteWizard` export containing all UI labels, question titles, button labels, and disclaimer text.

### 4.2 Utility & Business Logic
- `src/utils/quoteSummary.ts`:
  - `buildQuoteSummary(answers: QuoteAnswers): SummarySection[]`
  - `buildQuoteWhatsappMessage(answers: QuoteAnswers): string`
- `src/utils/quoteSummary.test.ts`:
  - Complete unit test suite verifying single and multiple service concatenations, simple vs. advanced size formatting, optional message handling, and WhatsApp URL generation.

### 4.3 Component Structure
- `src/components/QuoteWizard.astro`:
  - Manages wizard UI state, progressive disclosure (`[data-step]`), forward/back navigation, validation, inline editing, and keyboard accessibility (`aria-pressed`, `role="progressbar"`).
- `src/components/Contact.astro`:
  - Refactored to house the new `QuoteWizard`, direct call badge, business hours, and service areas.

## 5. WhatsApp Message Structure

```text
Olá, Reginaldo! Gostaria de solicitar um orçamento para pintura.

Tipo de imóvel:
{propertyType}

Serviços:
{services.join(" + ")}

Área aproximada:
{size}

Estado atual:
{condition}

Preparação:
{preparation}

Cores:
{colors}

Cliente: {customerName}
Contato: {customerWhatsapp}
Região: {customerLocation}

Mensagem: {customerMessage}
```

## 6. Verification and Quality Criteria

1. **Accessibility**: All step options accessible via keyboard navigation, clear active states, progress bar with screen reader announcements.
2. **Responsiveness**: Tested from 320px mobile screens up to desktop ultrawide; options wrap neatly into 2 or 3-column grids as space allows.
3. **Tests**: Vitest suite passing 100% of unit tests for message composition and summary formatting.
4. **Build & Type Check**: `astro check` passing with 0 errors and `astro build` successfully compiling static assets to `dist/`.
