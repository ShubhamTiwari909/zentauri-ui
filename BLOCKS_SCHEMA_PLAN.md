# Blocks Schema — Planning & Implementation Doc

Roadmap for hardening the existing Payload block schema in
`apps/zentauri-blogs/src/blocks/` and expanding it into a full blog-authoring
system. Grounded in the current setup: Payload 3.85 + MongoDB (mongoose) +
UploadThing storage, Lexical editor, config-level block registry
(`blocks: allBlocks` in `payload.config.ts`), `Pages.layout` = Section blocks,
each Section holding rich text with `BlocksFeature(CONTENT_BLOCK_SLUGS)`,
rendered by `app/(frontend)/components/blocks/{BlockRenderer,converters}.tsx`.

All paths below are relative to `apps/zentauri-blogs/` unless noted.

---

## 1. Current state audit

### 1.1 What exists (23 blocks)

| Category           | Blocks                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| Layout             | `section`, `row`, `spacer`, `divider`                                                                           |
| Typography/content | `text`, `table`, `timeline`, `breadcrumb`                                                                       |
| Interactive UI     | `accordion`, `tabs`, `button`, `modal`, `drawer`, `card`, `alert`, `badge`, `kbd`, `tree-view`, `secret-reveal` |
| Dev-tools          | `code`, `json-viewer`, `package-install-command`, `qr-code`                                                     |

### 1.2 Conventions already established (keep these)

- **Design-system-derived options** — `options.ts` pulls appearance/size/variant
  selects from the `DesignSystem` facade
  (`@zentauri-ui/zentauri-components/design-system/facade`), so schema options
  never drift from the component library. This is the single best pattern in
  the codebase; every new block must use it.
- **`interfaceName` on every block** → typed converters via `@/payload-types`.
- **Two-tier rich text** — `blogRichTextEditor()` (typography + blocks) vs
  `basicRichTextEditor()` (typography only) to cap nesting depth.
- **Slug-based `blockReferences`** against the config-level registry (avoids
  circular imports; also avoids the `generate:types` crash on self-reference
  through Lexical noted in `row.ts`).
- **Conditional fields + validators** — `button.ts` (`as: link` → `href`
  required) is the model.
- **Row cannot nest Row** — `ROW_ITEM_BLOCK_SLUGS` derived from
  `CONTENT_BLOCK_SLUGS`, not a second hand-maintained list.

### 1.3 Gaps and weaknesses

1. **No media blocks at all.** Images only enter through the Lexical
   `UploadFeature`. No image block with caption/sizing, no gallery, no video,
   no generic embed. This is the biggest hole for "proper blogs".
2. **Section background is hardcoded and duplicated.** Seven values in
   `section.ts` and two parallel class maps in `BlockRenderer.tsx`
   (`bgColorMap`/`textColorMap`). Adding an option means editing three places;
   nothing derives from `--zui-*` tokens; no gradient/glass/image backgrounds.
3. **Only one horizontal layout primitive.** `row` is flex-only, one level
   deep, with no per-item width control (no 1/3 + 2/3 splits), no wrap
   control, no grid. Multi-column magazine-style layouts are impossible.
4. **Links are raw strings.** `button.href` is free text — no relationship to
   `pages`, so internal links break when a slug changes; no anchor-link
   support despite `sectionId` existing.
5. **No shared field factories.** Appearance rows, links, media, spacing are
   re-declared per block. Schema drift is already visible (e.g. spacing options
   exist twice: `SECTION_SPACING_OPTIONS` and `SPACER_SIZES`).
6. **Pages is the only content model.** No `posts` collection: no author,
   publish date, tags/categories, excerpt, hero, reading time, related posts —
   the metadata that makes a blog a blog. No SEO fields (no
   `@payloadcms/plugin-seo`).
7. **Free-form JSON fields are unvalidated** (`json-viewer`, `tree-view`
   accept text parsed with JSON5 at render time) — bad input is discovered on
   the frontend, not in the admin.
8. **Converter map isn't exhaustiveness-checked.** A block registered in
   `richText.ts` but missing in `converters.tsx` silently renders nothing.
9. **Library components with no block:** all 9 chart types, `code-diff`,
   `data-table`, `dynamic-stepper`, `animated-number`, `avatar`, `rating`,
   `progress`, `marquee`, `empty-state`, `copy-button`, `http-status-badge`,
   `api-endpoint-card`, `api-response-viewer`, `terminal-emulator`,
   `log-viewer`, `console-viewer`, `http-request-viewer`,
   `request-timeline-viewer`, `tooltip`, `popover`, `pagination`, `skeleton`.

