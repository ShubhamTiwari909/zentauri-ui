import {
  getHookPreviewEntry,
  hookImportPath,
  type HookPreviewSlug,
} from "@/lib/hook-preview-registry";

type HookImportSnippetProps = {
  slug: HookPreviewSlug;
};

export function HookImportSnippet({ slug }: HookImportSnippetProps) {
  const entry = getHookPreviewEntry(slug);
  const path = hookImportPath(entry.module);
  const line = `import { ${entry.name} } from "${path}";`;

  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
        Import
      </p>
      <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/80 p-4 text-sm text-cyan-100">
        <code>{line}</code>
      </pre>
    </div>
  );
}
