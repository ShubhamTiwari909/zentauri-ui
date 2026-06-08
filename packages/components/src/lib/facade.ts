// Introspection API over the design-system token strings.
//
// This is metadata-only: it reads the exported `zui*` style constants and
// surfaces the `--zui-*` CSS variable contract behind each component, variant,
// and slot. It is NOT the runtime styling path — components keep wiring tokens
// through `cva()` directly. Use this for token discovery, docs tables, theme
// editors, CLI validation, and (later) design-tool export.
//
//   DesignSystem.getComponent("accordion")
//     .getVariant("appearance", "blue")
//     .variables();

import * as tokens from "../design-system/index";

export type TokenTheme = "light" | "dark" | "shared";

export type ZuiVariable = {
  name: `--zui-${string}`;
  fallback: string;
  theme: TokenTheme;
  pairName?: `--zui-${string}`;
};

export type VariantHandle = {
  /** Normalized group, e.g. "appearance", "size", or "base". */
  group: string;
  /** Variant key within the group, e.g. "blue", "md". For base groups: "base". */
  key: string;
  /** Slot the variant belongs to, e.g. "root", "item", "trigger". */
  slot: string;
  /** Raw Tailwind class string for the variant. */
  className: string;
  /** `--zui-*` variables referenced by the variant, with light/dark pairing. */
  variables: () => ZuiVariable[];
};

export type ComponentHandle = {
  slug: string;
  title: string;
  /** All slots that expose tokens, e.g. ["root", "item", "trigger"]. */
  slots: () => string[];
  /** Variant group names available on the root slot, e.g. ["appearance", "size"]. */
  groups: () => string[];
  /** Appearance keys for a slot (defaults to the root slot). */
  appearances: (slot?: string) => string[];
  /** Size keys for a slot (defaults to the root slot). */
  sizes: (slot?: string) => string[];
  /** Resolve a single variant. `group` accepts "appearance", "size", "base", … */
  getVariant: (
    group: string,
    key: string,
    options?: { slot?: string },
  ) => VariantHandle | undefined;
  /** All variants for a group (defaults to the root slot). */
  variants: (group: string, options?: { slot?: string }) => VariantHandle[];
  /** Every `--zui-*` variable the component references, deduped and paired. */
  variables: () => ZuiVariable[];
};

type ComponentSpec = {
  slug: string;
  title: string;
  /** Token-name prefix, i.e. the `<component>` in `--zui-<component>-…`. */
  tokenPrefix: string;
  /** Identifier stem of the `zui<Stem>…` exports backing this component. */
  exportPrefix: string;
};

const componentSlugs = [
  "accordion",
  "alert",
  "animated-number",
  "avatar",
  "badge",
  "breadcrumb",
  "buttons",
  "card",
  "checkbox",
  "command",
  "context-menu",
  "copy-button",
  "divider",
  "drawer",
  "dropdown",
  "dynamic-stepper",
  "empty-state",
  "file-upload",
  "inputs",
  "kbd",
  "marquee",
  "modal",
  "otp-input",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "rating",
  "scroll-area",
  "select",
  "skeleton",
  "slider",
  "spinner",
  "table",
  "tabs",
  "timeline",
  "toast",
  "toggle",
  "tooltip",
  "tree-view",
  "typography",
] as const;

// Slugs whose token prefix or export stem diverges from the slug itself.
const overrides: Record<
  string,
  { tokenPrefix?: string; exportPrefix?: string; title?: string }
> = {
  buttons: { tokenPrefix: "button" },
  inputs: { tokenPrefix: "input", exportPrefix: "Input" },
  "otp-input": { tokenPrefix: "otp", exportPrefix: "Otp" },
  "radio-group": { tokenPrefix: "radio" },
  "context-menu": { tokenPrefix: "dropdown" },
};

// Identifier suffix → normalized variant group name.
const groupSuffixes: Array<[suffix: string, group: string]> = [
  ["Appearances", "appearance"],
  ["Appearance", "appearance"],
  ["Sizes", "size"],
  ["Size", "size"],
  ["Orientations", "orientation"],
  ["Orientation", "orientation"],
  ["Alignments", "alignment"],
  ["Alignment", "alignment"],
  ["Levels", "level"],
  ["Level", "level"],
  ["Tones", "tone"],
  ["Tone", "tone"],
  ["Variants", "variant"],
  ["Variant", "variant"],
  ["Speeds", "speed"],
  ["Speed", "speed"],
  ["Shadows", "shadow"],
  ["Visibility", "visibility"],
  ["Markers", "marker"],
];

