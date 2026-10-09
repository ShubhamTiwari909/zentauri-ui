import Link from "next/link";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TimeTravelInspectorDemo } from "./components/time-travel-inspector-code-examples-demo";
import { TimeTravelInspectorPlayground } from "./components/time-travel-inspector-playground";
import { TimeTravelInspectorCodeExamplesSection } from "./sections/time-travel-inspector-code-examples-section";

export default function TimeTravelInspectorPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <Section variant="hero" className="lg:grid-cols-1">
        <PreviewHeroSeoBlock seo={seo} />
        <TimeTravelInspectorDemo />
      </Section>
      <Section className="text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">
          Time Travel Inspector playground
        </h2>
        <p className="mt-2 text-sm">
          Follow the cart total from $0 to $136. Scrub to SAVE20, compare it
          with any event, bookmark the moment, or open its historical checkout.
        </p>
        <TimeTravelInspectorPlayground />
      </Section>
      <TimeTravelInspectorCodeExamplesSection />
      <Section className="space-y-4 text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">
          History and rendering contract
        </h2>
        <p>
          Pass immutable snapshots in nondecreasing timestamp order with unique,
          nonempty IDs. The first event must be a checkpoint. Timestamps are
          milliseconds, including zero; formatTimestamp controls their display.
          Events at the same timestamp keep their supplied order.
        </p>
        <p>
          createTimeTravelHistory(captures, checkpointInterval) stores a full
          checkpoint every 20 events by default and key-level deltas in between.
          It copies input states. For long sessions, record checkpoints and
          deltas directly and release the original full captures. Seeking
          replays only from the nearest checkpoint; nearby event buttons are
          limited to seven.
        </p>
        <p>
          In Server Components or server code, import the pure helpers from
          <code>
            {" "}
            @zentauri-ui/zentauri-components/ui/time-travel-inspector/history
          </code>
          to compact or resolve history before passing snapshots to the client
          inspector. The UI entry also re-exports these helpers for client use.
          Replace snapshots and patches immutably when updating history.
        </p>
        <p>
          State must be finite JSON data: objects, arrays, strings, numbers,
          booleans, and null. Dates, undefined, class instances, and cyclic
          objects are unsupported. Changes use object-key path arrays; arrays
          are replaced atomically. A set with an empty path replaces the root.
          Remove requires a nonempty path to an object key, and nested patch
          parents must already exist. Diff results are discriminated by type:
          added includes after, removed includes before, and changed includes
          both.
        </p>
        <p>
          The state viewer, diff, and renderPreview receive the same moment. A
          null comparisonId follows the previous event; an explicit ID pins any
          baseline. selectedId, comparisonId, and bookmarks support controlled
          values with change callbacks. Unknown selection IDs fall back to the
          latest event; unknown comparison IDs fall back to the previous event.
          Bookmarks for absent events are hidden.
        </p>
        <p>
          Use renderPreview for an application-specific historical view and
          onOpenState to open it elsewhere. Treat renderer and callback data as
          immutable. The component does not restore live application state or
          capture sessions automatically. The scrubber supports native arrow,
          Home, and End keys; navigation, comparison, and bookmarks also use
          native keyboard controls.
        </p>
      </Section>
      <PreviewApiSection slug="time-travel-inspector" />
      <Section className="space-y-4 text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">
          Installation and theme overrides
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
          pnpm dlx @zentauri-ui/zentauri-components add time-travel-inspector
        </pre>
        <p>
          Import from @zentauri-ui/zentauri-components/ui/time-travel-inspector.
          This static entry does not require Framer Motion. With the package
          install, include the package in your Tailwind v4 scan scope:
        </p>
        <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
          {'@source "../node_modules/@zentauri-ui/zentauri-components";'}
        </pre>
        <p>
          Adjust the source path for your stylesheet location. Scope paired
          light/dark variables to a wrapper, such as
          --zui-time-travel-inspector-selected-bg and
          --zui-time-travel-inspector-selected-bg-dark.
        </p>
        <Link
          href="#zui-css-variables-time-travel-inspector"
          className="text-sky-700 underline dark:text-sky-300"
        >
          Explore all Time Travel Inspector CSS variables
        </Link>
      </Section>
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
