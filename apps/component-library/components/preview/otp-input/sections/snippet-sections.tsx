import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { OTP_INPUT_APPEARANCES, OTP_INPUT_SIZES } from "./components/data";
import { OTPInputDemo } from "./components/demo";
import {
  otpInputSnippet,
  otpInputValidationSnippet,
} from "./components/snippets";

export function OTPInputCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        OTP input variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {OTP_INPUT_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={otpInputSnippet({ appearance, size: "md" })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span> |
              Size: <span className="font-bold">MD</span>
            </p>
            <OTPInputDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {OTP_INPUT_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={otpInputSnippet({ appearance: "outline", size })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance: <span className="font-bold">OUTLINE</span> | Size:{" "}
              <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <OTPInputDemo appearance="outline" size={size} />
          </PreviewCodeShowcase>
        ))}
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
