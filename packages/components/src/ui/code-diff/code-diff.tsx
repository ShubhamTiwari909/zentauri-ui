import { CodeDiffBase } from "./code-diff-base";
import type { CodeDiffProps } from "./types";

export function CodeDiff(props: CodeDiffProps) {
  return <CodeDiffBase {...props} />;
}

CodeDiff.displayName = "CodeDiff";