function pascalCase(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function kebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
}

const specs: ComponentSpec[] = componentSlugs.map((slug) => {
  const override = overrides[slug] ?? {};

  return {
    slug,
    title: override.title ?? titleCase(slug),
    tokenPrefix: override.tokenPrefix ?? slug,
    exportPrefix: override.exportPrefix ?? pascalCase(slug),
  };
});

// --- CSS variable parsing -------------------------------------------------

function readBalancedExpression(input: string, startIndex: number) {
  let depth = 0;

  for (let index = startIndex; index < input.length; index += 1) {
    const char = input[index];

    if (char === "(") {
      depth += 1;
      continue;
    }

    if (char === ")") {
      depth -= 1;

      if (depth === 0) {
        return input.slice(startIndex + 1, index);
      }
    }
  }

  return "";
}

function findTopLevelComma(input: string) {
  let depth = 0;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (char === "(") {
      depth += 1;
      continue;
    }

    if (char === ")") {
      depth -= 1;
      continue;
    }

    if (char === "," && depth === 0) {
      return index;
    }
  }

  return -1;
}

type RawVariable = { name: `--zui-${string}`; fallback: string };

/**
 * Pull every `--zui-*` CSS variable (name + fallback) out of a Tailwind class
 * string. A class string typically contains many `var(--name, fallback)`
 * references mixed in with normal utility classes.
 *
 * It scans left-to-right for `var(` openings and, for each, reads the balanced
 * parenthesised body so that nested `var()`/`oklch()` fallbacks don't confuse
 * the parser. The body is split at the first *top-level* comma into name and
 * fallback. Underscores in the fallback are converted to spaces because
 * Tailwind's arbitrary-value syntax encodes spaces as `_`
 * (e.g. `oklch(44.6%_0.043_257.281)`).
 *
 * Step by step:
 * 1. Find the next `var(` from the current `searchIndex`; stop when none remain.
 * 2. Read the balanced expression after `var` → the text inside the outermost
 *    parens (handles nested parens like `oklch(...)`).
 * 3. Locate the first comma that sits at paren-depth 0 — the name/fallback split.
 * 4. Slice out `name` (before the comma) and `fallback` (after it, `_`→space).
 *    No comma ⇒ the whole body is the name and the fallback is `""`.
 * 5. Keep it only if `name` starts with `--zui-` (ignore non-design-system vars).
 * 6. Advance `searchIndex` past this `var(` and loop.
 *
 * @param className - A Tailwind class string, e.g. a single variant's classes.
 * @returns One entry per `--zui-*` reference, in source order. Duplicates are
 *   preserved here; deduping/pairing happens later in {@link classifyVariables}.
 *
 * @example
 * parseRawVariables(
 *   "divide-[var(--zui-accordion-blue-divider,#2563eb)] " +
 *   "dark:divide-[var(--zui-accordion-blue-divider-dark,#3b82f6)]",
 * );
 *  → [
 *      { name: "--zui-accordion-blue-divider",      fallback: "#2563eb" },
 *      { name: "--zui-accordion-blue-divider-dark", fallback: "#3b82f6" },
 *    ]
 *
 * @example
 * parseRawVariables("text-[color:var(--zui-x-fg,oklch(20.8%_0.04_265))]");
 *  → [{ name: "--zui-x-fg", fallback: "oklch(20.8% 0.04 265)" }]
 *    (note the underscores became spaces)
 */
function parseRawVariables(className: string): RawVariable[] {
  const variables: RawVariable[] = [];
  let searchIndex = 0;

  while (searchIndex < className.length) {
    // 1. Find the next `var(` opening; bail out when there are none left.
    const varIndex = className.indexOf("var(", searchIndex);

    if (varIndex === -1) {
      break;
    }

    // 2. Read the balanced body of this `var(...)`, tolerating nested parens.
    const content = readBalancedExpression(className, varIndex + "var".length);
    // 3. Split name vs. fallback at the first depth-0 comma.
    const commaIndex = findTopLevelComma(content);
    // 4. Extract the name and the (underscore-normalised) fallback.
    const name =
      commaIndex > -1 ? content.slice(0, commaIndex).trim() : content.trim();
    const fallback =
      commaIndex > -1
        ? content
            .slice(commaIndex + 1)
            .trim()
            .replace(/_/g, " ")
        : "";

    // 5. Keep only design-system variables.
    if (name.startsWith("--zui-")) {
      variables.push({ name: name as `--zui-${string}`, fallback });
    }

    // 6. Move past this `var(` and continue scanning.
    searchIndex = varIndex + "var(".length;
  }

  return variables;
}

