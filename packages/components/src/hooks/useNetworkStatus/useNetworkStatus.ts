"use client";

import { useEffect, useState } from "react";

/**
 * Reflects browser online/offline connectivity using `navigator.onLine` and the `window` `"online"` / `"offline"` events.
 *
 * Defaults to `true` during SSR when `navigator` is undefined. Does not expose `connection` quality metrics—only reachability hints.
 *
 * @returns `true` when the browser believes the device is online, `false` when offline.
 */
export function useNetworkStatus(): boolean {
  const [online, setOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );

  useEffect(() => {
    const onOnline = () => {
      setOnline(true);
    };
    const onOffline = () => {
      setOnline(false);
    };
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return online;
}
