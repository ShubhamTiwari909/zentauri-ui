import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { ApiEndpointCardDemoProps } from "./types";
import { API_PATHS, API_DESCRIPTIONS } from "./data";

export function apiEndpointCardSnippet(opts: ApiEndpointCardDemoProps): string {
  const { method } = opts;
  const lead = variantLeadComment(`method · ${method}`);
  return `${lead}<ApiEndpointCard
  method="${method}"
  path="${API_PATHS[method]}"
  description="${API_DESCRIPTIONS[method]}"
/>`;
}
