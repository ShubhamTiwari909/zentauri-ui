"use client";

import { useMemo } from "react";
import { usePermissionContext } from "../provider/PermissionProvider";
import { hasPermission } from "../utils/hasPermission";
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

    if (mode === "any") {
      const anyMatch = required.some((p) => hasPermission(p, ctx.permissions));
      return {
        allowed: anyMatch,
        reason: anyMatch
          ? undefined
          : "None of the required permissions are granted",
        missingPermissions: anyMatch ? [] : required,
      };
    }

    return {
      allowed: false,
      reason: `Missing permissions: ${missing.join(", ")}`,
      missingPermissions: missing,
    };
  }, [required, mode, ctx.permissions]);
}
