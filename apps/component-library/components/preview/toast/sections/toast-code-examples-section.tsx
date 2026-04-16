"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Button, ButtonProps } from "@zentauri-ui/zentauri-components/ui";
import { useToast, type ToastInput } from "@zentauri-ui/zentauri-components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TOAST_APPEARANCES = [
  "default",
  "success",
  "warning",
  "error",
  "info",
  "ghost",
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
] as const satisfies readonly NonNullable<ToastInput["appearance"]>[];

const TOAST_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<ToastInput["size"]>[];

function toastCallSnippet(opts: {
  appearance: NonNullable<ToastInput["appearance"]>;
  size: NonNullable<ToastInput["size"]>;
}) {
  const { appearance, size } = opts;
  return `${variantLeadComment(`toast() · appearance · ${appearance}, size · ${size}`)}const { toast } = useToast();

toast({
  title: "${appearance} toast",
  description: "Example at ${size} size.",
  appearance: "${appearance}",
  size: "${size}",
});`;
}

function ToastVariantDemo(opts: {
  appearance: NonNullable<ToastInput["appearance"]>;
  size: NonNullable<ToastInput["size"]>;
}) {
  const { toast } = useToast();
  const { appearance, size } = opts;
  const buttonsAppearance = {
    default: "default",
    success: "emerald",
    warning: "amber",
    error: "rose",
    info: "sky",
    ghost: "ghost",
    purple: "purple",
    pink: "pink",
    orange: "orange",
    yellow: "yellow",
    teal: "teal",
    indigo: "indigo",
    emerald: "emerald",
    gray: "gray",
    amber: "amber",
    violet: "violet",
    "gradient-blue": "gradient-blue",
    "gradient-green": "gradient-green",
    "gradient-red": "gradient-red",
    "gradient-yellow": "gradient-yellow",
    "gradient-purple": "gradient-purple",
    "gradient-teal": "gradient-teal",
    "gradient-indigo": "gradient-indigo",
    "gradient-pink": "gradient-pink",
    "gradient-orange": "gradient-orange",
  } as const;
  return (
    <Button
      appearance={buttonsAppearance[appearance] as NonNullable<ButtonProps["appearance"]>}
      size="sm"
      animation="none"
      type="button"
      onClick={() =>
        toast({
          title: `${appearance} toast`,
          description: `Example at ${size} size.`,
          appearance,
          size,
        })
      }
    >
      Show {appearance} ({size})
    </Button>
  );
}

export function ToastCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Toast variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each row shows the hook call that matches the button you click, with a Variant: line naming the toast tokens.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TOAST_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={toastCallSnippet({ appearance, size: "md" })}
          >
            <ToastVariantDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {TOAST_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={toastCallSnippet({ appearance: "info", size })}
          >
            <ToastVariantDemo appearance="info" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
