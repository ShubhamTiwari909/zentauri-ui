"use client";

export { PermissionProvider } from "./provider/PermissionProvider";
export { usePermissionContext } from "./provider/PermissionProvider";

export { usePermission } from "./hooks/usePermission";
export { usePermissions, usePermissionsRefresh } from "./hooks/usePermissions";
export { useRole } from "./hooks/useRole";
export { useRoles } from "./hooks/useRoles";
export { useCan } from "./hooks/useCan";

export { Can } from "./components/Can";
export { Cannot } from "./components/Cannot";
export { Role } from "./components/Role";
export { PermissionBoundary } from "./components/PermissionBoundary";
export { RouteGuard } from "./components/RouteGuard";

export {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
} from "./utils/hasPermission";
export {
  hasRole,
  mergePermissions,
  getMissingPermissions,
} from "./utils/mergePermissions";
export { matchWildcard, hasWildcard } from "./utils/matchWildcard";

export type {
  PermissionProviderProps,
  PermissionContextValue,
  PermissionMode,
  CanProps,
  UseCanParams,
  UseCanResult,
  RouteGuardProps,
  PermissionBoundaryProps,
  RoleProps,
} from "./types";
