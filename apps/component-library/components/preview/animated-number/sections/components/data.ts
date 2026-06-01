import type { AnimatedNumberProps } from "@zentauri-ui/zentauri-components/ui/animated-number";

export { PREVIEW_SECTION_CLASS as ANIMATED_NUMBER_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const ANIMATED_NUMBER_DEMO_VALUE = 12345;

export const ANIMATED_NUMBER_APPEARANCES = [
  "default",
  "success",
  "warning",
  "error",
  "info",
  "ghost",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "gray",
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
] as const satisfies readonly NonNullable<AnimatedNumberProps["appearance"]>[];

export const ANIMATED_NUMBER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<AnimatedNumberProps["size"]>[];

export const ANIMATED_NUMBER_TYPES = [
  "up",
  "down",
  "scaleUp",
  "scaleDown",
  "rotateX",
  "rotateY",
  "skewX",
  "skewY",
  "fade",
] as const satisfies readonly NonNullable<AnimatedNumberProps["type"]>[];
