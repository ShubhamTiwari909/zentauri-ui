"use client";

import { useEffect } from "react";
import { usePermissionContext } from "../provider/PermissionProvider";
import { checkAccess } from "../utils/checkAccess";
import type { RouteGuardProps } from "../types";

export function RouteGuard({
  permission,
  permissions,
  role,
  roles,
  mode,
  fallback,
  redirectTo,
  children,
}: RouteGuardProps) {
  const ctx = usePermissionContext();
  const { permissionCheck, roleCheck } = checkAccess(
    { permission, permissions, role, roles, mode },
    ctx,
  );

  useEffect(() => {
    if (!permissionCheck || !roleCheck) {
      if (redirectTo && typeof window !== "undefined") {
        window.location.href = redirectTo;
      }
    }
  }, [permissionCheck, roleCheck, redirectTo]);

  if (permissionCheck && roleCheck) {
    return <>{children}</>;
  }

  return fallback ?? null;
}

RouteGuard.displayName = "RouteGuard";
