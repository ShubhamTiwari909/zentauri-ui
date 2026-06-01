"use client";

import { useState } from "react";
import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { CopyButton } from "@zentauri-ui/zentauri-components/ui/copy-button";
import { CopyButtonAnimated } from "@zentauri-ui/zentauri-components/ui/copy-button/animated";

export function CopyButtonExamplesSection() {
  const [lastCopied, setLastCopied] = useState<string | null>(null);

  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Copy button copies any string to the clipboard and transitions through
        idle and copied states. Pair it with code blocks, tokens, share links,
        and CLI snippets.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("with onCopy callback")}const [lastCopied, setLastCopied] = useState<string | null>(null);

<CopyButton
  value="npm install @zentauri-ui/zentauri-components"
  iconOnly={false}
  label="Copy command"
  onCopy={(value) => setLastCopied(value)}
/>`}
        >
          <div className="flex flex-col items-start gap-3">
            <CopyButton
              iconOnly={false}
              label="Copy command"
              onCopy={(value) => setLastCopied(value)}
              value="npm install @zentauri-ui/zentauri-components"
            />
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {lastCopied
                ? `Last copied: ${lastCopied}`
                : "Nothing copied yet."}
            </p>
          </div>
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          code={`${variantLeadComment("animated icon swap")}import { CopyButtonAnimated } from "@zentauri-ui/zentauri-components/ui/copy-button/animated";

<CopyButtonAnimated
  animation="swap"
  appearance="indigo"
  value="zentauri-ui"
/>`}
        >
          <CopyButtonAnimated
            animation="swap"
            appearance="indigo"
            value="zentauri-ui"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          code={`${variantLeadComment("custom timeout, persists until re-copied")}<CopyButton value="persist-me" timeout={0} appearance="outline" />`}
        >
          <CopyButton appearance="outline" timeout={0} value="persist-me" />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
