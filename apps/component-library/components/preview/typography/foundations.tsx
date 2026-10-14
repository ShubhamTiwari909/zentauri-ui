import type { CSSProperties } from "react";
import {
  Heading,
  Text,
  Strong,
  Emphasis,
  Small,
  VisuallyHidden,
} from "@zentauri-ui/zentauri-components/ui/typography";
import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import type { TypographySectionSlug } from "@/lib/typography-preview-registry";

export function TypographyScaleDemo() {
  return (
    <div className="space-y-5">
      <Heading level={2} displaySize="sm" scale="fluid" wrap="balance">
        A readable scale for every screen
      </Heading>
      <Text preset="overline">Product update</Text>
      <Text preset="lead" measure="readable">
        Lead copy introduces a section with a relaxed, readable rhythm.
      </Text>
      <Text preset="caption" tone="muted">
        Caption copy supports the main content.
      </Text>
      <Text font="mono" numeric="tabular">
        12,345.67
      </Text>
    </div>
  );
}
export function TypographyThemeDemo() {
  const style = {
    "--zui-typography-font-display": "Georgia, serif",
    "--zui-typography-font-body": "Georgia, serif",
    "--zui-typography-text-base-size": "1.125rem",
    "--zui-typography-text-base-leading": "1.8",
    "--zui-typography-measure": "45ch",
  } as CSSProperties;
  return (
    <div style={style} className="space-y-3">
      <Heading level={3}>A locally branded section</Heading>
      <Text measure="readable">
        Fonts, leading, sizing and readable width inherit from the theme
        wrapper. Dark overrides can be supplied independently.
      </Text>
    </div>
  );
}
export function TypographySemanticDemo() {
  return (
    <Text tone="muted">
      Use <Strong>importance</Strong>, <Emphasis>stress</Emphasis>, and{" "}
      <Small>fine print</Small> without losing the surrounding text tone.
    </Text>
  );
}
export function TypographyHiddenDemo() {
  return (
    <div className="space-y-4">
      <VisuallyHidden focusable>
        <a
          href="#typography-focus-target"
          className="inline-block rounded px-3 py-2 underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Skip to the example content
        </a>
      </VisuallyHidden>
      <button
        type="button"
        className="rounded border border-current px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span aria-hidden="true">×</span>
        <VisuallyHidden>Close example</VisuallyHidden>
      </button>
      <Text as="div" id="typography-focus-target" tabIndex={-1}>
        Example content target
      </Text>
    </div>
  );
}
const importLine =
  'import { Heading, Text, Strong, Emphasis, Small, VisuallyHidden } from "@zentauri-ui/zentauri-components/ui/typography";';
const examples = {
  scale: [
    {
      label: "Fluid heading and text presets",
      demo: <TypographyScaleDemo />,
      code: `${importLine}\n\n<Heading level={2} displaySize="sm" scale="fluid" wrap="balance">A readable scale for every screen</Heading>\n<Text preset="overline">Product update</Text>\n<Text preset="lead" measure="readable">Lead copy introduces a section with a relaxed, readable rhythm.</Text>\n<Text preset="caption" tone="muted">Caption copy supports the main content.</Text>\n<Text font="mono" numeric="tabular">12,345.67</Text>`,
    },
    {
      label: "Scoped theme tokens",
      demo: <TypographyThemeDemo />,
      code: `import type { CSSProperties } from "react";\n${importLine}\n\nconst theme = {\n  "--zui-typography-font-display": "Georgia, serif",\n  "--zui-typography-font-body": "Georgia, serif",\n  "--zui-typography-text-base-size": "1.125rem",\n  "--zui-typography-text-base-leading": "1.8",\n  "--zui-typography-measure": "45ch",\n} as CSSProperties;\n\n<div style={theme}>\n  <Heading level={3}>A locally branded section</Heading>\n  <Text measure="readable">Fonts and scale inherit from this wrapper.</Text>\n</div>`,
    },
  ],
  accessibility: [
    {
      label: "Semantic inline emphasis",
      demo: <TypographySemanticDemo />,
      code: `${importLine}\n\n<Text tone="muted">\n  Use <Strong>importance</Strong>, <Emphasis>stress</Emphasis>,\n  and <Small>fine print</Small>.\n</Text>`,
    },
    {
      label: "Accessible label and focusable skip link",
      demo: <TypographyHiddenDemo />,
      code: `${importLine}\n\n<VisuallyHidden focusable>\n  <a href="#example-content">Skip to content</a>\n</VisuallyHidden>\n<button type="button">\n  <span aria-hidden="true">×</span>\n  <VisuallyHidden>Close example</VisuallyHidden>\n</button>\n<Text as="div" id="example-content" tabIndex={-1}>Example content</Text>`,
    },
  ],
} as const;
export function TypographyFoundationExamples({
  section,
}: {
  section: TypographySectionSlug;
}) {
  const rows =
    section === "scale"
      ? examples.scale
      : section === "accessibility"
        ? examples.accessibility
        : section === "inline"
          ? examples.accessibility.slice(0, 1)
          : section === "paragraph"
            ? examples.scale.slice(0, 1)
            : section === "heading"
              ? examples.scale.slice(0, 1)
              : [];
  if (rows.length === 0) return null;
  return (
    <Section>
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
        {section === "accessibility"
          ? "Accessible text composition"
          : "Typography foundations"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-900 dark:text-slate-400">
        Explicit size, weight, leading and tracking override preset styling.
        Explicit weight also overrides the legacy bold prop. Existing defaults
        remain unchanged; fluid sizing is opt-in.
      </p>
      <div className="mt-6 space-y-8">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              {row.label}
            </p>
            <PreviewCodeShowcase code={row.code}>
              {row.demo}
            </PreviewCodeShowcase>
          </div>
        ))}
      </div>
    </Section>
  );
}
