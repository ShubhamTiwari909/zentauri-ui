"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { useToast } from "@zentauri-ui/zentauri-components/ui/toast";

function ToastSnippetDemo() {
  const { toast } = useToast();
  return (
    <Button
      appearance="emerald"
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
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
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
    </section>
  );
}
