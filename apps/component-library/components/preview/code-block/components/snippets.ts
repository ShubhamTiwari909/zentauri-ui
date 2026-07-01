import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { CodeBlockAppearance, CodeBlockSize } from "./types";
import { CODE_BLOCK_SNIPPET as CODE } from "./data";

export function codeBlockSnippet(
  appearance: CodeBlockAppearance,
  size: CodeBlockSize,
  showLineNumbers: boolean,
  showHeader: boolean,
): string {
  const lineNumbersAttr = showLineNumbers ? " showLineNumbers" : "";
  const headerAttr = !showHeader ? " showHeader={false}" : "";
  return `import { CodeBlock } from "@zentauri-ui/zentauri-components/ui/code-block";

${variantLeadComment(`appearance · ${appearance}, size · ${size}${lineNumbersAttr}${!showHeader ? `, showHeader · false` : ""}`)}<CodeBlock
  code={\`${CODE}\`}
  language="tsx"
  appearance="${appearance}"
  size="${size}"${lineNumbersAttr}${headerAttr}
/>`;
}
