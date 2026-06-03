import type { AvatarAnimation } from "@zentauri-ui/zentauri-components/ui/avatar/animated";
import type { AvatarProps } from "@zentauri-ui/zentauri-components/ui/avatar";

import type { AvatarDemoAnimation, AvatarDemoSize } from "./types";

export { PREVIEW_SECTION_CLASS as AVATAR_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const AVATAR_SIZES = [
  "sm",
  "md",
  "lg",
  "xl",
] as const satisfies readonly NonNullable<AvatarProps["size"]>[];

export const AVATAR_APPEARANCES = [
  "default",
  "muted",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "amber",
  "violet",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<AvatarProps["appearance"]>[];

export const AVATAR_ANIMATIONS = [
  "none",
  "subtle",
] as const satisfies readonly AvatarAnimation[];

export const AVATAR_DEMO_ANIMATION_FOR_SIZE: AvatarDemoAnimation = "none";
export const AVATAR_DEMO_SIZE_FOR_ANIMATION: AvatarDemoSize = "md";
