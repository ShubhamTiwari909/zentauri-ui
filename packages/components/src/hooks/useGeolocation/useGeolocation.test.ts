import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useGeolocation } from "./useGeolocation";

type SuccessCallback = (position: GeolocationPosition) => void;
type ErrorCallback = (error: GeolocationPositionError) => void;

function stubGeolocation() {
  const callbacks: { success?: SuccessCallback; error?: ErrorCallback } = {};
  const geolocation = {
    getCurrentPosition: vi.fn(
      (success: SuccessCallback, error: ErrorCallback) => {
        callbacks.success = success;
        callbacks.error = error;
      },
    ),
    watchPosition: vi.fn((success: SuccessCallback, error: ErrorCallback) => {
      callbacks.success = success;
      callbacks.error = error;
      return 1;
    }),
    clearWatch: vi.fn(),
  };
  Object.defineProperty(navigator, "geolocation", {
    configurable: true,
    value: geolocation,
  });
  return { geolocation, callbacks };
}

function makePosition(latitude: number, longitude: number) {
  return {
    coords: {
      latitude,
      longitude,
      accuracy: 10,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: 1700000000000,
  } as GeolocationPosition;
}

describe("useGeolocation", () => {
  afterEach(() => {
    // @ts-expect-error cleanup of the test-defined property
    delete navigator.geolocation;
  });

  it("should report unsupported environments", () => {
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.isSupported).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.position).toBeNull();
  });

  it("should not request position while disabled", () => {
    const { geolocation } = stubGeolocation();
    const { result } = renderHook(() => useGeolocation({ enabled: false }));
    expect(geolocation.watchPosition).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });

  it("should watch position and expose the snapshot", async () => {
    const { geolocation, callbacks } = stubGeolocation();
    const { result } = renderHook(() => useGeolocation());
    expect(geolocation.watchPosition).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(true);
    act(() => {
      callbacks.success?.(makePosition(48.85, 2.35));
    });
    await waitFor(() => {
      expect(result.current.position?.latitude).toBe(48.85);
    });
    expect(result.current.position?.longitude).toBe(2.35);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should use a one-shot read when watch is false", () => {
    const { geolocation } = stubGeolocation();
    renderHook(() => useGeolocation({ watch: false }));
    expect(geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    expect(geolocation.watchPosition).not.toHaveBeenCalled();
  });

  it("should surface errors and clear loading", () => {
    const { callbacks } = stubGeolocation();
    const { result } = renderHook(() => useGeolocation());
    const positionError = {
      code: 1,
      message: "denied",
    } as GeolocationPositionError;
    act(() => {
      callbacks.error?.(positionError);
    });
    expect(result.current.error).toBe(positionError);
    expect(result.current.loading).toBe(false);
  });

  it("should clear the watch on unmount", () => {
    const { geolocation } = stubGeolocation();
    const { unmount } = renderHook(() => useGeolocation());
    unmount();
    expect(geolocation.clearWatch).toHaveBeenCalledWith(1);
  });
});
