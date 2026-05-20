import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  SkeletonAnimated,
  SkeletonAvatarAnimated,
  SkeletonTextAnimated,
} from "@zentauri-ui/zentauri-components/ui/skeleton/animated";

export function SkeletonHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
        <div className="flex gap-4">
          <SkeletonAvatarAnimated avatarSize="lg" animation="shimmer" />
          <div className="flex flex-1 flex-col gap-2">
            <SkeletonAnimated
              className="h-4 w-[60%]"
              rounded="md"
              animation="shimmer"
            />
            <SkeletonTextAnimated lines={2} animation="shimmer" />
          </div>
        </div>
      </SectionCard>
    </Section>
  );
}
