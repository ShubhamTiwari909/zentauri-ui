import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { CheckboxAnimated } from "@zentauri-ui/zentauri-components/ui/checkbox/animated";

export function CheckboxExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Use the animated entrypoint when the check mark should draw in as state
        changes.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("appearance · success, animation · draw")}<CheckboxAnimated appearance="success" defaultChecked animation="draw">
  Sync billing contacts
</CheckboxAnimated>`}
        >
          <CheckboxAnimated appearance="success" defaultChecked animation="draw">
            Sync billing contacts
          </CheckboxAnimated>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
