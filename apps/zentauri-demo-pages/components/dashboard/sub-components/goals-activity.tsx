"use client";

import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@zentauri-ui/zentauri-components/ui/timeline";

import { activities, goals } from "@/components/dashboard/lib/mock-data";

export function GoalsActivity() {
  return (
    <section
      aria-label="Goals and activity"
      className="grid grid-cols-1 gap-4 lg:grid-cols-2"
    >
      <Card appearance="glass" className="p-5">
        <CardHeader>
          <CardTitle as="h3" className="text-base font-semibold">
            Monthly Goals
          </CardTitle>
          <CardDescription className="text-xs opacity-70">
            Progress toward this month&apos;s targets
          </CardDescription>
        </CardHeader>
        <CardBody className="mt-4 gap-5">
          {goals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{goal.label}</span>
                <span className="opacity-70">{goal.hint}</span>
              </div>
              <Progress value={goal.value} aria-label={goal.label} />
            </div>
          ))}
        </CardBody>
      </Card>

      <Card appearance="glass" className="p-5">
        <CardHeader>
          <CardTitle as="h3" className="text-base font-semibold">
            Recent Activity
          </CardTitle>
          <CardDescription className="text-xs opacity-70">
            Latest events across your workspace
          </CardDescription>
        </CardHeader>
        <CardBody className="mt-4">
          <Timeline appearance="blue">
            {activities.map((item) => (
              <TimelineItem key={item.id}>
                <TimelineIndicator />
                <TimelineContent>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>
                    {item.description} · {item.when}
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardBody>
      </Card>
    </section>
  );
}
