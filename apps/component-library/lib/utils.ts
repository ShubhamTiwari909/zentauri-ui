type ClassDictionary = Record<string, boolean | null | undefined>;
type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassDictionary
  | ClassValue[];

function flattenClasses(value: ClassValue): string[] {
  if (!value) {
    return [];
  }

  if (typeof value === "string" || typeof value === "number") {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap(flattenClasses);
  }

  return Object.entries(value)
    .filter(([, isEnabled]) => Boolean(isEnabled))
    .map(([className]) => className);
}

export function cn(...inputs: ClassValue[]) {
  return inputs.flatMap(flattenClasses).join(" ");
}
