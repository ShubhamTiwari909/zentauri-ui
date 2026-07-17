"use client";

import { useEffect, useRef } from "react";
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

  const onGrantedRef = useRef(ctx.onPermissionGranted);
  onGrantedRef.current = ctx.onPermissionGranted;
  const onDeniedRef = useRef(ctx.onPermissionDenied);
  onDeniedRef.current = ctx.onPermissionDenied;

  useEffect(() => {
    const target = permission ?? permissions?.[0] ?? role ?? roles?.[0];
    if (target) {
      if (granted) {
        onGrantedRef.current?.({ permission: target });
      } else {
        onDeniedRef.current?.({ permission: target });
      }
    }

    if (!granted) {
      if (redirectTo && typeof window !== "undefined") {
        window.location.href = redirectTo;
      }
    }
  }, [permission, permissions, role, roles, granted, redirectTo]);

  if (granted) {
    return <>{children}</>;
  }

  return fallback ?? null;
}

RouteGuard.displayName = "RouteGuard";
