import type { EmptyStateProps } from "@zentauri-ui/zentauri-components/ui/empty-state";

export { PREVIEW_SECTION_CLASS as EMPTY_STATE_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const EMPTY_STATE_ICON_SNIPPET = `<EmptyStateIcon>
  <HiCloudArrowUp className="size-8 text-slate-800 dark:text-slate-400" aria-hidden />
</EmptyStateIcon>`;

export const EMPTY_APPEARANCES = [
  "default",
  "ghost",
  "card",
] as const satisfies readonly NonNullable<EmptyStateProps["appearance"]>[];

export const EMPTY_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<EmptyStateProps["size"]>[];

export const EMPTY_ALIGNS = [
  "start",
  "center",
  "end",
] as const satisfies readonly NonNullable<EmptyStateProps["align"]>[];

export const EMPTY_STATE_SNIPPET_DEFAULTS = {
  appearance: "default" as const,
  size: "md" as const,
  align: "center" as const,
};
