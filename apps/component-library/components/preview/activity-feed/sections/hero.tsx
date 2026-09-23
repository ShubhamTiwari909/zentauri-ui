import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { ActivityFeed } from "@zentauri-ui/zentauri-components/ui/activity-feed";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ACTIVITY_FEED_EVENTS } from "./components/data";

export function ActivityFeedHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <SectionCard>
        <div className="mx-auto max-w-xl">
          <ActivityFeed events={ACTIVITY_FEED_EVENTS} appearance="subtle" />
        </div>
      </SectionCard>
    </Section>
  );
}
