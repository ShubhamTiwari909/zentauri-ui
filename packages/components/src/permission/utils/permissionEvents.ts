import type { PermissionCheckEvent, PermissionMode } from "../types";

export function buildPermissionEvent(
  permission: string | undefined,
  permissions: string[] | undefined,
  role: string | undefined,
  roles: string[] | undefined,
  mode: PermissionMode | undefined,
  ctxMode: PermissionMode,
): PermissionCheckEvent {
  return {
    permission,
    permissions,
    role,
    roles,
    mode: mode ?? ctxMode,
  };
}
