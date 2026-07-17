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

  const granted = permissionCheck && roleCheck;

  useEffect(() => {
    if (permission) {
      if (granted) {
        ctx.onPermissionGranted?.({ permission });
      } else {
        ctx.onPermissionDenied?.({ permission });
      }
    }

    if (!granted) {
      if (redirectTo && typeof window !== "undefined") {
        window.location.href = redirectTo;
      }
    }
  }, [
    permission,
    granted,
    redirectTo,
    ctx.onPermissionGranted,
    ctx.onPermissionDenied,
  ]);

  if (granted) {
    return <>{children}</>;
  }

  return fallback ?? null;
}

RouteGuard.displayName = "RouteGuard";
