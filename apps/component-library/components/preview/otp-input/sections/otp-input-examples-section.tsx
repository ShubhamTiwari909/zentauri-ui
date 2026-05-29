import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { OTPInput } from "@zentauri-ui/zentauri-components/ui/otp-input";

import { OTPInputControlledDemo } from "./components/otp-input-controlled-demo";

export function OTPInputExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        OTPInput handles the interaction contract for authentication and payment
        verification screens: segmented entry, paste fill, completion, and
        controlled state.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("paste-friendly verification")}<OTPInput
  label="Payment approval"
  hint="Enter the code sent to your authenticator."
  appearance="glass"
  separatorEvery={3}
  name="approvalCode"
/>`}
        >
          <OTPInput
            appearance="glass"
            hint="Enter the code sent to your authenticator."
            label="Payment approval"
            name="approvalCode"
            separatorEvery={3}
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          code={`${variantLeadComment("controlled completion")}const [code, setCode] = useState("");
const complete = code.length === 6;

<OTPInput
  value={code}
  onValueChange={setCode}
  onComplete={(value) => verify(value)}
  appearance={complete ? "success" : "outline"}
  label="Secure sign in"
/>`}
        >
          <OTPInputControlledDemo />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
