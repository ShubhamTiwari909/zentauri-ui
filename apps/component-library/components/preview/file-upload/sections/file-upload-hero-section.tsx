import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { FileUpload } from "@zentauri-ui/zentauri-components/ui/file-upload";

export function FileUploadHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
        <FileUpload accept="image/*" />
      </SectionCard>
    </Section>
  );
}
