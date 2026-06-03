import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { ToastVariantDemo } from "./components/demo";
import { TOAST_APPEARANCES, TOAST_SIZES } from "./components/data";
import { toastCallSnippet } from "./components/snippets";

export function ToastCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Toast variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Each row shows the hook call that matches the button you click, with a
        Variant: line naming the toast tokens.
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
    </Section>
  );
}
