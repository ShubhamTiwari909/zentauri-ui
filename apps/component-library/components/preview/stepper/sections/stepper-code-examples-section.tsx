import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { StepperDemo } from "./components/stepper-code-examples-demo";
import {
  STEPPER_APPEARANCES,
  STEPPER_CODE_EXAMPLES_SECTION_CLASS,
} from "./components/stepper-code-examples.data";
import { stepperSnippet } from "./components/stepper-code-examples.snippets";

export function StepperCodeExamplesSection() {
  return (
    <section className={STEPPER_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Stepper code examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming orientation, active step, and size.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {STEPPER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`h-${appearance}`}
            code={stepperSnippet({
              orientation: "horizontal",
              appearance,
              size: "md",
            })}
          >
            <p className="mb-5 text-xs font-semibold text-white md:text-sm">
              Horizontal · appearance:{" "}
              <span className="font-bold">{appearance}</span>
            </p>
            <StepperDemo
              orientation="horizontal"
              appearance={appearance}
              size="md"
            />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="vertical"
          code={stepperSnippet({
            orientation: "vertical",
            appearance: "complete",
            size: "sm",
          })}
        >
          <p className="mb-5 text-xs font-semibold text-white md:text-sm">
            Vertical
            <span className="font-bold">SM</span>
          </p>
          <div className="max-w-xl">
            <StepperDemo
              orientation="vertical"
              size="sm"
              appearance="complete"
            />
          </div>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
