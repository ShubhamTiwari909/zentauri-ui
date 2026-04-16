"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Skeleton, type SkeletonProps } from "@zentauri-ui/zentauri-components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const SKELETON_APPEARANCES = [
  "default",
  "subtle",
  "muted",
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
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<SkeletonProps["appearance"]>[];

const SKELETON_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<SkeletonProps["size"]>[];

const SKELETON_ROUNDED = [
  "none",
  "sm",
  "md",
  "lg",
  "full",
] as const satisfies readonly NonNullable<SkeletonProps["rounded"]>[];


function skeletonSnippet(opts: {
  appearance: NonNullable<SkeletonProps["appearance"]>;
  size: NonNullable<SkeletonProps["size"]>;
  rounded: NonNullable<SkeletonProps["rounded"]>;
  animation: NonNullable<SkeletonProps["animation"]>;
  shimmerTone: NonNullable<SkeletonProps["shimmerTone"]>;
}) {
  const { appearance, size, rounded, animation, shimmerTone } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const roundedAttr = rounded === "md" ? "" : ` rounded="${rounded}"`;
  const animationAttr = animation === "none" ? "" : ` animation="${animation}"`;
  const shimmerToneAttr = shimmerTone === "default" ? "" : ` shimmerTone="${shimmerTone}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, rounded · ${rounded}, animation · ${animation}, shimmerTone · ${shimmerTone}`)}<Skeleton className="max-w-md"${appearanceAttr}${sizeAttr}${roundedAttr}${animationAttr}${shimmerToneAttr} />`;
}

function SkeletonDemo(opts: {
  appearance: NonNullable<SkeletonProps["appearance"]>;
  size: NonNullable<SkeletonProps["size"]>;
  rounded: NonNullable<SkeletonProps["rounded"]>;
  shimmerTone: NonNullable<SkeletonProps["shimmerTone"]>;
  animation: NonNullable<SkeletonProps["animation"]>;
}) {
  const { appearance, size, rounded, shimmerTone, animation } = opts;
  return (
    <div>
      <p className="mb-5">Appearance: <span className="font-bold">{appearance}</span> | Size: <span className="font-bold">{size}</span> | Rounded: <span className="font-bold">{rounded}</span> | Animation: <span className="font-bold">{animation}</span> | Shimmer Tone: <span className="font-bold">{shimmerTone}</span></p>
      <Skeleton
        className="max-w-md min-h-10"
        appearance={appearance}
        size={size}
        rounded={rounded}
        animation={animation}
        shimmerTone={shimmerTone}
      />
    </div>
  );
}

export function SkeletonCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Skeleton variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Surface tone, block height, and corner radius. Each code view starts
        with Variant: for clarity.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {SKELETON_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={skeletonSnippet({ appearance, size: "md", rounded: "md", animation: "shimmer", shimmerTone: appearance })}
          >
            <SkeletonDemo appearance={appearance} size="md" rounded="md" animation="shimmer" shimmerTone={appearance}  />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
            key={`pulse`}
            code={skeletonSnippet({ appearance: "default", size: "md", rounded: "md", animation: "pulse", shimmerTone: "default" })}
          >
            <SkeletonDemo appearance="default" size="md" rounded="md" animation="pulse" shimmerTone="default"  />
          </PreviewCodeShowcase>
        {SKELETON_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={skeletonSnippet({
              appearance: "default",
              size,
              rounded: "md",
              animation: "none",
              shimmerTone: "default",
            })}
          >
            <SkeletonDemo appearance="default" size={size} rounded="md" shimmerTone="default" animation="none" />
          </PreviewCodeShowcase>
        ))}
        {SKELETON_ROUNDED.map((rounded) => (
          <PreviewCodeShowcase
            key={`rounded-${rounded}`}
            code={skeletonSnippet({
              appearance: "subtle",
              size: "md",
              rounded,
              animation: "none",
              shimmerTone: "default",
            })}
          >
            <SkeletonDemo appearance="subtle" size="md" rounded={rounded} shimmerTone="default" animation="none" />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
