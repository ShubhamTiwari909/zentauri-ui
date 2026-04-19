"use client";

import { createContext, useContext, useMemo } from "react";

import { cn } from "../../lib/utils";

import type {
  SkeletonAnimation,
  SkeletonAvatarProps,
  SkeletonButtonProps,
  SkeletonCardProps,
  SkeletonProps,
  SkeletonTextProps,
} from "./types";
import { skeletonTextLineVariants, skeletonVariants } from "./variants";

export const SkeletonAnimationContext = createContext<
  SkeletonAnimation | undefined
>(undefined);

export function useSkeletonAnimation(
  fallback: SkeletonAnimation,
): SkeletonAnimation {
  const value = useContext(SkeletonAnimationContext);
  return value ?? fallback;
}

function skeletonMotionClass(animation: SkeletonAnimation): string {
  if (animation === "none") {
    return "";
  }
  return "animate-pulse";
}

export function SkeletonBase(props: SkeletonProps) {
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
    as:Wrapper = "div",
    ...rest
  } = props;
  const ctx = useMemo(() => animation, [animation]);

  return (
    <SkeletonAnimationContext.Provider value={ctx}>
      <Wrapper
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
          skeletonMotionClass(animation),
          className,
        )}
        {...rest}
      >
        {children}
      </Wrapper>
    </SkeletonAnimationContext.Provider>
  );
}

SkeletonBase.displayName = "Skeleton";

export function SkeletonTextBase(props: SkeletonTextProps) {
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
    as:Wrapper = "div",
  } = props;
  const effectiveAnimation = useSkeletonAnimation(animation);
  const motionClass = skeletonMotionClass(effectiveAnimation);

  return (
    <div
      data-slot="skeleton-text"
      className={cn("flex w-full flex-col gap-2", className)}
      aria-hidden
      aria-busy={busy ? true : undefined}
    >
      {Array.from({ length: lines }).map((_, index) => (
        <Wrapper
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
            motionClass,
          )}
        />
      ))}
    </div>
  );
}

SkeletonTextBase.displayName = "SkeletonText";

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

export function SkeletonAvatarBase(props: SkeletonAvatarProps) {
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
    as:Wrapper = "div",
    ...rest
  } = props;
  const effectiveAnimation = useSkeletonAnimation(animation ?? "shimmer");
  const motionClass = skeletonMotionClass(effectiveAnimation);

  return (
    <Wrapper
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
        motionClass,
        className,
      )}
      {...rest}
    />
  );
}

SkeletonAvatarBase.displayName = "SkeletonAvatar";

export function SkeletonCardBase(props: SkeletonCardProps) {
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
      <SkeletonBase
        rounded="lg"
        animation={animation}
        shimmerTone={shimmerTone}
        appearance={appearance}
        size={size}
        busy={busy}
        className="flex flex-col gap-4 p-4"
      >
        <div className="flex items-center gap-3">
          <SkeletonAvatarBase
            appearance={appearance}
            size={size}
            animation={animation}
            shimmerTone={shimmerTone}
            rounded={rounded}
          />
          <div className="flex flex-1 flex-col gap-2">
            <SkeletonTextBase
              lines={2}
              appearance={appearance}
              size={size}
              animation={animation}
              shimmerTone={shimmerTone}
            />
          </div>
        </div>
        <SkeletonTextBase
          lines={4}
          appearance={appearance}
          size={size}
          animation={animation}
          shimmerTone={shimmerTone}
        />
      </SkeletonBase>
    </div>
  );
}

SkeletonCardBase.displayName = "SkeletonCard";

const buttonHeight: Record<
  NonNullable<SkeletonButtonProps["buttonSize"]>,
  string
> = {
  sm: "h-8 w-24",
  md: "h-10 w-32",
  lg: "h-12 w-40",
};

export function SkeletonButtonBase(props: SkeletonButtonProps) {
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
  const motionClass = skeletonMotionClass(effectiveAnimation);

  return (
    <div
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
        motionClass,
        className,
      )}
      {...rest}
    />
  );
}

SkeletonButtonBase.displayName = "SkeletonButton";