---

## 2. Part A — Cross-cutting schema robustness

These changes make every current and future block better. Do them first
(Phase 0) — they are the foundation the new blocks build on.

### A1. Shared field factories — `src/blocks/fields/`

Create a folder of reusable field builders so blocks compose instead of
copy-paste. All factories accept an optional `overrides` param merged last.

**`fields/link.ts`** — the most important one. Replaces raw `href` text:

```ts
import type { Field } from "payload";

type LinkOptions = { required?: boolean; name?: string };

/**
 * Internal (relationship to pages) | external URL | in-page anchor.
 * Internal links survive slug renames because they resolve at render time.
 */
export const linkGroup = ({
  required = true,
  name = "link",
}: LinkOptions = {}): Field => ({
  type: "group",
  name,
  fields: [
    {
      name: "type",
      type: "radio",
      defaultValue: "internal",
      options: ["internal", "external", "anchor"],
      admin: { layout: "horizontal" },
    },
    {
      name: "page",
      type: "relationship",
      relationTo: "pages",
      admin: { condition: (_, sibling) => sibling?.type === "internal" },
      validate: requiredWhen("internal", required),
    },
    {
      name: "url",
      type: "text",
      admin: { condition: (_, sibling) => sibling?.type === "external" },
      validate: externalUrlValidator(required), // must parse as http(s) URL
    },
    {
      name: "anchor",
      type: "text",
      admin: {
        condition: (_, sibling) => sibling?.type === "anchor",
        description: "A sectionId on this page, without the leading #",
      },
      validate: anchorSlugValidator(required), // same /^[a-z0-9-]+$/ rule as sectionId
    },
    {
      name: "newTab",
      type: "checkbox",
      defaultValue: false,
      admin: { condition: (_, sibling) => sibling?.type === "external" },
    },
  ],
});
```

Frontend: one `resolveLink(link): { href, target, rel }` helper in
`utils/` used by every converter (button, cta, hero, card link, author
card…). Populate internal links with `depth` ≥ 1 or a `select` on slug only.

**`fields/media.ts`** — upload + presentation options:

```ts
export const mediaField = ({
  name = "image",
  required = true,
  // No dedicated `image`/`media` component exists yet, so this borrows
  // `card`'s `rounded` tokens by default — pass a different slug once one does.
  roundedVariantsFrom = "card",
} = {}): Field => ({
  type: "group",
  name,
  fields: [
    { name: "asset", type: "upload", relationTo: "media", required },
    { name: "caption", type: "text" },
    {
      type: "row",
      fields: [
        {
          name: "aspectRatio",
          type: "select",
          defaultValue: "auto",
          options: ["auto", "16/9", "4/3", "1/1", "3/4"],
        },
        {
          name: "rounded",
          type: "select",
          defaultValue: "md",
          options: variantOptions(roundedVariantsFrom, "rounded"),
        },
        {
          name: "priority",
          type: "checkbox",
          defaultValue: false,
          admin: { description: "Above-the-fold: disables lazy loading" },
        },
      ],
    },
  ],
});
```

Pair this with a **Media collection hardening** pass: make `alt` a required
text field on `Media` itself (enforced once, at upload, instead of per block),
and add `admin.description` guidance. Since sizes are served by UploadThing +
sharp, also define `imageSizes` on the Media collection (`thumbnail`, `card`,
`hero`) so converters can pick srcsets instead of shipping originals.

**`fields/appearance.ts`** — the ubiquitous appearance/size/rounded row:

```ts
export const appearanceRow = (slug: string, opts?: { slot?: string; groups?: string[] }): Field
// emits a `row` of selects derived from the DesignSystem facade, one per group,
// mirroring what card.ts/tabs.ts hand-roll today.
```

**`fields/visibility.ts`** — responsive show/hide, usable on any block:

```ts
export const visibilityField = (): Field => ({
  name: "hideOn",
  type: "select",
  hasMany: true,
  options: ["mobile", "tablet", "desktop"],
  admin: { description: "Hide this block on selected viewports" },
});
```

Rendered as `hidden md:block` etc. by a shared `visibilityClasses()` util.

