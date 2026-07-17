"use client";

import { useEffect, useRef } from "react";
import { usePermissionContext } from "../provider/PermissionProvider";
import { hasPermission } from "../utils/hasPermission";

export function usePermission(permission: string): boolean {
  const ctx = usePermissionContext();
  const granted = hasPermission(permission, ctx.permissions);

  const onGrantedRef = useRef(ctx.onPermissionGranted);
  onGrantedRef.current = ctx.onPermissionGranted;
  const onDeniedRef = useRef(ctx.onPermissionDenied);
  onDeniedRef.current = ctx.onPermissionDenied;

  useEffect(() => {
    if (granted) {
      onGrantedRef.current?.({ permission });
    } else {
      onDeniedRef.current?.({ permission });
    }
  }, [permission, granted]);

  return granted;
}
