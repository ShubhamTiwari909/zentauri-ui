import { AvatarAnimationPresets } from "./types";

export const avatarAnimationPresets: AvatarAnimationPresets = {
  none: { initial: false },
  subtle: {
    initial: false,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
};
