import type {
  RequestTimelineViewerProps,
  TimelinePhase,
} from "@zentauri-ui/zentauri-components/ui/request-timeline-viewer";
import type { RequestTimelineViewerAnimation } from "@zentauri-ui/zentauri-components/ui/request-timeline-viewer/animated";

export const REQUEST_TIMELINE_VIEWER_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
] as const satisfies readonly NonNullable<
  RequestTimelineViewerProps["appearance"]
>[];

export const REQUEST_TIMELINE_VIEWER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<RequestTimelineViewerProps["size"]>[];

export const REQUEST_TIMELINE_VIEWER_ANIMATIONS = [
  "none",
  "grow",
  "fade",
] as const satisfies readonly RequestTimelineViewerAnimation[];

/** Sample timing breakdowns the playground can render. */
export const REQUEST_TIMELINE_VIEWER_DATASETS = {
  Fast: [
    { label: "Blocked", duration: 2, tone: "blocked" },
    { label: "DNS", duration: 1, tone: "dns" },
    { label: "Connect", duration: 6, tone: "connect" },
    { label: "TLS", duration: 9, tone: "tls" },
    { label: "Send", duration: 1, tone: "send" },
    { label: "Wait", duration: 18, tone: "wait" },
    { label: "Receive", duration: 7, tone: "receive" },
  ],
  "Slow API": [
    { label: "Blocked", duration: 14, tone: "blocked" },
    { label: "DNS", duration: 22, tone: "dns" },
    { label: "Connect", duration: 38, tone: "connect" },
    { label: "TLS", duration: 61, tone: "tls" },
    { label: "Send", duration: 4, tone: "send" },
    { label: "Wait", duration: 842, tone: "wait" },
    { label: "Receive", duration: 96, tone: "receive" },
  ],
  Cached: [
    { label: "Blocked", duration: 1, tone: "blocked" },
    { label: "Send", duration: 1, tone: "send" },
    { label: "Wait", duration: 3, tone: "wait" },
    { label: "Receive", duration: 2, tone: "receive" },
  ],
} as const satisfies Record<string, TimelinePhase[]>;

export const REQUEST_TIMELINE_VIEWER_DATASET_KEYS = [
  "Fast",
  "Slow API",
  "Cached",
] as const;
