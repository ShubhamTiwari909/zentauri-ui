import CodeHighlight from "@/components/CodeHighlight";
import { Section } from "@/components/common/Section";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import {
  componentTokenReferenceGroups,
  componentTokenReferences,
  zuiTokenPattern,
  zuiTokenReferenceGroups,
  zuiTokenReferences,
} from "./token-reference-data";
import type {
  ComponentTokenReferenceGroup,
  TokenTheme,
  ZuiTokenReference,
  ZuiTokenReferenceGroup,
} from "./types";
import { FaArrowDown } from "react-icons/fa";

const themeLabels: Record<TokenTheme, string> = {
  light: "Light",
  dark: "Dark",
  shared: "Shared",
};

const allTokenCount = zuiTokenReferences.length + componentTokenReferences.length;
const darkTokenCount = [...zuiTokenReferences, ...componentTokenReferences].filter(
  (token) => token.theme === "dark",
).length;

function formatCssDeclarations(tokens: readonly ZuiTokenReference[]) {
  return tokens
    .map((token) => `  ${token.name}: ${token.fallback};`)
    .join("\n");
}

function getTokenOverrideSnippet() {
  const lightTokens = zuiTokenReferences.filter(
    (token) => token.theme !== "dark",
  );
  const darkTokens = zuiTokenReferences.filter(
    (token) => token.theme === "dark",
  );

  return [
    `:root {\n${formatCssDeclarations(lightTokens)}\n}`,
    `/* Dark theme tokens use the same contract with -dark appended. */\n.dark {\n${formatCssDeclarations(darkTokens)}\n}`,
  ].join("\n\n");
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
              <td className="px-4 py-3 align-top font-mono text-slate-900 dark:text-slate-200">
                {token.fallback}
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

function ComponentTokenDropdown({
  group,
}: {
  group: ComponentTokenReferenceGroup;
}) {
  const darkCount = group.tokens.filter((token) => token.theme === "dark")
    .length;

  return (
    <details className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-200 dark:bg-slate-950/50">
      <summary className="flex cursor-pointer list-none flex-col gap-3 bg-slate-50 px-4 py-4 marker:hidden [&::-webkit-details-marker]:hidden dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {group.title.replace(" CSS variables", "")}
          </h3>
          <p className="text-sm leading-6 text-slate-900 dark:text-slate-400">
            {group.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-300">
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-cyan-900 dark:text-cyan-100">
            {group.tokens.length} tokens
          </span>
          <span className="rounded-full border border-indigo-300/20 bg-indigo-300/10 px-2.5 py-1 text-indigo-900 dark:text-indigo-100">
            {darkCount} dark
          </span>
          <FaArrowDown className="text-cyan-900 dark:text-cyan-200 transition group-open:rotate-180" />
        </div>
      </summary>

      <TokenTable tokens={group.tokens} />
    </details>
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
              Variables
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {allTokenCount}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Components
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {componentTokenReferenceGroups.length}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Dark tokens
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {darkTokenCount}
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
            Component tokens
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Variables by component
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-900 dark:text-slate-300">
            Open a component to see its available <code>--zui-*</code>{" "}
            variables. The fallback value is shown when the component docs data
            includes it; inferred dark rows still show the exact variable name
            to override.
          </p>
        </div>

        <div className="space-y-4">
          {componentTokenReferenceGroups.map((group) => (
            <ComponentTokenDropdown key={group.slug} group={group} />
          ))}
        </div>
      </Section>

      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
