import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { CodeBlockAppearance, CodeBlockSize } from "./types";

const CODE = `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`;

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
