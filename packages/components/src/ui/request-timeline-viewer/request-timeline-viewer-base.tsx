"use client";

import { cn } from "../../lib/utils";

import type {
  RequestTimelineViewerBaseProps,
  RequestTimelineViewerLabels,
  TimelinePhase,
  TimelinePhaseTone,
} from "./types";
import {
  requestTimelineViewerBarVariants,
  requestTimelineViewerSwatchVariants,
  requestTimelineViewerVariants,
  zuiRequestTimelineViewerBarBase,
  zuiRequestTimelineViewerDurationBase,
  zuiRequestTimelineViewerLabelBase,
  zuiRequestTimelineViewerLegendBase,
  zuiRequestTimelineViewerLegendSwatchBase,
  zuiRequestTimelineViewerRowBase,
  zuiRequestTimelineViewerTotalBase,
  zuiRequestTimelineViewerTrackBase,
} from "./variants";

const DEFAULT_LABELS: Required<RequestTimelineViewerLabels> = {
  total: "Total",
};

/** The fixed cycle of tones used when a phase omits its `tone`. */
export const TIMELINE_PHASE_TONES: TimelinePhaseTone[] = [
  "blocked",
  "dns",
  "connect",
  "tls",
  "send",
  "wait",
  "receive",
];

/** Human-readable label for each tone, used by the legend. */
export const TIMELINE_PHASE_TONE_LABELS: Record<TimelinePhaseTone, string> = {
  blocked: "Blocked",
  dns: "DNS",
  connect: "Connect",
  tls: "TLS",
  send: "Send",
  wait: "Wait",
  receive: "Receive",
};

/** Sum of every phase's duration. */
export function timelineTotal(phases: TimelinePhase[]): number {
  return phases.reduce((sum, phase) => sum + (phase.duration || 0), 0);
}

/** Resolve a phase's tone, cycling through the tone list by index when omitted. */
export function phaseToneAt(
  phase: TimelinePhase,
  index: number,
): TimelinePhaseTone {
  return (
    phase.tone ??
    TIMELINE_PHASE_TONES[index % TIMELINE_PHASE_TONES.length] ??
    "blocked"
  );
}

export function RequestTimelineViewerBase({
  phases,
  total,
  unit = "ms",
  showLegend = true,
  showTotal = true,
  appearance,
  size,
  labels,
  className,
  ref,
  ...rest
}: RequestTimelineViewerBaseProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const sum = timelineTotal(phases);
  const denominator = total ?? sum;

  const usedTones = Array.from(
    new Set(phases.map((phase, index) => phaseToneAt(phase, index))),
  );

  return (
    <div
      ref={ref}
      data-slot="request-timeline-viewer"
      className={cn(
        requestTimelineViewerVariants({ appearance, size }),
        className,
      )}
      {...rest}
    >
      {phases.map((phase, index) => {
        const tone = phaseToneAt(phase, index);
        const pct = denominator > 0 ? (phase.duration / denominator) * 100 : 0;
        return (
          <div
            key={`${phase.label}-${index}`}
            data-slot="request-timeline-viewer-row"
            className={zuiRequestTimelineViewerRowBase}
          >
            <span
              data-slot="request-timeline-viewer-label"
              className={zuiRequestTimelineViewerLabelBase}
            >
              {phase.label}
            </span>
            <span className={zuiRequestTimelineViewerTrackBase}>
              <span
                data-slot="request-timeline-viewer-bar"
                data-tone={tone}
                className={cn(
                  zuiRequestTimelineViewerBarBase,
                  requestTimelineViewerBarVariants({ tone }),
                )}
                style={{ width: `${pct}%` }}
              />
            </span>
            <span
              data-slot="request-timeline-viewer-duration"
              className={zuiRequestTimelineViewerDurationBase}
            >
              {phase.duration}
              {unit}
            </span>
          </div>
        );
      })}

      {showLegend && (
        <div
          data-slot="request-timeline-viewer-legend"
          className={zuiRequestTimelineViewerLegendBase}
        >
          {usedTones.map((tone) => (
            <span
              key={tone}
              data-slot="request-timeline-viewer-legend-item"
              className="inline-flex items-center gap-1.5"
            >
              <span
                aria-hidden="true"
                data-tone={tone}
                className={cn(
                  zuiRequestTimelineViewerLegendSwatchBase,
                  requestTimelineViewerSwatchVariants({ tone }),
                )}
              />
              {TIMELINE_PHASE_TONE_LABELS[tone]}
            </span>
          ))}
        </div>
      )}

      {showTotal && (
        <div
          data-slot="request-timeline-viewer-total"
          className={zuiRequestTimelineViewerTotalBase}
        >
          <span>{mergedLabels.total}</span>
          <span className="tabular-nums">
            {sum}
            {unit}
          </span>
        </div>
      )}
    </div>
  );
}

RequestTimelineViewerBase.displayName = "RequestTimelineViewer";
