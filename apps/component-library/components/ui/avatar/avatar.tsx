"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { avatarAnimationPresets } from "./animations";
import type {
  AvatarFallbackProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarProps,
  AvatarContextValue,
} from "./types";
import {
  avatarGroupVariants,
  avatarStatusVariants,
  avatarVariants,
} from "./variants";

const AvatarContext = createContext<AvatarContextValue | null>(null);

function useAvatarContext(component: string): AvatarContextValue {
  const ctx = useContext(AvatarContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Avatar>`);
  }
  return ctx;
}

export function Avatar(props: AvatarProps) {
  const {
    className,
    size = "md",
    shape = "circle",
    status = "none",
    animation = "none",
    children,
    ref,
    ...rest
  } = props;
  const motionProps = avatarAnimationPresets[animation];
  const [imageRegistered, setImageRegistered] = useState(false);
  const [imageState, setImageState] = useState<"idle" | "loaded" | "error">(
    "idle",
  );

  const registerImage = useCallback(() => {
    setImageRegistered(true);
  }, []);

  const onImageLoaded = useCallback(() => {
    setImageState("loaded");
  }, []);

  const onImageError = useCallback(() => {
    setImageState("error");
  }, []);

  const ctx = useMemo(
    () => ({
      size: size ?? "md",
      shape: shape ?? "circle",
      status,
      imageRegistered,
      registerImage,
      imageState,
      onImageLoaded,
      onImageError,
    }),
    [
      imageRegistered,
      imageState,
      onImageError,
      onImageLoaded,
      registerImage,
      shape,
      size,
      status,
    ],
  );

  return (
    <AvatarContext.Provider value={ctx}>
      <motion.div
        ref={ref}
        data-slot="avatar"
        className={cn(avatarVariants({ size, shape }), className)}
        initial={animation === "none" ? false : undefined}
        {...motionProps}
        {...rest}
      >
        {children}
        <span
          data-slot="avatar-status"
          className={avatarStatusVariants({ size, status })}
          aria-hidden
        />
      </motion.div>
    </AvatarContext.Provider>
  );
}

Avatar.displayName = "Avatar";

export function AvatarImage(props: AvatarImageProps) {
  const {
    className,
    alt = "",
    onLoad,
    onError,
    ref,
    children,
    ...rest
  } = props;
  const { registerImage, onImageLoaded, onImageError } =
    useAvatarContext("AvatarImage");

  useEffect(() => {
    registerImage();
  }, [registerImage]);

  return children ? (
    children
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      alt={alt}
      data-slot="avatar-image"
      className={cn("absolute inset-0 z-0 size-full object-cover", className)}
      onLoad={(event) => {
        onLoad?.(event);
        if (!event.defaultPrevented) {
          onImageLoaded();
        }
      }}
      onError={(event) => {
        onError?.(event);
        if (!event.defaultPrevented) {
          onImageError();
        }
      }}
      {...rest}
    />
  );
}

AvatarImage.displayName = "AvatarImage";

export function AvatarFallback({
  className,
  children,
  delayMs = 0,
}: AvatarFallbackProps) {
  const { imageRegistered, imageState } = useAvatarContext("AvatarFallback");
  const [showDelayed, setShowDelayed] = useState(delayMs === 0);

  useEffect(() => {
    if (delayMs === 0) {
      return;
    }
    const id = window.setTimeout(() => setShowDelayed(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);

  const shouldShow =
    !imageRegistered ||
    imageState === "error" ||
    (imageState === "idle" && showDelayed);

  if (!shouldShow) {
    return null;
  }

  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "absolute inset-0 z-10 flex size-full items-center justify-center bg-slate-800 font-medium uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

AvatarFallback.displayName = "AvatarFallback";

export function AvatarGroup({
  className,
  children,
  spacing,
  "aria-label": ariaLabel = "Avatar group",
}: AvatarGroupProps) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(avatarGroupVariants({ spacing }), className)}
      role="group"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

AvatarGroup.displayName = "AvatarGroup";
