import type { CodeBlockProps } from "@zentauri-ui/zentauri-components/ui/code-block";

export type CodeBlockAppearance = NonNullable<CodeBlockProps["appearance"]>;
export type CodeBlockSize = NonNullable<CodeBlockProps["size"]>;

export type CodeBlockDemoProps = {
  appearance: CodeBlockAppearance;
  size: CodeBlockSize;
  showLineNumbers: boolean;
  showHeader: boolean;
};
