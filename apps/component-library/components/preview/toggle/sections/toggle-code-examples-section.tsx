"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Toggle, type ToggleProps } from "@zentauri-ui/zentauri-components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TOGGLE_APPEARANCES = ["default", "success", "destructive", "neutral", "indigo", "purple", "pink", "orange", "yellow", "green", "teal", "cyan", "lime", "emerald", "rose", "slate", "zinc", "gray", "stone"] as const satisfies readonly NonNullable<
  ToggleProps["appearance"]
>[];

const TOGGLE_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<ToggleProps["size"]>[];

function toggleSnippet(opts: {
  appearance: NonNullable<ToggleProps["appearance"]>;
  size: NonNullable<ToggleProps["size"]>;
}) {
  const { appearance, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}`)}<Toggle${appearanceAttr}${sizeAttr} defaultChecked animation="spring" aria-label="Demo toggle" />`;
}

function ToggleDemo(opts: {
  appearance: NonNullable<ToggleProps["appearance"]>;
  size: NonNullable<ToggleProps["size"]>;
}) {
  const { appearance, size } = opts;
  return (
    <Toggle appearance={appearance} size={size} defaultChecked animation="spring" aria-label="Demo toggle" />
  );
}

export function ToggleCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Toggle variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Track colors by appearance and thumb scale by size. Code uses a Variant: lead-in per row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TOGGLE_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={toggleSnippet({ appearance, size: "md" })}
          >
            <ToggleDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {TOGGLE_SIZES.map((size) => (
          <PreviewCodeShowcase key={`size-${size}`} code={toggleSnippet({ appearance: "default", size })}>
            <ToggleDemo appearance="default" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
