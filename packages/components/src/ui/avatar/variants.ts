import { cva } from "class-variance-authority";

import {
  zuiAvatarAppearances,
  zuiAvatarBase,
  zuiAvatarFallbackBase,
  zuiAvatarGroupBase,
  zuiAvatarImageBase,
  zuiAvatarSizes,
} from "../../design-system/avatar";

export const avatarVariants = cva(zuiAvatarBase, {
  variants: {
    appearance: zuiAvatarAppearances,
    size: zuiAvatarSizes,
  },
  defaultVariants: {
    size: "md",
    appearance: "default",
  },
});

export const avatarImageVariants = cva(zuiAvatarImageBase);

export const avatarFallbackVariants = cva(zuiAvatarFallbackBase);

export const avatarGroupVariants = cva(zuiAvatarGroupBase);
