"use client";

import { createContext, useContext, useMemo } from "react";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

import { skeletonAnimationPresets } from "./animations";
import type {
  SkeletonAnimation,
  SkeletonAvatarProps,
  SkeletonButtonProps,
  SkeletonCardProps,
  SkeletonProps,
  SkeletonTextProps,
} from "./types";
import { skeletonTextLineVariants, skeletonVariants } from "./variants";

const SkeletonAnimationContext = createContext<SkeletonAnimation | undefined>(
  undefined,
);

function useSkeletonAnimation(fallback: SkeletonAnimation): SkeletonAnimation {
  return useContext(SkeletonAnimationContext) ?? fallback;
}

export function Skeleton(props: SkeletonProps) {
  const {
    className,
    appearance,
    size,
    rounded,
    animation = "shimmer",
    shimmerTone,
    busy,
    children,
    ref,
    ...rest
  } = props;
  const motionProps = skeletonAnimationPresets[animation];
  const ctx = useMemo(() => animation, [animation]);

  return (
    <SkeletonAnimationContext.Provider value={ctx}>
      <motion.div
        ref={ref}
        data-slot="skeleton"
        aria-hidden
        aria-busy={busy ? true : undefined}
        className={cn(
          skeletonVariants({
            appearance,
            size,
            rounded,
            animation,
            shimmerTone,
          }),
          className,
        )}
        initial={false}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.div>
    </SkeletonAnimationContext.Provider>
  );
}

Skeleton.displayName = "Skeleton";

export function SkeletonText(props: SkeletonTextProps) {
  const {
    lines = 3,
    className,
    appearance,
    size,
    rounded,
    animation = "shimmer",
    shimmerTone,
    busy,
    ref,
  } = props;
  const effectiveAnimation = useSkeletonAnimation(animation);
  const motionProps = skeletonAnimationPresets[effectiveAnimation];

  return (
    <div
      data-slot="skeleton-text"
      className={cn("flex w-full flex-col gap-2", className)}
      aria-hidden
      aria-busy={busy ? true : undefined}
    >
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          ref={index === 0 ? ref : undefined}
          className={cn(
            skeletonVariants({
              appearance,
              size,
              rounded,
              animation: effectiveAnimation,
              shimmerTone,
            }),
            skeletonTextLineVariants({ size }),
            index === lines - 1 ? "w-3/5" : "w-full",
          )}
          initial={false}
          {...motionProps}
        />
      ))}
    </div>
  );
}

SkeletonText.displayName = "SkeletonText";

const avatarSizeClass: Record<
  NonNullable<SkeletonAvatarProps["avatarSize"]>,
  string
> = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-14",
  "2xl": "size-16",
};

export function SkeletonAvatar(props: SkeletonAvatarProps) {
  const {
    avatarSize = "md",
    className,
    appearance,
    size,
    rounded = "full",
    animation,
    shimmerTone,
    busy,
    ref,
    ...rest
  } = props;
  const effectiveAnimation = useSkeletonAnimation(animation ?? "shimmer");
  const motionProps = skeletonAnimationPresets[effectiveAnimation];

  return (
    <motion.div
      ref={ref}
      data-slot="skeleton-avatar"
      aria-hidden
      aria-busy={busy ? true : undefined}
      className={cn(
        skeletonVariants({
          appearance,
          size,
          rounded,
          animation: effectiveAnimation,
          shimmerTone,
        }),
        avatarSizeClass[avatarSize],
        className,
      )}
      initial={false}
      {...motionProps}
      {...rest}
    />
  );
}

SkeletonAvatar.displayName = "SkeletonAvatar";

export function SkeletonCard(props: SkeletonCardProps) {
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
      <Skeleton
        rounded="lg"
        animation={animation}
        shimmerTone={shimmerTone}
        appearance={appearance}
        size={size}
        busy={busy}
        className="flex flex-col gap-4 p-4"
      >
        <div className="flex items-center gap-3">
          <SkeletonAvatar
            appearance={appearance}
            size={size}
            animation={animation}
            shimmerTone={shimmerTone}
            rounded={rounded}
          />
          <div className="flex flex-1 flex-col gap-2">
            <SkeletonText
              lines={2}
              appearance={appearance}
              size={size}
              animation={animation}
              shimmerTone={shimmerTone}
            />
          </div>
        </div>
        <SkeletonText
          lines={4}
          appearance={appearance}
          size={size}
          animation={animation}
          shimmerTone={shimmerTone}
        />
      </Skeleton>
    </div>
  );
}

SkeletonCard.displayName = "SkeletonCard";

const buttonHeight: Record<
  NonNullable<SkeletonButtonProps["buttonSize"]>,
  string
> = {
  sm: "h-8 w-24",
  md: "h-10 w-32",
  lg: "h-12 w-40",
};

export function SkeletonButton(props: SkeletonButtonProps) {
  const {
    buttonSize = "md",
    className,
    appearance,
    size,
    rounded = "md",
    animation,
    shimmerTone,
    busy,
    ref,
    ...rest
  } = props;
  const effectiveAnimation = useSkeletonAnimation(animation ?? "shimmer");
  const motionProps = skeletonAnimationPresets[effectiveAnimation];

  return (
    <motion.div
      ref={ref}
      data-slot="skeleton-button"
      aria-hidden
      aria-busy={busy ? true : undefined}
      className={cn(
        skeletonVariants({
          appearance,
          size,
          rounded,
          animation: effectiveAnimation,
          shimmerTone,
        }),
        buttonHeight[buttonSize],
        className,
      )}
      initial={false}
      {...motionProps}
      {...rest}
    />
  );
}

SkeletonButton.displayName = "SkeletonButton";
