import { ApiEndpointCard } from "@zentauri-ui/zentauri-components/ui/api-endpoint-card";

import type { ApiEndpointCardDemoProps } from "./types";

const PATHS: Record<string, string> = {
  GET: "/api/v1/users/:id",
  POST: "/api/v1/users",
  PUT: "/api/v1/users/:id",
  PATCH: "/api/v1/users/:id",
  DELETE: "/api/v1/users/:id",
  HEAD: "/api/v1/health",
  OPTIONS: "/api/v1/users",
};

const DESCRIPTIONS: Record<string, string> = {
  GET: "Retrieve a user by their unique identifier.",
  POST: "Create a new user account.",
  PUT: "Replace an existing user record entirely.",
  PATCH: "Partially update a user record.",
  DELETE: "Remove a user from the system.",
  HEAD: "Check API health and availability.",
  OPTIONS: "List supported methods for the users endpoint.",
};

export function ApiEndpointCardDemo({ method }: ApiEndpointCardDemoProps) {
  return (
    <ApiEndpointCard
      method={method}
      path={PATHS[method]}
      description={DESCRIPTIONS[method]}
    />
  );
}
