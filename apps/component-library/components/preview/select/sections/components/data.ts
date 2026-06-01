import type {
  SelectContentProps,
  SelectTriggerProps,
} from "@zentauri-ui/zentauri-components/ui/select";

export { PREVIEW_SECTION_CLASS as SELECT_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const SELECT_TRIGGER_VARIANTS = [
  "default",
  "outline",
  "ghost",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
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
] as const satisfies readonly NonNullable<SelectTriggerProps["variant"]>[];

export const SELECT_TRIGGER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<SelectTriggerProps["size"]>[];

export const SELECT_CONTENT_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<SelectContentProps["size"]>[];

export const SELECT_CONTENT_SPACING = [
  "none",
  "default",
  "sm",
  "md",
  "lg",
  "xl",
] as const satisfies readonly NonNullable<SelectContentProps["spacing"]>[];
