"use client";

import { useEffect } from "react";
import { usePermissionContext } from "../provider/PermissionProvider";
import { checkAccess } from "../utils/checkAccess";
import type { CanProps } from "../types";

export function Can({
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

  const granted = permissionCheck && roleCheck;

  useEffect(() => {
    if (permission) {
      if (granted) {
        ctx.onPermissionGranted?.({ permission });
      } else {
        ctx.onPermissionDenied?.({ permission });
      }
    }
  }, [permission, granted, ctx.onPermissionGranted, ctx.onPermissionDenied]);

  if (granted) {
    return <>{children}</>;
  }

  return fallback ?? null;
}

Can.displayName = "Can";
