import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { AvatarAnimation } from "./animations";
import type { avatarVariants } from "./variants";

type AvatarVariantProps = VariantProps<typeof avatarVariants>;

export type AvatarProps = AvatarVariantProps &
  Omit<HTMLMotionProps<"span">, "children"> & {
    animation?: AvatarAnimation;
    appearance?: AvatarVariantProps["appearance"];
    children?: ReactNode;
  };

export type AvatarImageProps = ComponentPropsWithoutRef<"img">;

export type AvatarFallbackProps = ComponentPropsWithoutRef<"span"> & {
  delayMs?: number;
};

export type AvatarGroupProps = ComponentPropsWithoutRef<"div"> & {
  /** Max avatars before +N overflow label */
  max?: number;
};

export type ImageStatus = "idle" | "loaded" | "error";

export type AvatarCtx = {
  imageStatus: ImageStatus;
  setImageStatus: (v: ImageStatus) => void;
};
