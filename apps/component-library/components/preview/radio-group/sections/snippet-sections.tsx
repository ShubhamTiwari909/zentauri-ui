import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  RADIO_GROUP_APPEARANCES,
  RADIO_GROUP_SIZES,
} from "./components/data";
import {
  RadioGroupDemoControlled,
  RadioGroupDemoUnControlled,
} from "./components/demo";
import {
  radioGroupControlledSnippet,
  radioGroupSnippet,
} from "./components/snippets";

export function RadioGroupCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        RadioGroup variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        RadioGroup handles exclusive selection, shared names, orientation,
        sizing, controlled state, and item-level labels.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {RADIO_GROUP_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={radioGroupSnippet({ appearance, size: "md" })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span> | 
              Size: <span className="font-bold">MD</span> | 
              Orientation: <span className="font-bold">VERTICAL</span>
            </p>
            <RadioGroupDemoUnControlled appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {RADIO_GROUP_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={radioGroupSnippet({
              appearance: "indigo",
              size,
              orientation: "horizontal",
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance: <span className="font-bold">INDIGO</span> | 
              Size: <span className="font-bold">{size.toUpperCase()}</span> | 
              Orientation: <span className="font-bold">HORIZONTAL</span>
            </p>
            <RadioGroupDemoUnControlled
              appearance="indigo"
              size={size}
              orientation="horizontal"
            />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="controlled"
          code={radioGroupControlledSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Appearance: <span className="font-bold">SUCCESS</span> | 
            Size: <span className="font-bold">MD</span> | 
            Controlled:{" "}
            <span className="font-bold">TRUE</span> - The controlled state keeps
            the selected radio value in React state and updates it through
            onValueChange.
          </p>
          <RadioGroupDemoControlled appearance="success" size="md" controlled />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
