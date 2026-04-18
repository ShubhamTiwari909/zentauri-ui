import Link from "next/link";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import { HOOK_PREVIEW_REGISTRY } from "@/lib/constants";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

type HooksHubPageProps = {
  seo: PreviewSeoDocument;
};

export default function HooksHubPage({ seo }: HooksHubPageProps) {
  return (
    <PreviewPageShell>
      <section className="max-w-3xl space-y-6">
        <PreviewHeroSeoBlock seo={seo} />
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HOOK_PREVIEW_REGISTRY.map((hook) => (
          <Link
            key={hook.slug}
            href={`/preview/hooks/${hook.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-white transition-colors group-hover:text-cyan-300">
                  {hook.name}
                </h2>
                <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-300">
                  Hook
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{hook.description}</p>
            </div>

            <div className="mt-8 flex items-center text-sm font-medium text-cyan-400">
              Open preview
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </section>
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
