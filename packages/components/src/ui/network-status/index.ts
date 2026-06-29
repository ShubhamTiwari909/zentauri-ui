"use client";

export { NetworkStatus } from "./network-status";
export {
  bucketConnectionQuality,
  networkStatusAppearance,
  networkStatusDetail,
  networkStatusLabel,
  networkStatusSemanticStatus,
  useNetworkStatusInfo,
} from "./network-status-base";
export type {
  NetworkConnectionQuality,
  NetworkStatusBaseProps,
  NetworkStatusInfo,
  NetworkStatusLabels,
  NetworkStatusProps,
  NetworkStatusState,
  NetworkStatusVariantProps,
} from "./types";
export {
  networkStatusDetailVariants,
  networkStatusDotVariants,
  networkStatusDotWrapVariants,
  networkStatusLabelVariants,
  networkStatusPingVariants,
  networkStatusVariants,
} from "./variants";
