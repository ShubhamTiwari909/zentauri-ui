"use client";

import { usePermissionContext } from "../provider/PermissionProvider";
import type { PermissionBoundaryProps } from "../types";

export function PermissionBoundary({
  loading,
  fallback,
  children,
}: PermissionBoundaryProps) {
  const ctx = usePermissionContext();

  if (!ctx.isLoaded) {
    return loading ?? null;
  }

  if (ctx.permissions.length === 0 && ctx.roles.length === 0) {
    return fallback ?? null;
  }

  return <>{children}</>;
}

PermissionBoundary.displayName = "PermissionBoundary";
