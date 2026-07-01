import type { ApiEndpointCardProps } from "@zentauri-ui/zentauri-components/ui/api-endpoint-card";
import type { ApiEndpointMethod } from "@zentauri-ui/zentauri-components/ui/api-endpoint-card";

export const API_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
] as const satisfies readonly NonNullable<ApiEndpointCardProps["method"]>[];

export const API_PATHS: Record<ApiEndpointMethod, string> = {
  GET: "/api/v1/users/:id",
  POST: "/api/v1/users",
  PUT: "/api/v1/users/:id",
  PATCH: "/api/v1/users/:id",
  DELETE: "/api/v1/users/:id",
  HEAD: "/api/v1/health",
  OPTIONS: "/api/v1/users",
};

export const API_DESCRIPTIONS: Record<ApiEndpointMethod, string> = {
  GET: "Retrieve a user by their unique identifier.",
  POST: "Create a new user account.",
  PUT: "Replace an existing user record entirely.",
  PATCH: "Partially update a user record.",
  DELETE: "Remove a user from the system.",
  HEAD: "Check API health and availability.",
  OPTIONS: "List supported methods for the users endpoint.",
};
