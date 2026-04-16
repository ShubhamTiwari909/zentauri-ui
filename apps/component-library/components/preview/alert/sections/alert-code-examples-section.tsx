import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { AlertDemo } from "./components/alert-code-examples-demo";
import {
  ALERT_APPEARANCES,
  ALERT_CODE_EXAMPLES_SECTION_CLASS,
  ALERT_SIZES,
} from "./components/alert-code-examples.data";
import { alertSnippet } from "./components/alert-code-examples.snippets";

export function AlertCodeExamplesSection() {
  return (
    <section className={ALERT_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Alert variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each row pairs live output with matching JSX; the Variant line states
        which appearance/size tokens apply.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {ALERT_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={alertSnippet(appearance, "md")}
          >
            <AlertDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {ALERT_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={alertSnippet("info", size)}
          >
            <AlertDemo appearance="info" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
