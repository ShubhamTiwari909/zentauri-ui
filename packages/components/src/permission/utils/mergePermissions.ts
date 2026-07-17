import {
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from "./hasPermission";

export function mergePermissions(
  rolePermissionsMap: Record<string, string[]>,
  roles: string[],
  userPermissions: string[],
): string[] {
  const rolePermissions = roles.flatMap((role) => {
    if (!Object.hasOwn(rolePermissionsMap, role)) return [];
    return rolePermissionsMap[role]!;
  });
  return [...new Set([...rolePermissions, ...userPermissions])];
}

export function hasRole(role: string, roles: string[]): boolean {
  return roles.includes(role);
}

export function getMissingPermissions(
  required: string[],
  permissions: string[],
  mode: "all" | "any" = "all",
): string[] {
  if (mode === "any") {
    return hasAnyPermission(required, permissions) ? [] : required;
  }
  return required.filter((p) => !hasPermission(p, permissions));
}