**`fields/spacing.ts`** — extract `sectionSpacing` from `section.ts` and the
`SPACER_SIZES`/`GAP_SIZES` px scales into one module so Section, Spacer, Grid
and future blocks share a single spacing scale. Keep the short `dbName`s
(`vs_t_dt`) — harmless on MongoDB, required if you ever move to Postgres
(63-char identifier limit).

### A2. Section 2.0 — the page-level canvas

`section.ts` is the wrapper for everything, so upgrading it multiplies every
other block. Changes:

1. **Token-derived backgrounds.** Replace the 7 hardcoded colors with a single
   source-of-truth module `src/blocks/section-backgrounds.ts` exporting
   `{ value, label, bgClass, fgClass }[]` (including `gradient-*` and `glass`
   entries built on `--zui-*` variables). Schema imports the values; the
   renderer imports the classes. One edit point, and dark mode comes from the
   token pairing for free.
2. **Background image** — optional `upload` + overlay opacity select,
   `admin.condition`-gated behind `backgroundType: color | gradient | image`.
3. **Container width** — `select: narrow (65ch prose) | default (max-w-5xl) |
wide (max-w-7xl) | full`. Blog posts read best at `narrow`; hero/CTA
   sections want `wide`/`full`. Today `max-w-5xl` is hardcoded in
   `BlockRenderer`.
4. **Text alignment** — `left | center` for hero-style sections.
5. **Border/separator toggles** — top/bottom hairline on token colors.

Migration note (MongoDB): existing docs keep working — new fields are
optional with defaults; the renderer already falls back (`?? "bg-white"`).

### A3. Layout primitives — Row upgrades + a real Grid

**Row (upgrade in place):**

- Per-item **width** select on each `items` entry… but `items` is a blocks
  field, so instead wrap: change `items` to an `array` of
  `{ width: select("auto","1/4","1/3","1/2","2/3","3/4","full"), content: blocks(minRows:1, maxRows:1) }`.
  This is a small breaking change to Row's stored shape; take the migration
  hit now while Row usage is young (or keep a read-fallback in the converter
  for the old shape).
- `wrap: checkbox` (default true when >3 items).
- `reverseOnMobile: checkbox` (media-text patterns need it).

**Grid (new block)** — CSS grid, the workhorse for card grids/galleries:

```ts
export const Grid: Block = {
  slug: "grid",
  interfaceName: "GridBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "columns",
          type: "group",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "desktop",
                  type: "select",
                  defaultValue: "3",
                  options: ["1", "2", "3", "4", "6"],
                },
                {
                  name: "tablet",
                  type: "select",
                  defaultValue: "2",
                  options: ["1", "2", "3"],
                },
                {
                  name: "mobile",
                  type: "select",
                  defaultValue: "1",
                  options: ["1", "2"],
                },
              ],
            },
          ],
        },
        {
          name: "gap",
          type: "select",
          defaultValue: "16",
          options: pxOptions(GAP_SIZES),
        },
        { name: "equalHeight", type: "checkbox", defaultValue: true },
      ],
    },
    {
      name: "items",
      type: "blocks",
      required: true,
      minRows: 1,
      maxRows: 24,
      blockReferences: GRID_ITEM_BLOCK_SLUGS /* = CONTENT minus row/grid */,
      blocks: [],
    },
  ],
};
```

Rule of thumb going forward: **Row = flex (few items, width ratios), Grid =
repeating cells (cards, images, stats)**. Both stay one level deep for the
same `generate:types` reason as today.

### A4. Validation & data integrity

- **JSON fields**: add a shared `json5Validator` (parse with `json5`, return
  the parse error message) to `json-viewer`, `tree-view`, and the future
  `chart`/`api-response-viewer` blocks. Fail in the admin, not on the page.
- **URL/anchor validators** live in `fields/validators.ts` (used by link
  factory, embed block, qr-code).
- **`maxRows` caps** on every array/blocks field (`tabs` ≤ 8, accordion items
  ≤ 20, gallery ≤ 24, row items ≤ 6, grid items ≤ 24). Unbounded arrays are a
  page-weight and admin-UX hazard.
- **`defaultValue` on every select** + `admin.isClearable: false` where a
  value is semantically required (pattern already in `section.ts`) — avoids
  null-handling in converters.
- **`admin.description` on every non-obvious field** — the schema is the
  authoring UI; treat descriptions as docs.

### A5. Admin authoring UX

- **`admin.blockName`-friendly labels**: give every block `labels: { singular,
plural }` and encourage editors to name block instances (Payload's
  `blockName`) — makes the Lexical tree navigable on long posts.
