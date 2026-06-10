"use client";

import { useEffect, useState } from "react";

export type GeolocationCoordinatesSnapshot = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
};

export type UseGeolocationParams = {
  /** Start requesting the position (default `true`). Set `false` to defer the permission prompt. */
  enabled?: boolean;
  /** Keep watching for position updates instead of a one-shot read (default `true`). */
  watch?: boolean;
  /** `PositionOptions.enableHighAccuracy`. */
  enableHighAccuracy?: boolean;
  /** `PositionOptions.maximumAge` in milliseconds. */
  maximumAge?: number;
  /** `PositionOptions.timeout` in milliseconds. */
  timeout?: number;
};

export type UseGeolocationResult = {
  /** Whether `navigator.geolocation` exists in this browser. */
  isSupported: boolean;
  /** True while enabled and no position or error has arrived yet. */
  loading: boolean;
  /** Permission state from the Permissions API (`"unknown"` where unsupported or before resolution). */
  permission: PermissionState | "unknown";
  /** Latest position snapshot, or `null` before the first fix. */
  position: GeolocationCoordinatesSnapshot | null;
  /** Latest geolocation error, cleared when a new fix succeeds. */
  error: GeolocationPositionError | null;
};

function toSnapshot(position: GeolocationPosition): GeolocationCoordinatesSnapshot {
  const { coords } = position;
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
    accuracy: coords.accuracy,
    altitude: coords.altitude,
    altitudeAccuracy: coords.altitudeAccuracy,
    heading: coords.heading,
    speed: coords.speed,
    timestamp: position.timestamp,
  };
}

/**
 * Browser geolocation with loading, error, and Permissions API state.
 *
 * - Requesting the position triggers the browser permission prompt; pass `enabled: false`
 *   and flip it from a user gesture to avoid prompting on mount.
 * - `watch: true` (default) uses `watchPosition` for live updates; `false` reads once.
 * - `permission` mirrors `navigator.permissions.query({ name: "geolocation" })` including
 *   change events, independent of whether a request is active.
 *
 * @param params - {@link UseGeolocationParams}
 * @returns {@link UseGeolocationResult}
 */
export function useGeolocation(
  params: UseGeolocationParams = {},
): UseGeolocationResult {
  const {
    enabled = true,
    watch = true,
    enableHighAccuracy,
    maximumAge,
    timeout,
  } = params;

  const isSupported =
    typeof navigator !== "undefined" && "geolocation" in navigator;

  const [permission, setPermission] = useState<PermissionState | "unknown">(
    "unknown",
  );
  const [position, setPosition] =
    useState<GeolocationCoordinatesSnapshot | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (
      typeof navigator === "undefined" ||
      navigator.permissions?.query == null
    ) {
      return;
    }
    let active = true;
    let status: PermissionStatus | undefined;
    const onChange = () => {
      if (active && status) {
        setPermission(status.state);
      }
    };
    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        // Guard against the component unmounting before this promise resolves,
        // which would otherwise attach a listener that can never be cleaned up.
        if (!active) {
          return;
        }
        status = result;
        setPermission(result.state);
        result.addEventListener("change", onChange);
      })
      .catch(() => {
        /* permissions API may reject for geolocation in some browsers */
      });
    return () => {
      active = false;
      status?.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !isSupported) {
      return;
    }
    const geolocation = navigator.geolocation;
    let active = true;
    setSettled(false);
    const onSuccess = (next: GeolocationPosition) => {
      if (!active) {
        return;
      }
      setPosition(toSnapshot(next));
      setError(null);
      setSettled(true);
    };
    const onError = (nextError: GeolocationPositionError) => {
      if (!active) {
        return;
      }
      setError(nextError);
      setSettled(true);
    };
    const options: PositionOptions = {
      enableHighAccuracy,
      maximumAge,
      timeout,
    };
    let watchId: number | undefined;
    if (watch) {
      watchId = geolocation.watchPosition(onSuccess, onError, options);
    } else {
      geolocation.getCurrentPosition(onSuccess, onError, options);
    }
    return () => {
      active = false;
      if (watchId !== undefined) {
        geolocation.clearWatch(watchId);
      }
    };
  }, [enableHighAccuracy, enabled, isSupported, maximumAge, timeout, watch]);

  return {
    isSupported,
    loading: enabled && isSupported && !settled,
    permission,
    position,
    error,
  };
}
