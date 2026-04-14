"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipContentProps,
} from "@/components/ui/tooltip";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TRIGGER_CLASS =
  "rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50";

const TOOLTIP_APPEARANCES = [
  "default",
  "dark",
  "glass",
  "primary",
  "destructive",
] as const satisfies readonly NonNullable<TooltipContentProps["appearance"]>[];

const TOOLTIP_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  TooltipContentProps["size"]
>[];

function tooltipSnippet(opts: {
  appearance: NonNullable<TooltipContentProps["appearance"]>;
  size: NonNullable<TooltipContentProps["size"]>;
}) {
  const { appearance, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`TooltipContent · appearance · ${appearance}, size · ${size}, placement · bottom`)}<Tooltip>
  <TooltipTrigger className="${TRIGGER_CLASS}">
    Hover me
  </TooltipTrigger>
  <TooltipContent placement="bottom"${appearanceAttr}${sizeAttr} animation="fade">
    Tooltip copy for this variant.
  </TooltipContent>
</Tooltip>`;
}

function TooltipDemo(opts: {
  appearance: NonNullable<TooltipContentProps["appearance"]>;
  size: NonNullable<TooltipContentProps["size"]>;
}) {
  const { appearance, size } = opts;
  return (
    <Tooltip>
      <TooltipTrigger className={TRIGGER_CLASS}>Hover me</TooltipTrigger>
      <TooltipContent placement="bottom" appearance={appearance} size={size} animation="fade">
        Tooltip copy for this variant.
      </TooltipContent>
    </Tooltip>
  );
}

export function TooltipCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Tooltip variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Surface tone and text scale with a fixed bottom placement. Code blocks open with Variant: for the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TOOLTIP_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={tooltipSnippet({ appearance, size: "md" })}
          >
            <TooltipDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {TOOLTIP_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={tooltipSnippet({ appearance: "glass", size })}
          >
            <TooltipDemo appearance="glass" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
