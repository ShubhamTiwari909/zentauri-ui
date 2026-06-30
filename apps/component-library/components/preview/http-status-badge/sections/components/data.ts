import type { HttpStatusBadgeProps } from "@zentauri-ui/zentauri-components/ui/http-status-badge";

export const HTTP_STATUS_BADGE_APPEARANCES = [
  "solid",
  "soft",
  "outline",
] as const satisfies readonly NonNullable<HttpStatusBadgeProps["appearance"]>[];

export const HTTP_STATUS_BADGE_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<HttpStatusBadgeProps["size"]>[];

/** Representative status codes across every status class. */
export const HTTP_STATUS_BADGE_SAMPLES = [
  200, 201, 204, 301, 304, 400, 401, 404, 429, 500, 503,
] as const;

/** One representative code per status class, for the class grid. */
export const HTTP_STATUS_BADGE_CLASS_SAMPLES = [
  { label: "1xx Informational", status: 100 },
  { label: "2xx Success", status: 200 },
  { label: "3xx Redirect", status: 301 },
  { label: "4xx Client Error", status: 404 },
  { label: "5xx Server Error", status: 500 },
] as const;
