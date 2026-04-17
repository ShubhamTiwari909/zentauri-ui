import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Alert,
  AlertDefaultIcon,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@zentauri-ui/zentauri-components/ui/alert";

export function AlertExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Compare semantic tones and motion with the code tab.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`appearance · warning, animation · pop`)}
<Alert appearance="warning" animation="pop">
  <AlertIcon><AlertDefaultIcon appearance="warning" /></AlertIcon>
  <div>
    <AlertTitle>Quota</AlertTitle>
    <AlertDescription>You are at 90% of this month&apos;s limit.</AlertDescription>
  </div>
</Alert>`}
        >
          <Alert appearance="warning" animation="pop">
            <AlertIcon>
              <AlertDefaultIcon appearance="warning" />
            </AlertIcon>
            <div>
              <AlertTitle>Quota</AlertTitle>
              <AlertDescription>
                You are at 90% of this month&apos;s limit.
              </AlertDescription>
            </div>
          </Alert>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
