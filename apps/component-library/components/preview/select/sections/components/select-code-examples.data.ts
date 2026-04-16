import type {
  SelectContentProps,
  SelectTriggerProps,
} from "@zentauri-ui/zentauri-components/ui";

export const SELECT_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

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

export const SELECT_TRIGGER_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  SelectTriggerProps["size"]
>[];

export const SELECT_CONTENT_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  SelectContentProps["size"]
>[];

export const SELECT_CONTENT_SPACING = [
  "none",
  "default",
  "sm",
  "md",
  "lg",
  "xl",
] as const satisfies readonly NonNullable<SelectContentProps["spacing"]>[];