- **Group cosmetic options** into a collapsed `collapsible` labelled
  "Appearance" on content-heavy blocks (card, hero, cta), so the first thing
  an author sees is the content fields, not four selects.
- **Live preview** already works (`Pages.admin.livePreview`); keep new
  converters server-component-safe so preview stays instant.
- **`dev-blocks-preview` route**: extend it to render one instance of every
  registered block with seed data — this is the visual regression surface for
  schema changes (see §6 Testing).

### A6. Type safety & the renderer registry

- **Exhaustive converter map.** In `converters.tsx`, type the block converter
  map as
  `const blockConverters = { … } satisfies Record<(typeof CONTENT_BLOCK_SLUGS)[number] | "section", BlockConverter>` —
  a block added to `richText.ts` without a converter becomes a compile error
  instead of a silent blank.
- **One registration module.** Add `src/blocks/registry.ts` exporting
  `{ block, slug, insertableInRichText: boolean, rowSafe: boolean }` entries;
  derive `allBlocks`, `CONTENT_BLOCK_SLUGS`, `ROW_ITEM_BLOCK_SLUGS`, and
  `GRID_ITEM_BLOCK_SLUGS` from it. Today three lists must be kept in sync by
  hand; after this, one.
- **Codegen discipline:** `pnpm --filter zentauri-blogs generate:types` after
  every schema change (types are stale until you do), plus
  `generate:importmap` when admin components are added.

### A7. Content model — make it a blog, not just pages

New **`posts` collection** (keep `pages` for landing/about pages):

- `title`, `slug` (existing `ensureUniqueSlug` hook), `excerpt` (textarea,
  ~160 chars validate), `heroImage` (mediaField), `publishedAt` (date,
  defaulting via beforeChange on publish), `authors` (relationship →
  `users`, hasMany), `tags` (relationship → new `tags` collection, hasMany),
  `layout` (same section blocks as pages), `readingTime` (number, computed in
  a `beforeChange` hook by walking the Lexical tree — never hand-edited),
  `relatedPosts` (relationship → posts, hasMany, `filterOptions` excluding
  self), versions/drafts + livePreview copied from Pages.
- **`tags` collection**: `name`, `slug`, optional `appearance` select derived
  from `appearanceOptions("badge")` so tag chips render with library badges.
- **SEO**: add `@payloadcms/plugin-seo` for `pages` + `posts` (title,
  description, og image with generation functions from doc data).
- **Frontend routes**: `/blog` index (pagination component from the library),
  `/blog/[slug]`, `/blog/tag/[slug]`.

### A8. Reuse & site chrome

- **`snippets` collection + `snippet` reference block.** A snippet is
  `{ name, content: blogRichTextEditor() }`; the block is a single
  `relationship` to it. Lets authors define a bio box / disclaimer / promo
  once and embed everywhere; edits propagate. (Converter fetches with
  `depth: 2` — already resolved if the page query populates.)
- **Globals**: `header` (nav links via `linkGroup`), `footer`, and a `theme`
  global (default section background, default code theme) — removes the last
  hardcoded chrome from the frontend app.

---

## 3. Part B — New blocks catalog

Priority ⭐⭐⭐ = core blogging, do first. Effort: S (≤½ day: schema +
converter reuse existing component), M (~1 day), L (multi-day: new frontend
work or admin components).

### Tier 1 — Media & narrative (the actual blog gap) — all ⭐⭐⭐

