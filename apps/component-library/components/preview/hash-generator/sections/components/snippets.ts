import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { HashGeneratorDemoProps } from "./types";

export function hashGeneratorSnippet(opts: HashGeneratorDemoProps): string {
  const { algorithm = "sha256" } = opts;
  const algorithmAttr =
    algorithm === "sha256" ? "" : ` algorithm="${algorithm}"`;
  const lead = variantLeadComment(`algorithm · ${algorithm}`);

  return `import { HashGenerator } from "@zentauri-ui/zentauri-components/ui/hash-generator";

${lead}<HashGenerator${algorithmAttr} />`;
}
