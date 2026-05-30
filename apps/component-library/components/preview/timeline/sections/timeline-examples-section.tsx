import { Section } from "@/components/common/Section";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@zentauri-ui/zentauri-components/ui/timeline";

export function TimelineExamplesSection() {
  return (
    <Section variant="plain" className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Activity feed</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-900/10 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <Timeline appearance="emerald" size="sm">
            <TimelineItem>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>Pushed 3 commits</TimelineTitle>
                <TimelineDescription>main · 2 minutes ago</TimelineDescription>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>Opened pull request</TimelineTitle>
                <TimelineDescription>
                  Add timeline component · 1 hour ago
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>Closed issue #128</TimelineTitle>
                <TimelineDescription>Yesterday</TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>

        <div className="rounded-2xl border border-slate-900/10 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <Timeline appearance="gradient-purple" size="lg">
            <TimelineItem>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>Kickoff</TimelineTitle>
                <TimelineDescription>
                  Project scope agreed with stakeholders.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>Design review</TimelineTitle>
                <TimelineDescription>
                  Final mocks signed off.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>Launch</TimelineTitle>
                <TimelineDescription>Shipped to production.</TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </Section>
  );
}
