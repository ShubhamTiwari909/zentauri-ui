"use client";

import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import { skeletonAnimationPresets } from "./animations";
import type {
  SkeletonAnimatedProps,
  SkeletonAvatarAnimatedProps,
  SkeletonButtonAnimatedProps,
  SkeletonCardAnimatedProps,
  SkeletonTextAnimatedProps,
} from "./types";
import {
  SkeletonAvatarBase,
  SkeletonBase,
  SkeletonButtonBase,
  SkeletonTextBase,
  useSkeletonAnimation,
} from "../skeleton-base";

export function SkeletonAnimated(props: SkeletonAnimatedProps) {
  const { animation = "shimmer" } = props;
  const motionProps = skeletonAnimationPresets[animation];
  return (
    <SkeletonBase {...props} as={motion.div} initial={false} {...motionProps} />
  );
}

SkeletonAnimated.displayName = "Skeleton";

export function SkeletonTextAnimated(props: SkeletonTextAnimatedProps) {
  const { animation = "shimmer" } = props;
  const effectiveAnimation = useSkeletonAnimation(animation);
  const motionProps = skeletonAnimationPresets[effectiveAnimation];

  return <SkeletonTextBase {...props} as={motion.div} initial={false} {...motionProps} />;
}

SkeletonTextAnimated.displayName = "SkeletonText";

export function SkeletonAvatarAnimated(props: SkeletonAvatarAnimatedProps) {
  const { animation = "shimmer" } = props;
  const effectiveAnimation = useSkeletonAnimation(animation);
  const motionProps = skeletonAnimationPresets[effectiveAnimation];
  return <SkeletonAvatarBase {...props} as={motion.div} initial={false} {...motionProps} />;
}

SkeletonAvatarAnimated.displayName = "SkeletonAvatar";

export function SkeletonCardAnimated(props: SkeletonCardAnimatedProps) {
  const {
    className,
    busy,
    animation = "shimmer",
    shimmerTone,
    appearance,
    size,
    rounded,
    ref,
  } = props;

  return (
    <div
      ref={ref as never}
      data-slot="skeleton-card"
      className={cn("w-full max-w-sm", className)}
      aria-busy={busy ? true : undefined}
    >
      <SkeletonAnimated
        rounded="lg"
        animation={animation}
        shimmerTone={shimmerTone}
        appearance={appearance}
        size={size}
        busy={busy}
        className="flex flex-col gap-4 p-4"
      >
        <div className="flex items-center gap-3">
          <SkeletonAvatarAnimated
            appearance={appearance}
            size={size}
            animation={animation}
            shimmerTone={shimmerTone}
            rounded={rounded}
          />
          <div className="flex flex-1 flex-col gap-2">
            <SkeletonTextAnimated
              lines={2}
              appearance={appearance}
              size={size}
              animation={animation}
              shimmerTone={shimmerTone}
            />
          </div>
        </div>
        <SkeletonTextAnimated
          lines={4}
          appearance={appearance}
          size={size}
          animation={animation}
          shimmerTone={shimmerTone}
        />
      </SkeletonAnimated>
    </div>
  );
}

SkeletonCardAnimated.displayName = "SkeletonCard";

export function SkeletonButtonAnimated(props: SkeletonButtonAnimatedProps) {
  const { animation = "shimmer" } = props;
  const effectiveAnimation = useSkeletonAnimation(animation);
  const motionProps = skeletonAnimationPresets[effectiveAnimation];
  return <SkeletonButtonBase {...props} as={motion.div} initial={false} {...motionProps} />;
}

SkeletonButtonAnimated.displayName = "SkeletonButton";