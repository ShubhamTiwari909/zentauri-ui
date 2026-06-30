"use client";

import { cn } from "../../lib/utils";

import type { HttpStatusBadgeBaseProps, HttpStatusBadgeTone } from "./types";
import {
  httpStatusBadgeVariants,
  zuiHttpStatusBadgeOutlineTones,
  zuiHttpStatusBadgeSoftTones,
  zuiHttpStatusBadgeSolidTones,
} from "./variants";

/** Per-appearance tone color maps, selected at runtime by the resolved tone. */
const TONE_MAPS = {
  solid: zuiHttpStatusBadgeSolidTones,
  soft: zuiHttpStatusBadgeSoftTones,
  outline: zuiHttpStatusBadgeOutlineTones,
} as const;

/** Human-readable label per tone, used when no specific reason phrase is known. */
const TONE_LABELS: Record<HttpStatusBadgeTone, string> = {
  info: "Informational",
  success: "Success",
  redirect: "Redirect",
  clientError: "Client Error",
  serverError: "Server Error",
  neutral: "Unknown",
};

/** Reason phrases for the most common HTTP status codes. */
const STATUS_TEXT: Record<number, string> = {
  100: "Continue",
  101: "Switching Protocols",
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  206: "Partial Content",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict",
  410: "Gone",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

/** Map an HTTP status code to its semantic tone. */
export function httpStatusTone(status: number): HttpStatusBadgeTone {
  if (status >= 100 && status < 200) return "info";
  if (status >= 200 && status < 300) return "success";
  if (status >= 300 && status < 400) return "redirect";
  if (status >= 400 && status < 500) return "clientError";
  if (status >= 500 && status < 600) return "serverError";
  return "neutral";
}

/** Resolve the reason phrase for a status code, falling back to the tone label. */
export function httpStatusText(status: number): string {
  return STATUS_TEXT[status] ?? TONE_LABELS[httpStatusTone(status)];
}

export function HttpStatusBadgeBase({
  status,
  statusText,
  showText = true,
  appearance = "soft",
  size,
  className,
  ref,
  ...rest
}: HttpStatusBadgeBaseProps) {
  const tone = httpStatusTone(status);
  const resolvedAppearance = appearance ?? "soft";
  const toneClass = TONE_MAPS[resolvedAppearance][tone];
  const text = statusText ?? httpStatusText(status);

  return (
    <span
      ref={ref}
      data-slot="http-status-badge"
      data-tone={tone}
      className={cn(
        httpStatusBadgeVariants({ appearance, size }),
        toneClass,
        className,
      )}
      {...rest}
    >
      {status}
      {showText && <span data-slot="http-status-badge-text">{text}</span>}
    </span>
  );
}

HttpStatusBadgeBase.displayName = "HttpStatusBadge";
