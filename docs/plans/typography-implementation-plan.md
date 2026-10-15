# Typography implementation plan

Date: 13 October 2026

Status (15 October 2026): all planned typography implementation branches and VisualGuard coverage have reached `main`, including the recovery merge in PR #160. Earlier local and hosted coverage results are historical; checks for the recovered stack remain pending. Package release and any CMS adoption remain separate follow-ups.

Visual verification tooling: [VisualGuard](https://github.com/ShubhamTiwari909/visualguard-ai-testing), Shubham Tiwari's open-source visual testing package. Package overview and navigation are published in PR #154. Runner configuration and CI are published in PR #158; local and hosted verification and reference review are recorded below.

Scope: every typography recommendation in [the broader roadmap](./hooks-typography-animations-roadmap.md), including optional editorial additions

## 1. Outcome and branch recommendation

Build a typography system that supports branded interfaces, long-form content, accessible inline text, compact data displays and editorial layouts while preserving the existing API and default presentation.

**Recommendation: do not implement the entire scope in one long-lived branch.** Use four sequential implementation branches for the committed scope, followed by an optional fifth branch for editorial enhancements. Each branch should include its own source, examples, tests, generated metadata and release notes. The preferred sequence merges each completed branch before starting its dependency from the default branch. When continuing before review finishes, stack the next branch on the previous branch and target that dependency in its PR; rebase and retarget to main after the dependency merges.

The foundations change shared tokens and existing components, so they belong in one coherent review. Rich-content components, measured text behavior and numeric formatting have different testing needs and can ship independently after those foundations. A single branch covering all of them would make regressions harder to isolate and keep completed additions waiting for the most complex feature.

| Branch / PR                             | Deliverables                                                                | Depends on                                                                   | Merge gate                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `codex/typography-foundations`          | Tokens, Heading/Text extensions, semantic emphasis, presets, VisuallyHidden | Current default branch                                                       | Existing examples retain default styling; new API/token/accessibility checks pass |
| `codex/typography-content`              | Prose, TextLink, DescriptionList, existing list/quote/code integration      | Foundations merged                                                           | Complete article and details examples work in both themes and narrow layouts      |
| `codex/typography-text-utilities`       | Mark, HighlightText, TruncateText, ExpandableText, useTextOverflow          | Foundations merged; content merged under the recommended sequential workflow | Literal matching, keyboard disclosure and real overflow measurement verified      |
| `codex/typography-number-formatting`    | useNumberFormat, NumberText, numeric composition examples                   | Foundations merged; latest default branch                                    | Explicit-locale hydration and numeric formatting verified                         |
| `codex/typography-editorial` — optional | Footnotes, heading permalink recipe, reading-time helper, drop-cap recipe   | Core work complete                                                           | Clear product use case plus editorial/accessibility verification                  |

Four core PRs are the target, not an absolute rule. Split a branch further if a component becomes difficult to review independently. Avoid splitting library source from its docs/tests into separate PRs: every merged feature should be usable and documented.

If one branch is strongly preferred, limit it to **foundations plus the three content additions**. Merge that core first; text measurement, number formatting and editorial work should still follow separately. An integration branch is unnecessary for the sequential approach. If an unreleased demo is needed, a temporary integration branch can combine reviewed work, but it should not replace the individual merge reviews.

Suggested commit prefixes follow repository guidance: `feature: add typography scale tokens`, `fix: preserve typography default styling`, and `feature: add prose content styles`. Create each implementation branch when its phase begins; all typography implementation and coverage branches are now published. The foundations implementation is committed and published in PR #153. The content branch is published in [PR #154](https://github.com/ShubhamTiwari909/zentauri-ui/pull/154), targeting foundations while PR #153 awaits review. Text utilities are published in [PR #155](https://github.com/ShubhamTiwari909/zentauri-ui/pull/155), targeting content. Number formatting is published in [PR #156](https://github.com/ShubhamTiwari909/zentauri-ui/pull/156), targeting text utilities. Editorial is published in [PR #157](https://github.com/ShubhamTiwari909/zentauri-ui/pull/157), targeting number formatting. VisualGuard coverage is published in [PR #158](https://github.com/ShubhamTiwari909/zentauri-ui/pull/158), stacked on editorial commit `e35026f2`.

Use a separate follow-up branch, `codex/visualguard-coverage`, for the shared VisualGuard dependency, capture configuration, reviewed baselines and CI workflow. It can follow the content merge and supply the visual gate for later typography branches. The package's dedicated `/visualguard` page, header/footer links and this planning update belong to the current docs work; they do not require installing VisualGuard or broadening the public component package's dependencies.

## 2. Current baseline and constraints

The existing entry is `@zentauri-ui/zentauri-components/ui/typography`. It exports Heading, Text, List, ListItem, Blockquote, InlineCode and CodeBlock.

| Current behavior                                                                  | Required treatment                                                           |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Heading level 1–6 selects h1–h6; displayLevel selects visual scale                | Preserve this separation and both props                                      |
| Heading h1 grows from text-4xl to text-5xl at md                                  | Preserve the responsive default before adding opt-in fluid sizing            |
| Text defaults to p, size base; sm/base/lg exist                                   | Preserve those names and defaults                                            |
| Text supports p/span/div/label and visual boolean formatting                      | Keep existing call sites valid; improve element-specific DOM/ref typing      |
| Tone values and gradient colors use public `--zui-typography-*` variables         | Preserve every existing name; add tokens rather than rename                  |
| Highlight backgrounds, quote spacing and code surfaces have inline utility styles | Move themeable styling into design-system constants with equivalent defaults |
| One typography test file contains seven rendering/class checks                    | Retain coverage and add behavior-focused tests per new feature               |
| Docs have six typography section slugs                                            | Keep existing URLs; extend the current dynamic route and registry            |

Source baseline: `packages/components/src/ui/typography/`, `src/design-system/typography.ts`, `src/lib/facade.ts`, and `apps/component-library/components/preview/typography/`.

The existing build creates a client entry for typography. New static primitives should remain deterministic during server rendering, but this plan does not promise a new React Server Component export. A dedicated server entry would require a separate package-boundary design.

## 3. Packaging and architecture decisions

Keep the new typography components in the existing `src/ui/typography/` family and expose them from its index. Consumers continue using one import path and `zentauri-ui add typography`. This avoids proliferating competing entries and keeps the existing typography docs model intact. Package tree shaking must still be checked; vendoring intentionally copies the family and its transitive hook dependencies.

Use one file group per component inside that family: implementation/base, static wrapper where consistent with current patterns, exported props, variants and a focused test file. Split the common types file into component-specific types if necessary, while preserving the existing exported type names and re-exporting everything through the index.

- Design-system files contain pure class-string constants and maps only.
- Variant files import those constants and compose them with cva; no raw Tailwind styling in variant maps.
- Shared fonts, tone, sizing and spacing belong in `src/design-system/typography.ts`. Keep constants named consistently with the facade's typography stems.
- Subdivide design-system files only if readability requires it. If subdivision introduces imports/re-exports, verify facade discovery, token checking and CLI transitive token copying before adopting it.
- `useTextOverflow` and `useNumberFormat` each receive their own `src/hooks/<name>/` folder and registered hook entry.
- Static typography must not import Framer Motion. AnimatedNumber remains an existing separate component; show composition without importing it into NumberText.
- No Markdown parser, sanitizer, font download, syntax-highlighting engine or framework dependency is added by this plan.
- Avoid adding a TypographyProvider initially. CSS variables on a wrapper already provide local theme scoping without context or an additional provider boundary.

All API names below are proposed contracts. During implementation, confirm they work with generated props metadata and current React types before locking the public surface. Resolve routine type details within these constraints; a separate approval step is unnecessary.

## 4. Shared typography tokens

### Token groups

| Group               | Proposed names / shape                                                                           | Default policy                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Font family         | `--zui-typography-font-body`, `-font-display`, `-font-mono`                                      | Inherit current body/display fonts; preserve the existing mono fallback stack |
| Body scale          | `--zui-typography-text-<size>-size`, `-leading`, `-weight`, `-tracking`                          | Existing sm/base/lg values and relaxed leading stay equivalent                |
| Heading scale       | `--zui-typography-heading-<level>-size`, `-size-md`, `-leading`, `-weight`, `-tracking`          | Match current heading utilities, including h1's md step                       |
| Display/fluid scale | `--zui-typography-display-<size>-size`; optional fluid-size tokens                               | Opt-in only; defaults expressed in rem and appropriate clamp ranges           |
| Readable width      | `--zui-typography-measure`, `-measure-wide`                                                      | Proposed 65ch and 80ch; existing Text remains unrestricted unless requested   |
| Vertical rhythm     | `--zui-typography-paragraph-gap`, `-heading-gap`, `-list-gap`, `-quote-padding`, `-code-padding` | Preserve old primitive spacing; Prose gets a separate scoped rhythm           |
| Inline highlight    | `--zui-typography-mark-bg`, `-mark-fg` and dark counterparts                                     | Separate mark contrast from ordinary text tone                                |
| Code surfaces       | `--zui-typography-inline-code-bg`, `-border`; block-code bg/border/shadow counterparts           | Equivalent current light/dark appearance                                      |
| Links               | Link foreground, visited/hover foreground, underline and focus tokens with dark pairs            | Visible focus and underline; avoid relying on color alone                     |
| Editorial details   | Definition spacing, footnote rule, drop-cap scale                                                | Add with their owning feature rather than predeclare unused tokens            |

Keep all existing tone tokens. Every themeable value needs a hardcoded fallback and paired light/dark classes under the repository contract. When a metric is the same in both themes, the dark fallback can inherit the light token unless a dark override is provided; document the exact rule and verify it with the token checker.

Fonts should inherit when the consumer has not configured them. Do not replace a consumer's configured Tailwind font stack with a new system font unexpectedly. Read the installed Tailwind theme definitions and establish concrete equivalent fallbacks during implementation.

### Foundation acceptance criteria

1. With no token overrides, existing typography demos have equivalent computed sizes, weights, spacing and colors.
2. A wrapper can override body/display/mono fonts and scale without editing component classes.
3. Existing color variables still work, including gradient tone classes.
4. Consumers can override individual components without changing every Text or Heading.
5. Base styles do not force all content into a readable-width container.
6. Fluid sizing is opt-in and remains readable at zoom and narrow viewport sizes; rem-based bounds must be validated rather than assumed sufficient.
7. CSS variable references and facade output include all newly introduced token families.

## 5. Existing primitive extensions

### Heading

Keep required `level`, optional `displayLevel`, tone and formatting booleans. Add common typography variants:

- `align`: start/center/end/justify, with logical start/end for RTL.
- `weight`: normal/medium/semibold/bold; an omitted weight preserves the level's existing default.
- `leading`: tight/normal/relaxed; omitted preserves the existing scale.
- `tracking`: tight/normal/wide; omitted preserves the existing scale.
- `wrap`: normal/balance/pretty/nowrap; use progressive CSS behavior with a readable fallback.
- `measure`: none/readable/wide; default none.
- `scale`: default/fluid; default default.
- Optional `displaySize`: sm/md/lg for marketing display sizes. Preserve the semantic tag. Precedence: displaySize, then displayLevel, then level. Do not automatically add marketing sizes to every h1.

Explicit variants take precedence over legacy booleans when both control the same property; for example weight normal overrides bold true. Document this and keep old-only usage equivalent. ClassName remains a consumer escape hatch and continues through cn.

Do not add a generic Heading `as` prop that weakens the semantic-level contract. Permalink behavior is a composition recipe, described below.

### Text

Retain sm/base/lg and add xs/xl only where the size catalog and docs show a clear need. Add the same applicable alignment/weight/leading/tracking/wrap/measure controls plus:

- `font`: body/mono, default body.
- `numeric`: normal/tabular, default normal.
- `preset`: body/lead/caption/overline, default body.

Precedence: explicit size/weight/leading/tracking overrides a preset; a preset overrides its own default styling; legacy booleans only fill unspecified properties. An omitted preset/variant preserves existing output.

Model `as` with element-specific DOM props and refs: label must accept htmlFor; span/p/div must preserve their own ref types. Widen existing object-only refs to supported React Ref types without forcing a consumer migration. Add type fixtures for current usage and new tag-specific props.

Keep the old highlight boolean as a visual convenience. Do not silently change its wrapper from p/span/etc. into mark. Use the new Mark component when relevance semantics are intended.

### Lists, quotations and code

- Tokenize list gap/indent and support logical padding for RTL. Preserve marker and ordered behavior.
- Tokenize quote border, spacing and attribution styling. Preserve cite URL versus attribution label distinction.
- Tokenize InlineCode and typography CodeBlock surfaces, padding and mono typography.
- Preserve typography CodeBlock as the simple pre/code primitive. Document the richer `ui/code-block` entry for copy buttons and line numbers; do not replace one with the other or change its props.
- Include existing Kbd in prose examples by importing its existing entry. Do not create a second keyboard-key primitive.

## 6. Semantic emphasis, presets and VisuallyHidden

### Strong / Emphasis / Small

Provide lightweight strong/em/small components with native attributes and refs, optional tone/className, and appropriate token styles. Importance and stress should be semantic choices, not inferred from bold or italic on Text. `Text bold` and `Text italic` remain visual formatting controls.

Caption, lead and overline are Text presets rather than separate build entries. Overline's uppercase appearance must not mutate the actual string. A visual caption preset does not generate figcaption automatically; show native figcaption composition where a figure caption is intended.

### VisuallyHidden

Proposed props: `as` span/div, `focusable` false by default, native attributes and ref. Use visually hidden styles that keep content available to assistive technology. Do not use display none or aria-hidden for its default behavior.

When focusable is enabled, reveal the wrapper on focus-within and style a contained skip link appropriately. Show an actual anchor with a real target; do not make a noninteractive span focusable by default. Put logical hiding rules in the design-system layer.

Acceptance: icon-only button labels are discoverable, content is visually hidden, the skip link becomes visible through keyboard focus, and focus-visible behavior remains usable in forced-colors mode.

## 7. Prose

Purpose: style already-rendered article/MDX content consistently without requiring each nested element to be a Zentauri component.

Proposed API: as div/article; size sm/base/lg; measure readable/wide/none; tone restricted to ordinary readable foreground tones; className/style/ref/children. Default is a div with a base scale and readable width. Gradient text should remain an explicit heading-level treatment, not a default color for an entire article.

Style plain nested headings, paragraphs, anchors, strong/em, lists, blockquotes, inline code, pre/code, hr, tables, images, figures/captions and description lists. Use logical spacing and ensure nested lists do not inherit inappropriate paragraph margins.

Selector requirements:

- Scope all descendant styles to the container; no global element styling.
- Use low-specificity selectors so explicit component styles and className overrides remain practical.
- Provide an escape boundary such as `data-prose="ignore"` for interactive demos, embedded app panels and code viewers.
- Avoid double styling Zentauri elements identified by data-slot. Explicitly test an existing TextLink/Heading and nested lists inside Prose.
- Images fit the available width. Tables/code can scroll within suitable containers without causing the whole page to overflow.
- Render children normally. Do not add dangerouslySetInnerHTML, auto-generated heading IDs or Markdown parsing.

Acceptance example: one article with all supported plain HTML elements, embedded Zentauri components and an ignored interactive panel, rendered in light/dark themes, RTL and a narrow viewport. Reflow verification should follow [W3C's reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), including appropriate exceptions for content that intrinsically needs two-dimensional layout.

## 8. TextLink

Native anchor props remain the base contract, including href, target, rel, download and ref. Add tone, underline always/hover/none, optional external indicator and shared typography controls where useful. Default underline is always.

- Preserve native navigation and meaningful accessible names.
- New-tab behavior must be explicit through target; an external indicator does not silently change the target.
- Merge appropriate rel values when using target blank, preserving caller-supplied tokens.
- Decorative external icons are aria-hidden; demonstrate explicit text for a new-tab warning where the application needs one.
- Keep visited and focus-visible styles tokenized and test forced colors.
- Restrict or handle gradient tones deliberately: transparent text can become unreadable if background styling is interrupted. Do not blindly forward the entire TypographyTone union to links.

Start with an anchor plus exported `textLinkVariants`. For framework composition, show the consumer's Link using those styles, avoiding nested anchors. Do not add an asChild slot engine or a Next dependency in this phase. Read installed Next.js documentation before writing framework-specific examples.

## 9. DescriptionList

Compound API: `DescriptionList`, `.Item`, `.Term`, `.Details`, with named exports for each subcomponent. Root renders dl; Item groups related dt/dd elements in a div; Term renders dt; Details renders dd. Permit multiple descriptions for a term where semantically appropriate.

Proposed variants: layout stacked/inline/responsive, size sm/base/lg, optional separators. Responsive layout must use CSS breakpoints or container behavior rather than browser width reads during render. Tokenize term/value gap, row gap, column proportions and separator colors. Use logical placement for RTL.

Do not wrap the result in table/grid ARIA roles. Values can contain links, code and status components; preserve their interaction and semantics. Support long terms, long unbroken values, empty-value placeholders supplied by callers and nested text.

Acceptance: settings/account/API-details examples use real dl/dt/dd markup, collapse gracefully on narrow screens and retain readable alignment in both themes.

## 10. Mark and HighlightText

Mark is a native mark wrapper with paired foreground/background tokens and inline padding/radius. Its purpose is relevance, such as matched search terms; it is distinct from Strong's importance semantics. The [HTML mark reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/mark) also notes that screen readers do not necessarily announce mark boundaries. Avoid promising announcements or adding noisy announcements by default.

HighlightText accepts `text: string`, `query: string | readonly string[]`, optional caseSensitive and className/markClassName. Render string fragments and Mark elements inside a span. No HTML-string output and no traversal of arbitrary React children in the initial version.

Matching contract:

1. Literal matching only; characters such as parentheses, periods and brackets are not interpreted as consumer regular expressions.
2. Ignore empty queries; return the original text when no match exists.
3. Determine deterministic nonoverlapping ranges; resolve competing matches by the longest match at the same start offset.
4. Preserve the original text, whitespace and casing exactly.
5. Preserve offsets with escaped literal alternatives and Unicode regular-expression matching. Case-insensitive matching uses Unicode simple case folding (`iu`), preserving non-ASCII text and emoji without lowercasing the source. Accent normalization and locale-specific equivalence are outside the first version.
6. A query update cannot leave stale marks behind.

Reuse in Search/Command/log-viewer demos without automatically modifying their rendering behavior in the same PR. A separate adoption change can replace local highlighting after the primitive has shipped.

## 11. TruncateText, ExpandableText and useTextOverflow

### TruncateText

String content, as span/p/div, `lines` a positive integer default 1, className and native props/ref. Clamp with CSS; do not split strings or replace them with abbreviated text. Preserve the full string in the DOM and copy behavior. Do not automatically add a tooltip or title attribute.

Handle long unbroken values and flex/grid shrink constraints. Prefer CSS custom properties for dynamic line counts where Tailwind static scanning cannot discover computed class names. Static truncation should work before any JavaScript measurement.

### useTextOverflow

Registered hook with a callback ref and object result `{ ref, isOverflowing, hasMeasured, remeasure }`. Options are `enabled`, `measurementKey`, optional positive integer `lines`, `axis` (horizontal/vertical/both) and nonnegative `tolerance` (default 1 CSS pixel). With `lines`, measure a temporary text-only copy with the source computed styles/width and collapsed constraints; without it, inspect the actual node. The temporary copy has no IDs, attributes or interactive descendants, is hidden/inert, and is removed immediately after measurement.

- Reuse existing resize-observer behavior where practical.
- Compare actual scroll/client dimensions for the applicable clamp and axis; handle fractional measurements and a small documented tolerance.
- Remeasure when the element, string, width, font or line constraint changes, and after relevant font loading.
- Support conditionally mounted elements and cleanup of observers/listeners.
- Never read layout during server render. Initial client output matches server markup.
- Ensure overflow detection continues to represent the collapsed state after expansion; measuring only an expanded node would incorrectly remove the collapse control. Define a constrained measurement strategy and keep any measurement clone inaccessible and noninteractive.
- Batch measurements when repeated resizing would otherwise cause excessive work.

### ExpandableText

Separate block component: content area plus a native button, `text`, `lines`, controlled/uncontrolled expanded state, onExpandedChange and caller-supplied localized more/less labels. Use stable IDs, aria-controls and aria-expanded. Default labels can be English but must be replaceable.

Only offer the disclosure button when the collapsed text truly overflows. Retain button focus during expansion/collapse. Define the accessibility policy explicitly: CSS-clipped text remains in the accessibility tree, and the disclosure changes its visual presentation. Do not duplicate the full string in a second screen-reader-only node.

The button may appear after initial measurement; document this and keep the fallback content usable. On environments without measurement support, retain static truncation behavior and provide a documented option to expose the disclosure control. Content/size changes must not strand the component in an unusable state.

Do not wrap the button inside a paragraph or inline-only element. Motion is outside scope; instant expansion is the default and works without an optional peer.

## 12. NumberText and useNumberFormat

This is the only typography addition that depends on a new locale-formatting hook.

### useNumberFormat

Follow the current date-format hook's per-folder organization and bounded formatter cache, but use a deterministic locale default rather than navigator.language during render.

Implemented input: Intl.NumberFormatOptions plus optional `locale: string | string[]`, with an en-US default and final locale-preference fallback. Empty preferences also use en-US; invalid locale syntax retains native errors. Return format, formatToParts, resolvedLocale and the formatter. A pure cached formatter helper can be exported where the package boundary permits; do not claim it is server-callable merely because it avoids a hook.

Cache keys normalize canonical locale preferences and a fixed ordering of standard option keys; undefined options are omitted. A FIFO cache retains at most 50 formatter instances. Unknown or nonprimitive option inputs bypass caching and remain under native Intl behavior. Construct before eviction so invalid options cannot evict valid cached instances. Do not silently choose a currency or locale from geolocation. Explicit locale is recommended for server-rendered consumer examples.

Use the native [Intl.NumberFormat API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat). Determine the supported value and option types from the installed TypeScript/browser targets, and document optional APIs rather than assuming formatRange is universally available.

### NumberText

Defaults to span; accepts number or supported bigint values, locale, typography tone/size and tabular numeric styling. Keep Intl options in a `formatOptions` object so its `style` option cannot collide with the native React CSS `style` prop. Native attributes and ref should match the rendered element. Optional part rendering can support currency/fraction styling, but standard text remains the simple default.

Examples: en-IN decimal grouping, USD/INR/JPY currencies, percentages, compact notation and measurement units. Keep symbols, spacing and order exactly as the formatter returns them; do not append manual currency labels to a formatted currency value.

Explicitly document rounding, invalid values, negative zero, NaN/infinity behavior and bigint support. Do not turn arbitrary numeric strings into numbers without an explicit API. Displayed precision is presentation, not a calculation or money-storage contract.

A static NumberText must not import AnimatedNumber. Provide a separate composition example using existing AnimatedNumber capabilities only where they support the format without losing locale ordering or accessibility.

Acceptance: stable server/first-client output for an explicit locale; controlled options update formatting; digit grouping and currency placement are correct; part styling preserves complete text and tabular alignment.

## 13. Optional editorial scope

These recommendations remain in the plan, but do not block the four core PRs.

| Feature                  | Proposed contract                                                                                             | Acceptance / boundary                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Footnotes with backlinks | Explicit note IDs, reference numbers and a scoped list; support multiple references to one note               | Stable IDs, keyboard-operable references/backlinks, meaningful labels, no collisions across articles; no automatic Markdown conversion |
| Heading permalink recipe | Compose Heading with a real ID and TextLink carrying an accessible link name                                  | Preserve heading structure and text; link appears on focus as well as hover; do not slug arbitrary React children automatically        |
| Reading-time helper      | Pure estimate from text with configurable words-per-minute and locale-aware word segmentation where available | Approximation clearly labeled; deterministic inputs; punctuation/empty content/fallback tested; no universal reading-rate claim        |
| Drop-cap recipe          | Opt-in first-letter styling inside Prose, using tokenized scale and spacing                                   | Preserve selectable/accessibility text; test initial punctuation, narrow layouts and RTL; no string rewriting                          |

Reading-time output should compose existing duration formatting or native unit formatting. [Intl.Segmenter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) provides locale-sensitive segmentation; environments without it need a documented approximate fallback. Default reading speed is a configurable product estimate, not a language-independent fact.

Adopt footnotes as a component only if the docs/blog use case requires it. Ship heading anchors and drop caps as recipes first, then add public components only when those recipes cannot reasonably satisfy consumers.

### Confirmed editorial use cases and implementation boundaries

The existing Prose documentation provides a rendered article use case. The blog's [block/schema roadmap](../../apps/zentauri-blogs/BLOCKS_SCHEMA_PLAN.md) identifies reading-time metadata and a future footnote inline feature, while its [rich-text editor](../../apps/zentauri-blogs/src/blocks/richText.ts) currently supports headings, links, lists and quotations. Those are reuse targets, not claims that the CMS already has a footnote renderer. The editor feature remains a separate integration task, as its roadmap specifies.

- **Heading permalinks:** link to a real section ID in the docs article. Keep Heading and TextLink siblings so the heading name remains unchanged. The exported `typographyPermalinkRecipe` class string reveals the link on hover/keyboard focus for hover-capable pointers and keeps it visible on touch-style surfaces. Authors provide the ID and accessible link name; no slug extraction occurs.
- **Drop caps:** an opt-in article presentation example, including initial punctuation and RTL. `typographyDropCapRecipe` styles the native first-letter pseudo-element with paired size/leading/gap and existing display-font tokens. It leaves all text intact. Review the treatment with the intended script/font; it is not a global typography default or a new paragraph component.
- **Footnotes:** the article cites one source from two passages and needs separate return links. `Footnotes` supplies Reference/List/Item/Backlink primitives and named exports. Authors provide note IDs, unique reference IDs and matching positive 32-bit ordinals. A unique stable scopeId is recommended for published links; default React IDs provide hydration-stable scopes inside one React root. Supply unique scopes/React identifier prefixes across independent rendering roots. Length-delimited IDs and encoded fragments avoid ambiguous/special-character targets. Root ID automation does not allocate note numbers or repair duplicate authored IDs inside a scope. Notes use native ol/li/anchor markup and focusable hash targets; each backlink requires a meaningful localized label.
- **Reading time:** estimate the article excerpt or future post metadata from an explicit plain-text string. `estimateReadingTime` returns wordCount, rounded-up minutes/seconds and the counting method. The configurable default of 200 words/minute is a product estimate. Auto uses Intl.Segmenter when available and otherwise counts Unicode letter/number runs (including combining marks and internal apostrophes). Approximate mode can undercount scripts without spaces; explicit segmenter mode reports missing support. Pin approximate mode to avoid feature-availability differences or reuse a precomputed result when matching server/client output is required. Locale/Unicode data versions can still affect classification. No HTML, Markdown, Lexical or React-child extraction is added.

Reading-time examples use NumberText with native minute units and explicit locale. The estimator also has a dedicated server-safe ui/typography/reading-time entry. Its existing client export is retained for compatibility; recipe constants remain in the typography client entry. Package source, examples and source vendoring are delivered together. CMS schema/converter/editor adoption is deferred to its own focused change.

## 14. Documentation and repository integration

### Library files

| Surface                                                   | Planned changes                                                                    |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `packages/components/src/ui/typography/`                  | New primitives, types, variants, focused tests and index exports                   |
| `packages/components/src/design-system/typography.ts`     | Shared scale/rhythm and component token constants                                  |
| `packages/components/src/design-system/index.ts`          | Existing typography export remains; add exports only if token files are split      |
| `packages/components/src/lib/facade.ts`                   | Verify/add typography variable stems and variant group discovery for new constants |
| `packages/components/src/hooks/useTextOverflow/`          | Measurement hook and tests; added in text-utilities PR                             |
| `packages/components/src/hooks/useNumberFormat/`          | Number formatter and tests; added in numeric PR                                    |
| `packages/components/tsup.config.ts`                      | Register the two hooks; typography UI entry already exists                         |
| `packages/components/cli/registry.json`, `cli/props.json` | Regenerate; do not hand-edit generated output                                      |
| Package README/CHANGELOG and docs health data             | Describe additions, compatibility and updated coverage/surface counts              |

Do not add per-component package export mappings: the current wildcard package exports and existing typography entry are sufficient for the chosen packaging. Adding internal nested import paths would require explicit build entries and is outside this plan.

### Docs files

- Extend `lib/typography-preview-registry.ts` and reuse `app/preview/typography/[section]/page.tsx` rather than adding a duplicate route for each component.
- Preserve existing section slugs. Add sections for scale, prose, links, description-list, accessibility, highlighting, truncation and number-formatting. Cover semantic emphasis/presets within existing inline/paragraph sections. Editorial gets its own section only when shipped.
- Add corresponding SEO JSON under the existing typography content directory and register it in the typography registry. Do not route these through the generic component SEO registry unless a separate generic component page is deliberately added.
- Extend the hub, hero, section-body, snippet/data/demo files. Make each new example executable and show code-example labels with p tags according to repository style.
- Update `components/sidebar/sidebar-data.ts`. Site search consumes typography sidebar items; confirm new pages appear and add helpful keyword aliases where useful.
- Extend `components/css-variables/data/typography.ts` so every public token is discoverable with light/dark defaults.
- Keep homepage installation under typography; do not pretend every named export is a separately addable CLI component.
- For new hooks, add the hook registry, demo, SEO and search surfaces using the established hook workflow.
- Generated props should include each exported component; verify multi-component metadata and the typography API table before accepting it.
- Maintain a separate `/visualguard` package overview rather than treating VisualGuard as a vendorable UI component. Link it from the shared header (desktop and mobile), the docs footer and site search. Include its GitHub repository, version-aware setup information, capabilities and relationship to typography verification.

Before modifying any Next code, read the relevant installed guide in `node_modules/next/dist/docs/`.

## 15. Verification plan

Use targeted tests while implementing. DOM render tests alone cannot verify computed CSS or physical overflow in jsdom; those need a small browser fixture or manual browser validation against the docs examples.

### VisualGuard coverage

[VisualGuard's source README](https://github.com/ShubhamTiwari909/visualguard-ai-testing#readme) describes Playwright capture, pixel/DOM comparison, saved references and optional Gemini/Ollama analysis. Use it to retain before/after evidence for typography changes and to catch unintended layout changes between reviews. The existing unit, API, token and accessibility checks remain part of the merge gate.

**Version selection comes first.** The upstream README includes source changes intended for a future major release and does not claim that release is published. Confirm the published package's capabilities against the chosen version, or use a built source artifact pinned to a reviewed commit. Record that version/commit in the configuration notes. Follow the upstream [installation guide](https://github.com/ShubhamTiwari909/visualguard-ai-testing/blob/main/PUBLISHING-AND-USING.md) and [reliability/migration guide](https://github.com/ShubhamTiwari909/visualguard-ai-testing/blob/main/docs/RELIABILITY-CHANGES.md) for the selected artifact. The current source requires Node.js 22.12 or newer; check compatibility with the repository's runtime before adding the dependency.

#### Planned implementation sequence

1. Add VisualGuard and its required Playwright runtime as development tooling in the docs workspace; pin the validated version and document the command location. Keep them out of the publishable component package's runtime dependencies.
2. Create an explicit route manifest and baseline configuration. Start with Chromium, fixed viewport dimensions and the same build/runtime/platform for the reference and candidate. Validate the package environment with `visualguard doctor`.
3. Capture the existing main-branch examples before typography changes where possible. Newly added pages receive their first reviewed baseline after their design is approved. The current manual browser checks do not count as VisualGuard baselines.
4. Add repeatable light and dark capture setups. The docs use `body[data-theme]`, so browser color scheme alone is insufficient: prepare the actual docs theme before capture. Wait for fonts, set repeatable example content, and stabilize transitions/media. Avoid masking the text, focus indicators or code/table containers being verified.
5. Explicitly create references using `visualguard test --update-baselines`, inspect them, and commit PNGs with their rendering metadata, DOM and health sidecars as required by the selected version. Keep missing-baseline failures enabled in CI.
6. Run candidate comparisons with AI disabled initially and require review of differences (`--no-ai --fail-on review` for the current source CLI). Choose tolerances against observed rendering noise; do not raise them merely to make changed typography pass. Retain the report and its complete screenshot directory as PR evidence.
7. Add a focused CI job once a baseline comparison works locally. Start the docs server, wait for readiness, execute the explicit route manifest, and upload reports on both success and failure. Any optional performance comparison must use equivalent production builds.
8. Add Firefox/WebKit coverage and optional advisory AI analysis after the deterministic suite is stable. AI annotations can help explain a change; maintainers still review expected differences and independent failures.

#### Coverage by typography phase

| Phase              | Proposed pages/states                                                                            | Review evidence                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Foundations        | Existing headings/paragraphs/inline/lists/quotes/code; scale and accessibility pages             | Existing defaults, utility overrides, fluid scales, scoped fonts and visible keyboard focus                    |
| Content            | `/preview/typography/prose`, `/preview/typography/links`, `/preview/typography/description-list` | Article rhythm, raw/embedded/ignored markup, code/table containment, link focus, responsive terms/details      |
| Text utilities     | `/preview/typography/highlighting` and `/preview/typography/truncation`                          | Literal highlighting, one/multiple-line clipping, collapsed and expanded text, focus retained after disclosure |
| Number formatting  | `/preview/typography/number-formatting`                                                          | Explicit en-US/en-IN examples, currency/unit placement, compact values and tabular alignment                   |
| Optional editorial | `/preview/typography/editorial`                                                                  | Footnote references/backlinks, heading anchors and drop caps at narrow widths                                  |

Start with **390 × 844** and **1440 × 900** captures in both themes. Add **320px** width for long-word/overflow examples and a targeted text-enlargement/RTL fixture where those states can be prepared deterministically. Interactive focus/disclosure states belong in the VisualGuard Playwright fixture with a matching reference setup. Still inspect actual overflow dimensions, focus behavior and semantics; a screenshot alone does not prove those properties.

#### Acceptance and baseline policy

- The reference and candidate must use matching browser, platform, viewport, theme, fonts and example data. Record the reference revision and VisualGuard version with the run evidence.
- Separate expected additive typography changes from unexpected changes to existing defaults. Approve each intentional difference with its reason before updating a baseline; never refresh all references to hide unexplained failures.
- Missing references, capture errors and incomplete route coverage block the visual gate. Report generation without successful captures does not count as verification.
- Preserve run screenshots, diffs, DOM findings and the report together. Baseline regeneration after a rendering-environment change requires a fresh review.
- VisualGuard coverage is complete only when a local comparison and its CI equivalent have actually passed. Until then, list this gate as pending in the PR description alongside the already completed manual browser checks.

The initial coverage branch should contain tooling/configuration, reviewed baseline artifacts, a docs testing guide and the CI job. Later typography branches extend its route/state matrix as their pages ship. Automated repair is outside this integration scope.

| Area                   | Required evidence                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Backward compatibility | Existing API/type fixtures compile; original demos retain computed defaults; existing token overrides still apply             |
| Theme tokens           | Light/dark/scoped overrides; defaults recorded; token checker and facade discovery pass                                       |
| Semantics              | Correct h/p/span/label/dl/dt/dd/mark/strong/em/small elements, valid nesting and ref/attribute forwarding                     |
| Prose                  | Nested raw markup, ignored subtree, embedded components, code/table overflow and no style leakage                             |
| Links/accessibility    | Native keyboard navigation, focus visibility, rel merging, accessible labels and forced-colors inspection                     |
| Highlighting           | Empty/overlapping/literal queries, Unicode input, unchanged text content and query updates                                    |
| Overflow               | Real one/multiple line clipping, resize, late fonts, conditional mounts and cleanup; measurement mocks only test control flow |
| Expansion              | Controlled/uncontrolled state, focus retention, aria-controls/expanded, show/hide controls and changed content                |
| Number formatting      | Explicit locales/options, parts, invalid options, cache bound and explicit-locale server/client agreement                     |
| Layout                 | Narrow containers, RTL, browser zoom and text spacing; screenshots before/after for existing defaults                         |
| Package delivery       | ESM/CJS/type exports, no Motion dependency in typography, actual CLI vendoring of hook/token dependencies                     |
| Docs                   | Every route resolves, snippets match APIs, sidebar/search/SEO/props/token reference agree                                     |

Illustrative smallest commands during implementation, from the repository root:

```sh
pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/ui/typography
pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/hooks/useTextOverflow
pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/hooks/useNumberFormat
pnpm --filter @zentauri-ui/zentauri-components check:tokens
pnpm --filter @zentauri-ui/zentauri-components generate:props
pnpm --filter @zentauri-ui/zentauri-components check:props
```

Run only commands relevant to the current PR. Before publishing, use the scoped package type checks/build, registry/surface generation and export checks required by its prepack workflow. Check docs types/build when routes or examples change. Add a focused CLI installation fixture for `add typography` once hooks are referenced through the typography family.

Adding tests requires updating the coverage table/per-suite snapshot in `packages/components/README.md` and totals in the homepage package-health surface, as required by AGENTS.md. The current `update:test-health` script runs the full package suite and writes generated health data: inspect its consumers and refresh the required surfaces without duplicating inconsistent totals. Do that at the PR merge gate, not repeatedly during small iterations.

Do not claim a browser visual check, accessibility audit or test passed unless it was actually run. Track any unverified item explicitly in the PR description.

## 16. Implementation task checklist and release policy

### PR 1 — foundations

- [x] Capture existing default visual/computed-style baseline and compile current API fixtures.
- [x] Finalize token names, fallback inheritance and precedence rules.
- [x] Tokenize existing base styles; retain old public variables.
- [x] Add Heading/Text controls, sensible presets and native prop/ref typing.
- [x] Add Strong, Emphasis, Small and VisuallyHidden.
- [x] Update scale/inline/accessibility docs, token references and generated props.
- [x] Verify default equivalence, semantics, focus visibility and facade/token checks.

### PR 2 — content

- [x] Implement TextLink and DescriptionList.
- [x] Implement Prose selectors, component/escape boundaries and article examples.
- [x] Integrate existing list/quote/code primitives and show richer CodeBlock/Kbd composition.
- [x] Add content SEO/routes/sidebar/search coverage and generated API docs.
- [x] Verify reflow, RTL, both themes and nested component styling.
- [x] Add the separate VisualGuard package page, header/footer/search links and visual verification plan.

### VisualGuard verification follow-up — `codex/visualguard-coverage`

- [x] Select and pin a compatible published version or reviewed source artifact.
- [x] Add development tooling and explicit route/theme/viewport capture configuration.
- [x] Commit the 88 complete baseline sets after branch review (images inspected locally; publication authorized on 14 October 2026).
- [x] Verify deterministic comparisons and interactive focus/disclosure fixtures locally.
- [x] Add a CI job with readiness checks, result policy and complete report artifacts (hosted execution passed in run 38516363498).
- [x] Document intentional-change approval and baseline migration procedures.

### PR 3 — text utilities

- [x] Implement Mark and deterministic literal HighlightText matching.
- [x] Implement CSS-only TruncateText.
- [x] Add/register/document useTextOverflow.
- [x] Implement ExpandableText with collapsed-state measurement and accessible disclosure.
- [x] Verify actual overflow/fonts/resizing in a browser, plus unit interaction/cleanup tests.
- [x] Verify vendored typography pulls the new hook and all needed tokens.

### PR 4 — numbers

- [x] Add/register/document useNumberFormat with explicit-locale examples.
- [x] Implement static NumberText and optional formatter-part styling.
- [x] Add numeric grouping/currency/unit examples and honest AnimatedNumber composition.
- [x] Verify formatting, cache bounds, hydration and generated hooks/props metadata.

### Optional PR 5 — editorial

- [x] Confirm a docs/blog use case for each feature before implementation.
- [x] Add heading anchors and drop caps as recipes.
- [x] Implement footnotes and reading-time helper only where the recipe/use case warrants them.
- [x] Verify stable IDs, backlinks, reading-time fallbacks and narrow/RTL layouts.

Each core PR should be backward-compatible and can be released as an additive minor version once verified. Token renames, changed defaults or altered semantic markup for existing props require either a compatibility path or an explicitly planned major release; they must not be hidden in a minor release. Preserve existing data-slot values and docs URLs.

No universal package-wide typography adoption is required to finish this work. Use representative examples to validate integration; migrate other components/apps in separate, focused follow-ups so typography API work remains reviewable.

The core plan is complete when the four core feature groups ship with documented APIs, tokens, generated metadata, meaningful tests, browser evidence for measured behavior and usable CLI installation. Optional editorial work can follow without delaying that outcome.

## Foundations implementation verification — 13 October 2026

Implemented on `codex/typography-foundations`. Later branch scopes remain unchanged.

- Full package suite: **161 test files, 1,968 tests passed**; includes 19 typography tests, 23 facade tests and a typography source-installation case.
- Package ESM/CJS/declaration build passed; export smoke checks resolved **245 entries across three conditions**.
- Package and docs type checks, targeted package ESLint, token contract, generated props and package surface checks passed.
- Browser baseline comparison at 600px and 1000px showed **no computed-style differences** for the existing sampled defaults/utility overrides across light and dark themes.
- Browser checks verified fluid sizing at 320px/600px/1000px, scoped font/size/leading overrides, dark metric overrides, nested text inheriting overridden parent weight, RTL list/quote spacing, and focus-revealed skip links.
- At a 320px viewport with a 200% root text size, opt-in balanced fluid display text fitted its container after adding oversized-word wrapping. This is a focused layout check, not a claim of a complete WCAG conformance audit.
- New scale/accessibility and existing heading/paragraph routes returned 200; SEO canonicals point to the typography routes. The docs skip link reached its focus target.
- Registry/props/surface metadata and generated package-health figures were refreshed. A minor changeset documents the additions; package publication was not performed.

Remaining validation for a release pipeline: production docs build/deployment and any broader cross-browser/accessibility audit required by maintainers. The docs were verified with type checks and the local Next.js development server here.

## Content implementation verification — 13 October 2026

Implemented on `codex/typography-content`, stacked on the foundations commit while [PR #153](https://github.com/ShubhamTiwari909/zentauri-ui/pull/153) awaits review. The branch includes the content additions and VisualGuard documentation. Its PR targets foundations while that dependency remains open.

- Added Prose, TextLink, and DescriptionList with named/compound definition-list exports in the existing typography entry.
- Full package suite: **162 files, 1,984 tests passed**, including native markup, new-tab rel handling, external indicator names, nested definitions, source installation and token-facade discovery.
- Package build, export checks, token contract, generated props and docs type checks passed.
- Browser checks verified zero-specificity prose overrides, embedded/ignored subtree boundaries, readable heading scale, contained table/code scrolling, theme colors, multiple descriptions, responsive/RTL layouts, and enlarged text at narrow widths.
- Link focus outlines remained visible in forced-colors mode. Keyboard activation of the Next.js composition navigated to the expected typography route.
- Prose, links and description-list documentation routes returned 200 with their expected canonical paths. Examples, token references, API metadata, sidebar/search, changeset and test-health surfaces were updated.

A production docs build and a comprehensive cross-browser/accessibility audit were not run. Content is published in [PR #154](https://github.com/ShubhamTiwari909/zentauri-ui/pull/154), targeting foundations. After the foundations PR merges, rebase content onto main and retarget its existing PR.

## VisualGuard documentation update — 13 October 2026

Added `/visualguard` as a dedicated overview for the open-source package with repository, installation and contribution links. It is discoverable in the shared desktop/mobile header, docs footer and site search. The setup information distinguishes current source documentation from published-version behavior.

Focused verification: all 12 existing header/footer tests passed with additional VisualGuard assertions; docs and shared-package type checks and targeted docs lint passed. The local page rendered with the expected title/canonical and footer link. Browser checks at 320, 390, 640, 1024, 1280 and 1440px found no document overflow, and the mobile drawer link navigated correctly and closed the drawer.

VisualGuard installation, baseline capture and CI execution are not completed by this documentation update. Their pending tasks and acceptance criteria are recorded above; the earlier browser checks remain manual verification evidence.

## Text-utilities implementation verification — 13 October 2026

Implemented on `codex/typography-text-utilities`, stacked on content commit `203f0603` while [PR #154](https://github.com/ShubhamTiwari909/zentauri-ui/pull/154) targets foundations. The completed text utilities are published in [PR #155](https://github.com/ShubhamTiwari909/zentauri-ui/pull/155), targeting content.

- Added semantic Mark, literal Unicode-aware HighlightText, CSS-only TruncateText, native ExpandableText and the registered useTextOverflow hook.
- Full package suite: **164 files, 2,009 tests passed**. Focused suites verify literal/overlapping/Unicode matches, native refs, deterministic server output, controlled/uncontrolled disclosure, stable IDs/focus, observer/font/mutation cleanup and transitive source vendoring. Updated facade assertions also passed.
- Scoped package build, package/docs type checks, targeted package/docs lint, token/props checks and export smoke checks passed. **246 entries across three export conditions** resolved after the final build.
- Browser checks verified two-line clipping (48px visible versus 120–240px scroll height), complete expansion, retained button focus, correct short-content disclosure removal, narrow widths, enlarged text and RTL. Font-size changes triggered new collapsed measurements without losing the full string.
- Highlighting retained literal `[text]`, removed stale marks after clearing a query, and used distinct light/dark mark colors. Keyboard focus in forced colors retained a solid 2px outline.
- Highlighting, truncation and the standalone hook routes returned 200. The hook demo changed from overflow to fits when its content changed; its canonical uses the existing configured site base.
- Generated registry/props/surface metadata, token reference, sidebar/search, examples, minor changeset and package-health tables were updated. CLI installation verified both useTextOverflow and useControllableState source dependencies.

Verification used the existing local docs server at port 3002. No production docs build, VisualGuard baseline/CI run or comprehensive cross-browser/accessibility audit was performed. This branch was published in PR #155 against content; rebase and retarget after PR #154 merges. Number formatting is the active typography phase.

## Number-formatting implementation verification — 13 October 2026

Implemented on `codex/typography-number-formatting`, stacked on published text-utilities commit `a8b528cc` while [PR #155](https://github.com/ShubhamTiwari909/zentauri-ui/pull/155) targets content. The completed number-formatting implementation is published in [PR #156](https://github.com/ShubhamTiwari909/zentauri-ui/pull/156), targeting text utilities.

- Added useNumberFormat and getCachedNumberFormat with explicit/default/fallback locale preferences, stable format/parts callbacks and a bounded 50-instance FIFO cache. Invalid locale syntax/options retain native errors; unknown or unusual option values bypass caching. Number/bigint convenience inputs are checked without numeric-string coercion.
- Added static NumberText in the existing typography entry, with span/p/div native attributes/refs, separate formatOptions and CSS style, readable tones, shared typography controls, default tabular digits and optional partClassNames. It borrows existing paired typography recipes and introduces no new token names or Motion imports.
- Full package suite: **166 test files, 2,032 tests passed**. Tests cover en-US/en-IN grouping, currencies/units/percent/compact values, exact bigint digits, native nonfinite/negative-zero/rounding output, key normalization/cache eviction, option updates, part ordering/text and explicit-locale server/client hydration. Focused facade and CLI installation assertions also passed.
- Scoped package build, package and docs type checks after formatting, targeted package/docs lint, token/props/surface checks and **247 export entries across three conditions** passed. The docs use the BigInt constructor for compatibility with their existing TypeScript target.
- Browser controls produced the exact native French currency output and spacing. Styled parts preserved the full formatted string. Bigint output retained `9,007,199,254,740,993,123`, and computed tabular numeric styling was present in both themes.
- Numeric layouts fitted 320/390/1000/1440px viewports without document overflow. The bigint example remained contained with enlarged text and RTL layout. The hook preview returned 200 and its JPY output matched the browser's native formatter; expected canonical paths were present. No hydration errors appeared in the observed browser console.
- Documentation includes locale/currency controls, grouping/precision/edge-value examples, styled native parts and a separate decorative integer AnimatedNumber composition with localized accessible text. Snippets match the live examples. Registry/API metadata, sidebar/search, changeset, package-surface and test-health tables were refreshed; CLI source installation includes useNumberFormat transitively.

All four core typography phases are now implemented. Their merge/release reviews remain outstanding. Editorial implementation follows below; the separate VisualGuard coverage branch remains planned. No production docs build, VisualGuard baseline/CI run or comprehensive cross-browser/accessibility audit was performed for this phase. Number formatting was published in PR #156 against text utilities; rebase and retarget after PR #155 merges.

## Editorial implementation verification — 13 October 2026

Implemented on `codex/typography-editorial`, stacked on number-formatting commit `c32145a4` while [PR #156](https://github.com/ShubhamTiwari909/zentauri-ui/pull/156) targets text utilities. The editorial implementation is published in [PR #157](https://github.com/ShubhamTiwari909/zentauri-ui/pull/157), targeting number formatting while that dependency remains open.

- Added scoped Footnotes with native Reference/List/Item/Backlink primitives, explicit IDs/numbers and separate return links for repeated citations. Defaults use React hydration-stable scopes; published examples provide unique explicit scopes. Length-delimited/encoded identifiers preserve special-character targets without tuple collisions.
- Added estimateReadingTime with configurable rate, locale and auto/segmenter/approximate counting. Tests cover native word-like segmentation, Unicode runs/contractions/combining marks, empty/punctuation/emoji content, missing Segmenter, deterministic approximate output and invalid/overflowing inputs.
- Added exported class-string heading-permalink and first-letter recipes, paired footnote/drop-cap tokens and an editorial route with complete article, reading-time and punctuation/RTL examples. The use-case decision is recorded above; the CMS editor/schema/converters were not changed.
- Full package suite: **168 files, 2,050 tests passed**. Native semantics/ref/label/fragment tests, generated-ID hydration, tuple/root isolation, facade discovery, TypeScript API fixtures and actual CLI source installation passed.
- Scoped package build, package/docs type checks after formatting, targeted lint, token/props/surface checks and **247 export entries across three conditions** passed. The token reference now includes **276 light and 276 dark variables**; no new component/hook build entry was required.
- Browser keyboard navigation focused the correct note with a solid 2px outline, and backlinks restored the original reference focus. The article instances had eight distinct authored/generated target IDs. Permalink focus revealed the link without changing the heading name; a touch context retained visible links without hover. Forced colors preserved a solid 2px note outline.
- Drop-cap paragraphs retained their complete original text and initial punctuation. Native first-letter size was 56px, with logical inline-start floating/8.4px end gap. Paragraphs fitted 320/390/1000/1440px without document overflow; the enlarged-text case used a 112px initial letter without paragraph overflow. RTL text retained its direction and logical spacing.
- The reading playground handled empty input and changed Chinese text from one approximate run to two native word-like segments, matching the browser's Segmenter. Light/dark note colors differed correctly; an 18px scoped note size carried into dark mode until a 22px dark override was supplied.
- The editorial route returned 200 with its expected canonical path. Examples, API metadata, sidebar/search, source-vendoring checks, minor changeset, token reference and package-health tables were updated. No observed hydration errors appeared in the browser console.

The optional editorial scope is implemented and ready for review. A production docs build, VisualGuard baseline/CI run and comprehensive cross-browser/accessibility audit were not performed. Publish this branch against number formatting while PR #156 is open, then rebase/retarget after that dependency merges. The `codex/visualguard-coverage` follow-up is implemented below; its publication/hosted run and any CMS adoption remain outstanding.

## VisualGuard coverage implementation — 13 October 2026

Started `codex/visualguard-coverage` from the approved editorial commit `e35026f2` and [PR #157](https://github.com/ShubhamTiwari909/zentauri-ui/pull/157). Verified the published npm artifact: `visualguard@2.0.0` exposes the strict saved-reference policy and Playwright fixture used here; the older source README release warning does not determine current npm availability. Pinned VisualGuard 2.0.0 and Playwright / @playwright/test 1.58.2 in docs development dependencies.

The [testing guide](../../apps/component-library/visualguard/README.md) records the complete 15-page manifest, both actual docs themes, mobile/desktop coverage, targeted narrow cases and native interaction assertions. The fixture runner uses `--update-snapshots` for page and interactive references; standalone CLI `--update-baselines` references are not mixed into it. A pinned Linux ARM64 container supplies identical browser, fonts and Node for local runs and the new CI workflow. Reference images and rendering metadata/DOM/health sidecars are retained together; the wrapper stages candidate updates for inspection instead of overwriting tracked references. Missing or legacy baselines fail, AI is disabled and review-level differences block the suite.

Production builds and reference capture have passed. The 15-page matrix has 76 cases and 88 checkpoints; the fresh canonical comparison passed below. GitHub-hosted workflow execution remains pending until the branch is published. CMS adoption, Firefox/WebKit and optional advisory AI remain separate follow-ups.

### Coverage verification progress — 14 October 2026

The initial browser suite exposed docs overflow at 200% root text. The coverage branch fixes the shrinking content column, wrapping showcase/mobile controls, long hero and section headings, and long API identifiers in prose/cards. Component primitives and example copy remain unchanged. Independent development-browser checks reflowed at 320, 390 and 1440px with 200% text; focused sidebar/header tests passed (13 cases). The docs Vitest suite passed all 91 cases and excludes the browser specs. Docs types and focused lint passed; existing PropsTable prop-validation warnings remain.

The canonical Linux production build and doctor check passed. The prepared reference set contains 88 PNGs plus complete metadata, DOM and health sidecars: 64 full-page default views, eight disclosure states, eight footnote/permalink focus states and eight enlarged article/RTL viewport views. Capture review rejected the initial clipped/blank very tall zoomed screenshots; the zoom fixture now uses explicit viewports below the sticky header and requires their dimensions to match the project. Normal-size pages retain full-page coverage. Every checkpoint rejects unstable/clipped captures, and comparison mode additionally requires zero changed pixels above the configured sensitivity, regardless of heuristic labels.

The pinned container keeps dependencies/build outputs in ephemeral Linux volumes and uses a download-cache volume. Capture updates explicitly request Playwright's `all` mode and stage complete candidate sets for inspection. Case timeouts allow three minutes for large image/DOM comparisons; retries remain disabled and the workflow is bounded at 35 minutes. Generated references are excluded from formatting and Tailwind source scanning. A full comparison through the same container entry used by CI passed: 76 cases, 88 checkpoints, zero unexpected failures and zero flaky cases, with all reference sidecars verified. Its 32 skipped cases are the explicitly excluded narrow-project combinations. The comparison took 19.6 minutes in the local container; the production build, doctor and complete evidence checks also passed. Hosted GitHub execution and publication of this branch remain pending.

## Coverage publication — 14 October 2026

The reviewed coverage implementation and all 88 baseline sets are being published on `codex/visualguard-coverage`, targeting `codex/typography-editorial` while PR #157 remains open. The local production comparison passed all 76 cases; GitHub-hosted execution remains unverified until its workflow finishes. This completes the implementation branch sequence in this plan. Merge/release reviews and any CMS adoption remain separate follow-ups. The next implementation branch follows the broader roadmap with the P1 `useDebouncedCallback` hook.

## Hosted coverage verification — 14 October 2026

The initial [GitHub run](https://github.com/ShubhamTiwari909/zentauri-ui/actions/runs/38515241958) passed all 76 visual cases in 4.0 minutes and verified the 88 complete reference artifact sets. Its job nevertheless failed during host cleanup because container installs/builds left root-owned files in the snapshot. The wrapper now passes the caller's user/group IDs and the suite returns workspace/report ownership on exit, preserving its original success/failure status. A complete hosted rerun remains pending for this cleanup correction; screenshot acceptance thresholds and baselines are unchanged.

The [complete hosted rerun](https://github.com/ShubhamTiwari909/zentauri-ui/actions/runs/38516363498) for `b0720296` subsequently passed comparison, evidence validation, ownership cleanup and report upload in 6m48s. VisualGuard coverage is published in [PR #158](https://github.com/ShubhamTiwari909/zentauri-ui/pull/158). All typography implementation/coverage branches are now published; merge/release reviews remain outstanding.

## Main-branch recovery — 15 October 2026

PR #158 merged into the editorial branch after its earlier parent PR had merged. Recovery PR #160 brings the remaining editorial and coverage changes into `main`. The debounced-callback follow-up in PR #159 is rebased directly onto that updated `main`; it no longer depends on an open typography or coverage branch. Existing baseline references are preserved, and current hosted visual results must be checked separately from the historical passing runs above.
