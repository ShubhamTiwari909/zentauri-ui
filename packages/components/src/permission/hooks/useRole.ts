"use client";

import { usePermissionContext } from "../provider/PermissionProvider";
import { hasRole } from "../utils/mergePermissions";

export function useRole(role: string): boolean {
  const ctx = usePermissionContext();
  return hasRole(role, ctx.roles);
}
