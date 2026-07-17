"use client";

import { usePermissionContext } from "../provider/PermissionProvider";
import { checkAccess } from "../utils/checkAccess";
import type { CanProps } from "../types";

export function Cannot({
  permission,
  permissions,
  role,
  roles,
  mode,
  fallback,
  children,
}: CanProps) {
  const ctx = usePermissionContext();
  const { permissionCheck, roleCheck } = checkAccess(
    { permission, permissions, role, roles, mode },
    ctx,
  );

  if (!permissionCheck || !roleCheck) {
    return <>{children}</>;
  }

  return fallback ?? null;
}

Cannot.displayName = "Cannot";
