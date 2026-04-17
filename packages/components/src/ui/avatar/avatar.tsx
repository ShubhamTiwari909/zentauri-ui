"use client";

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

import { avatarAnimationPresets } from "./animations";
import type {
  AvatarFallbackProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarProps,
} from "./types";
import {
  avatarFallbackVariants,
  avatarGroupVariants,
  avatarImageVariants,
  avatarVariants,
} from "./variants";

type ImageStatus = "idle" | "loaded" | "error";

type AvatarCtx = {
  imageStatus: ImageStatus;
  setImageStatus: (v: ImageStatus) => void;
};

const AvatarContext = createContext<AvatarCtx | null>(null);

function useAvatarContext(component: string): AvatarCtx {
  const ctx = useContext(AvatarContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Avatar>`);
  }
  return ctx;
}

export function Avatar({
  className,
  size,
  appearance,
  animation = "none",
  children,
  ref,
  ...rest
}: AvatarProps & { ref?: React.Ref<HTMLSpanElement> }) {
  const [imageStatus, setImageStatus] = useState<ImageStatus>("idle");
  const motionProps = avatarAnimationPresets[animation];
  const ctx = useMemo(
    () => ({ imageStatus, setImageStatus }),
    [imageStatus],
  );

  return (
    <AvatarContext.Provider value={ctx}>
      <motion.span
        ref={ref}
        data-slot="avatar"
        className={cn(avatarVariants({ size, appearance }), className)}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.span>
    </AvatarContext.Provider>
  );
}

Avatar.displayName = "Avatar";

export function AvatarImage({
  className,
  onLoad,
  onError,
  ref,
  ...rest
}: AvatarImageProps & { ref?: React.Ref<HTMLImageElement> }) {
  const { setImageStatus } = useAvatarContext("AvatarImage");

  return (
    <img
      ref={ref}
      data-slot="avatar-image"
      className={cn(avatarImageVariants(), className)}
      onLoad={(e) => {
        setImageStatus("loaded");
        onLoad?.(e);
      }}
      onError={(e) => {
        setImageStatus("error");
        onError?.(e);
      }}
      {...rest}
    />
  );
}

AvatarImage.displayName = "AvatarImage";

export function AvatarFallback({
  className,
  delayMs = 0,
  ref,
  ...rest
}: AvatarFallbackProps & { ref?: React.Ref<HTMLSpanElement> }) {
  const { imageStatus } = useAvatarContext("AvatarFallback");
  const [show, setShow] = useState(delayMs === 0);

  useEffect(() => {
    if (imageStatus === "loaded") {
      setShow(false);
      return;
    }
    if (imageStatus === "error") {
      setShow(true);
      return;
    }
    if (delayMs <= 0) {
      setShow(true);
      return;
    }
    const t = window.setTimeout(() => setShow(true), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs, imageStatus]);

  if (!show) {
    return null;
  }

  return (
    <span
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(avatarFallbackVariants(), className)}
      {...rest}
    />
  );
}

AvatarFallback.displayName = "AvatarFallback";

export function AvatarGroup({
  className,
  max,
  children,
  ref,
  ...rest
}: AvatarGroupProps & { ref?: React.Ref<HTMLDivElement> }) {
  const childArray = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );
  const visible = max !== undefined ? childArray.slice(0, max) : childArray;
  const overflow =
    max !== undefined && childArray.length > max
      ? childArray.length - max
      : 0;

  return (
    <div
      ref={ref}
      data-slot="avatar-group"
      className={cn(avatarGroupVariants(), className)}
      {...rest}
    >
      {visible}
      {overflow > 0 ? (
        <span
          data-slot="avatar-group-overflow"
          className={cn(
            avatarVariants({ size: "md" }),
            "z-10 grid place-items-center bg-slate-800 text-xs font-semibold text-white",
          )}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}

AvatarGroup.displayName = "AvatarGroup";
