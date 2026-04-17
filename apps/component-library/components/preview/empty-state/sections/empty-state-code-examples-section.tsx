import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { EmptyStateDemo } from "./components/empty-state-code-examples-demo";
import {
  EMPTY_ALIGNS,
  EMPTY_APPEARANCES,
  EMPTY_SIZES,
  EMPTY_STATE_CODE_EXAMPLES_SECTION_CLASS,
  EMPTY_STATE_SNIPPET_DEFAULTS,
} from "./components/empty-state-code-examples.data";
import { emptyStateSnippet } from "./components/empty-state-code-examples.snippets";

export function EmptyStateCodeExamplesSection() {
  const defaults = EMPTY_STATE_SNIPPET_DEFAULTS;
  return (
    <section className={EMPTY_STATE_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Empty state variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Layout density, surface treatment, and alignment of the stack. Snippets
        include a leading Variant: line.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {EMPTY_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={emptyStateSnippet({ ...defaults, appearance })}
          >
            <EmptyStateDemo {...defaults} appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
        {EMPTY_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={emptyStateSnippet({ ...defaults, appearance: "ghost", size })}
          >
            <EmptyStateDemo {...defaults} appearance="ghost" size={size} />
          </PreviewCodeShowcase>
        ))}
        {EMPTY_ALIGNS.map((align) => (
          <PreviewCodeShowcase
            key={`align-${align}`}
            code={emptyStateSnippet({ ...defaults, appearance: "card", align })}
          >
            <EmptyStateDemo {...defaults} appearance="card" align={align} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