| Block           | Maps to                      | Effort | Schema notes                                                                                                                                                                                                                                                                                 |
| --------------- | ---------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image`         | `next/image` + tokens        | S      | `mediaField()` + width select (`content`/`wide`/`full` breakout) + optional `linkGroup({required:false})` + lightbox checkbox                                                                                                                                                                |
| `gallery`       | Grid + image                 | M      | array of `mediaField` (max 24), columns group, lightbox, masonry checkbox                                                                                                                                                                                                                    |
| `video-embed`   | plain iframe wrapper         | S      | `provider: youtube\|vimeo\|file`, conditional `url` (validated per provider) or `upload`, `aspectRatio`, `caption`; parse the ID server-side, render lite-embed (no JS until click)                                                                                                          |
| `embed`         | iframe                       | M      | validated `url`, height select, `sandbox` fixed allowlist, `admin.description` warning; **never** raw HTML from editors                                                                                                                                                                      |
| `quote`         | `Blockquote` typography      | S      | `content` (textarea), `attribution`, `role/source`, `variant: default\|pullquote\|large`, appearance from typography tones                                                                                                                                                                   |
| `callout`       | `alert` upgrade              | S      | extend existing alert block: icon select (emoji-or-preset), optional title, `dismissible` already exists via `DismissibleAlert`                                                                                                                                                              |
| `cta`           | card + buttons               | S      | heading, `basicRichTextEditor` body, 1–2 `linkGroup`+label buttons, appearance from card, alignment                                                                                                                                                                                          |
| `hero`          | typography + buttons + image | M      | eyebrow, heading (+ level select), sub, buttons array (max 2, linkGroup), `mediaField({required:false})`, layout `text-only\|image-right\|image-bg`; only sensible as a **section-level** block — add a `heroSection` entry to `Pages.layout` `blockReferences` rather than inside rich text |
| `media-text`    | Row preset                   | S      | `mediaField` + `basicRichTextEditor` + `mediaSide: left\|right` + width ratio select + `reverseOnMobile`; a curated preset so authors don't hand-assemble rows                                                                                                                               |
| `toc`           | anchor list                  | M      | zero content fields (`depth: select 2\|3`, `sticky` checkbox); converter walks the page's sections/headings server-side and builds links from `sectionId`s — pure derivation, nothing stored                                                                                                 |
| `faq`           | accordion preset             | S      | array of `{question: text, answer: basicRichTextEditor}` + emits JSON-LD `FAQPage` schema in the converter (SEO win the generic accordion can't provide)                                                                                                                                     |
| `stats`         | `animated-number`            | S      | array (max 6) of `{value: number, prefix, suffix, label, description}`, appearance, grid columns                                                                                                                                                                                             |
| `steps`         | `dynamic-stepper` / timeline | S      | array of `{title, content: basicRichTextEditor}`, `orientation`, `numbered` checkbox                                                                                                                                                                                                         |
| `author-card`   | avatar + card                | S      | relationship → `users` (needs `bio`, `avatar`, `links` fields added to Users), appearance                                                                                                                                                                                                    |
| `related-posts` | card grid                    | M      | `mode: manual\|auto(by tag)`, conditional relationship hasMany → posts, max 3–6; converter queries when auto                                                                                                                                                                                 |

### Tier 2 — Dev-blog interactive (the differentiator)

| Block                           | Maps to                   | Effort | Priority | Notes                                                                                                                                                                                                                                                                                                                    |
| ------------------------------- | ------------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `chart`                         | `charts/*` (9 types)      | M      | ⭐⭐⭐   | one block, `type: select(area\|bar\|bubble\|funnel\|line\|pie\|radar\|scatter\|stacked-bar)`; data as textarea with `json5Validator` + per-type shape validation; title, height, legend/tooltip toggles. Charts are client components — converter wraps in a lazy client boundary so a chartless post ships no Recharts. |
| `code-group`                    | tabs + code               | S      | ⭐⭐⭐   | array of `{filename, language, code}` rendered as tab-switched code blocks — the "same thing in npm/pnpm/yarn" or multi-file pattern every dev blog needs                                                                                                                                                                |
| `code-diff`                     | `code-diff`               | S      | ⭐⭐     | `before`, `after`, `language`, `variant: split\|unified`                                                                                                                                                                                                                                                                 |
| `data-table`                    | `data-table`              | M      | ⭐⭐     | columns array + JSON5 rows (validated against columns in a block-level `validate`), sortable/paginated toggles; supersedes static `table` for data-heavy posts                                                                                                                                                           |
| `api-endpoint-card`             | same                      | S      | ⭐⭐     | method select, path, description, `http-status-badge` responses array                                                                                                                                                                                                                                                    |
| `api-response-viewer`           | same                      | S      | ⭐⭐     | status select, headers array, JSON5-validated body                                                                                                                                                                                                                                                                       |
| `terminal`                      | `terminal-emulator`       | S      | ⭐       | array of `{command, output}` lines, static playback                                                                                                                                                                                                                                                                      |
| `log-viewer` / `console-viewer` | same                      | S      | ⭐       | textarea input, level highlighting                                                                                                                                                                                                                                                                                       |
| `request-timeline`              | `request-timeline-viewer` | S      | ⭐       | phases array with ms durations                                                                                                                                                                                                                                                                                           |

### Tier 3 — Engagement & polish

| Block                                 | Maps to          | Effort | Notes                                                                                                                                |
| ------------------------------------- | ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `newsletter`                          | inputs + button  | L      | needs a `form-submissions` collection or `@payloadcms/plugin-form-builder`; do it once forms plugin lands                            |
| `comparison` (pros/cons)              | two cards        | S      | two arrays of text items + labels; renders paired cards with check/cross icons                                                       |
| `file-download`                       | button + card    | S      | `upload` (any mime) + label + shows size/type from Media doc                                                                         |
| `logo-strip`                          | `marquee`        | S      | array of media (max 12), speed select, grayscale checkbox                                                                            |
| `rating`                              | `rating`         | S      | value 0–5 (validate), label — for review posts                                                                                       |
| `progress`                            | `progress`       | S      | value/max, appearance — "series part 3/5" affordance                                                                                 |
| `banner`                              | alert full-width | S      | section-level announcement bar with linkGroup                                                                                        |
| `tooltip`/footnote **inline feature** | `tooltip`        | L      | not a block — a custom Lexical inline feature (`createNode` + toolbar button); highest-effort item here, park it until Tier 1/2 ship |

**Deliberately not blocks:** `pagination`, `search`, `skeleton`, `spinner`,
`network-status`, `otp-input`, `file-upload`, `speech-*`, `qr-scanner`,
`hash-generator` — these are app chrome or tools, not authored content. Keep
the block list curated; every block added is admin-UI surface + converter
maintenance forever.

---

## 4. Reference schema specs

Two fuller examples establishing the patterns the rest follow.

### 4.1 `image`

```ts
// src/blocks/image.ts
import type { Block } from "payload";
import { mediaField } from "./fields/media";
import { linkGroup } from "./fields/link";

export const Image: Block = {
  slug: "image",
  interfaceName: "ImageBlock",
  labels: { singular: "Image", plural: "Images" },
  fields: [
    mediaField({ name: "image" }),
    {
      type: "row",
      fields: [
        {
          name: "width",
          type: "select",
          defaultValue: "content",
          options: [
            { label: "Content width", value: "content" },
            { label: "Wide (breakout)", value: "wide" },
            { label: "Full bleed", value: "full" },
          ],
        },
        { name: "lightbox", type: "checkbox", defaultValue: false },
      ],
    },
    linkGroup({ required: false, name: "link" }),
  ],
};
```

### 4.2 `chart`

```ts
// src/blocks/chart.ts
import type { Block } from "payload";
import { json5Validator } from "./fields/validators";

const CHART_TYPES = [
  "area",
  "bar",
  "bubble",
  "funnel",
  "line",
  "pie",
  "radar",
  "scatter",
  "stacked-bar",
];

export const Chart: Block = {
  slug: "chart",
  interfaceName: "ChartBlock",
  fields: [
    { name: "title", type: "text" },
    {
      type: "row",
      fields: [
        {
          name: "chartType",
          type: "select",
          required: true,
          defaultValue: "line",
          options: CHART_TYPES,
        },
        {
          name: "height",
          type: "select",
          defaultValue: "320",
          options: ["240", "320", "400", "480"],
        },
        { name: "showLegend", type: "checkbox", defaultValue: true },
      ],
    },
    {
      name: "data",
      type: "textarea", // JSON5 for author ergonomics (unquoted keys, trailing commas)
      required: true,
      validate: json5Validator({ shape: "chart" }), // parses + checks array-of-objects
      admin: {
        description: 'Array of points, e.g. [{ label: "Jan", value: 12 }, …]',
        rows: 8,
      },
    },
    {
      name: "series",
      type: "array",
      maxRows: 6,
      admin: { description: "Which keys of each data point to plot" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "dataKey", type: "text", required: true },
            { name: "label", type: "text" },
          ],
        },
      ],
    },
  ],
};
```

Converter side: `const LineChart = dynamic(() => import("@zentauri-ui/zentauri-components/charts/line"), { ssr: false })`-style
lazy map keyed by `chartType`, so Recharts loads only on posts that chart.

---

## 5. Implementation phases

Each phase is independently shippable; land in order.

### Phase 0 — Foundation (no new blocks)

1. `src/blocks/fields/` — `link.ts`, `media.ts`, `appearance.ts`,
   `visibility.ts`, `spacing.ts`, `validators.ts`.
2. `src/blocks/registry.ts` single-source block registration; derive
   `allBlocks` + slug lists from it; `satisfies`-typed converter map.
3. Media collection: required `alt`, `imageSizes`, description text.
4. Section 2.0 (§A2): token-derived backgrounds module, container width,
   background image, alignment. Update `BlockRenderer.tsx` to consume the
   shared background module.
5. Migrate `button.ts` to `linkGroup` (keep `href` read-fallback in the
   converter for existing docs, or run a one-off migration script via Local API).
6. Validation pass on existing blocks: JSON5 validators, `maxRows`, missing
   `defaultValue`s/`labels`/`description`s.
7. `pnpm --filter zentauri-blogs generate:types` + fix converter fallout.

**Exit criteria:** all existing pages render identically (verify against
`dev-blocks-preview` + live preview); type-gen clean.

### Phase 1 — Media & layout

`image`, `gallery`, `video-embed`, `embed`, `media-text`, `grid`, Row
per-item widths, `quote`, `cta`. Registration per block = the checklist in §6.

### Phase 2 — Blog content model

`posts` + `tags` collections, `@payloadcms/plugin-seo`, Users bio/avatar
fields, `hero` (section-level), `toc`, `faq`, `stats`, `steps`,
`author-card`, `related-posts`, `/blog` frontend routes.

### Phase 3 — Dev-blog blocks

`chart`, `code-group`, `code-diff`, `data-table`, `api-endpoint-card`,
`api-response-viewer`; Tier-2 ⭐ blocks as demand appears.

### Phase 4 — Reuse & chrome

`snippets` collection + block, `header`/`footer`/`theme` globals, Tier-3
blocks, tooltip/footnote Lexical inline feature, newsletter (form-builder).

---

## 6. Registration checklist (every new block)

1. `src/blocks/<name>.ts` — Block def with `interfaceName`, `labels`,
   built from `fields/` factories.
2. Register in `src/blocks/registry.ts` (which feeds `index.ts` exports,
   `allBlocks`, and the slug lists in `richText.ts`). Decide: insertable in
   rich text? allowed inside row/grid?
3. `pnpm --filter zentauri-blogs generate:types` → import the new
   `<Name>Block` type.
4. Converter in `converters.tsx` (the `satisfies` map makes forgetting this a
   compile error). Client-only components (charts, marquee) go behind a lazy
   client wrapper component in `components/blocks/`.
5. Seed entry in `dev-blocks-preview` fixtures.
6. If the block needs an admin component: `generate:importmap`.

### Testing & verification

- **Type-gen is the schema test**: CI step running `generate:types` and
  failing on a dirty diff catches drift between config and committed types.
- **`dev-blocks-preview`** renders every block from fixtures — eyeball surface
  for converter changes, and a Vitest smoke test can render it with
  `@testing-library/react` asserting no converter returns null for a
  registered slug.
- **Live preview** (already configured on Pages) is the authoring-loop test:
  every Phase-0 field must show its effect without manual refresh.
- Existing integration test setup: `pnpm --filter zentauri-blogs test`.

---

## 7. Risks & gotchas

- **Lexical self-reference crashes `generate:types`** in this Payload version
  (documented in `row.ts`). Keep all nesting via slug-based `blockReferences`
  against the config registry; never inline a block object that (transitively)
  contains itself.
- **Nesting depth**: keep the two-editor rule. Blocks inside rich text inside
  blocks is depth 2; the `basicRichTextEditor` cap is what keeps the admin UI
  and payload sizes sane. Grid/Row items stay one level deep.
- **Bundle weight**: charts (Recharts), marquee/animated components
  (framer-motion) must be lazily imported in converters and must use the
  library's static or `animated/` entries deliberately — framer-motion never
  in the server component graph.
- **Adding required fields to existing blocks breaks old docs** — always add
  as optional-with-default or migrate via a Local API script
  (`payload.find` → `payload.update`, passing `overrideAccess: true`
  server-side, with `depth: 0`).
- **Embed/iframe safety**: fixed `sandbox` allowlist, URL validation, no
  author-provided raw HTML, ever.
- **`dbName` budget**: keep the abbreviation habit from `section.ts` on
  deeply nested groups; it costs nothing on MongoDB and saves a painful
  rename if the app ever moves to `db-postgres`.
- **UploadThing + image sizes**: confirm `imageSizes` variants generate through
  the UploadThing adapter before converters depend on them (adapter-specific
  behavior).
