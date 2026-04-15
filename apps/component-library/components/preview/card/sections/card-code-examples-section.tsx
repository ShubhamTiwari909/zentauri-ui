"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Card, CardDescription, CardHeader, CardTitle, type CardProps } from "@repo/components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const CARD_APPEARANCES = [
  "default",
  "glass",
  "outline",
  "ghost",
  "elevated",
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
] as const satisfies readonly NonNullable<CardProps["appearance"]>[];

const CARD_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<CardProps["size"]>[];

const CARD_ROUNDED = ["sm", "md", "lg", "full"] as const satisfies readonly NonNullable<
  CardProps["rounded"]
>[];

function cardSnippet(opts: {
  appearance: NonNullable<CardProps["appearance"]>;
  size: NonNullable<CardProps["size"]>;
  rounded: NonNullable<CardProps["rounded"]>;
}) {
  const { appearance, size, rounded } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const roundedAttr = rounded === "md" ? "" : ` rounded="${rounded}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, rounded · ${rounded}`)}<Card${appearanceAttr}${sizeAttr}${roundedAttr} animation="none">
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Brief supporting description.</CardDescription>
  </CardHeader>
</Card>`;
}

function CardDemo(opts: {
  appearance: NonNullable<CardProps["appearance"]>;
  size: NonNullable<CardProps["size"]>;
  rounded: NonNullable<CardProps["rounded"]>;
}) {
  const { appearance, size, rounded } = opts;
  return (
    <Card appearance={appearance} size={size} rounded={rounded} animation="none">
      <CardHeader>
        <CardTitle>Appearance: <span className="font-bold">{appearance.toUpperCase()}</span>, Size: <span className="font-bold">{size.toUpperCase()}</span>, Rounded: <span className="font-bold">{rounded.toUpperCase()}</span></CardTitle>
        <CardDescription>Brief supporting description.</CardDescription>
      </CardHeader>
    </Card>
  );
}

export function CardCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Card variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Appearance, size, and rounded radius tokens with a minimal header layout. Code blocks start with Variant: for the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CARD_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={cardSnippet({ appearance, size: "md", rounded: "md" })}
          >
            <CardDemo appearance={appearance} size="md" rounded="md" />
          </PreviewCodeShowcase>
        ))}
        {CARD_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={cardSnippet({ appearance: "glass", size, rounded: "md" })}
          >
            <CardDemo appearance="glass" size={size} rounded="md" />
          </PreviewCodeShowcase>
        ))}
        {CARD_ROUNDED.map((rounded) => (
          <PreviewCodeShowcase
            key={`rounded-${rounded}`}
            code={cardSnippet({ appearance: "outline", size: "md", rounded })}
          >
            <CardDemo appearance="outline" size="md" rounded={rounded} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
