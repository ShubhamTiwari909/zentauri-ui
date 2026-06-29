"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "../../lib/utils";
import { useNetworkStatus as useOnlineStatus } from "../../hooks/useNetworkStatus/useNetworkStatus";

import type {
  NetworkConnectionQuality,
  NetworkStatusBaseProps,
  NetworkStatusInfo,
  NetworkStatusLabels,
  NetworkStatusVariantProps,
} from "./types";
import {
  networkStatusDetailVariants,
  networkStatusDotVariants,
  networkStatusDotWrapVariants,
  networkStatusLabelVariants,
  networkStatusPingVariants,
  networkStatusVariants,
} from "./variants";

type NavigatorConnection = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

function getConnection(): NavigatorConnection | undefined {
  if (typeof navigator === "undefined") return undefined;
  const nav = navigator as Navigator & {
    connection?: NavigatorConnection;
    mozConnection?: NavigatorConnection;
    webkitConnection?: NavigatorConnection;
  };
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
}

/** Bucket the Network Information API `effectiveType` into a coarse quality. */
export function bucketConnectionQuality(
  effectiveType?: string,
): NetworkConnectionQuality {
  switch (effectiveType) {
    case "slow-2g":
    case "2g":
      return "slow";
    case "3g":
      return "moderate";
    case "4g":
      return "fast";
    default:
      return "unknown";
  }
}

const DEFAULT_LABELS = {
  online: "Online",
  offline: "Offline",
  slow: "Slow connection",
} as const;

/**
 * Resolve the semantic status key. An explicit semantic appearance
 * (`online` / `offline` / `slow`) overrides the live status so it can also drive
 * the label and pulse; any other (palette) appearance leaves the live status intact.
 */
export function networkStatusSemanticStatus(
  info: NetworkStatusInfo,
  appearance?: NetworkStatusVariantProps["appearance"],
): "online" | "offline" | "slow" {
  if (
    appearance === "online" ||
    appearance === "offline" ||
    appearance === "slow"
  ) {
    return appearance;
  }
  if (!info.online) return "offline";
  if (info.quality === "slow") return "slow";
  return "online";
}

/** Pick the dot appearance from the live snapshot (used when no `appearance` is passed). */
export function networkStatusAppearance(
  info: NetworkStatusInfo,
): NonNullable<NetworkStatusVariantProps["appearance"]> {
  return networkStatusSemanticStatus(info);
}

export function networkStatusLabel(
  info: NetworkStatusInfo,
  labels?: NetworkStatusLabels,
  appearance?: NetworkStatusVariantProps["appearance"],
) {
  const merged = { ...DEFAULT_LABELS, ...labels };
  return merged[networkStatusSemanticStatus(info, appearance)];
}

export function networkStatusDetail(info: NetworkStatusInfo): string | null {
  if (!info.online) return null;
  const parts: string[] = [];
  if (info.effectiveType) parts.push(info.effectiveType.toUpperCase());
  if (typeof info.downlink === "number") parts.push(`${info.downlink} Mbps`);
  return parts.length ? parts.join(" · ") : null;
}

type ConnectionMetrics = Pick<
  NetworkStatusInfo,
  "effectiveType" | "downlink" | "rtt" | "saveData"
>;

/**
 * Read Network Information API metrics, subscribing to its `change` event. Starts empty so
 * the first render is deterministic across server and client (the API is read only in the
 * effect), avoiding hydration mismatches. The reachability bit comes from `useOnlineStatus`.
 */
function useConnectionMetrics(): ConnectionMetrics {
  const [metrics, setMetrics] = useState<ConnectionMetrics>({});

  useEffect(() => {
    const read = () => {
      const connection = getConnection();
      setMetrics({
        effectiveType: connection?.effectiveType,
        downlink: connection?.downlink,
        rtt: connection?.rtt,
        saveData: connection?.saveData,
      });
    };
    read();
    const connection = getConnection();
    connection?.addEventListener?.("change", read);
    return () => connection?.removeEventListener?.("change", read);
  }, []);

  return metrics;
}

/**
 * Compose the shared `useNetworkStatus` reachability hook with Network Information API
 * metrics into a full snapshot. `controlledOnline` overrides live detection when provided.
 */
export function useNetworkStatusInfo(
  controlledOnline?: boolean,
): NetworkStatusInfo {
  const liveOnline = useOnlineStatus();
  const metrics = useConnectionMetrics();
  const online = controlledOnline ?? liveOnline;

  return useMemo(
    () => ({
      online,
      status: online ? ("online" as const) : ("offline" as const),
      quality: online
        ? bucketConnectionQuality(metrics.effectiveType)
        : ("unknown" as const),
      effectiveType: metrics.effectiveType,
      downlink: metrics.downlink,
      rtt: metrics.rtt,
      saveData: metrics.saveData,
    }),
    [
      online,
      metrics.effectiveType,
      metrics.downlink,
      metrics.rtt,
      metrics.saveData,
    ],
  );
}

export function NetworkStatusBase({
  appearance,
  size,
  online,
  showLabel = true,
  showDetail = false,
  pulse = true,
  labels,
  onStatusChange,
  render,
  className,
  children,
  ref,
  ...rest
}: NetworkStatusBaseProps) {
  const info = useNetworkStatusInfo(online);

  const onStatusChangeRef = useRef(onStatusChange);
  onStatusChangeRef.current = onStatusChange;
  useEffect(() => {
    onStatusChangeRef.current?.(info);
  }, [info]);

  const semanticStatus = networkStatusSemanticStatus(info, appearance);
  const resolvedAppearance = appearance ?? semanticStatus;
  const detail = networkStatusDetail(info);
  const showPing = pulse && semanticStatus !== "offline";

  return (
    <span
      ref={ref}
      data-slot="network-status"
      data-status={info.status}
      data-quality={info.quality}
      className={cn(networkStatusVariants({ size }), className)}
      {...rest}
    >
      {render ? (
        render(info)
      ) : (
        <>
          <span
            data-slot="network-status-indicator"
            className={networkStatusDotWrapVariants({ size })}
          >
            {showPing && (
              <span
                data-slot="network-status-ping"
                className={networkStatusPingVariants({
                  appearance: resolvedAppearance,
                })}
                aria-hidden="true"
              />
            )}
            <span
              data-slot="network-status-dot"
              className={networkStatusDotVariants({
                appearance: resolvedAppearance,
                size,
              })}
            />
          </span>
          {showLabel && (
            <span
              data-slot="network-status-label"
              className={networkStatusLabelVariants({ size })}
            >
              {networkStatusLabel(info, labels, appearance)}
            </span>
          )}
          {showDetail && detail && (
            <span
              data-slot="network-status-detail"
              className={networkStatusDetailVariants({ size })}
            >
              {detail}
            </span>
          )}
          {children}
        </>
      )}
    </span>
  );
}

NetworkStatusBase.displayName = "NetworkStatus";
