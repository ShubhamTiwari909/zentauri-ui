"use client";

import { usePermissionContext } from "../provider/PermissionProvider";

export function useRoles(): string[] {
  const ctx = usePermissionContext();
  return ctx.roles;
}
