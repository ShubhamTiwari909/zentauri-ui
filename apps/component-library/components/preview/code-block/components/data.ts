import type { CodeBlockProps } from "@zentauri-ui/zentauri-components/ui/code-block";

export { PREVIEW_SECTION_CLASS as CODE_BLOCK_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const CODE_BLOCK_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
] as const satisfies readonly NonNullable<CodeBlockProps["appearance"]>[];

export const CODE_BLOCK_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<CodeBlockProps["size"]>[];
