import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  ImpactBasicDemo,
  ImpactControlledDemo,
  ImpactUpstreamDemo,
  ImpactLargeDemo,
} from "../components/change-impact-explorer-code-examples-demo";
import {
  impactBasicSnippet,
  impactControlledSnippet,
  impactUpstreamSnippet,
  impactLargeSnippet,
} from "../components/change-impact-explorer-code-examples.snippets";
export function ImpactCodeExamplesSection() {
  return (
    <Section className="space-y-6 text-slate-900 dark:text-slate-50">
      <h2 className="text-2xl font-semibold">Change Impact Explorer recipes</h2>
      {[
        [
          "Public contract change",
          impactBasicSnippet,
          <ImpactBasicDemo key="basic" />,
        ],
        [
          "Controlled review selection",
          impactControlledSnippet,
          <ImpactControlledDemo key="controlled" />,
        ],
        [
          "Upstream dependencies and custom details",
          impactUpstreamSnippet,
          <ImpactUpstreamDemo key="upstream" />,
        ],
        [
          "10,000 consumers with bounded rendering",
          impactLargeSnippet,
          <ImpactLargeDemo key="large" />,
        ],
      ].map(([label, code, demo]) => (
        <div key={String(label)}>
          <p className="mb-3 text-lg font-semibold">{label}</p>
          <PreviewCodeShowcase code={String(code)}>{demo}</PreviewCodeShowcase>
        </div>
      ))}
    </Section>
  );
}
