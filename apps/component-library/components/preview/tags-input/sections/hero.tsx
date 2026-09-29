import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TagsInputDemo } from "./components/demo";

export function TagsInputHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 bg-slate-100 p-6 dark:border-white/10 dark:bg-white/5">
        <div className="max-w-md">
          <TagsInputDemo appearance="default" size="md" />
        </div>
      </div>
    </Section>
  );
}
