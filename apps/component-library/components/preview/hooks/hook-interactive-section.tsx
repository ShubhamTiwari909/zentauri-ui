"use client";

import CodeHighlight from "@/components/CodeHighlight";
import type { HookPreviewSlug } from "@/lib/hook-preview-registry";
import { getHookDemoFullSource } from "./hook-demo-full-sources";
import { HookDemoRouter } from "./hook-demo-router";

type HookInteractiveSectionProps = {
  slug: HookPreviewSlug;
};

export function HookInteractiveSection({ slug }: HookInteractiveSectionProps) {
  const exampleCode = getHookDemoFullSource(slug);

  return (
    <section className="mt-10 max-w-3xl space-y-8">
      <div className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-slate-400">
          Demo source
        </h2>
        <p className="text-sm text-slate-500">
          Full client component used for this preview (same JSX as below). Adjust
          paths if you copy outside this app.
        </p>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <CodeHighlight codeString={exampleCode} language="tsx" />
        </div>
      </div>
      <HookDemoRouter slug={slug} />
    </section>
  );
}
