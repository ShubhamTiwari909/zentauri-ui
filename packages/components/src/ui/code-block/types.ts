import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { codeBlockVariants } from "./variants";

export type CodeBlockVariantProps = VariantProps<typeof codeBlockVariants>;

export interface CodeBlockLabels {
  copy?: ReactNode;
  copied?: ReactNode;
}

export type CodeBlockBaseProps = VariantProps<typeof codeBlockVariants> &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    enableClipboard?: boolean;
    showHeader?: boolean;
    showLang?: boolean;
    labels?: CodeBlockLabels;
  };

export type CodeBlockProps = CodeBlockBaseProps;
