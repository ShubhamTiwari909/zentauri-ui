import type { AvatarAnimation } from "@zentauri-ui/zentauri-components/ui/avatar/animated";
import type { AvatarProps } from "@zentauri-ui/zentauri-components/ui/avatar";

export type AvatarDemoSize = NonNullable<AvatarProps["size"]>;
export type AvatarDemoAnimation = AvatarAnimation;
export type AvatarDemoAppearance = NonNullable<AvatarProps["appearance"]>;
export type AvatarDemoProps = {
  size?: AvatarDemoSize;
  animation?: AvatarDemoAnimation;
  appearance?: AvatarDemoAppearance;
};
