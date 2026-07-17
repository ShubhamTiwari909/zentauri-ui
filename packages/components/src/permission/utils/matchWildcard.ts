export function matchWildcard(pattern: string, permission: string): boolean {
  if (pattern === "*") return true;

  const regexStr = pattern
    .split("*")
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");

  return new RegExp(`^${regexStr}$`).test(permission);
}

export function hasWildcard(permission: string): boolean {
  return permission.includes("*");
}
