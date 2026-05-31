"use client";

import type { CSSProperties } from "react";

import { cn } from "../../lib/utils";

import type { MarqueeProps } from "./types";
import { marqueeVariants } from "./variants";

const marqueeKeyframes = `@keyframes zui-marquee-x{from{transform:translate3d(0,0,0)}to{transform:translate3d(calc(-50% - var(--zui-marquee-gap)/2),0,0)}}@keyframes zui-marquee-y{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,calc(-50% - var(--zui-marquee-gap)/2),0)}}`;

function toCssLength(value: number | string | undefined) {
  if (value === undefined) {
    return undefined;
  }
  return typeof value === "number" ? `${value}px` : value;
}

export function Marquee(props: MarqueeProps) {
  const {
    appearance,
    children,
    className,
    direction,
    fade,
    gap,
    itemClassName,
    orientation,
    pauseOnHover = false,
    ref,
    size,
    speed = 30,
    style,
    trackClassName,
    ...rest
  } = props;

  const resolvedOrientation =
    orientation ??
    (direction === "up" || direction === "down" ? "vertical" : "horizontal");
  const resolvedDirection =
    direction ?? (resolvedOrientation === "vertical" ? "up" : "left");
  const isReverse =
    resolvedDirection === "right" || resolvedDirection === "down";
  const animationName =
    resolvedOrientation === "vertical" ? "zui-marquee-y" : "zui-marquee-x";
  const marqueeStyle = {
    ...(gap !== undefined ? { "--zui-marquee-gap": toCssLength(gap) } : null),
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-direction={resolvedDirection}
      data-orientation={resolvedOrientation}
      data-slot="marquee"
      className={cn(
        marqueeVariants({
          appearance,
          fade,
          orientation: resolvedOrientation,
          size,
        }),
        className,
      )}
      style={marqueeStyle}
      {...rest}
    >
      <style>{marqueeKeyframes}</style>
      <div
        data-slot="marquee-track"
        className={cn(
          "flex shrink-0 gap-[var(--zui-marquee-gap)] will-change-transform [animation-iteration-count:infinite] [animation-timing-function:linear] motion-reduce:[animation-play-state:paused]",
          resolvedOrientation === "vertical" ? "flex-col" : "w-max flex-row",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          isReverse && "[animation-direction:reverse]",
          trackClassName,
        )}
        style={
          {
            animationDuration: `${speed}s`,
            animationName,
          } as CSSProperties
        }
      >
        <div
          data-slot="marquee-item-group"
          className={cn(
            "flex shrink-0 items-center justify-around gap-[var(--zui-marquee-gap)]",
            resolvedOrientation === "vertical" ? "flex-col" : "flex-row",
            itemClassName,
          )}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          inert
          data-slot="marquee-item-group"
          className={cn(
            "flex shrink-0 items-center justify-around gap-[var(--zui-marquee-gap)]",
            resolvedOrientation === "vertical" ? "flex-col" : "flex-row",
            itemClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

Marquee.displayName = "Marquee";
