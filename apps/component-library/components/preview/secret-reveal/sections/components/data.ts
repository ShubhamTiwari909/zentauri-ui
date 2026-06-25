import type { SecretRevealProps } from "@zentauri-ui/zentauri-components/ui/secret-reveal";
import type { SecretRevealAnimation } from "@zentauri-ui/zentauri-components/ui/secret-reveal/animated";

export const SECRET_REVEAL_APPEARANCES = [
  "default",
  "subtle",
  "muted",
  "primary",
  "blue",
  "cyan",
  "green",
  "lime",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "red",
  "slate",
  "gray",
  "zinc",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<SecretRevealProps["appearance"]>[];

export const SECRET_REVEAL_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<SecretRevealProps["size"]>[];

export const SECRET_REVEAL_ANIMATIONS = [
  "none",
  "fade",
  "slide-up",
  "scale",
  "flip",
] as const satisfies readonly SecretRevealAnimation[];
