"use client";
import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  TimeTravelInspector,
  type TimeTravelSnapshot,
} from "@zentauri-ui/zentauri-components/ui/time-travel-inspector";
import { incrementalHistorySnippet } from "../components/time-travel-inspector-code-examples.snippets";
const snapshots: TimeTravelSnapshot[] = [
  {
    id: "a",
    timestamp: 0,
    label: "Opened",
    kind: "checkpoint",
    state: { cart: { total: 0 } },
  },
  {
    id: "b",
    timestamp: 1000,
    label: "Added",
    kind: "delta",
    changes: [{ op: "set", path: ["cart", "total"], value: 80 }],
  },
  {
    id: "c",
    timestamp: 2000,
    label: "Discount",
    kind: "delta",
    changes: [{ op: "set", path: ["cart", "total"], value: 64 }],
  },
];
export function TimeTravelInspectorCodeExamplesSection() {
  return (
    <Section className="text-slate-900 dark:text-slate-50">
      <h2 className="mb-4 text-2xl font-semibold">Incremental history</h2>
      <p role="heading" aria-level={3} className="mb-3 text-sm font-semibold">
        Supply checkpoints and deltas directly
      </p>
      <PreviewCodeShowcase code={incrementalHistorySnippet}>
        <TimeTravelInspector snapshots={snapshots} />
      </PreviewCodeShowcase>
    </Section>
  );
}
