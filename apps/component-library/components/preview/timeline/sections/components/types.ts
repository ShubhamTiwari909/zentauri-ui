import type {
  TimelineProps,
  TimelineTransition,
} from "@zentauri-ui/zentauri-components/ui/timeline";

export type TimelineDemoAppearance = NonNullable<TimelineProps["appearance"]>;
export type TimelineDemoSize = NonNullable<TimelineProps["size"]>;

export type TimelineDemoProps = {
  appearance: TimelineDemoAppearance;
  size?: TimelineDemoSize;
  animated?: boolean;
  transition?: TimelineTransition;
};
