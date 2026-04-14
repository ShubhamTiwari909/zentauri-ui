"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  type PopoverContentProps,
} from "@/components/ui/popover";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TRIGGER_CLASS =
  "rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200";

const POPOVER_APPEARANCES = ["default", "glass"] as const satisfies readonly NonNullable<
  PopoverContentProps["appearance"]
>[];

const POPOVER_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  PopoverContentProps["size"]
>[];

function popoverSnippet(opts: {
  appearance: NonNullable<PopoverContentProps["appearance"]>;
  size: NonNullable<PopoverContentProps["size"]>;
}) {
  const { appearance, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`PopoverContent · appearance · ${appearance}, size · ${size}`)}<Popover>
  <PopoverTrigger className="${TRIGGER_CLASS}">
    Info
  </PopoverTrigger>
  <PopoverContent placement="bottom" animation="fade"${appearanceAttr}${sizeAttr}>
    <p className="text-xs text-slate-300">Short contextual help text.</p>
  </PopoverContent>
</Popover>`;
}

function PopoverDemo(opts: {
  appearance: NonNullable<PopoverContentProps["appearance"]>;
  size: NonNullable<PopoverContentProps["size"]>;
}) {
  const { appearance, size } = opts;
  return (
    <Popover>
      <PopoverTrigger className={TRIGGER_CLASS}>Info</PopoverTrigger>
      <PopoverContent placement="bottom" animation="fade" appearance={appearance} size={size}>
        <p className="text-xs text-slate-300">Short contextual help text.</p>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Popover variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Content padding scale and surface style with fixed placement. Each snippet opens with Variant: for the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {POPOVER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={popoverSnippet({ appearance, size: "md" })}
          >
            <PopoverDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {POPOVER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={popoverSnippet({ appearance: "glass", size })}
          >
            <PopoverDemo appearance="glass" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
