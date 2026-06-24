import type { CodeDiffProps } from "@zentauri-ui/zentauri-components/ui/code-diff";

export const CODE_DIFF_VIEW_TYPES = [
  "unified",
  "split",
] as const satisfies readonly NonNullable<CodeDiffProps["viewType"]>[];

export const CODE_DIFF_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<CodeDiffProps["size"]>[];
