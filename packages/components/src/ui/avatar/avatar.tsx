// avatar.tsx — default static entry (no framer-motion)
import { AvatarBase, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar-base";
import type { AvatarProps } from "./types";

export function Avatar(props: AvatarProps) {
  return <AvatarBase {...props} />;
}

Avatar.displayName = "Avatar";

export { AvatarFallback, AvatarGroup, AvatarImage };
