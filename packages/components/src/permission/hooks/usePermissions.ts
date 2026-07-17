"use client";

import { usePermissionContext } from "../provider/PermissionProvider";

export function usePermissions(): string[] {
  const ctx = usePermissionContext();
  return ctx.permissions;
}

export function usePermissionsRefresh(): () => void {
  const ctx = usePermissionContext();
  return ctx.refresh;
}
