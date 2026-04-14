"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Skeleton, type SkeletonProps } from "@/components/ui/skeleton";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const SKELETON_APPEARANCES = [
  "default",
  "subtle",
  "muted",
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
}) {
  const { appearance, size, rounded } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const roundedAttr = rounded === "md" ? "" : ` rounded="${rounded}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, rounded · ${rounded}`)}<Skeleton className="max-w-md"${appearanceAttr}${sizeAttr}${roundedAttr} animation="none" />`;
}

function SkeletonDemo(opts: {
  appearance: NonNullable<SkeletonProps["appearance"]>;
  size: NonNullable<SkeletonProps["size"]>;
  rounded: NonNullable<SkeletonProps["rounded"]>;
}) {
  const { appearance, size, rounded } = opts;
  return (
    <div>
      <p className="mb-5">Appearance: <span className="font-bold">{appearance}</span> | Size: <span className="font-bold">{size}</span> | Rounded: <span className="font-bold">{rounded}</span></p>
      <Skeleton
        className="max-w-md"
        appearance={appearance}
        size={size}
        rounded={rounded}
        animation="none"
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
            code={skeletonSnippet({ appearance, size: "md", rounded: "md" })}
          >
            <SkeletonDemo appearance={appearance} size="md" rounded="md" />
          </PreviewCodeShowcase>
        ))}
        {SKELETON_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={skeletonSnippet({
              appearance: "default",
              size,
              rounded: "md",
            })}
          >
            <SkeletonDemo appearance="default" size={size} rounded="md" />
          </PreviewCodeShowcase>
        ))}
        {SKELETON_ROUNDED.map((rounded) => (
          <PreviewCodeShowcase
            key={`rounded-${rounded}`}
            code={skeletonSnippet({
              appearance: "subtle",
              size: "md",
              rounded,
            })}
          >
            <SkeletonDemo appearance="subtle" size="md" rounded={rounded} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
