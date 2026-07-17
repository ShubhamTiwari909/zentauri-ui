"use client";

import { usePermissionContext } from "../provider/PermissionProvider";
import { hasRole } from "../utils/mergePermissions";
import type { RoleProps } from "../types";

export function Role({ name, fallback, children }: RoleProps) {
  const ctx = usePermissionContext();
  const allowed = hasRole(name, ctx.roles);

  if (allowed) {
    return <>{children}</>;
  }

  return fallback ?? null;
}

Role.displayName = "Role";
