"use client";

import { useEffect } from "react";
import { usePermissionContext } from "../provider/PermissionProvider";
import { hasPermission } from "../utils/hasPermission";

export function usePermission(permission: string): boolean {
  const ctx = usePermissionContext();
  const granted = hasPermission(permission, ctx.permissions);

  useEffect(() => {
    if (granted) {
      ctx.onPermissionGranted?.({ permission });
    } else {
      ctx.onPermissionDenied?.({ permission });
    }
  }, [permission, granted, ctx.onPermissionGranted, ctx.onPermissionDenied]);

  return granted;
}
