import { ApiEndpointCard } from "@zentauri-ui/zentauri-components/ui/api-endpoint-card";

import type { ApiEndpointCardDemoProps } from "./types";
import { API_PATHS, API_DESCRIPTIONS } from "./data";

export function ApiEndpointCardDemo({ method }: ApiEndpointCardDemoProps) {
  return (
    <ApiEndpointCard
      method={method}
      path={API_PATHS[method]}
      description={API_DESCRIPTIONS[method]}
    />
  );
}