/**
 * Turn a flat (possibly duplicated) list of raw variables into deduped
 * {@link ZuiVariable}s annotated with theme + light/dark pairing.
 *
 * The library's token contract pairs a light variable with a `-dark` sibling
 * inside the *same* class string (e.g. `--zui-x-bg` and `--zui-x-bg-dark`).
 * This function detects those pairs so the docs/theme-editor can show "Light /
 * Dark / Shared" badges and point each row at its counterpart.
 *
 * Step by step:
 * 1. Dedupe by name into a Map, keeping the first sighting — but *upgrade* an
 *    empty fallback to a later non-empty one (different exports sometimes
 *    reference the same var with/without a fallback).
 * 2. Build a Set of all surviving names so pair lookups are O(1).
 * 3. For each variable, decide its base name: strip a trailing `-dark` if it is
 *    a dark token, otherwise the name is already the base.
 * 4. Check whether the corresponding `${base}-dark` name exists in the set.
 * 5. Assign a theme:
 *    - `dark`   → the name ends in `-dark`.
 *    - `light`  → not dark, but a `-dark` partner exists.
 *    - `shared` → not dark and no partner (a single theme-agnostic value).
 * 6. Assign `pairName`: dark→its light base, light→its `-dark` partner,
 *    shared→`undefined`.
 *
 * @param raw - Output of {@link parseRawVariables} (order preserved, dupes ok).
 * @returns Deduped variables with `theme` and optional `pairName`.
 *
 * @example
 * classifyVariables([
 *   { name: "--zui-x-bg",      fallback: "#fff" },
 *   { name: "--zui-x-bg-dark", fallback: "#000" },
 *   { name: "--zui-x-radius",  fallback: "8px" },
 * ]);
 *  → [
 *      { name: "--zui-x-bg",      fallback: "#fff", theme: "light",
 *        pairName: "--zui-x-bg-dark" },
 *      { name: "--zui-x-bg-dark", fallback: "#000", theme: "dark",
 *        pairName: "--zui-x-bg" },
 *      { name: "--zui-x-radius",  fallback: "8px", theme: "shared",
 *        pairName: undefined },
 *    ]
 */
function classifyVariables(raw: RawVariable[]): ZuiVariable[] {
  // 1. Dedupe by name; prefer a populated fallback over an empty one.
  const byName = new Map<string, RawVariable>();

  for (const variable of raw) {
    const existing = byName.get(variable.name);

    // Keep the first occurrence, but upgrade to a non-empty fallback.
    if (!existing || (!existing.fallback && variable.fallback)) {
      byName.set(variable.name, variable);
    }
  }

  // 2. Index the names for fast pair lookups.
  const names = new Set(byName.keys());

  return [...byName.values()].map(({ name, fallback }) => {
    // 3. Derive the light "base" name for this entry.
    const isDark = name.endsWith("-dark");
    const baseName = isDark
      ? (name.replace(/-dark$/, "") as `--zui-${string}`)
      : name;
    // 4. Does the dark counterpart exist?
    const darkName = `${baseName}-dark` as `--zui-${string}`;
    const hasDarkPair = names.has(darkName);

    // 5 + 6. Resolve theme and the paired variable name.
    return {
      name,
      fallback,
      theme: isDark ? "dark" : hasDarkPair ? "light" : "shared",
      pairName: isDark ? baseName : hasDarkPair ? darkName : undefined,
    } satisfies ZuiVariable;
  });
}

// --- token-string collection ---------------------------------------------

const tokenEntries = Object.entries(tokens as Record<string, unknown>) as Array<
  [string, unknown]
>;

function flattenClassStrings(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(flattenClassStrings);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(flattenClassStrings);
  }

  return [];
}

