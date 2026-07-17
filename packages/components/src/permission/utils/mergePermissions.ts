import { matchWildcard } from "./matchWildcard";

export function mergePermissions(
  rolePermissionsMap: Record<string, string[]>,
  roles: string[],
  userPermissions: string[],
): string[] {
  const rolePermissions = roles.flatMap(
    (role) => rolePermissionsMap[role] ?? [],
  );
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
    const anyMatch = required.some((p) =>
      permissions.some(
        (allowed) =>
          allowed === p || allowed === "*" || matchWildcard(allowed, p),
      ),
    );
    return anyMatch ? [] : required;
  }

  return required.filter(
    (p) =>
      !permissions.some(
        (allowed) =>
          allowed === p || allowed === "*" || matchWildcard(allowed, p),
      ),
  );
}
