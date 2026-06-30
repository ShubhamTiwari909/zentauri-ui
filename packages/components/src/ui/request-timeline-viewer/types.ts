import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { requestTimelineViewerVariants } from "./variants";

export type RequestTimelineViewerVariantProps = VariantProps<
  typeof requestTimelineViewerVariants
>;

/** A network timing phase, mirroring a browser request waterfall. */
export type TimelinePhaseTone =
  | "blocked"
  | "dns"
  | "connect"
  | "tls"
  | "send"
  | "wait"
  | "receive";

/** A single labeled, timed phase rendered as a proportional bar. */
export type TimelinePhase = {
  label: string;
  duration: number;
  tone?: TimelinePhaseTone;
};

/** Override the total-summary copy. */
export interface RequestTimelineViewerLabels {
  total?: ReactNode;
}

export type RequestTimelineViewerBaseProps = VariantProps<
  typeof requestTimelineViewerVariants
> &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    /** The ordered request phases to render as a waterfall. */
    phases: TimelinePhase[];
    /** Denominator for bar widths; defaults to the sum of phase durations. */
    total?: number;
    /** Unit suffix appended to each duration. */
    unit?: string;
    /** Show the legend mapping each tone to its label and color. */
    showLegend?: boolean;
    /** Show the total-duration summary row. */
    showTotal?: boolean;
    /** Override default copy. */
    labels?: RequestTimelineViewerLabels;
  };

export type RequestTimelineViewerProps = RequestTimelineViewerBaseProps;
