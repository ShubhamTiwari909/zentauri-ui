import type { AccessArgs } from "payload";

export function anyone(_: AccessArgs) {
  return true;
}

export function authenticated({ req: { user } }: AccessArgs) {
  return Boolean(user);
}

export function authenticatedOrLocal({ req }: AccessArgs) {
  if (req.user || req.payloadAPI === "local") return true;
  return false;
}

export const defaultAccess = {
  create: authenticated,
  delete: authenticated,
  read: authenticatedOrLocal,
  update: authenticated,
};