/** Variant-map exports: `{ key: className }` objects of plain strings. */
function isVariantMap(value: unknown): value is Record<string, string> {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.values(value).every((entry) => typeof entry === "string")
  );
}

/**
 * Decode a design-system export identifier into the `{ group, slot }` it
 * describes, or `undefined` if the name does not belong to this component.
 *
 * Token files name their exports by convention:
 * `zui<ExportPrefix><Slot?><Group>` — e.g. `zuiAccordionBase`,
 * `zuiAccordionAppearances`, `zuiAccordionItemAppearances`. This function
 * reverses that convention: it strips the `zui<ExportPrefix>` stem, then reads
 * the trailing group word (`Base`/`Appearances`/`Sizes`/…) and treats whatever
 * is left in the middle as the slot ("root" when empty).
 *
 * Step by step:
 * 1. Build the stem `zui<ExportPrefix>` and bail unless `name` starts with it.
 * 2. Slice off the stem to get the `remainder` (the slot + group part).
 * 3. Boundary guard: if the remainder is non-empty it must start with an
 *    uppercase letter, so prefix "Tab" cannot claim "zuiTabsBase"
 *    (remainder "sBase" starts lowercase → rejected).
 * 4. Exact `"Base"` (or empty remainder) ⇒ the component's base group at the
 *    root slot.
 * 5. A remainder *ending* in `Base` (e.g. "ItemBase") ⇒ base group, with the
 *    leading text ("Item") kebab-cased into the slot.
 * 6. Otherwise match the remainder's trailing word against {@link groupSuffixes}
 *    (Appearances→appearance, Sizes→size, …); the leading text becomes the slot.
 * 7. No recognised suffix ⇒ `undefined` (not a classifiable export).
 *
 * @param exportPrefix - The component's PascalCase export prefix, e.g. "Accordion".
 * @param name - A token export identifier, e.g. "zuiAccordionItemAppearances".
 * @returns `{ group, slot }` describing the export, or `undefined`.
 *
 * @example
 * classifyExportName("Accordion", "zuiAccordionBase");
 *  → { group: "base", slot: "root" }
 *
 * @example
 * classifyExportName("Accordion", "zuiAccordionItemAppearances");
 *  → { group: "appearance", slot: "item" }
 *
 * @example
 * classifyExportName("Tab", "zuiTabsBase");
 *  → undefined  (remainder "sBase" fails the uppercase boundary guard)
 */
function classifyExportName(exportPrefix: string, name: string) {
  // 1. Only consider exports under this component's `zui<ExportPrefix>` stem.
  const stem = `zui${exportPrefix}`;

  if (!name.startsWith(stem)) {
    return undefined;
  }

  // 2. The slot + group portion that follows the stem.
  const remainder = name.slice(stem.length);

  // 3. Boundary guard: avoid e.g. exportPrefix "Tab" claiming "zuiTabsBase".
  if (remainder.length > 0 && !/^[A-Z]/.test(remainder)) {
    return undefined;
  }

  // 4. Bare base export (`zui<Prefix>Base`, or the prefix alone) → root slot.
  if (remainder === "Base" || remainder === "") {
    const slotPart = remainder === "Base" ? "" : remainder;
    return { group: "base", slot: slotPart ? kebabCase(slotPart) : "root" };
  }

  // 5. Slot-scoped base export (`zui<Prefix><Slot>Base`) → that slot's base.
  if (remainder.endsWith("Base")) {
    const slotPart = remainder.slice(0, -"Base".length);
    return { group: "base", slot: slotPart ? kebabCase(slotPart) : "root" };
  }

  // 6. Variant export: match the trailing group word; leading text = slot.
  for (const [suffix, group] of groupSuffixes) {
    if (remainder.endsWith(suffix)) {
      const slotPart = remainder.slice(0, -suffix.length);
      return { group, slot: slotPart ? kebabCase(slotPart) : "root" };
    }
  }

  // 7. Recognised stem but no recognised group word — not classifiable.
  return undefined;
}

type GroupRecord = {
  group: string;
  slot: string;
  /** key → className. Base groups use a single "base" key. */
  entries: Record<string, string>;
};

function tokenPrefixMatches(prefix: string, variableName: string) {
  return (
    variableName === `--zui-${prefix}` ||
    variableName.startsWith(`--zui-${prefix}-`)
  );
}

// --- per-component model (built once) -------------------------------------

