import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { SpinnerDemo } from "./components/spinner-code-examples-demo";
import {
  SPINNER_APPEARANCES,
  SPINNER_CODE_EXAMPLES_SECTION_CLASS,
  SPINNER_SIZES,
  SPINNER_VARIANTS,
} from "./components/spinner-code-examples.data";
import { spinnerSnippet } from "./components/spinner-code-examples.snippets";

export function SpinnerCodeExamplesSection() {
  return (
    <section className={SPINNER_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Spinner variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Palette-aligned appearances, motion variants, and sizes. Snippets
        include a leading Variant: line.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {SPINNER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={spinnerSnippet({ appearance, variant: "ring", size: "md" })}
          >
            <SpinnerDemo appearance={appearance} variant="ring" size="md" />
          </PreviewCodeShowcase>
        ))}
        {SPINNER_VARIANTS.map((variant) => (
          <PreviewCodeShowcase
            key={`var-${variant}`}
            code={spinnerSnippet({ appearance: "indigo", variant, size: "md" })}
          >
            <SpinnerDemo appearance="indigo" variant={variant} size="md" />
          </PreviewCodeShowcase>
        ))}
        {SPINNER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={spinnerSnippet({
              appearance: "indigo",
              variant: "ring",
              size,
            })}
          >
            <SpinnerDemo appearance="indigo" variant="ring" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
