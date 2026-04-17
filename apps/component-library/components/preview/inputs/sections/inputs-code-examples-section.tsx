import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  InputsAnimationDemo,
  InputsAppearanceDemo,
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
  InputsSizeDemo,
  InputsTextareaDemo,
} from "./components/inputs-code-examples-demos";
import { InputsControlledDemo } from "./components/input-code-example-controlled-demo";
import {
  INPUTS_CODE_EXAMPLES_SECTION_CLASS,
  animationPresets,
  appearanceInputsExtended,
  sizeInputs,
} from "./components/inputs-code-examples.data";
import {
  inputAnimationSnippet,
  inputAppearanceSnippet,
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
  inputSizeSnippet,
  inputTextareaSnippet,
} from "./components/inputs-code-examples.snippets";

export function InputsCodeExamplesSection() {
  return (
    <section className={INPUTS_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Input variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Use Show output / Show code on each row to compare the live control with
        the JSX. Each snippet opens with a Variant line naming the axis and
        token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {appearanceInputsExtended.map((row) => (
          <PreviewCodeShowcase
            key={row.label}
            code={inputAppearanceSnippet(row)}
          >
            <p className="mb-5 text-xs font-semibold text-white">
              Appearance:{" "}
              <span className="font-bold">{row.appearance.toUpperCase()}</span>
            </p>
            <InputsAppearanceDemo row={row} />
          </PreviewCodeShowcase>
        ))}
        {animationPresets.map((preset) => {
          const [label] = preset;
          return (
            <PreviewCodeShowcase
              key={`anim-${label}`}
              code={inputAnimationSnippet(preset)}
            >
              <p className="mb-5 text-xs font-semibold text-white">
                Animation:{" "}
                <span className="font-bold">{preset[1].toUpperCase()}</span>
              </p>
              <InputsAnimationDemo preset={preset} />
            </PreviewCodeShowcase>
          );
        })}
        {sizeInputs.map((row) => (
          <PreviewCodeShowcase
            key={`size-${row.label}`}
            code={inputSizeSnippet(row)}
          >
            <p className="mb-5 text-xs font-semibold text-white">
              Size: <span className="font-bold">{row.size.toUpperCase()}</span>
            </p>
            <InputsSizeDemo row={row} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="textarea-showcase"
          code={inputTextareaSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Pattern: <span className="font-bold">TEXTAREA + GLOW</span>
          </p>
          <InputsTextareaDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="password-type" code={inputPasswordSnippet()}>
          <p className="mb-5 text-xs font-semibold text-white">
            Type: <span className="font-bold">PASSWORD</span>
          </p>
          <InputsPasswordDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="disabled-showcase"
          code={inputDisabledSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            State: <span className="font-bold">DISABLED</span>
          </p>
          <InputsDisabledDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="readonly-showcase"
          code={inputReadOnlySnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            State: <span className="font-bold">READ ONLY</span>
          </p>
          <InputsReadOnlyDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="controlled-showcase"
          code={inputControlledSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Pattern: <span className="font-bold">CONTROLLED</span>
          </p>
          <InputsControlledDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="error-message-showcase"
          code={inputErrorMessageSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Slot: <span className="font-bold">ERROR MESSAGE</span>
          </p>
          <InputsErrorMessageDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="no-ring-showcase" code={inputNoRingSnippet()}>
          <p className="mb-5 text-xs font-semibold text-white">
            Ring: <span className="font-bold">FALSE</span>
          </p>
          <InputsNoRingDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="file-showcase" code={inputFileSnippet()}>
          <p className="mb-5 text-xs font-semibold text-white">
            As: <span className="font-bold">FILE</span>
          </p>
          <InputsFileDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="checkbox-showcase"
          code={inputCheckboxSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            As: <span className="font-bold">CHECKBOX</span>
          </p>
          <InputsCheckboxDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="radio-showcase" code={inputRadioSnippet()}>
          <p className="mb-5 text-xs font-semibold text-white">
            As: <span className="font-bold">RADIO</span>
          </p>
          <InputsRadioDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="radio-group-showcase"
          code={inputRadioGroupSnippet()}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Pattern: <span className="font-bold">RADIO GROUP</span>
          </p>
          <InputsRadioGroupDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="date-showcase" code={inputDateSnippet()}>
          <p className="mb-5 text-xs font-semibold text-white">
            Type: <span className="font-bold">DATE</span>
          </p>
          <InputsDateDemo />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
