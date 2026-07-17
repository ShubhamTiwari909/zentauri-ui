import type { PermissionContextValue, PermissionMode } from "../types";
import { hasPermission } from "./hasPermission";
import { hasRole } from "./mergePermissions";

export interface CheckAccessParams {
  permission?: string;
  permissions?: string[];
  role?: string;
  roles?: string[];
  mode?: PermissionMode;
}

export interface CheckAccessResult {
  permissionCheck: boolean;
  roleCheck: boolean;
}

export function checkAccess(
  params: CheckAccessParams,
  ctx: Pick<PermissionContextValue, "permissions" | "roles" | "mode">,
): CheckAccessResult {
  const {
    permission,
    permissions: multiplePermissions,
    role,
    roles: multipleRoles,
    mode = ctx.mode ?? "all",
  } = params;

  const permsToCheck = multiplePermissions ?? (permission ? [permission] : []);
  const permissionCheck =
    permsToCheck.length === 0
      ? true
      : mode === "all"
        ? permsToCheck.every((p) => hasPermission(p, ctx.permissions))
        : permsToCheck.some((p) => hasPermission(p, ctx.permissions));

  const rolesToCheck = multipleRoles ?? (role ? [role] : []);
  const roleCheck =
    rolesToCheck.length === 0
      ? true
      : mode === "all"
        ? rolesToCheck.every((r) => hasRole(r, ctx.roles))
        : rolesToCheck.some((r) => hasRole(r, ctx.roles));

  return { permissionCheck, roleCheck };
}
