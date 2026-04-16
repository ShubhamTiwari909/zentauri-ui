"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { HiCloudArrowUp } from "react-icons/hi2";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
  type EmptyStateProps,
} from "@zentauri-ui/zentauri-components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const ICON_SNIPPET = `<EmptyStateIcon>
  <HiCloudArrowUp className="size-8 text-slate-400" aria-hidden />
</EmptyStateIcon>`;

const EMPTY_APPEARANCES = [
  "default",
  "ghost",
  "card",
] as const satisfies readonly NonNullable<EmptyStateProps["appearance"]>[];

const EMPTY_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  EmptyStateProps["size"]
>[];

const EMPTY_ALIGNS = [
  "start",
  "center",
  "end",
] as const satisfies readonly NonNullable<EmptyStateProps["align"]>[];

function emptySnippet(opts: {
  appearance: NonNullable<EmptyStateProps["appearance"]>;
  size: NonNullable<EmptyStateProps["size"]>;
  align: NonNullable<EmptyStateProps["align"]>;
}) {
  const { appearance, size, align } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const alignAttr = align === "center" ? "" : ` align="${align}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, align · ${align}`)}<EmptyState${appearanceAttr}${sizeAttr}${alignAttr} animation="none">
${ICON_SNIPPET}
  <EmptyStateTitle>No uploads</EmptyStateTitle>
  <EmptyStateDescription>Drag files here to add them.</EmptyStateDescription>
</EmptyState>`;
}

function EmptyDemo(opts: {
  appearance: NonNullable<EmptyStateProps["appearance"]>;
  size: NonNullable<EmptyStateProps["size"]>;
  align: NonNullable<EmptyStateProps["align"]>;
}) {
  const { appearance, size, align } = opts;
  return (
    <div>
      <p className="mb-5 text-xs md:text-sm">
        Appearance: <span className="font-bold">{appearance.toUpperCase()}</span>, Size: <span className="font-bold">{size.toUpperCase()}</span>, Align: <span className="font-bold">{align.toUpperCase()}</span>
      </p>
      <EmptyState
        appearance={appearance}
        size={size}
        align={align}
        animation="none"
      >
        <EmptyStateIcon>
          <HiCloudArrowUp className="size-8 text-slate-400" aria-hidden />
        </EmptyStateIcon>
        <EmptyStateTitle>No uploads</EmptyStateTitle>
        <EmptyStateDescription>
          Drag files here to add them.
        </EmptyStateDescription>
      </EmptyState>
    </div>
  );
}

export function EmptyStateCodeExamplesSection() {
  const defaults = {
    appearance: "default" as const,
    size: "md" as const,
    align: "center" as const,
  };
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Empty state variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Layout density, surface treatment, and alignment of the stack. Snippets
        include a leading Variant: line.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {EMPTY_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={emptySnippet({ ...defaults, appearance })}
          >
            <EmptyDemo {...defaults} appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
        {EMPTY_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={emptySnippet({ ...defaults, appearance: "ghost", size })}
          >
            <EmptyDemo {...defaults} appearance="ghost" size={size} />
          </PreviewCodeShowcase>
        ))}
        {EMPTY_ALIGNS.map((align) => (
          <PreviewCodeShowcase
            key={`align-${align}`}
            code={emptySnippet({ ...defaults, appearance: "card", align })}
          >
            <EmptyDemo {...defaults} appearance="card" align={align} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
