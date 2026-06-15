import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  InputsCheckboxDemo,
  InputsDateDemo,
  InputsDisabledDemo,
  InputsErrorMessageDemo,
  InputsFileDemo,
  InputsNoRingDemo,
  InputsPasswordDemo,
  InputsRadioDemo,
  InputsRadioGroupDemo,
  InputsReadOnlyDemo,
  InputsTextareaDemo,
} from "./components/demos";
import { InputsControlledDemo } from "./components/controlled-demo";
import { InputsPlayground } from "./components/playground";
import {
  inputCheckboxSnippet,
  inputControlledSnippet,
  inputDateSnippet,
  inputDisabledSnippet,
  inputErrorMessageSnippet,
  inputFileSnippet,
  inputNoRingSnippet,
  inputPasswordSnippet,
  inputRadioGroupSnippet,
  inputRadioSnippet,
  inputReadOnlySnippet,
  inputTextareaSnippet,
} from "./components/snippets";

export function InputsCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Input variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, animation, and ring to preview the input live.
        Toggle Show output / Show code and the snippet updates to match the
        selected variant.
      </p>
      <InputsPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          key="textarea-showcase"
          code={inputTextareaSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            Pattern: <span className="font-bold">TEXTAREA + GLOW</span>
          </p>
          <InputsTextareaDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="password-type" code={inputPasswordSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            Type: <span className="font-bold">PASSWORD</span>
          </p>
          <InputsPasswordDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="disabled-showcase"
          code={inputDisabledSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            State: <span className="font-bold">DISABLED</span>
          </p>
          <InputsDisabledDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="readonly-showcase"
          code={inputReadOnlySnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            State: <span className="font-bold">READ ONLY</span>
          </p>
          <InputsReadOnlyDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="controlled-showcase"
          code={inputControlledSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            Pattern: <span className="font-bold">CONTROLLED</span>
          </p>
          <InputsControlledDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="error-message-showcase"
          code={inputErrorMessageSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            Slot: <span className="font-bold">ERROR MESSAGE</span>
          </p>
          <InputsErrorMessageDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="no-ring-showcase" code={inputNoRingSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            Ring: <span className="font-bold">FALSE</span>
          </p>
          <InputsNoRingDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="file-showcase" code={inputFileSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            As: <span className="font-bold">FILE</span>
          </p>
          <InputsFileDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="checkbox-showcase"
          code={inputCheckboxSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            As: <span className="font-bold">CHECKBOX</span>
          </p>
          <InputsCheckboxDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="radio-showcase" code={inputRadioSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            As: <span className="font-bold">RADIO</span>
          </p>
          <InputsRadioDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="radio-group-showcase"
          code={inputRadioGroupSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            Pattern: <span className="font-bold">RADIO GROUP</span>
          </p>
          <InputsRadioGroupDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="date-showcase" code={inputDateSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white">
            Type: <span className="font-bold">DATE</span>
          </p>
          <InputsDateDemo />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
