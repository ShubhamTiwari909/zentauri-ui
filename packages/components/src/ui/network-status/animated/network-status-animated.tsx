"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "../../../lib/utils";

import {
  networkStatusDetail,
  networkStatusLabel,
  networkStatusSemanticStatus,
  useNetworkStatusInfo,
} from "../network-status-base";
import {
  networkStatusDetailVariants,
  networkStatusDotVariants,
  networkStatusDotWrapVariants,
  networkStatusLabelVariants,
  networkStatusPingVariants,
  networkStatusVariants,
} from "../variants";

import { networkStatusAnimationPresets } from "./animations";
import type { NetworkStatusAnimatedProps } from "./types";

export function NetworkStatusAnimated({
  appearance,
  size,
  online,
  showLabel = true,
  showDetail = false,
  pulse = true,
  labels,
  animation = "ping",
  onStatusChange,
  render,
  className,
  children,
  ref,
  ...rest
}: NetworkStatusAnimatedProps) {
  const info = useNetworkStatusInfo(online);
  const preset = networkStatusAnimationPresets[animation];

  const onStatusChangeRef = useRef(onStatusChange);
  onStatusChangeRef.current = onStatusChange;
  useEffect(() => {
    onStatusChangeRef.current?.(info);
  }, [info]);

  const semanticStatus = networkStatusSemanticStatus(info, appearance);
  const resolvedAppearance = appearance ?? semanticStatus;
  const detail = networkStatusDetail(info);
  const showRing =
    pulse && semanticStatus !== "offline" && animation !== "none";

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
            {showRing && (
              <motion.span
                data-slot="network-status-ping"
                className={cn(
                  networkStatusPingVariants({ appearance: resolvedAppearance }),
                  "animate-none",
                )}
                aria-hidden="true"
                initial="initial"
                animate="animate"
                variants={preset.variants}
                transition={preset.transition}
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

NetworkStatusAnimated.displayName = "NetworkStatusAnimated";
