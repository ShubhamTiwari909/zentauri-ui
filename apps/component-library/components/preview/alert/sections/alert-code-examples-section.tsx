"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Alert, AlertDescription, AlertTitle, type AlertProps } from "@/components/ui/alert";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const ALERT_APPEARANCES = [
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
  "gray",
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
] as const satisfies readonly NonNullable<AlertProps["appearance"]>[];

const ALERT_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<AlertProps["size"]>[];

function alertSnippet(
  appearance: NonNullable<AlertProps["appearance"]>,
  size: NonNullable<AlertProps["size"]>,
) {
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}`)}<Alert${appearanceAttr}${sizeAttr} animation="none">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Short supporting copy for this alert.</AlertDescription>
</Alert>`;
}

function AlertDemo({
  appearance,
  size,
}: {
  appearance: NonNullable<AlertProps["appearance"]>;
  size: NonNullable<AlertProps["size"]>;
}) {
  return (
    <Alert appearance={appearance} size={size} animation="none">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Short supporting copy for this alert.</AlertDescription>
    </Alert>
  );
}

export function AlertCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Alert variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each row pairs live output with matching JSX; the Variant line states which appearance/size tokens apply.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {ALERT_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase key={`app-${appearance}`} code={alertSnippet(appearance, "md")}>
            <AlertDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {ALERT_SIZES.map((size) => (
          <PreviewCodeShowcase key={`size-${size}`} code={alertSnippet("info", size)}>
            <AlertDemo appearance="info" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
