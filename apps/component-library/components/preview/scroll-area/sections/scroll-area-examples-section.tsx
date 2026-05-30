import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { ScrollArea } from "@zentauri-ui/zentauri-components/ui/scroll-area";

const releaseNotes = [
  "Keyboard focus remains visible when the scroll container is named.",
  "Scrollbar colors are driven by component CSS variables.",
  "Horizontal layouts can keep chip rails and tab bars compact.",
  "Hover scrollbars reduce visual weight in dense dashboards.",
  "Hidden scrollbars preserve scroll behavior for custom chrome.",
  "Shadow treatment adds depth for nested information panels.",
];

const metrics = [
  ["API latency", "128 ms"],
  ["Queue depth", "42 jobs"],
  ["Cache hit rate", "94.8%"],
  ["Deploy window", "7 min"],
  ["Error budget", "99.93%"],
  ["SLO drift", "0.04%"],
  ["API Security", "100%"],
];

export function ScrollAreaExamplesSection() {
  return (
    <Section className="max-w-7xl">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        ScrollArea standardizes overflow panels, horizontal rails, hidden
        scrollbars, and hover-revealed thumbs without adding a JavaScript
        positioning dependency.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("named vertical region")}<ScrollArea
  aria-label="Release notes"
  appearance="outline"
  className="h-64 p-4"
  scrollbar="hover"
  shadow
>
  <div className="space-y-3">...</div>
</ScrollArea>`}
        >
          <ScrollArea
            aria-label="Release notes"
            appearance="outline"
            className="h-64 p-4"
            scrollbar="hover"
            shadow
          >
            <div className="space-y-3">
              {releaseNotes.map((note, index) => (
                <div
                  key={note}
                  className="rounded-xl border border-slate-900/10 bg-white p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <span className="mr-2 font-semibold text-cyan-600 dark:text-cyan-300">
                    {index + 1}.
                  </span>
                  {note}
                </div>
              ))}
            </div>
          </ScrollArea>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("horizontal metric rail")}<ScrollArea
  aria-label="System metrics"
  appearance="emerald"
  orientation="horizontal"
  className="p-4"
  viewportClassName="flex min-w-max gap-3"
>
  {metrics.map(([label, value]) => (
    <article key={label}>...</article>
  ))}
</ScrollArea>`}
        >
          <ScrollArea
            aria-label="System metrics"
            appearance="emerald"
            className="p-4"
            orientation="horizontal"
            viewportClassName="flex min-w-max gap-3"
          >
            {metrics.map(([label, value]) => (
              <article
                key={label}
                className="w-44 rounded-2xl bg-slate-950 p-4 text-white ring-1 ring-white/10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  {label}
                </p>
                <p className="mt-3 text-2xl font-semibold">{value}</p>
              </article>
            ))}
          </ScrollArea>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
