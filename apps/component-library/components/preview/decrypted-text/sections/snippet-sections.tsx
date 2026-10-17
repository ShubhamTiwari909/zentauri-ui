"use client";
import { DecryptedText } from "@zentauri-ui/zentauri-components/ui/decrypted-text";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Section } from "@/components/common/Section";
import { examples } from "../components/decrypted-text-code-examples.data";
import { decryptedTextSnippet } from "../components/decrypted-text-code-examples.snippets";

export function DecryptedTextExamples() {
  return (
    <Section variant="plain">
      <h2 className="text-3xl font-semibold text-white">
        Same text. Different signal.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
        Choose where letters start resolving, which glyphs they cycle through,
        and how each one lands. Every example decodes when it scrolls into view.
      </p>
      <div className="mt-10 space-y-10">
        {examples.map(({ label, text, props: config }) => (
          <div key={label}>
            <p className="mb-4 text-lg font-semibold text-white">{label}</p>
            <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-950">
              <PreviewCodeShowcase code={decryptedTextSnippet(text, config)}>
                <div className="rounded-2xl bg-white px-6 py-12 text-slate-900 sm:px-10 dark:bg-[#05070d] dark:text-white">
                  <DecryptedText
                    as="p"
                    {...config}
                    className={`text-2xl font-semibold tracking-tight sm:text-4xl ${"className" in config ? config.className : ""}`}
                  >
                    {text}
                  </DecryptedText>
                </div>
              </PreviewCodeShowcase>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
