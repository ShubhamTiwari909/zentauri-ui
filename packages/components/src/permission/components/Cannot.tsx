"use client";

import { useEffect } from "react";
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

  const denied = !permissionCheck || !roleCheck;

  useEffect(() => {
    if (permission) {
      if (denied) {
        ctx.onPermissionDenied?.({ permission });
      } else {
        ctx.onPermissionGranted?.({ permission });
      }
    }
  }, [permission, denied, ctx.onPermissionDenied, ctx.onPermissionGranted]);

  if (denied) {
    return <>{children}</>;
  }

  return fallback ?? null;
}

Cannot.displayName = "Cannot";
