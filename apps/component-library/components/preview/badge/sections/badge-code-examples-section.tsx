"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Badge, type BadgeProps } from "@/components/ui/badge";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const BADGE_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "glass",
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
] as const satisfies readonly NonNullable<BadgeProps["appearance"]>[];

const BADGE_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<BadgeProps["size"]>[];

const BADGE_SHAPES = ["pill", "square", "dot"] as const satisfies readonly NonNullable<
  BadgeProps["shape"]
>[];

function badgeSnippet(opts: {
  appearance: NonNullable<BadgeProps["appearance"]>;
  size: NonNullable<BadgeProps["size"]>;
  shape: NonNullable<BadgeProps["shape"]>;
}) {
  const { appearance, size, shape } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const shapeAttr = shape === "pill" ? "" : ` shape="${shape}"`;
  const lead = variantLeadComment(`appearance · ${appearance}, size · ${size}, shape · ${shape}`);
  const base = `<Badge${appearanceAttr}${sizeAttr}${shapeAttr} animation="none"`;
  if (shape === "dot") {
    return `${lead}${base} aria-label="Status active" />`;
  }
  return `${lead}${base}>
  Featured
</Badge>`;
}

function BadgeDemo(opts: {
  appearance: NonNullable<BadgeProps["appearance"]>;
  size: NonNullable<BadgeProps["size"]>;
  shape: NonNullable<BadgeProps["shape"]>;
}) {
  const { appearance, size, shape } = opts;
  if (shape === "dot") {
    return (
      <Badge appearance={appearance} size={size} shape={shape} animation="none" aria-label="Status active" />
    );
  }
  return (
    <Badge appearance={appearance} size={size} shape={shape} animation="none">
      Featured
    </Badge>
  );
}

export function BadgeCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Badge variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Appearance tokens (pill, medium), then sizes, then shapes including dot. Each snippet begins with Variant: naming the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {BADGE_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={badgeSnippet({ appearance, size: "md", shape: "pill" })}
          >
            <BadgeDemo appearance={appearance} size="md" shape="pill" />
          </PreviewCodeShowcase>
        ))}
        {BADGE_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={badgeSnippet({ appearance: "gradient-indigo", size, shape: "pill" })}
          >
            <BadgeDemo appearance="gradient-indigo" size={size} shape="pill" />
          </PreviewCodeShowcase>
        ))}
        {BADGE_SHAPES.map((shape) => (
          <PreviewCodeShowcase
            key={`shape-${shape}`}
            code={badgeSnippet({ appearance: "emerald", size: "md", shape })}
          >
            <BadgeDemo appearance="emerald" size="md" shape={shape} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