type ComponentModel = {
  spec: ComponentSpec;
  groups: GroupRecord[];
  variables: ZuiVariable[];
};

/**
 * Build the full introspection model for one component by scanning every token
 * export once. The model is the cached backbone behind a {@link ComponentHandle}
 * — it holds the component's variant groups (for `getVariant`/`appearances`)
 * and its deduped variable list (for `variables()`).
 *
 * Two independent things are derived from each token export, because they use
 * different keys:
 * - **Variables** are matched by their `--zui-<tokenPrefix>` *value* prefix, so
 *   a component picks up every variable it references even from a shared export.
 * - **Groups** are matched by the export's *identifier* via
 *   {@link classifyExportName}, which keys off `zui<ExportPrefix>`.
 *
 * Step by step:
 * 1. Walk every `[exportName, value]` pair in the design system.
 * 2. Flatten the value to its class strings, parse out every `--zui-*` variable,
 *    and keep those whose name matches this component's `tokenPrefix`.
 * 3. Classify the export *identifier* into `{ group, slot }`; skip if it isn't
 *    one of this component's exports.
 * 4. A `base` classification ⇒ join the class strings into one string and push
 *    a single-entry group (`{ base: className }`).
 * 5. A variant classification whose value is a `{ key: className }` map ⇒ push a
 *    group carrying a shallow copy of that map's entries.
 * 6. Return the spec, the collected groups, and the variables run through
 *    {@link classifyVariables} (dedupe + light/dark pairing).
 *
 * @param spec - The component spec (slug, title, tokenPrefix, exportPrefix).
 * @returns A {@link ComponentModel} ready to back a component handle.
 *
 * @example
 * buildModel({ slug: "accordion", title: "Accordion",
 *              tokenPrefix: "accordion", exportPrefix: "Accordion" });
 *  → {
 *      spec: { … },
 *      groups: [
 *        { group: "base",       slot: "root", entries: { base: "rounded-xl …" } },
 *        { group: "appearance", slot: "root", entries: { default: "…", blue: "…", outline: "…" } },
 *        { group: "size",       slot: "root", entries: { sm: "…", md: "…", lg: "…" } },
 *        { group: "appearance", slot: "item", entries: { blue: "…", … } },
 *      ],
 *      variables: [ { name: "--zui-accordion-blue-divider", theme: "light", … }, … ],
 *    }
 */
function buildModel(spec: ComponentSpec): ComponentModel {
  const groups: GroupRecord[] = [];
  const rawVariables: RawVariable[] = [];

  // 1. Scan every token export in the design system.
  for (const [name, value] of tokenEntries) {
    // 2. Collect every variable this component references, regardless of how
    //    the owning export is named (some components reuse another's tokens).
    for (const className of flattenClassStrings(value)) {
      for (const variable of parseRawVariables(className)) {
        if (tokenPrefixMatches(spec.tokenPrefix, variable.name)) {
          rawVariables.push(variable);
        }
      }
    }

    // 3. Map named exports into variant groups for `getVariant`/`appearances`.
    const classification = classifyExportName(spec.exportPrefix, name);

    if (!classification) {
      continue;
    }

    // 4. Base export → one group holding the merged class string.
    if (classification.group === "base") {
      const className = flattenClassStrings(value).join(" ");
      groups.push({
        group: "base",
        slot: classification.slot,
        entries: { base: className },
      });
      continue;
    }

    // 5. Variant map export → one group keyed by variant name.
    if (isVariantMap(value)) {
      groups.push({
        group: classification.group,
        slot: classification.slot,
        entries: { ...value },
      });
    }
  }

  // 6. Dedupe/pair variables and return the assembled model.
  return {
    spec,
    groups,
    variables: classifyVariables(rawVariables),
  };
}

const models = new Map<string, ComponentModel>();

function getModel(slug: string): ComponentModel | undefined {
  const cached = models.get(slug);

  if (cached) {
    return cached;
  }

  const spec = specs.find((entry) => entry.slug === slug);

  if (!spec) {
    return undefined;
  }

  const model = buildModel(spec);
  models.set(slug, model);
  return model;
}

// --- public handles -------------------------------------------------------

function createVariantHandle(group: GroupRecord, key: string): VariantHandle {
  const className = group.entries[key] ?? "";

  return {
    group: group.group,
    key,
    slot: group.slot,
    className,
    variables: () => classifyVariables(parseRawVariables(className)),
  };
}

