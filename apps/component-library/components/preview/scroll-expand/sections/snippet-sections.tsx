"use client";
import { ScrollExpand } from "@zentauri-ui/zentauri-components/ui/scroll-expand";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Section } from "@/components/common/Section";
import { examples } from "../components/scroll-expand-code-examples.data";
import { ScrollExpandOverlay } from "../components/scroll-expand-overlay";
import { scrollExpandSnippet } from "../components/scroll-expand-code-examples.snippets";

export function ScrollExpandExamples() {
  return (
    <Section variant="plain">
      <h2 className="text-3xl font-semibold text-white">
        One frame. Room to grow.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
        These examples scroll inside their own frame. Click or tab into one,
        then scroll with a wheel, a trackpad, or the arrow and Page Down keys.
      </p>
      <div className="mt-10 space-y-10">
        {examples.map(({ label, overlay, props }) => {
          const live = {
            ...props,
            scroller: "self",
            className: "h-[480px]",
          } as const;
          return (
            <div key={label}>
              <p className="mb-4 text-lg font-semibold text-white">{label}</p>
              <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-950">
                <PreviewCodeShowcase code={scrollExpandSnippet(live, overlay)}>
                  <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#05070d]">
                    <ScrollExpand {...live}>
                      <ScrollExpandOverlay {...overlay} />
                    </ScrollExpand>
                  </div>
                </PreviewCodeShowcase>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
