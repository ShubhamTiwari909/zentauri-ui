import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Rating } from "@zentauri-ui/zentauri-components/ui/rating";

export function RatingHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="max-w-lg">
        <div className="grid gap-6">
          <Rating
            allowHalf
            appearance="amber"
            defaultValue={4.5}
            hint="Half steps are enabled for nuanced product feedback."
            label="Customer sentiment"
            name="sentiment"
          />
          <Rating
            appearance="rose"
            defaultValue={3}
            icon="heart"
            label="Delight score"
            size="sm"
          />
          <Rating
            appearance="gradient-blue"
            defaultValue={4}
            icon="thumb"
            label="Support quality"
            readOnly
            size="lg"
          />
        </div>
      </SectionCard>
    </Section>
  );
}
