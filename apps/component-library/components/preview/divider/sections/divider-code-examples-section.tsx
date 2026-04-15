"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Divider, type DividerProps } from "@/components/ui/divider";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const DIVIDER_APPEARANCES = [
  "default",
  "muted",
  "primary",
  "destructive",
  "ghost",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "amber",
  "violet",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<DividerProps["appearance"]>[];

const DIVIDER_ORIENTATIONS = ["horizontal", "vertical"] as const satisfies readonly NonNullable<
  DividerProps["orientation"]
>[];

const DIVIDER_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<DividerProps["size"]>[];

function dividerSnippet(opts: {
  appearance: NonNullable<DividerProps["appearance"]>;
  orientation: NonNullable<DividerProps["orientation"]>;
  size: NonNullable<DividerProps["size"]>;
  withLabel: boolean;
}) {
  const { appearance, orientation, size, withLabel } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const orientationAttr =
    orientation === "horizontal" ? "" : ` orientation="${orientation}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const base = `<Divider${appearanceAttr}${orientationAttr}${sizeAttr} animation="none"`;
  const lead = variantLeadComment(
    `appearance · ${appearance}, orientation · ${orientation}, size · ${size}, label · ${withLabel ? "Section" : "none"}`,
  );
  if (withLabel) {
    return `${lead}${base} label="Section" />`;
  }
  return `${lead}${base} />`;
}

function DividerDemo(opts: {
  appearance: NonNullable<DividerProps["appearance"]>;
  orientation: NonNullable<DividerProps["orientation"]>;
  size: NonNullable<DividerProps["size"]>;
  withLabel: boolean;
}) {
  const { appearance, orientation, size, withLabel } = opts;
  const wrapClass =
    orientation === "vertical" ? "flex h-24 items-stretch justify-center" : "w-full max-w-md";
  return (
    <div className={wrapClass}>
      <Divider appearance={appearance} orientation={orientation} size={size} animation="none" label={withLabel ? "Section" : undefined} />
    </div>
  );
}

export function DividerCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Divider variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Tone, orientation, thickness, and optional label slot. Each snippet opens with Variant: naming the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {DIVIDER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={dividerSnippet({
              appearance,
              orientation: "horizontal",
              size: "md",
              withLabel: true,
            })}
          >
            <DividerDemo appearance={appearance} orientation="horizontal" size="md" withLabel />
          </PreviewCodeShowcase>
        ))}
        {DIVIDER_ORIENTATIONS.map((orientation) => (
          <PreviewCodeShowcase
            key={`ori-${orientation}`}
            code={dividerSnippet({
              appearance: "muted",
              orientation,
              size: "md",
              withLabel: false,
            })}
          >
            <DividerDemo appearance="muted" orientation={orientation} size="md" withLabel={false} />
          </PreviewCodeShowcase>
        ))}
        {DIVIDER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={dividerSnippet({
              appearance: "primary",
              orientation: "horizontal",
              size,
              withLabel: true,
            })}
          >
            <DividerDemo appearance="primary" orientation="horizontal" size={size} withLabel />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
