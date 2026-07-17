import { matchWildcard } from "./matchWildcard";

export function hasPermission(
  permission: string,
  permissions: string[],
): boolean {
  return permissions.some((p) => matchWildcard(p, permission));
}

export function hasAnyPermission(
  required: string[],
  permissions: string[],
): boolean {
  return required.some((p) => hasPermission(p, permissions));
}

export function hasAllPermissions(
  required: string[],
  permissions: string[],
): boolean {
  return required.every((p) => hasPermission(p, permissions));
}
