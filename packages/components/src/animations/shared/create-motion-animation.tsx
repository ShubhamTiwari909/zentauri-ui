"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "../../lib/utils";

import type {
  MotionAnimationPreset,
  MotionAnimationProps,
  MotionAnimationTargetOverrides,
} from "./types";

function formatBlurValue(value: number | string) {
  if (typeof value === "number") {
    return `blur(${value}px)`;
  }
  return value.includes("(") ? value : `blur(${value})`;
}

function mergeTargetOverrides(
  target: MotionAnimationPreset["initial"] | undefined,
  overrides: MotionAnimationTargetOverrides | undefined,
) {
  if (!overrides) {
    return target;
  }

  const { blur, ...rest } = overrides;
  return {
    ...(target ?? {}),
    ...rest,
    ...(blur === undefined ? null : { filter: formatBlurValue(blur) }),
  };
}

function isTargetObject(
  target: NonNullable<MotionAnimationProps["whileInView"]>,
): target is MotionAnimationPreset["animate"] {
  return target !== null && typeof target === "object" && !Array.isArray(target);
}

export function createMotionAnimation(
  displayName: string,
  slot: string,
  preset: MotionAnimationPreset,
) {
  function MotionAnimation(props: MotionAnimationProps) {
    const {
      children,
      className,
      initial,
      animate,
      exit,
      transition,
      layout,
      whileHover,
      whileInView,
      whileTap,
      from,
      to,
      exitTo,
      ...rest
    } = props;
    const shouldReduceMotion = useReducedMotion();
    const resolvedAnimateTarget = mergeTargetOverrides(preset.animate, to);
    const resolvedAnimate = animate ?? resolvedAnimateTarget;
    const shouldAnimateInView = whileInView !== undefined;
    const usesPresetWhileInView = whileInView === true;
    const resolvedWhileInView =
      whileInView === undefined
        ? undefined
        : usesPresetWhileInView
          ? resolvedAnimateTarget
          : isTargetObject(whileInView)
            ? { ...resolvedAnimateTarget, ...whileInView }
            : whileInView;
    const reducedMotionTarget = shouldAnimateInView
      ? resolvedWhileInView
      : resolvedAnimate;
    const resolvedInitial =
      initial ??
      (shouldReduceMotion
        ? reducedMotionTarget
        : mergeTargetOverrides(preset.initial, from));
    const resolvedExit = exit ?? mergeTargetOverrides(preset.exit, exitTo);
    const resolvedTransition = transition
      ? { ...preset.transition, ...transition }
      : preset.transition;
    const shouldDisableAnimate =
      usesPresetWhileInView || (shouldReduceMotion && shouldAnimateInView);

    return (
      <motion.div
        data-slot={slot}
        className={cn(className)}
        initial={resolvedInitial}
        animate={shouldDisableAnimate ? undefined : resolvedAnimate}
        exit={resolvedExit}
        layout={layout ?? preset.layout}
        whileHover={whileHover ?? preset.whileHover}
        whileInView={
          shouldReduceMotion
            ? undefined
            : shouldAnimateInView
              ? resolvedWhileInView
              : undefined
        }
        whileTap={whileTap ?? preset.whileTap}
        transition={resolvedTransition}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  MotionAnimation.displayName = displayName;
  return MotionAnimation;
}
