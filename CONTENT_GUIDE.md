# Content Guide — Reginaldo Pinturas Residenciais

This is the map for replacing placeholder content with real business
information. Every item below has one, and only one, correct place to edit.
**None of this requires touching a `.astro` component's markup, styles, or
logic** — every file listed here is plain data (TypeScript objects, an
image folder, or a single Markdown-free copy file). If you ever find
yourself editing a component file to change wording, a fact, or an image,
that's a sign the content model is missing a slot — flag it rather than
hardcoding around it.

## The six-category content model

| # | Category | What it covers | Where it lives |
|---|---|---|---|
| 1 | **Structural UI copy** | Headlines, intros, button labels, nav labels — wording that isn't a business *fact* but shapes how the site talks | `src/content/copy.ts` |
| 2 | **Business data** | Hard facts: name, phone, WhatsApp, email, address, city, service area, hours, guarantee, services, process steps | `src/config/business.ts`, `src/data/services.ts`, `src/data/process.ts` |
| 3 | **Images** | Logo, service photos, portfolio photos, before/after photos | `public/images/**` (paths referenced from the data files above) |
| 4 | **SEO metadata** | `<title>`/description templates, JSON-LD structured data | `src/layouts/BaseLayout.astro` (templates only — the *values* still come from `business.ts`), `src/utils/structuredData.ts` |
| 5 | **Testimonials** | Customer reviews, the empty-state invitation, Google rating | `src/data/testimonials.ts` |
| 6 | **Portfolio** | Completed projects, before/after comparison pairs | `src/data/portfolio.ts`, `src/data/beforeAfter.ts` |

Categories 2, 5, and 6 are **data you add records to** — the page updates
automatically as soon as a record exists; you never add a new component.
Category 1 is **wording you edit in place** — same shape, new words.
Category 3 is **files you drop into a folder** — then point a data field at
them. Category 4 is **almost entirely automatic**, driven by category 2.

---

## 1. Structural UI copy — `src/content/copy.ts`

Every headline, section intro, and button label that isn't a business fact.
Open this one file and every piece of on-page wording is there, grouped by
section (`hero`, `valueProposition`, `services`, `transformation`,
`workProcess`, `portfolio`, `whyProfessional`, `serviceAreas`,
`testimonials`, `faq`, `finalCta`, `contact`, `floatingCta`, `nav`). Change
a string, save, done — no other file is involved.

The one exception: `Hero`'s headline defaults to `businessConfig.tagline`
(category 2) rather than living in `copy.ts`, since it doubles as the
`<title>` tag's basis. Set `hero.headlineOverride` in `copy.ts` if you want
the on-page headline to differ from the tagline used in metadata.

## 2. Business data

### `src/config/business.ts` — the single source of truth

One object, `businessConfig`, read by the Header, Hero, Contact, Footer,
FAQ (for the derived answers), floating WhatsApp button, and the SEO/JSON-LD
layer. Fill in:

| Field | Where it appears on the site |
|---|---|
| `businessName` | Header brand, `<title>`, footer, JSON-LD |
| `phone` | Contact section, footer, click-to-call, JSON-LD `telephone` |
| `whatsappNumber` | **Every** WhatsApp CTA site-wide (primary button, floating button, service cards, contact form). Until set, every one of these falls back to scrolling to `#contato` instead of showing a fake number. |
| `email` | Contact section, footer |
| `city` | `<title>`/meta description template, JSON-LD `areaServed` fallback |
| `neighborhoods` | Service Areas section, contact form's neighborhood dropdown, footer, JSON-LD `areaServed` |
| `businessHours` | Contact section, JSON-LD `openingHoursSpecification`. Leave `null` to hide the block entirely — never shows "a confirmar." |
| `address` | Only shown/added to JSON-LD if `address.showPublicly` is `true`. Defaults to `false` — see the privacy note in the file itself before flipping it. |
| `googleBusinessProfileUrl` | Testimonials section's "ver todas as avaliações" link (only appears alongside `googleRating`, see §5 below) |
| `socialLinks` | Footer. Empty object = no icons shown. Add `{ instagram: "https://..." }` etc. once a real profile exists. |
| `guarantee` | FAQ — the "Vocês oferecem garantia?" question only appears in the FAQ list once `guarantee.offered` is `true` and `guarantee.description` is filled in. |
| `story` | Not yet rendered anywhere — see "What's not built yet" below. |
| `logo` | Header/footer brand mark — see §3 Images. |

