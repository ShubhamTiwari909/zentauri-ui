"use client";

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useMemo,
} from "react";

import { cn } from "../../lib/utils";

import type {
  TimelineContentProps,
  TimelineCtx,
  TimelineDescriptionProps,
  TimelineIndicatorProps,
  TimelineItemCtx,
  TimelineItemProps,
  TimelineProps,
  TimelineSize,
  TimelineTitleProps,
} from "./types";
import {
  timelineConnectorVariants,
  timelineContentVariants,
  timelineDescriptionVariants,
  timelineIndicatorVariants,
  timelineItemVariants,
  timelineTitleVariants,
  timelineVariants,
} from "./variants";

const TimelineContext = createContext<TimelineCtx | null>(null);

const TimelineIndexContext = createContext<number | null>(null);

export const TimelineItemContext = createContext<TimelineItemCtx | null>(null);

export function useTimelineContext(component: string): TimelineCtx {
  const ctx = useContext(TimelineContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Timeline>`);
  }
  return ctx;
}

export function useTimelineIndex(component: string): number {
  const index = useContext(TimelineIndexContext);
  if (index === null) {
    throw new Error(`${component} must be used within <Timeline>`);
  }
  return index;
}

function useTimelineSize(): TimelineSize {
  return useContext(TimelineContext)?.size ?? "md";
}

function useTimelineIsLast(): boolean {
  return useContext(TimelineItemContext)?.isLast ?? false;
}

export function Timeline({
  appearance = "default",
  size = "md",
  className,
  children,
  ref,
  ...rest
}: TimelineProps) {
  const items = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );
  const ctx = useMemo<TimelineCtx>(
    () => ({
      appearance: appearance ?? "default",
      size: size ?? "md",
      total: items.length,
    }),
    [appearance, size, items.length],
  );

  return (
    <TimelineContext.Provider value={ctx}>
      <ol
        ref={ref}
        data-slot="timeline"
        className={cn(timelineVariants(), "m-0 list-none p-0", className)}
        {...rest}
      >
        {items.map((child, index) => (
          <TimelineIndexContext.Provider key={index} value={index}>
            {child}
          </TimelineIndexContext.Provider>
        ))}
      </ol>
    </TimelineContext.Provider>
  );
}

Timeline.displayName = "Timeline";

export function TimelineItem({
  className,
  children,
  ref,
  ...rest
}: TimelineItemProps) {
  const { size, total } = useTimelineContext("TimelineItem");
  const index = useTimelineIndex("TimelineItem");
  const isLast = index === total - 1;
  const itemCtx = useMemo<TimelineItemCtx>(
    () => ({ index, isLast }),
    [index, isLast],
  );

  return (
    <TimelineItemContext.Provider value={itemCtx}>
      <li
        ref={ref}
        data-slot="timeline-item"
        data-last={isLast ? "" : undefined}
        className={cn(timelineItemVariants(), className)}
        {...rest}
      >
        {!isLast ? (
          <span
            aria-hidden="true"
            data-slot="timeline-connector"
            className={timelineConnectorVariants({ size })}
          />
        ) : null}
        {children}
      </li>
    </TimelineItemContext.Provider>
  );
}

TimelineItem.displayName = "TimelineItem";

export function TimelineIndicator({
  className,
  appearance,
  children,
  ref,
  ...rest
}: TimelineIndicatorProps & { ref?: React.Ref<HTMLDivElement> }) {
  const { appearance: rootAppearance, size } =
    useTimelineContext("TimelineIndicator");
  return (
    <div
      ref={ref}
      data-slot="timeline-indicator"
      className={cn(
        timelineIndicatorVariants({
          appearance: appearance ?? rootAppearance,
          size,
        }),
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

TimelineIndicator.displayName = "TimelineIndicator";

export function TimelineContent({
  className,
  children,
  ref,
  ...rest
}: TimelineContentProps & { ref?: React.Ref<HTMLDivElement> }) {
  const size = useTimelineSize();
  const isLast = useTimelineIsLast();
  return (
    <div
      ref={ref}
      data-slot="timeline-content"
      className={cn(
        timelineContentVariants({ size }),
        isLast && "pb-0",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

TimelineContent.displayName = "TimelineContent";

export function TimelineTitle({
  className,
  ref,
  ...rest
}: TimelineTitleProps & { ref?: React.Ref<HTMLDivElement> }) {
  const size = useTimelineSize();
  return (
    <div
      ref={ref}
      data-slot="timeline-title"
      className={cn(timelineTitleVariants({ size }), className)}
      {...rest}
    />
  );
}

TimelineTitle.displayName = "TimelineTitle";

export function TimelineDescription({
  className,
  ref,
  ...rest
}: TimelineDescriptionProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  const size = useTimelineSize();
  return (
    <p
      ref={ref}
      data-slot="timeline-description"
      className={cn(timelineDescriptionVariants({ size }), className)}
      {...rest}
    />
  );
}

TimelineDescription.displayName = "TimelineDescription";
