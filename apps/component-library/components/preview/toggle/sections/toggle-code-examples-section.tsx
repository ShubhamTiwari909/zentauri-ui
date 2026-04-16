import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { ToggleDemo } from "./components/toggle-code-examples-demo";
import { ToggleControlledDemo } from "./components/toggle-code-examples-controlled";
import {
  TOGGLE_APPEARANCES,
  TOGGLE_CODE_EXAMPLES_SECTION_CLASS,
  TOGGLE_SIZES,
} from "./components/toggle-code-examples.data";
import { toggleSnippet } from "./components/toggle-code-examples.snippets";

export function ToggleCodeExamplesSection() {
  return (
    <section className={TOGGLE_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Toggle variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Track colors by appearance and thumb scale by size. Code uses a Variant: lead-in per
        row.
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
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={toggleSnippet({ appearance: "default", size })}
          >
            <ToggleDemo appearance="default" size={size} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase key="controlled" code={toggleSnippet({ appearance: "default", size: "md" })}>
          <ToggleControlledDemo />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
