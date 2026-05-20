import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import { InputAnimated } from "@zentauri-ui/zentauri-components/ui/inputs/animated";

export function InputsHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
        <div className="grid gap-3">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-800 dark:text-slate-400">
            Email
          </label>
          <InputAnimated
            animation="lift"
            placeholder="you@example.com"
            aria-label="Email"
          />
          <label className="text-xs font-medium uppercase tracking-wide text-slate-800 dark:text-slate-400">
            Password
          </label>
          <InputAnimated
            type="password"
            animation="glow"
            placeholder="••••••••"
            aria-label="Password"
          />
          <label className="text-xs font-medium uppercase tracking-wide text-rose-600/90 dark:text-rose-200/90">
            Error state
          </label>
          <Input
            appearance="error"
            defaultValue="invalid@"
            aria-label="Invalid email example"
          />
        </div>
      </SectionCard>
    </Section>
  );
}
