"use client";
import { ScrollExpand } from "@zentauri-ui/zentauri-components/ui/scroll-expand";
import CodeHighlight from "@/components/CodeHighlight";
import { Section } from "@/components/common/Section";
import { forest } from "../components/scroll-expand-code-examples.data";
import { ScrollExpandOverlay } from "../components/scroll-expand-overlay";
import { scrollExpandSnippet } from "../components/scroll-expand-code-examples.snippets";

const overlay = {
  heading: "Pinned to the page",
  body: "With the default scroller, the section pins while the page scrolls and releases after the hold.",
};

export function ScrollExpandPageScroll() {
  return (
    <Section variant="plain">
      <h2 className="text-3xl font-semibold text-white">Follow the page.</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
        The default window scroller pins the section while the page scrolls past
        it. Keep scrolling to watch it open, hold, and release.
      </p>
      {/* overflow-clip, not hidden: a scroll container ancestor would break sticky pinning. */}
      <div className="mt-8 overflow-clip rounded-3xl border border-white/10">
        <ScrollExpand
          src={forest}
          alt="A forest path in soft light"
          title="Scroll the page"
          hint="Keep scrolling"
        >
          <ScrollExpandOverlay {...overlay} />
        </ScrollExpand>
      </div>
      <div className="mt-6">
        <CodeHighlight
          codeString={scrollExpandSnippet(
            {
              src: "/forest.jpg",
              alt: "A forest path in soft light",
              title: "Scroll the page",
              hint: "Keep scrolling",
            },
            overlay,
          )}
        />
      </div>
    </Section>
  );
}