/**
 * Wrap a built {@link ComponentModel} in the public {@link ComponentHandle} — the
 * ergonomic, lazy query surface returned by `DesignSystem.getComponent(...)`.
 * The handle holds no data of its own; every method is a thin lookup over the
 * model's `groups`/`variables`, so handles are cheap to recreate.
 *
 * Step by step:
 * 1. Destructure the model into `spec`, `groups`, and `variables`.
 * 2. Define `findGroup(group, slot)` — locate the one group record matching both
 *    a group name ("appearance"/"size"/"base") and a slot ("root"/"item"/…).
 * 3. Define `keysFor(group, slot)` — the variant keys of that record, or `[]`.
 * 4. Return the handle:
 *    - `slug`/`title` come straight from the spec.
 *    - `slots()` → the unique slot names across all groups.
 *    - `groups()` → the group names available on the root slot.
 *    - `appearances(slot)`/`sizes(slot)` → variant keys (default slot "root").
 *    - `getVariant(group, key, opts)` → a {@link VariantHandle}, or `undefined`
 *      when the group/slot/key triple doesn't exist.
 *    - `variants(group, opts)` → handles for every key in that group ([] if none).
 *    - `variables()` → the component's deduped, theme-paired variables.
 *
 * @param model - The component's built model (see {@link buildModel}).
 * @returns A {@link ComponentHandle} exposing the lazy query methods.
 *
 * @example
 * const accordion = createComponentHandle(buildModel(accordionSpec));
 * accordion.slug;                            // → "accordion"
 * accordion.slots();                         // → ["root", "item", "trigger", "content"]
 * accordion.appearances();                   // → ["default", "blue", "outline"]
 * accordion.appearances("item");             // → ["blue", …]
 * accordion.getVariant("appearance", "blue");
 *    → VariantHandle { group: "appearance", key: "blue", slot: "root", className, variables() }
 * accordion.getVariant("appearance", "nope"); // → undefined
 */
function createComponentHandle(model: ComponentModel): ComponentHandle {
  // 1. Pull the model apart; the methods below close over these.
  const { spec, groups, variables } = model;

  // 2. Find the single group record for a (group, slot) pair.
  const findGroup = (group: string, slot: string) =>
    groups.find((entry) => entry.group === group && entry.slot === slot);

  // 3. The variant keys of that record (empty when the record is missing).
  const keysFor = (group: string, slot: string) => {
    const record = findGroup(group, slot);
    return record ? Object.keys(record.entries) : [];
  };

  // 4. Assemble the lazy query surface.
  return {
    slug: spec.slug,
    title: spec.title,
    slots: () => [...new Set(groups.map((entry) => entry.slot))],
    groups: () =>
      groups
        .filter((entry) => entry.slot === "root")
        .map((entry) => entry.group),
    appearances: (slot = "root") => keysFor("appearance", slot),
    sizes: (slot = "root") => keysFor("size", slot),
    getVariant: (group, key, options) => {
      const record = findGroup(group, options?.slot ?? "root");

      if (!record || !(key in record.entries)) {
        return undefined;
      }

      return createVariantHandle(record, key);
    },
    variants: (group, options) => {
      const record = findGroup(group, options?.slot ?? "root");

      if (!record) {
        return [];
      }

      return Object.keys(record.entries).map((key) =>
        createVariantHandle(record, key),
      );
    },
    variables: () => variables,
  };
}

export const DesignSystem = {
  /** All component slugs known to the design system. */
  components(): string[] {
    return specs.map((spec) => spec.slug);
  },
  /** Resolve a single component, or `undefined` if the slug is unknown. */
  getComponent(slug: string): ComponentHandle | undefined {
    const model = getModel(slug);
    return model ? createComponentHandle(model) : undefined;
  },
  /** Every component handle, in registry order. */
  listComponents(): ComponentHandle[] {
    return specs
      .map((spec) => getModel(spec.slug))
      .filter((model): model is ComponentModel => Boolean(model))
      .map(createComponentHandle);
  },
  /** Parse `--zui-*` variables out of an arbitrary class string. */
  parse(className: string): ZuiVariable[] {
    return classifyVariables(parseRawVariables(className));
  },
};

export type DesignSystemFacade = typeof DesignSystem;
