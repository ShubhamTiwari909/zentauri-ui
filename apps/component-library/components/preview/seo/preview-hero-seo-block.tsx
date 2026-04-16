import type { PreviewSeoDocument } from "@/lib/preview-seo";

type PreviewHeroSeoBlockProps = {
  seo: PreviewSeoDocument;
};

export function PreviewHeroSeoBlock({ seo }: PreviewHeroSeoBlockProps) {
  return (
    <div className="max-w-2xl space-y-6">
      {seo.category ? (
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          {seo.category}
        </span>
      ) : null}
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {seo.headings.h1}
        </h1>
        <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
          {seo.intro}
        </p>
      </div>
    </div>
  );
}
