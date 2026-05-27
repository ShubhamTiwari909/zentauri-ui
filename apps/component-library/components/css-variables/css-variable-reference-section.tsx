import CodeHighlight from "@/components/CodeHighlight";
import { Section } from "@/components/common/Section";

import {
  cssVariableReferences,
  type CssVariableReferenceSlug,
} from "./css-variable-reference-data";
import type {
  CssVariableReference,
  CssVariableToken,
} from "./css-variable-reference-types";

const ZUI_CSS_VARIABLE_PREFIX = "--zui-";
const DARK_VARIABLE_EXAMPLE_LIMIT = 2;

type CssVariableReferenceSectionProps = {
  canonicalPath: string;
};

function getCssVariableReferenceSlug(canonicalPath: string) {
  const componentPreviewPrefix = "/preview/components/";

  if (!canonicalPath.startsWith(componentPreviewPrefix)) {
    return null;
  }

  const slug = canonicalPath.slice(componentPreviewPrefix.length);

  if (!Object.hasOwn(cssVariableReferences, slug)) {
    return null;
  }

  return slug as CssVariableReferenceSlug;
}

function formatCssVariableBlock(
  selector: string,
  variables: readonly CssVariableToken[],
) {
  if (variables.length === 0) {
    return "";
  }

  const declarations = variables
    .map(([name, value]) => `  ${ZUI_CSS_VARIABLE_PREFIX}${name}: ${value};`)
    .join("\n");

  return `${selector} {\n${declarations}\n}`;
}

function formatDarkCssVariableBlock(reference: CssVariableReference) {
  if (reference.darkVariableCount === 0) {
    return "";
  }

  const declarations = reference.darkExamples
    .slice(0, DARK_VARIABLE_EXAMPLE_LIMIT)
    .map(([name, value]) => `  ${ZUI_CSS_VARIABLE_PREFIX}${name}: ${value};`)
    .join("\n");
  const hiddenDarkVariableCount =
    reference.darkVariableCount - reference.darkExamples.length;
  const ellipsis =
    hiddenDarkVariableCount > 0
      ? "\n  /* ...same variables with -dark at the end */"
      : "";

  return `/* Dark theme variables follow the same names with -dark appended. */\n.dark {\n${declarations}${ellipsis}\n}`;
}

function getCssVariableCode(reference: CssVariableReference) {
  return [
    formatCssVariableBlock(":root", reference.lightVariables),
    formatDarkCssVariableBlock(reference),
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function CssVariableReferenceSection({
  canonicalPath,
}: CssVariableReferenceSectionProps) {
  const slug = getCssVariableReferenceSlug(canonicalPath);

  if (!slug) {
    return null;
  }

  const reference = cssVariableReferences[slug];
  const headingId = `zui-css-variables-${slug}`;

  return (
    <Section
      variant="plain"
      aria-labelledby={headingId}
      className="space-y-5 border-t border-white/10 pt-12"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            CSS variable overrides
          </span>
          <div className="space-y-2">
            <h2
              id={headingId}
              className="text-2xl font-semibold tracking-tight text-white"
            >
              {reference.title}
            </h2>
            <p className="text-sm leading-6 text-slate-300">
              {reference.description}
            </p>
          </div>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-100">
          {reference.lightVariables.length + reference.darkVariableCount}{" "}
          variables
        </span>
      </div>

      <p className="text-sm leading-6 text-slate-400">
        Pattern:{" "}
        <code className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-cyan-100">
          --zui-&lt;component&gt;-&lt;slot?&gt;-&lt;variant?&gt;-&lt;property&gt;-&lt;state?&gt;-dark?
        </code>
      </p>

      <CodeHighlight
        codeString={getCssVariableCode(reference)}
        language="css"
      />
    </Section>
  );
}
