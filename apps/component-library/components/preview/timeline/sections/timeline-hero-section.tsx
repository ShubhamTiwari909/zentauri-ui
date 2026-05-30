import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@zentauri-ui/zentauri-components/ui/timeline";

export function TimelineHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
        <div className="mx-auto max-w-md">
          <Timeline appearance="sky">
            <TimelineItem>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>Order placed</TimelineTitle>
                <TimelineDescription>
                  We received your order.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>Processing</TimelineTitle>
                <TimelineDescription>
                  Your items are being prepared.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>Shipped</TimelineTitle>
                <TimelineDescription>
                  The package is on the way to you.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>Delivered</TimelineTitle>
                <TimelineDescription>
                  Handed off at the front door.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </SectionCard>
    </Section>
  );
}
