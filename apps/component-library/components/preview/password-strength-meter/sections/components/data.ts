import type { PasswordStrengthMeterProps } from "@zentauri-ui/zentauri-components/ui/password-strength-meter";

export const PASSWORD_STRENGTH_METER_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "outline",
  "ghost",
  "glass",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
  "blue",
  "cyan",
  "green",
  "lime",
  "mint",
  "ocean",
  "sapphire",
  "lavender",
  "ruby",
  "red",
  "slate",
  "zinc",
  "stone",
  "royal",
  "electric",
  "forest",
  "sunset",
  "magenta",
  "crimson",
  "aqua",
  "plum",
] as const satisfies readonly NonNullable<
  PasswordStrengthMeterProps["appearance"]
>[];

export const PASSWORD_STRENGTH_METER_SIZES = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
] as const satisfies readonly NonNullable<PasswordStrengthMeterProps["size"]>[];

export const PASSWORD_STRENGTH_METER_SHAPES = [
  "flat",
  "rounded",
  "pill",
] as const satisfies readonly NonNullable<
  PasswordStrengthMeterProps["shape"]
>[];

export const PASSWORD_STRENGTH_METER_SNIPPET_DEFAULTS = {
  appearance: "default" as const,
  size: "md" as const,
  shape: "rounded" as const,
  animated: false,
  segmented: false,
};
