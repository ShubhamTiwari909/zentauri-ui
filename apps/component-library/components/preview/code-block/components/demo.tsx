import { CodeBlock } from "@zentauri-ui/zentauri-components/ui/code-block";

import type { CodeBlockDemoProps } from "./types";
import { CODE_BLOCK_SNIPPET } from "./data";

export function CodeBlockDemo({
  appearance,
  size,
  showLineNumbers,
  showHeader,
}: CodeBlockDemoProps) {
  return (
    <CodeBlock
      code={CODE_BLOCK_SNIPPET}
      language="tsx"
      appearance={appearance}
      size={size}
      showLineNumbers={showLineNumbers}
      showHeader={showHeader}
    />
  );
}
