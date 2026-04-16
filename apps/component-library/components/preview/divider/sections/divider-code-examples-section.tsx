import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { DividerDemo } from "./components/divider-code-examples-demo";
import {
  DIVIDER_APPEARANCES,
  DIVIDER_CODE_EXAMPLES_SECTION_CLASS,
  DIVIDER_ORIENTATIONS,
  DIVIDER_SIZES,
} from "./components/divider-code-examples.data";
import { dividerSnippet } from "./components/divider-code-examples.snippets";

export function DividerCodeExamplesSection() {
  return (
    <section className={DIVIDER_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Divider variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Tone, orientation, thickness, and optional label slot. Each snippet opens
        with Variant: naming the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {DIVIDER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={dividerSnippet({
              appearance,
              orientation: "horizontal",
              size: "md",
              withLabel: true,
            })}
          >
            <DividerDemo
              appearance={appearance}
              orientation="horizontal"
              size="md"
              withLabel
            />
          </PreviewCodeShowcase>
        ))}
        {DIVIDER_ORIENTATIONS.map((orientation) => (
          <PreviewCodeShowcase
            key={`ori-${orientation}`}
            code={dividerSnippet({
              appearance: "muted",
              orientation,
              size: "md",
              withLabel: false,
            })}
          >
            <DividerDemo
              appearance="muted"
              orientation={orientation}
              size="md"
              withLabel={false}
            />
          </PreviewCodeShowcase>
        ))}
        {DIVIDER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={dividerSnippet({
              appearance: "primary",
              orientation: "horizontal",
              size,
              withLabel: true,
            })}
          >
            <DividerDemo
              appearance="primary"
              orientation="horizontal"
              size={size}
              withLabel
            />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
