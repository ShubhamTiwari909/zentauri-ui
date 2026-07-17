"use client";

import { usePermissionContext } from "../provider/PermissionProvider";

export function useRole(role: string): boolean {
  const ctx = usePermissionContext();
  return ctx.roles.includes(role);
}
