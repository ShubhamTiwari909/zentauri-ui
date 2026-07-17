import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

export function PermissionHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-col gap-4 text-sm text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <span className="rounded bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300">
              Provider
            </span>
            <code className="text-xs">{`<PermissionProvider>`}</code>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
              Component
            </span>
            <code className="text-xs">{`<Can permission="users.read">`}</code>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
              Hook
            </span>
            <code className="text-xs">{`usePermission("users.delete")`}</code>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
              Guard
            </span>
            <code className="text-xs">{`<RouteGuard permission="admin">`}</code>
          </div>
        </div>
      </div>
    </Section>
  );
}