Every field is typed and commented in the file itself; TypeScript will
flag a mistake (wrong shape, missing required field) the moment you run
`npm run dev` or `npm run build`.

### `src/data/services.ts` — the services catalog

Each service is one object. To go from placeholder to real:

- Edit `title`, `shortDescription`, and `details` on the three services
  that already ship `enabled: true` (Pintura interna, Pintura externa,
  Retoques e repintura) if the wording should change.
- To **add a new service**, copy the shape of an existing entry, give it a
  unique `id`, and set `enabled: true`. It appears in the grid immediately
  — no component change.
- To **turn on a candidate already sketched in the file** (Pintura de teto,
  Pintura de portas e esquadrias), just flip `enabled` to `true` and fill
  in a real `shortDescription` — they're stubbed with an empty description
  specifically so nothing gets published half-written by accident.
- `featured: true` on exactly one enabled service controls which one gets
  the larger tile — move that flag if a different service should lead.
- `image: null` shows the honest color-swatch placeholder. Set `image` to
  a path under `public/images/services/` to replace it with a real photo
  — see §3.

### `src/data/process.ts` — the "Como funciona" steps

Six steps, each independently editable (`title`, `shortDescription`,
`detail`). `processIntro.useConfirmed`: flip to `true` once these are
confirmed as the business's actual documented process — this swaps the
section's intro line from the generic "here's how a well-run project
typically works" framing to a first-person "here's our process" line.
Leave it `false` if the steps are still a representative sketch.

---

## 3. Images — `public/images/`

Four folders already exist, empty and ready:

```
public/images/
  logo/          — the business logo file
  services/      — real photos for individual service cards
  portfolio/     — cover + gallery photos for portfolio projects
  before-after/  — before/after photo pairs
```

**Nothing currently in the codebase requires these folders to be empty.**
Every image slot has a working placeholder (a swatch-color panel or a
texture block) that renders correctly with zero files present. Adding a
real photo is always the same two steps:

1. Drop the file into the matching folder, e.g.
   `public/images/services/pintura-interna.jpg`.
2. Point the relevant data field at it using a root-relative path:
   `image: "/images/services/pintura-interna.jpg"`.

That path substitution is the **entire** change — no component is touched:

| Image | Field to set | File |
|---|---|---|
| Logo | `businessConfig.logo.src` | `src/config/business.ts` |
| A service's photo | `services[i].image` | `src/data/services.ts` |
| A portfolio project's cover | `portfolioProjects[i].coverImage` | `src/data/portfolio.ts` |
| A portfolio project's gallery | `portfolioProjects[i].photos` (array) | `src/data/portfolio.ts` |
| A before/after pair | `beforeAfterPairs[i].beforeImage` / `.afterImage`, plus set `status: "real"` | `src/data/beforeAfter.ts` |

For before/after pairs specifically: setting `status: "real"` does two
things at once — it swaps the generated placeholder texture for your real
photos, *and* it un-hides `location`/`description`/`metadata` if you've
filled them in (placeholders force those fields to stay hidden regardless
of what's typed into them, so a real caption can never accidentally attach
to an illustrative example).

---

## 4. SEO metadata

This category is almost entirely **automatic** once category 2 is filled
in — there's very little to touch directly:

- `<title>` and meta description are templates in
  `src/layouts/BaseLayout.astro` that key off `businessConfig.city`. Set
  `city` in `business.ts` and both upgrade automatically from the generic
  fallback to `"{{businessName}} | Pintor Residencial em {{city}}"`. Only
  edit `BaseLayout.astro` directly if you want the template's *wording*
  to change, not to insert a value.
