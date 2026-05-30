"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "../../../lib/utils";

import {
  TimelineItemContext,
  useTimelineContext,
  useTimelineIndex,
} from "../timeline-base";
import type { TimelineItemCtx } from "../types";
import {
  timelineConnectorVariants,
  timelineItemVariants,
} from "../variants";
import {
  TIMELINE_DEFAULT_STAGGER,
  timelineItemTransitionPresets,
} from "./animations";
import type { TimelineItemAnimatedProps } from "./types";

export function TimelineItem({
  className,
  children,
  transitionVariant = "default",
  stagger = TIMELINE_DEFAULT_STAGGER,
  ref,
  ...rest
}: TimelineItemAnimatedProps & { ref?: React.Ref<HTMLLIElement> }) {
  const { size, total } = useTimelineContext("TimelineItem");
  const index = useTimelineIndex("TimelineItem");
  const isLast = index === total - 1;
  const itemCtx = useMemo<TimelineItemCtx>(
    () => ({ index, isLast }),
    [index, isLast],
  );

  const reducedMotion = useReducedMotion();
  const motionless = transitionVariant === "none" || Boolean(reducedMotion);
  const transition = timelineItemTransitionPresets[transitionVariant];
  const delay = index * stagger;

  return (
    <TimelineItemContext.Provider value={itemCtx}>
      <motion.li
        ref={ref}
        data-slot="timeline-item"
        data-last={isLast ? "" : undefined}
        className={cn(timelineItemVariants(), className)}
        initial={motionless ? false : { opacity: 0, y: 12 }}
        whileInView={motionless ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ ...transition, delay }}
        {...rest}
      >
        {!isLast ? (
          <motion.span
            aria-hidden="true"
            data-slot="timeline-connector"
            className={timelineConnectorVariants({ size })}
            style={{ originY: 0 }}
            initial={motionless ? false : { scaleY: 0, x: "-50%" }}
            whileInView={motionless ? undefined : { scaleY: 1, x: "-50%" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ ...transition, delay: delay + 0.12 }}
          />
        ) : null}
        {children}
      </motion.li>
    </TimelineItemContext.Provider>
  );
}

TimelineItem.displayName = "TimelineItem";
