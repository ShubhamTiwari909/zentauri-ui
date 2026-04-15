"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Button } from "@zentauri-ui/zentauri-components/ui";
import { useToast, type ToastInput } from "@zentauri-ui/zentauri-components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TOAST_APPEARANCES = [
  "default",
  "success",
  "warning",
  "error",
  "info",
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
  return (
    <Button
      appearance="emerald"
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
