import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import ToastButtons from "./toast-buttons";

export function ToastHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ToastButtons />
      </SectionCard>
    </Section>
  );
}
