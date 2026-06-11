import CodeHighlight from "@/components/CodeHighlight";
import { Section } from "@/components/common/Section";
import { cssVariableReferences } from "@/components/css-variables/reference-data";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import Link from "next/link";

import {
  zuiTokenPattern,
  zuiTokenReferenceGroups,
  zuiTokenReferences,
} from "./token-reference-data";
import type {
  TokenTheme,
  ZuiTokenReference,
  ZuiTokenReferenceGroup,
} from "./types";

const themeLabels: Record<TokenTheme, string> = {
  light: "Light",
  dark: "Dark",
  shared: "Shared",
};

const componentCssVariableEntries = Object.entries(cssVariableReferences).map(
  ([slug, reference]) => ({
    slug,
    title: reference.title.replace(" CSS variables", ""),
    href: `/preview/components/${slug}#zui-css-variables-${slug}`,
    variableCount:
      reference.lightVariables.length + reference.darkVariableCount,
  }),
);
const uniqueTokenNames = new Set(zuiTokenReferences.map((token) => token.name));
const uniqueDarkTokenNames = new Set(
  zuiTokenReferences
    .filter((token) => token.theme === "dark")
    .map((token) => token.name),
);

const paletteExample = [
  { label: "Brand", token: "--zui-brand", value: "#2563eb" },
  { label: "Hover", token: "--zui-brand-hover", value: "#1d4ed8" },
  { label: "Success", token: "--zui-status-success", value: "#16a34a" },
  { label: "Warning", token: "--zui-status-warning", value: "#d97706" },
  { label: "Error", token: "--zui-status-error", value: "#e11d48" },
  { label: "Info", token: "--zui-status-info", value: "#0284c7" },
] as const;

function formatCssDeclarations(tokens: readonly ZuiTokenReference[]) {
  return tokens
    .map((token) => `  ${token.name}: ${token.fallback};`)
    .join("\n");
}

function uniqueTokensByName(tokens: readonly ZuiTokenReference[]) {
  return Array.from(
    new Map(tokens.map((token) => [token.name, token])).values(),
  );
}

function getPaletteThemeSnippet() {
  return `:root {
  --zui-brand: #2563eb;
  --zui-brand-hover: #1d4ed8;
  --zui-brand-fg: #ffffff;

  --zui-fg: #0f172a;
  --zui-fg-muted: #475569;
  --zui-surface-muted: #e2e8f0;
  --zui-surface-soft: color-mix(in oklch, var(--zui-brand) 8%, transparent);
  --zui-surface-hover: color-mix(in oklch, var(--zui-brand) 14%, transparent);
  --zui-border: color-mix(in oklch, var(--zui-brand) 24%, transparent);
  --zui-focus-ring: color-mix(in oklch, var(--zui-brand) 72%, #475569);

  --zui-status-success: #16a34a;
  --zui-status-warning: #d97706;
  --zui-status-error: #e11d48;
  --zui-status-info: #0284c7;

  --zui-color-blue: var(--zui-brand);
  --zui-color-indigo: #4f46e5;
  --zui-color-purple: #7c3aed;
  --zui-color-pink: #db2777;
}

.dark {
  --zui-brand-dark: #60a5fa;
  --zui-brand-hover-dark: #93c5fd;
  --zui-brand-fg-dark: #020617;

  --zui-fg-dark: #f8fafc;
  --zui-fg-muted-dark: #cbd5e1;
  --zui-surface-muted-dark: #1e293b;
  --zui-surface-soft-dark: color-mix(in oklch, var(--zui-brand-dark) 12%, transparent);
  --zui-surface-hover-dark: color-mix(in oklch, var(--zui-brand-dark) 18%, transparent);
  --zui-border-dark: color-mix(in oklch, var(--zui-brand-dark) 28%, transparent);
  --zui-focus-ring-dark: color-mix(in oklch, var(--zui-brand-dark) 72%, #cbd5e1);

  --zui-status-success-dark: #22c55e;
  --zui-status-warning-dark: #f59e0b;
  --zui-status-error-dark: #fb7185;
  --zui-status-info-dark: #38bdf8;

  --zui-color-blue-dark: var(--zui-brand-dark);
  --zui-color-indigo-dark: #818cf8;
  --zui-color-purple-dark: #c084fc;
  --zui-color-pink-dark: #f472b6;
}`;
}

