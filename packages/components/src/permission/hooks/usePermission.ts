"use client";

import { usePermissionContext } from "../provider/PermissionProvider";
import { hasPermission } from "../utils/hasPermission";

export function usePermission(permission: string): boolean {
  const ctx = usePermissionContext();
  return hasPermission(permission, ctx.permissions);
}
