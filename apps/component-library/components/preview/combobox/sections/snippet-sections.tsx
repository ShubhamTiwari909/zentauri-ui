import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  ComboboxContentDemo,
  ComboboxMultiDemo,
  ComboboxTriggerDemo,
} from "./components/demos";
import {
  COMBOBOX_CONTENT_APPEARANCES,
  COMBOBOX_CONTENT_SIZES,
  COMBOBOX_TRIGGER_SIZES,
  COMBOBOX_TRIGGER_VARIANTS,
} from "./components/data";
import {
  comboboxContentSnippet,
  comboboxMultiSnippet,
  comboboxTriggerSnippet,
} from "./components/snippets";

export function ComboboxCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Combobox variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-white">
        Trigger uses CVA{" "}
        <code className="text-slate-800 dark:text-white">variant</code> and{" "}
        <code className="text-slate-800 dark:text-white">size</code>; the
        dropdown panel uses{" "}
        <code className="text-slate-800 dark:text-white">appearance</code>{" "}
        and <code className="text-slate-800 dark:text-white">size</code> on{" "}
        <code className="text-slate-800 dark:text-white">
          ComboboxContent
        </code>
        . Each snippet starts with a Variant: lead-in.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase code={comboboxMultiSnippet()}>
          <ComboboxMultiDemo />
        </PreviewCodeShowcase>
        {COMBOBOX_TRIGGER_VARIANTS.map((triggerVariant) => (
          <PreviewCodeShowcase
            key={`tr-var-${triggerVariant}`}
            code={comboboxTriggerSnippet({ triggerVariant, triggerSize: "md" })}
          >
            <ComboboxTriggerDemo
              triggerVariant={triggerVariant}
              triggerSize="md"
            />
          </PreviewCodeShowcase>
        ))}
        {COMBOBOX_TRIGGER_SIZES.map((triggerSize) => (
          <PreviewCodeShowcase
            key={`tr-size-${triggerSize}`}
            code={comboboxTriggerSnippet({
              triggerVariant: "default",
              triggerSize,
            })}
          >
            <ComboboxTriggerDemo
              triggerVariant="default"
              triggerSize={triggerSize}
            />
          </PreviewCodeShowcase>
        ))}
        {COMBOBOX_CONTENT_APPEARANCES.map((contentAppearance) => (
          <PreviewCodeShowcase
            key={`ct-appearance-${contentAppearance}`}
            code={comboboxContentSnippet({
              contentAppearance,
              contentSize: "md",
            })}
          >
            <ComboboxContentDemo
              contentAppearance={contentAppearance}
              contentSize="md"
            />
          </PreviewCodeShowcase>
        ))}
        {COMBOBOX_CONTENT_SIZES.map((contentSize) => (
          <PreviewCodeShowcase
            key={`ct-size-${contentSize}`}
            code={comboboxContentSnippet({
              contentAppearance: "indigo",
              contentSize,
            })}
          >
            <ComboboxContentDemo
              contentAppearance="indigo"
              contentSize={contentSize}
            />
          </PreviewCodeShowcase>
        ))}
      </div>
    </Section>
  );
}