function getTokenOverrideSnippet() {
  const lightTokens = uniqueTokensByName(
    zuiTokenReferences.filter((token) => token.theme !== "dark"),
  );
  const darkTokens = uniqueTokensByName(
    zuiTokenReferences.filter((token) => token.theme === "dark"),
  );

  return [
    `:root {\n${formatCssDeclarations(lightTokens)}\n}`,
    `/* Dark theme tokens use the same contract with -dark appended. */\n.dark {\n${formatCssDeclarations(darkTokens)}\n}`,
  ].join("\n\n");
}

function PalettePreview() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {paletteExample.map((color) => (
        <div
          key={color.token}
          className="rounded-xl border border-white/10 bg-white/5 p-3"
        >
          <div
            className="h-16 rounded-lg border border-black/10 dark:border-white/10"
            style={{ backgroundColor: color.value }}
          />
          <div className="mt-3 space-y-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {color.label}
            </p>
            <p className="font-mono text-xs text-slate-700 dark:text-slate-400">
              {color.token}
            </p>
            <p className="font-mono text-xs text-cyan-900 dark:text-cyan-200">
              {color.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function splitTopLevelFallback(value: string) {
  let depth = 0;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (char === "(") {
      depth += 1;
    } else if (char === ")") {
      depth -= 1;
    } else if (char === "," && depth === 0) {
      return [value.slice(0, index).trim(), value.slice(index + 1).trim()];
    }
  }

  return null;
}

function unwrapColorFallback(value: string): string {
  const trimmedValue = value.trim();

  if (!trimmedValue.startsWith("var(") || !trimmedValue.endsWith(")")) {
    return trimmedValue;
  }

  const innerValue = trimmedValue.slice(4, -1);
  const parts = splitTopLevelFallback(innerValue);

  if (!parts) {
    return trimmedValue;
  }

  return unwrapColorFallback(parts[1]);
}

function normalizeCssColorValue(value: string) {
  return value.replaceAll("_", " ");
}

function getCssColorValue(value: string) {
  const colorValue = unwrapColorFallback(value);
  const normalizedColorValue = normalizeCssColorValue(colorValue);

  if (
    /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(
      normalizedColorValue,
    ) ||
    /^(?:oklch|oklab|lch|lab|rgb|rgba|hsl|hsla)\(/i.test(
      normalizedColorValue,
    ) ||
    /^color-mix\(/i.test(normalizedColorValue)
  ) {
    return normalizedColorValue;
  }

  return null;
}

function TokenColorSwatch({ value }: { value: string }) {
  const colorValue = getCssColorValue(value);

  if (!colorValue) {
    return null;
  }

  return (
    <span
      className="inline-flex size-4 shrink-0 rounded border border-black/10 shadow-sm ring-1 ring-white/50 dark:border-white/10 dark:ring-black/30"
      style={{ backgroundColor: colorValue }}
      title={colorValue}
      aria-label={`Color preview for ${colorValue}`}
    />
  );
}

function tokenThemeClassName(theme: TokenTheme) {
  if (theme === "dark") {
    return "border-indigo-300/20 bg-indigo-800 dark:bg-indigo-300/10 text-indigo-100";
  }

  if (theme === "light") {
    return "border-cyan-300/20 bg-cyan-800 dark:bg-cyan-300/10 text-cyan-100";
  }

  return "border-emerald-300/20 bg-emerald-800 dark:bg-emerald-300/10 text-emerald-100";
}

function TokenTable({ tokens }: { tokens: readonly ZuiTokenReference[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-900 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Variable</th>
            <th className="px-4 py-3 font-medium">Fallback</th>
            <th className="px-4 py-3 font-medium">Theme</th>
            <th className="px-4 py-3 font-medium">Pair</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {tokens.map((token) => (
            <tr key={token.name}>
              <td className="px-4 py-3 align-top font-mono text-cyan-900 dark:text-cyan-100">
                {token.name}
              </td>
              <td className="px-4 py-3 align-top">
                <div className="flex min-w-0 items-center gap-2">
                  <TokenColorSwatch value={token.fallback} />
                  <span className="min-w-0 break-all font-mono text-slate-900 dark:text-slate-200">
                    {token.fallback}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 align-top">
                <span
                  className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${tokenThemeClassName(
                    token.theme,
                  )}`}
                >
                  {themeLabels[token.theme]}
                </span>
              </td>
              <td className="px-4 py-3 align-top font-mono text-slate-900 dark:text-slate-400">
                {token.pairName ?? "none"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GlobalTokenGroup({ group }: { group: ZuiTokenReferenceGroup }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-200 dark:bg-slate-950/50">
      <div className="border-b border-white/10 bg-white/5 px-4 py-3">
        <h3 className="font-mono text-sm font-semibold text-cyan-900 dark:text-cyan-100">
          {group.source}
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-900 dark:text-slate-400">
          {group.description}
        </p>
      </div>

      <TokenTable tokens={group.tokens} />
    </div>
  );
}

function ComponentOverrideLinks() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {componentCssVariableEntries.map((component) => (
        <Link
          key={component.slug}
          href={component.href}
          className="rounded-xl border border-white/10 bg-slate-200 p-4 transition hover:border-cyan-400/40 hover:bg-cyan-50 dark:bg-slate-950/50 dark:hover:bg-cyan-950/20"
        >
          <span className="block text-base font-semibold text-slate-900 dark:text-white">
            {component.title}
          </span>
          <span className="mt-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-900 dark:text-cyan-100">
            {component.variableCount} component variables
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function TokenReferencePage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <Section variant="plain" className="space-y-6">
        <PreviewHeroSeoBlock seo={seo} />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Unique variables
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {uniqueTokenNames.size}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Components
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {componentCssVariableEntries.length}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Dark variables
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {uniqueDarkTokenNames.size}
            </p>
          </div>
        </div>
      </Section>

      <Section className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-900 dark:text-cyan-200">
            Contract pattern
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Token naming
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-900 dark:text-slate-300">
            Every global token keeps the same <code>--zui-</code> prefix as
            component-level variables. Light and dark values are separate CSS
            variables so consumers can override either theme without changing
            component code.
          </p>
        </div>

        <code className="block overflow-x-auto rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-cyan-100">
          {zuiTokenPattern}
        </code>
      </Section>

      <Section className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-900 dark:text-cyan-200">
            Theme palette
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Override globals first
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-900 dark:text-slate-300">
            Global tokens sit below component variables. A component token such
            as <code>--zui-button-default-bg</code> still wins when you set it,
            but if it is not set the component falls through to shared globals
            like <code>--zui-brand</code>, <code>--zui-border</code>,{" "}
            <code>--zui-surface-soft</code>, and <code>--zui-color-blue</code>.
          </p>
        </div>

        <PalettePreview />

        <div className="overflow-hidden rounded-xl border border-white/10">
          <CodeHighlight codeString={getPaletteThemeSnippet()} language="css" />
        </div>
      </Section>

      <Section className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-900 dark:text-cyan-200">
            Override snippet
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Global theme variables
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-900 dark:text-slate-300">
            Start with these root-level variables, then add component-specific
            overrides from the CSS variable section on each component page.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <CodeHighlight
            codeString={getTokenOverrideSnippet()}
            language="css"
          />
        </div>
      </Section>

      <Section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-900 dark:text-cyan-200">
            Reference table
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Global tokens from source
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-900 dark:text-slate-300">
            This table is derived from the exported constants in{" "}
            <code>src/design-system/tokens.ts</code>. The fallback column is the
            value Zentauri UI uses when no consumer override is present.
          </p>
        </div>

        <div className="space-y-5">
          {zuiTokenReferenceGroups.map((group) => (
            <GlobalTokenGroup key={group.source} group={group} />
          ))}
        </div>
      </Section>

      <Section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-900 dark:text-cyan-200">
            Component overrides
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Jump to component CSS variables
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-900 dark:text-slate-300">
            Component-level overrides already live on each component preview
            page. Use these links when you need an exact variable such as{" "}
            <code>--zui-button-blue-bg</code> or{" "}
            <code>--zui-alert-success-border</code>.
          </p>
        </div>

        <ComponentOverrideLinks />
      </Section>

      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
