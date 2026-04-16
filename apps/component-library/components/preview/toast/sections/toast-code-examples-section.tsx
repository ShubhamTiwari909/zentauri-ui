import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { ToastVariantDemo } from "./components/toast-code-examples-demo";
import {
  TOAST_APPEARANCES,
  TOAST_CODE_EXAMPLES_SECTION_CLASS,
  TOAST_SIZES,
} from "./components/toast-code-examples.data";
import { toastCallSnippet } from "./components/toast-code-examples.snippets";

export function ToastCodeExamplesSection() {
  return (
    <section className={TOAST_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Toast variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each row shows the hook call that matches the button you click, with a Variant: line
        naming the toast tokens.
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
