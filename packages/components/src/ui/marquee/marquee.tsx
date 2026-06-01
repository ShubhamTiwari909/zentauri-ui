"use client";

import {
  Children,
  Fragment,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties, Ref } from "react";

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

function assignRef<TElement>(
  ref: Ref<TElement> | undefined,
  value: TElement | null,
) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [copyCount, setCopyCount] = useState(1);
  const childArray = useMemo(() => Children.toArray(children), [children]);
  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      assignRef(ref, node);
    },
    [ref],
  );
  const marqueeStyle = {
    ...(gap !== undefined ? { "--zui-marquee-gap": toCssLength(gap) } : null),
    ...style,
  } as CSSProperties;
  const groupClassName = cn(
    "flex shrink-0 items-center justify-around gap-(--zui-marquee-gap)",
    resolvedOrientation === "vertical" ? "flex-col" : "flex-row",
    itemClassName,
  );
  const repeatedChildren = Array.from({ length: copyCount }, (_, index) => (
    <Fragment key={index}>{childArray}</Fragment>
  ));

  useLayoutEffect(() => {
    const updateCopyCount = () => {
      const root = rootRef.current;
      const measure = measureRef.current;

      if (!root || !measure) {
        return;
      }

      const rootSize =
        resolvedOrientation === "vertical"
          ? root.offsetHeight
          : root.offsetWidth;
      const contentSize =
        resolvedOrientation === "vertical"
          ? measure.scrollHeight
          : measure.scrollWidth;

      if (!rootSize || !contentSize) {
        setCopyCount(1);
        return;
      }

      setCopyCount(Math.max(1, Math.ceil(rootSize / contentSize)));
    };

    updateCopyCount();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(updateCopyCount);
    if (rootRef.current) {
      observer.observe(rootRef.current);
    }
    if (measureRef.current) {
      observer.observe(measureRef.current);
    }

    return () => observer.disconnect();
  }, [childArray, gap, resolvedOrientation]);

  return (
    <div
      ref={setRootRef}
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
        aria-hidden="true"
        data-slot="marquee-measure"
        ref={measureRef}
        className={cn(
          "pointer-events-none invisible absolute -z-10",
          groupClassName,
        )}
      >
        {childArray}
      </div>
      <div
        data-slot="marquee-track"
        className={cn(
          "flex shrink-0 gap-(--zui-marquee-gap) will-change-transform [animation-iteration-count:infinite] [animation-timing-function:linear] motion-reduce:[animation-play-state:paused]",
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
        <div data-slot="marquee-item-group" className={groupClassName}>
          {repeatedChildren}
        </div>
        <div
          aria-hidden="true"
          inert
          data-slot="marquee-item-group"
          className={groupClassName}
        >
          {repeatedChildren}
        </div>
      </div>
    </div>
  );
}

Marquee.displayName = "Marquee";
