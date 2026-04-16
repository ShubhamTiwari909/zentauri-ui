import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  SelectContentDemo,
  SelectMultiDemo,
  SelectTriggerDemo,
} from "./components/select-code-examples-demos";
import {
  SELECT_CODE_EXAMPLES_SECTION_CLASS,
  SELECT_CONTENT_SIZES,
  SELECT_CONTENT_SPACING,
  SELECT_TRIGGER_SIZES,
  SELECT_TRIGGER_VARIANTS,
} from "./components/select-code-examples.data";
import {
  selectContentSnippet,
  selectMultiSnippet,
  selectTriggerSnippet,
} from "./components/select-code-examples.snippets";

export function SelectCodeExamplesSection() {
  return (
    <section className={SELECT_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Select variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Trigger uses CVA <code className="text-slate-300">variant</code> and{" "}
        <code className="text-slate-300">size</code>; the list panel uses{" "}
        <code className="text-slate-300">appearance</code> and{" "}
        <code className="text-slate-300">size</code> on{" "}
        <code className="text-slate-300">SelectContent</code>. Each snippet starts with a Variant:
        lead-in.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase code={selectMultiSnippet()}>
          <SelectMultiDemo />
        </PreviewCodeShowcase>
        {SELECT_TRIGGER_VARIANTS.map((triggerVariant) => (
          <PreviewCodeShowcase
            key={`tr-var-${triggerVariant}`}
            code={selectTriggerSnippet({ triggerVariant, triggerSize: "md" })}
          >
            <SelectTriggerDemo triggerVariant={triggerVariant} triggerSize="md" />
          </PreviewCodeShowcase>
        ))}
        {SELECT_TRIGGER_SIZES.map((triggerSize) => (
          <PreviewCodeShowcase
            key={`tr-size-${triggerSize}`}
            code={selectTriggerSnippet({ triggerVariant: "default", triggerSize })}
          >
            <SelectTriggerDemo triggerVariant="default" triggerSize={triggerSize} />
          </PreviewCodeShowcase>
        ))}
        {SELECT_CONTENT_SIZES.map((contentSize) => (
          <PreviewCodeShowcase
            key={`ct-size-${contentSize}`}
            code={selectContentSnippet({
              contentAppearance: "glass",
              contentSize,
              contentSpacing: "default",
            })}
          >
            <SelectContentDemo
              contentAppearance="glass"
              contentSize={contentSize}
              contentSpacing="default"
            />
          </PreviewCodeShowcase>
        ))}
        {SELECT_CONTENT_SPACING.map((contentSpacing) => (
          <PreviewCodeShowcase
            key={`ct-spacing-${contentSpacing}`}
            code={selectContentSnippet({
              contentAppearance: "sky",
              contentSize: "md",
              contentSpacing,
            })}
          >
            <SelectContentDemo
              contentAppearance="sky"
              contentSize="md"
              contentSpacing={contentSpacing}
            />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
