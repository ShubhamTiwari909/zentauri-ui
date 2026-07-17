export function matchWildcard(pattern: string, permission: string): boolean {
  if (pattern === "*") return true;

  const parts = pattern.split("*");

  if (parts.length === 1) return pattern === permission;

  const first = parts[0];
  const last = parts[parts.length - 1];
  if (first === undefined || last === undefined) return false;

  if (first.length + last.length > permission.length) return false;

  if (!permission.startsWith(first)) return false;
  if (!permission.endsWith(last)) return false;

  let pos = first.length;
  for (let i = 1; i < parts.length - 1; i++) {
    const part = parts[i];
    if (part === undefined) return false;
    const found = permission.indexOf(part, pos);
    if (found === -1) return false;
    pos = found + part.length;
  }

  return pos <= permission.length - last.length;
}

export function hasWildcard(permission: string): boolean {
  return permission.includes("*");
}
