"use client";

import { useCallback, useEffect, useState } from "react";

export type CookieOptions = {
  /** Lifetime in seconds (sets `max-age`). Omit for a session cookie. */
  maxAgeSeconds?: number;
  /** Absolute expiry (sets `expires`). */
  expires?: Date;
  /** Cookie path (default `"/"`). */
  path?: string;
  /** Cookie domain. */
  domain?: string;
  /** Restrict to HTTPS. */
  secure?: boolean;
  /** SameSite attribute. `"none"` automatically forces `secure` per browser requirements. */
  sameSite?: "strict" | "lax" | "none";
};

export type UseCookieResult = [
  string | null,
  (value: string, options?: CookieOptions) => void,
  (options?: Pick<CookieOptions, "path" | "domain">) => void,
];

function readCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }
  const prefix = `${encodeURIComponent(name)}=`;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(prefix));
  if (!match) {
    return null;
  }
  try {
    return decodeURIComponent(match.slice(prefix.length));
  } catch {
    // Malformed cookie value — return null rather than crashing.
    return null;
  }
}

function serializeCookie(
  name: string,
  value: string,
  options: CookieOptions,
): string {
  const { maxAgeSeconds, expires, path = "/", domain, sameSite } = options;
  // SameSite=None requires Secure; enforce it automatically.
  const secure = options.secure || sameSite === "none";
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}`;
  if (maxAgeSeconds != null) {
    cookie += `; max-age=${maxAgeSeconds}`;
  }
  if (expires) {
    cookie += `; expires=${expires.toUTCString()}`;
  }
  if (domain) {
    cookie += `; domain=${domain}`;
  }
  if (secure) {
    cookie += "; secure";
  }
  if (sameSite) {
    cookie += `; samesite=${sameSite}`;
  }
  return cookie;
}

/**
 * Reads and writes a single cookie with React state that stays in sync with your updates.
 *
 * - Initial state is `initialValue` (or `null`) to avoid SSR hydration mismatches; the actual
 *   cookie value is read on mount via a `useEffect`.
 * - `setCookie` writes `document.cookie` (URI-encoded) and updates state in the same call.
 * - `removeCookie` expires the cookie via `max-age=0`; pass the same `path` / `domain` used when setting.
 * - Reactivity covers writes made through this hook instance; cookies changed elsewhere are
 *   re-read only when `name` changes (the browser offers no cookie change event in wide support).
 * - `SameSite="none"` automatically forces the `Secure` flag per browser requirements.
 *
 * @param name - Cookie name.
 * @param initialValue - Fallback when the cookie is absent (and during SSR).
 * @returns `[value, setCookie, removeCookie]`.
 */
export function useCookie(
  name: string,
  initialValue?: string,
): UseCookieResult {
  // Initialize to initialValue (not readCookie) to avoid SSR hydration mismatches.
  // The effect below syncs the actual cookie value after mount.
  const [value, setValueState] = useState<string | null>(initialValue ?? null);

  const setCookie = useCallback(
    (value: string, options: CookieOptions = {}) => {
      if (typeof document === "undefined") {
        return;
      }
      document.cookie = serializeCookie(name, value, options);
      setValueState(value);
    },
    [name],
  );

  const removeCookie = useCallback(
    (options: Pick<CookieOptions, "path" | "domain"> = {}) => {
      if (typeof document === "undefined") {
        return;
      }
      document.cookie = serializeCookie(name, "", {
        ...options,
        maxAgeSeconds: 0,
      });
      setValueState(null);
    },
    [name],
  );

  useEffect(() => {
    setValueState(readCookie(name) ?? initialValue ?? null);
    // Intentionally keyed by name only: initialValue is a fallback, not a data source.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return [value, setCookie, removeCookie];
}
