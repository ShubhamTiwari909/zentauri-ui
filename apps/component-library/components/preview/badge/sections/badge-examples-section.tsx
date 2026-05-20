import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";

export function BadgeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Pill and square shapes with shared palette tokens.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`appearance · gradient-indigo, shape · pill, size · lg`)}<Badge appearance="gradient-indigo" shape="pill" size="lg">
  Featured
</Badge>`}
        >
          <Badge appearance="gradient-indigo" shape="pill" size="lg">
            Featured
          </Badge>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
