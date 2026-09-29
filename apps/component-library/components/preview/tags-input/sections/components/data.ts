import { FORM_APPEARANCES } from "@/components/preview/form-fields/appearance-controls";
import type { TagsInputProps } from "@zentauri-ui/zentauri-components/ui/tags-input";

export const TAGSINPUT_APPEARANCES =
  FORM_APPEARANCES satisfies readonly NonNullable<
    TagsInputProps["appearance"]
  >[];
export const TAGSINPUT_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<TagsInputProps["size"]>[];
