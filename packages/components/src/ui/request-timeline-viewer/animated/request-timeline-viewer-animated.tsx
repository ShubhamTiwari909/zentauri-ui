"use client";

import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import {
  phaseToneAt,
  TIMELINE_PHASE_TONE_LABELS,
  timelineTotal,
} from "../request-timeline-viewer-base";
import type { RequestTimelineViewerLabels, TimelinePhaseTone } from "../types";
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
} from "../variants";

import { requestTimelineViewerAnimationPresets } from "./animations";
import type { RequestTimelineViewerAnimatedProps } from "./types";

const DEFAULT_LABELS: Required<RequestTimelineViewerLabels> = {
  total: "Total",
};

export function RequestTimelineViewerAnimated({
  phases,
  total,
  unit = "ms",
  showLegend = true,
  showTotal = true,
  animation = "grow",
  appearance,
  size,
  labels,
  className,
  ref,
  ...rest
}: RequestTimelineViewerAnimatedProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const preset = requestTimelineViewerAnimationPresets[animation];
  const sum = timelineTotal(phases);
  const denominator = total ?? sum;

  const usedTones = Array.from(
    new Set(phases.map((phase, index) => phaseToneAt(phase, index))),
  ) as TimelinePhaseTone[];

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
          <motion.div
            key={`${phase.label}-${index}`}
            data-slot="request-timeline-viewer-row"
            className={zuiRequestTimelineViewerRowBase}
            variants={preset.row}
            initial="hidden"
            animate="visible"
            transition={{
              ...preset.transition,
              delay: index * preset.stagger,
            }}
          >
            <span
              data-slot="request-timeline-viewer-label"
              className={zuiRequestTimelineViewerLabelBase}
            >
              {phase.label}
            </span>
            <span className={zuiRequestTimelineViewerTrackBase}>
              <motion.span
                data-slot="request-timeline-viewer-bar"
                data-tone={tone}
                className={cn(
                  zuiRequestTimelineViewerBarBase,
                  "origin-left",
                  requestTimelineViewerBarVariants({ tone }),
                )}
                style={{ width: `${pct}%` }}
                variants={preset.bar}
                initial="hidden"
                animate="visible"
                transition={{
                  ...preset.transition,
                  delay: index * preset.stagger,
                }}
              />
            </span>
            <span
              data-slot="request-timeline-viewer-duration"
              className={zuiRequestTimelineViewerDurationBase}
            >
              {phase.duration}
              {unit}
            </span>
          </motion.div>
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

RequestTimelineViewerAnimated.displayName = "RequestTimelineViewerAnimated";