- JSON-LD structured data (`src/utils/structuredData.ts`) is built
  entirely from `businessConfig` — every field mirrors §2 above. Fields
  left `null`/empty in `business.ts` are simply omitted from the JSON-LD
  output; nothing here needs separate editing.
- Per-page metadata: `index.astro` is currently the only page. If/when the
  site grows into standalone routes (`/servicos`, `/portfolio` — the
  upgrade path this site was built for), each new page passes its own
  `title`/`description` props to `BaseLayout`, following the same
  template pattern.

---

## 5. Testimonials — `src/data/testimonials.ts`

- **`testimonials`**: an array, empty by default. Push a real review as
  `{ id, quote, authorFirstName, neighborhood, source, date }` and it
  appears in the grid immediately, replacing the "coming soon" invitation.
- **`showTestimonialInvitation`**: while `testimonials` is empty, this
  boolean decides whether the section shows the honest "estamos
  começando a reunir avaliações" module (`true`) or is omitted from the
  page entirely (`false`). Both are legitimate choices — see the comment
  in the file.
- **`googleRating`**: `null` until a Google Business Profile exists with
  real reviews. Set `{ value: 4.9, count: 12 }` once it does, and also
  set `businessConfig.googleBusinessProfileUrl` — the "ver todas as
  avaliações no Google" link only renders when *both* are present, so a
  rating can never be shown without a way to verify it.

---

## 6. Portfolio — `src/data/portfolio.ts` and `src/data/beforeAfter.ts`

- **`portfolioProjects`**: empty array by default, which is what triggers
  the honest "em construção" category-shell empty state. Push a project
  object and it appears in the real grid instead — the empty state and
  the populated grid are the same component, switching automatically on
  array length.
- **`portfolioCategoryShells`**: controls which category labels show in
  the *empty* state (currently Interior and Exterior). Leave Commercial
  out until the business confirms they take on commercial work — adding
  it is a one-line change once that's confirmed.
- **`beforeAfterPairs`**: see §3 above for the image-swap mechanics.
  Add a new pair the same way — copy the shape, set a unique `id`, and
  `order` controls its position among the others.

---

## Quick-start checklist

The minimum edits to take the site from placeholder to a real, live
business, in the order that unlocks the most (each step is a file, not a
code change):

1. **`src/config/business.ts`** — `whatsappNumber` first (every CTA on the
   site depends on it), then `phone`, `city`, `neighborhoods`,
   `businessHours`.
2. **`src/data/services.ts`** — confirm the three launch services'
   wording, decide on the two disabled candidates.
3. **`public/images/logo/`** + `business.ts` → `logo.src`.
4. Real photos into `public/images/services/` as they become available.
5. **`src/data/testimonials.ts`** — first real review, and/or a Google
   Business Profile link.
6. **`src/data/portfolio.ts`** / **`beforeAfter.ts`** — first real
   project.
7. Set up the Google Business Profile itself (outside this codebase —
   it's the single highest-leverage move for a business with no prior
   digital footprint) and link it via `googleBusinessProfileUrl`.

## What's not built yet

- **Company story / "Sobre"**: `businessConfig.story` is reserved as a
  field, but no section currently renders it — the homepage IA this site
  follows doesn't include a standalone About section. If a founder story
  becomes available, it can be woven into `copy.ts`'s `hero.subtext` or
  `contact.intro` as a short line today, or a dedicated `AboutSection`
  component can be added later without disturbing anything else.
- **Standalone service/portfolio pages** (`/servicos/pintura-externa`,
  etc.): the data in `services.ts` and `portfolio.ts` already carries
  enough (`title`, `shortDescription`, `details`) to seed these pages
  directly when the site outgrows a single scrolling page — that's a new
  route file reading existing data, not a content-model change.
