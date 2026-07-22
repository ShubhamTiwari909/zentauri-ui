"use client";

import { useEffect, useRef } from "react";
import { usePermissionContext } from "../provider/PermissionProvider";
import { hasPermission } from "../utils/hasPermission";
import type { PermissionCheckEvent } from "../types";

export function usePermission(permission: string): boolean {
  const ctx = usePermissionContext();
  const granted = hasPermission(permission, ctx.permissions);

  const onGrantedRef = useRef(ctx.onPermissionGranted);
  onGrantedRef.current = ctx.onPermissionGranted;
  const onDeniedRef = useRef(ctx.onPermissionDenied);
  onDeniedRef.current = ctx.onPermissionDenied;

  useEffect(() => {
    const event: PermissionCheckEvent = {
      permission,
      mode: ctx.mode,
    };

    if (granted) {
      onGrantedRef.current?.(event);
    } else {
      onDeniedRef.current?.(event);
    }
  }, [permission, granted, ctx.mode]);

  return granted;
}
