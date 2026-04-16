import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { ProgressDemo } from "./components/progress-code-examples-demo";
import {
  PROGRESS_APPEARANCES,
  PROGRESS_CODE_EXAMPLES_SECTION_CLASS,
  PROGRESS_SHAPES,
  PROGRESS_SIZES,
  PROGRESS_SNIPPET_DEFAULTS,
} from "./components/progress-code-examples.data";
import { progressSnippet } from "./components/progress-code-examples.snippets";

export function ProgressCodeExamplesSection() {
  const defaults = PROGRESS_SNIPPET_DEFAULTS;
  return (
    <section className={PROGRESS_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Progress variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Fill tokens, track scale, shape, and motion flags at a fixed value. Each snippet
        starts with Variant: listing the row tokens.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {PROGRESS_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={progressSnippet({ ...defaults, appearance })}
          >
            <ProgressDemo {...defaults} appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
        {PROGRESS_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={progressSnippet({ ...defaults, appearance: "indigo", size })}
          >
            <ProgressDemo {...defaults} appearance="indigo" size={size} />
          </PreviewCodeShowcase>
        ))}
        {PROGRESS_SHAPES.map((shape) => (
          <PreviewCodeShowcase
            key={`shape-${shape}`}
            code={progressSnippet({ ...defaults, appearance: "teal", shape })}
          >
            <ProgressDemo {...defaults} appearance="teal" shape={shape} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="striped"
          code={progressSnippet({
            ...defaults,
            appearance: "default",
            striped: true,
          })}
        >
          <ProgressDemo {...defaults} appearance="default" striped />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="animated"
          code={progressSnippet({
            ...defaults,
            appearance: "sky",
            animated: true,
          })}
        >
          <ProgressDemo {...defaults} appearance="sky" animated />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
