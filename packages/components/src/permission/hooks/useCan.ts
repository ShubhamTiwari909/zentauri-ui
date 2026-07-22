"use client";

import { useMemo } from "react";
import { usePermissionContext } from "../provider/PermissionProvider";
import { getMissingPermissions } from "../utils/mergePermissions";
import type { UseCanParams, UseCanResult } from "../types";

export function useCan({
  permissions: required,
  mode = "all",
}: UseCanParams): UseCanResult {
  const ctx = usePermissionContext();

  return useMemo(() => {
    const missing = getMissingPermissions(required, ctx.permissions, mode);

    if (missing.length === 0) {
      return { allowed: true, missingPermissions: [] };
    }

    return {
      allowed: false,
      reason:
        mode === "any"
          ? "None of the required permissions are granted"
          : `Missing permissions: ${missing.join(", ")}`,
      missingPermissions: missing,
    };
  }, [required, mode, ctx.permissions]);
}
