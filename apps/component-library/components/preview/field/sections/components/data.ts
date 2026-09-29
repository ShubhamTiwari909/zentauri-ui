import { FORM_APPEARANCES } from "@/components/preview/form-fields/appearance-controls";
import type { FieldProps } from "@zentauri-ui/zentauri-components/ui/field";

export const FIELD_APPEARANCES =
  FORM_APPEARANCES satisfies readonly NonNullable<FieldProps["appearance"]>[];
export const FIELD_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<FieldProps["size"]>[];
