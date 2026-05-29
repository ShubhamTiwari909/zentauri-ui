import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  CHECKBOX_APPEARANCES,
  CHECKBOX_SIZES,
} from "./components/checkbox-code-examples.data";
import { CheckboxDemo } from "./components/checkbox-code-examples-demo";
import {
  checkboxControlledSnippet,
  checkboxSnippet,
} from "./components/checkbox-code-examples.snippets";

export function CheckboxCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Checkbox variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Checkbox exposes dedicated appearance, size, indeterminate, controlled,
        and animated APIs without going through the generic Input component.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CHECKBOX_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={checkboxSnippet({ appearance, size: "md" })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span> | 
              Size: <span className="font-bold">MD</span>
            </p>
            <CheckboxDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {CHECKBOX_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={checkboxSnippet({ appearance: "violet", size })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">VIOLET</span> | 
              Size: <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <CheckboxDemo appearance="violet" size={size} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="indeterminate"
          code={checkboxSnippet({
            appearance: "info",
            size: "md",
            indeterminate: true,
          })}
        >
           <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Appearance:{" "}
            <span className="font-bold">INFO</span> | 
            Size: <span className="font-bold">md</span> | 
            Indeterminate:{" "}
            <span className="font-bold">TRUE</span> - The indeterminate state is a visual-only condition for HTML checkboxes where the input appears neither checked nor unchecked, typically displayed as a horizontal dash (—) or a filled square.
          </p>
          <CheckboxDemo appearance="info" size="md" indeterminate />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="controlled"
          code={checkboxControlledSnippet()}
        >
          <CheckboxDemo appearance="success" size="md" controlled />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
