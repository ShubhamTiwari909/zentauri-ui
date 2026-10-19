"use client";
import { MaskedHeading } from "@zentauri-ui/zentauri-components/ui/masked-heading";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Section } from "@/components/common/Section";
import { examples } from "../components/masked-heading-code-examples.data";
import { maskedHeadingSnippet } from "../components/masked-heading-code-examples.snippets";

export function MaskedHeadingExamples() {
  return (
    <Section variant="plain">
      <h2 className="text-3xl font-semibold text-white">
        One heading. Many windows.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
        Rise lifts each word out of its own line. Wipe uncovers the media from
        the inline start. Fade settles the whole heading into focus. None keeps
        the heading still.
      </p>
      <div className="mt-10 space-y-10">
        {examples.map(({ label, text, props }) => (
          <div key={label}>
            <p className="mb-4 text-lg font-semibold text-white">{label}</p>
            <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-950">
              <PreviewCodeShowcase code={maskedHeadingSnippet(text, props)}>
                <div className="rounded-2xl bg-white px-6 py-12 sm:px-10 dark:bg-[#07080f]">
                  <MaskedHeading size="md" {...props}>
                    {text}
                  </MaskedHeading>
                </div>
              </PreviewCodeShowcase>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
