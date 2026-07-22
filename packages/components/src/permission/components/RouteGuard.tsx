"use client";

import { useEffect, useRef } from "react";
import { usePermissionContext } from "../provider/PermissionProvider";
import { checkAccess } from "../utils/checkAccess";
import { buildPermissionEvent } from "../utils/permissionEvents";
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
    if (permission || permissions || role || roles) {
      const event = buildPermissionEvent(
        permission,
        permissions,
        role,
        roles,
        mode,
        ctx.mode,
      );

      if (granted) {
        onGrantedRef.current?.(event);
      } else {
        onDeniedRef.current?.(event);
      }
    }

    if (!granted) {
      if (redirectTo && typeof window !== "undefined") {
        window.location.href = redirectTo;
      }
    }
  }, [
    permission,
    permissions,
    role,
    roles,
    mode,
    granted,
    redirectTo,
    ctx.mode,
  ]);

  if (granted) {
    return <>{children}</>;
  }

  return fallback ?? null;
}

RouteGuard.displayName = "RouteGuard";
