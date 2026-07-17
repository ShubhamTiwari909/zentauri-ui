"use client";

import { usePermissionContext } from "../provider/PermissionProvider";
import type { RoleProps } from "../types";

export function Role({ name, fallback, children }: RoleProps) {
  const ctx = usePermissionContext();
  const hasRole = ctx.roles.includes(name);

  if (hasRole) {
    return <>{children}</>;
  }

  return fallback ?? null;
}

Role.displayName = "Role";
