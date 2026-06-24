import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType } from "react";

import type { codeDiffVariants } from "./variants";

export type CodeDiffVariantProps = VariantProps<typeof codeDiffVariants>;

export type CodeDiffViewType = "split" | "unified";

export interface CodeDiffBaseProps extends ComponentPropsWithRef<"div"> {
  oldCode: string;
  newCode: string;
  language?: string;
  viewType?: CodeDiffViewType;
  showLineNumbers?: boolean;
  showGutterMarkers?: boolean;
  oldTitle?: string;
  newTitle?: string;
  appearance?: CodeDiffVariantProps["appearance"];
  size?: CodeDiffVariantProps["size"];
  as?: ElementType;
}

export type CodeDiffProps = Omit<CodeDiffBaseProps, "as">;

export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  content: string;
  oldLineNumber: number | null;
  newLineNumber: number | null;
}
