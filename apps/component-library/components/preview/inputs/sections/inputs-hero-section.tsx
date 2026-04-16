import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";

export function InputsHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="grid gap-3">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Email
          </label>
          <Input
            animation="lift"
            placeholder="you@example.com"
            aria-label="Email"
          />
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Password
          </label>
          <Input
            type="password"
            animation="glow"
            placeholder="••••••••"
            aria-label="Password"
          />
          <label className="text-xs font-medium uppercase tracking-wide text-rose-200/90">
            Error state
          </label>
          <Input
            appearance="error"
            defaultValue="invalid@"
            animation="none"
            aria-label="Invalid email example"
          />
        </div>
      </div>
    </section>
  );
}
