"use client";

import { useEffect, useRef } from "react";
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

  const onGrantedRef = useRef(ctx.onPermissionGranted);
  onGrantedRef.current = ctx.onPermissionGranted;
  const onDeniedRef = useRef(ctx.onPermissionDenied);
  onDeniedRef.current = ctx.onPermissionDenied;

  useEffect(() => {
    const target = permission ?? permissions?.[0] ?? role ?? roles?.[0];
    if (!target) return;
    if (granted) {
      onGrantedRef.current?.({ permission: target });
    } else {
      onDeniedRef.current?.({ permission: target });
    }
  }, [permission, permissions, role, roles, granted]);

  if (granted) {
    return <>{children}</>;
  }

  return fallback ?? null;
}

Can.displayName = "Can";
