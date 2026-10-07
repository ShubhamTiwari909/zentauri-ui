import type {
  FieldAppearance,
  FieldOrientation,
} from "@zentauri-ui/zentauri-components/ui/field";
export const FIELD_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
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
  "gradient-purple",
  "gradient-orange",
  "gradient-pink",
] as const satisfies readonly FieldAppearance[];
export type FieldOptions = {
  appearance: FieldAppearance;
  orientation: FieldOrientation;
  size: "sm" | "md" | "lg";
  control: "input" | "textarea" | "select";
  required: boolean;
  disabled: boolean;
  invalid: boolean;
};
export const FIELD_DEFAULT_OPTIONS: FieldOptions = {
  appearance: "subtle",
  orientation: "vertical",
  size: "md",
  control: "input",
  required: true,
  disabled: false,
  invalid: false,
};
