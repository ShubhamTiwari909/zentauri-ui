import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { OTPInputDemo } from "./components/demo";
import { OTPInputPlayground } from "./components/playground";
import {
  otpInputSnippet,
  otpInputValidationSnippet,
} from "./components/snippets";

export function OTPInputCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        OTP Input variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, and allowed characters to preview the OTP
        input live. Toggle Show output / Show code and the snippet updates to
        match the selected variant.
      </p>
      <OTPInputPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          key="alphanumeric"
          code={otpInputSnippet({
            allowedCharacters: "alphanumeric",
            appearance: "glass",
            length: 8,
            separatorEvery: 4,
            size: "md",
          })}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Allowed characters: <span className="font-bold">ALPHANUMERIC</span>{" "}
            | Length: <span className="font-bold">8</span>
          </p>
          <OTPInputDemo
            allowedCharacters="alphanumeric"
            appearance="glass"
            length={8}
            separatorEvery={4}
            size="md"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="error" code={otpInputValidationSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            State: <span className="font-bold">ERROR</span> | Completion:{" "}
            <span className="font-bold">onComplete</span>
          </p>
          <OTPInputDemo appearance="error" errorMessage size="md" />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
