"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Spinner, type SpinnerProps } from "@zentauri-ui/zentauri-components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const SPINNER_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "ghost",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
] as const satisfies readonly NonNullable<SpinnerProps["appearance"]>[];

const SPINNER_VARIANTS = ["ring", "dots", "pulse", "bars"] as const satisfies readonly NonNullable<
  SpinnerProps["variant"]
>[];

const SPINNER_SIZES = ["xs", "sm", "md", "lg", "xl"] as const satisfies readonly NonNullable<
  SpinnerProps["size"]
>[];

function spinnerSnippet(opts: {
  appearance: NonNullable<SpinnerProps["appearance"]>;
  variant: NonNullable<SpinnerProps["variant"]>;
  size: NonNullable<SpinnerProps["size"]>;
}) {
  const { appearance, variant, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const variantAttr = variant === "ring" ? "" : ` variant="${variant}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`appearance · ${appearance}, variant · ${variant}, size · ${size}`)}<Spinner${appearanceAttr}${variantAttr}${sizeAttr} aria-label="Loading" />`;
}

function SpinnerDemo(opts: {
  appearance: NonNullable<SpinnerProps["appearance"]>;
  variant: NonNullable<SpinnerProps["variant"]>;
  size: NonNullable<SpinnerProps["size"]>;
}) {
  const { appearance, variant, size } = opts;
  return <Spinner appearance={appearance} variant={variant} size={size} aria-label="Loading" />;
}

export function SpinnerCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Spinner variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Palette-aligned appearances, motion variants, and sizes. Snippets include a leading Variant: line.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {SPINNER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={spinnerSnippet({ appearance, variant: "ring", size: "md" })}
          >
            <SpinnerDemo appearance={appearance} variant="ring" size="md" />
          </PreviewCodeShowcase>
        ))}
        {SPINNER_VARIANTS.map((variant) => (
          <PreviewCodeShowcase
            key={`var-${variant}`}
            code={spinnerSnippet({ appearance: "indigo", variant, size: "md" })}
          >
            <SpinnerDemo appearance="indigo" variant={variant} size="md" />
          </PreviewCodeShowcase>
        ))}
        {SPINNER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={spinnerSnippet({ appearance: "indigo", variant: "ring", size })}
          >
            <SpinnerDemo appearance="indigo" variant="ring" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
