"use client";

import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { useToast } from "@zentauri-ui/zentauri-components/ui/toast";

function ToastSnippetDemo() {
  const { toast } = useToast();
  return (
    <Button
      appearance="sky"
      size="sm"
      type="button"
      onClick={() =>
        toast({
          title: "Copied",
          description: "Snippet is on your clipboard.",
          appearance: "info",
          size: "sm",
        })
      }
    >
      Show info toast
    </Button>
  );
}

export function ToastExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Compact size for lightweight confirmations.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`toast() · appearance · info, size · sm`)}
const { toast } = useToast();
toast({
  title: "Copied",
  description: "Snippet is on your clipboard.",
  appearance: "info",
  size: "sm",
});`}
        >
          <ToastSnippetDemo />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
