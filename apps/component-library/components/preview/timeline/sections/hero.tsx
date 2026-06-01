import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@zentauri-ui/zentauri-components/ui/timeline";

import { TIMELINE_EVENTS } from "./components/data";

export function TimelineHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
        <div className="mx-auto max-w-md">
          <Timeline appearance="sky">
            {TIMELINE_EVENTS.map((event) => (
              <TimelineItem key={event.title}>
                <TimelineIndicator />
                <TimelineContent>
                  <TimelineTitle>{event.title}</TimelineTitle>
                  <TimelineDescription>{event.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </SectionCard>
    </Section>
  );
}
