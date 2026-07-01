import type { ApiEndpointCardProps } from "@zentauri-ui/zentauri-components/ui/api-endpoint-card";

export const API_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
] as const satisfies readonly NonNullable<ApiEndpointCardProps["method"]>[];
