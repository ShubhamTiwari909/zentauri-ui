import { CodeBlock } from "@zentauri-ui/zentauri-components/ui/code-block";

import type { CodeBlockDemoProps } from "./types";

const SNIPPET = `import { useState } from "react";

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

export function CodeBlockDemo({
  appearance,
  size,
  showLineNumbers,
  showHeader,
}: CodeBlockDemoProps) {
  return (
    <CodeBlock
      code={SNIPPET}
      language="tsx"
      appearance={appearance}
      size={size}
      showLineNumbers={showLineNumbers}
      showHeader={showHeader}
    />
  );
}
