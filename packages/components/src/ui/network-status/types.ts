import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type {
  networkStatusDotVariants,
  networkStatusVariants,
} from "./variants";

export type NetworkStatusVariantProps = VariantProps<
  typeof networkStatusDotVariants
>;

/** Connectivity state derived from `navigator.onLine` (or the controlled `online` prop). */
export type NetworkStatusState = "online" | "offline";

/** Connection quality bucketed from the Network Information API `effectiveType`. */
export type NetworkConnectionQuality = "fast" | "moderate" | "slow" | "unknown";

/** Live snapshot passed to `onStatusChange` and the `render` prop. */
export interface NetworkStatusInfo {
  online: boolean;
  status: NetworkStatusState;
  quality: NetworkConnectionQuality;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

/** Override the default status/detail copy. */
export interface NetworkStatusLabels {
  online?: ReactNode;
  offline?: ReactNode;
  slow?: ReactNode;
}

export type NetworkStatusBaseProps = VariantProps<
  typeof networkStatusVariants
> &
  VariantProps<typeof networkStatusDotVariants> &
  ComponentPropsWithRef<"span"> & {
    /**
     * Controlled connectivity. When provided, live `navigator.onLine` detection
     * is disabled and this value drives the status — useful for SSR, demos, and tests.
     */
    online?: boolean;
    /** Show the text label next to the dot. */
    showLabel?: boolean;
    /** Show the connection-quality detail (effective type / downlink). */
    showDetail?: boolean;
    /** Render a pulsing ring behind the dot while online. */
    pulse?: boolean;
    /** Override the default status copy. */
    labels?: NetworkStatusLabels;
    /** Called whenever the connectivity snapshot changes. */
    onStatusChange?: (info: NetworkStatusInfo) => void;
    /** Fully replace the rendered content with a custom node. */
    render?: (info: NetworkStatusInfo) => ReactNode;
    children?: ReactNode;
  };

export type NetworkStatusProps = NetworkStatusBaseProps;
