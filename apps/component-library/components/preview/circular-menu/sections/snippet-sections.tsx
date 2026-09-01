import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { CircularMenuPlayground } from "./components/playground";
import { CircularMenuArcDemo } from "./components/arc-demo";
import { CircularMenuOrbitDemo } from "./components/orbit-demo";
import { CircularMenuControlledDemo } from "./components/controlled-demo";
import {
  circularMenuArcSnippet,
  circularMenuControlledSnippet,
  circularMenuOrbitSnippet,
} from "./components/snippets";

export function CircularMenuCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Circular menu playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Every part of the ring is a prop: item count, radius, start angle, arc
        sweep, how it opens, whether it spins, and how labels are revealed.
        Toggle Show output / Show code and the snippet updates to match the
        selected variant.
      </p>
      <CircularMenuPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Quarter arc
          </p>
          <p className="mb-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Set <code>sweep</code> below <code>360</code> and the items spread
            across an arc instead of a closed ring, with the first and last item
            landing exactly on the arc ends. Pair it with{" "}
            <code>startAngle</code> to aim the fan — this one opens up and to
            the right, the usual floating-action-button shape.
          </p>
          <PreviewCodeShowcase code={circularMenuArcSnippet()}>
            <CircularMenuArcDemo />
          </PreviewCodeShowcase>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Orbit
          </p>
          <p className="mb-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            <code>trigger=&quot;always&quot;</code> keeps the ring open, and{" "}
            <code>spin</code> rotates it continuously. The static entry does
            this in pure CSS: the ring turns while each item counter-rotates so
            icons stay upright, hovering pauses it, and{" "}
            <code>prefers-reduced-motion</code> stops it entirely.
          </p>
          <PreviewCodeShowcase code={circularMenuOrbitSnippet()}>
            <CircularMenuOrbitDemo />
          </PreviewCodeShowcase>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Controlled state
          </p>
          <p className="mb-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Drive the ring from your own state with <code>open</code> /{" "}
            <code>onOpenChange</code>. Here <code>closeOnSelect</code> is off,
            so picking an item reports through <code>onSelect</code> and leaves
            the ring open for a second choice.
          </p>
          <PreviewCodeShowcase code={circularMenuControlledSnippet()}>
            <CircularMenuControlledDemo />
          </PreviewCodeShowcase>
        </div>
      </div>
    </Section>
  );
}
