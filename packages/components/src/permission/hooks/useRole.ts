"use client";

import { useEffect } from "react";
import { usePermissionContext } from "../provider/PermissionProvider";
import { hasRole } from "../utils/mergePermissions";

export function useRole(role: string): boolean {
  const ctx = usePermissionContext();
  const granted = hasRole(role, ctx.roles);

  useEffect(() => {
    if (granted) {
      ctx.onPermissionGranted?.({ permission: role });
    } else {
      ctx.onPermissionDenied?.({ permission: role });
    }
  }, [role, granted, ctx.onPermissionGranted, ctx.onPermissionDenied]);

  return granted;
}
