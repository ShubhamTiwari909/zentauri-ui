import type { ApiEndpointCardProps } from "@zentauri-ui/zentauri-components/ui/api-endpoint-card";

export type ApiEndpointMethod = NonNullable<ApiEndpointCardProps["method"]>;

export type ApiEndpointCardDemoProps = {
  method: ApiEndpointMethod;
};
