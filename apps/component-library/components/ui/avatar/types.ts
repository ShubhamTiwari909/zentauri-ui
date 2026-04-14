import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { ImgHTMLAttributes, ReactNode } from "react";

import type { avatarGroupVariants, avatarVariants } from "./variants";

export type AvatarAnimation = "none" | "pop" | "ring-pulse";

export type AvatarStatus = "online" | "offline" | "busy" | "away" | "none";

type AvatarVariantProps = VariantProps<typeof avatarVariants> & {
  status?: AvatarStatus;
};

export type AvatarProps = AvatarVariantProps &
  Omit<HTMLMotionProps<"div">, "children"> & {
    animation?: AvatarAnimation;
    children?: ReactNode;
  };

export type AvatarImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  ref?: React.Ref<HTMLImageElement>;
};

export type AvatarFallbackProps = {
  className?: string;
  children?: ReactNode;
  delayMs?: number;
};

export type AvatarGroupProps = VariantProps<typeof avatarGroupVariants> & {
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
};

export type AvatarSize = NonNullable<AvatarProps["size"]>;
export type AvatarShape = NonNullable<AvatarProps["shape"]>;

export type AvatarContextValue = {
  size: AvatarSize;
  shape: AvatarShape;
  status: AvatarStatus;
  imageRegistered: boolean;
  registerImage: () => void;
  imageState: "idle" | "loaded" | "error";
  onImageLoaded: () => void;
  onImageError: () => void;
};
