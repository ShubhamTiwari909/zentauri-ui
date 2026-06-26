import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SecretReveal } from "@zentauri-ui/zentauri-components/ui/secret-reveal";

export function SecretRevealHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-6">
          <SecretReveal
            value="sk-abc123def456"
            label="API Key"
            appearance="default"
            size="md"
          />
          <SecretReveal
            value="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0"
            label="JWT"
            appearance="blue"
            size="md"
          />
          <SecretReveal
            value="super-secret-password-123"
            label="Password"
            appearance="emerald"
            size="md"
          />
        </div>
      </div>
    </Section>
  );
}
