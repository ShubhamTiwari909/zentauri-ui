import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
} from "react";

import type { avatarVariants } from "./variants";

type AvatarVariantProps = VariantProps<typeof avatarVariants>;

export interface AvatarBaseProps extends ComponentPropsWithRef<"span"> {
  size?: AvatarVariantProps["size"];
  appearance?: AvatarVariantProps["appearance"];
  as?: ElementType;
}

export type AvatarProps = Omit<AvatarBaseProps, "as">;

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
