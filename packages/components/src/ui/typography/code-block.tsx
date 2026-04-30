import { CodeBlockBase } from "./code-block-base";
import type { CodeBlockProps } from "./types";

export const CodeBlock = (props: CodeBlockProps) => {
  return <CodeBlockBase {...props} />;
};

CodeBlock.displayName = "CodeBlock";
