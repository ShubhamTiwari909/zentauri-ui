"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/utils";

import type { QrScannerBaseProps } from "./types";
import {
  qrScannerFallbackVariants,
  qrScannerOverlayVariants,
  qrScannerStatusVariants,
  qrScannerVariants,
  qrScannerVideoVariants,
  qrScannerViewfinderVariants,
} from "./variants";

/**
 * Module-level cache for the `jsQR` decoder library.
 *
 * `jsqr` is dynamically imported on first use (both from `scanFrame` and
 * `scanImage`) and stored here so subsequent frame scans don't re-fetch the
 * module from the network. The import returns an ESM default export, which
 * we extract and cache as a plain function.
 *
 * The `any` type is used because `jsqr`'s published types have a complex
 * overloaded signature (Uint8ClampedArray vs Uint8Array) that doesn't map
 * cleanly to the runtime ImageData we pass. The runtime behaviour is correct
 * regardless.
 */
let cachedJsQR: any = null;

/** Lazy-loader that returns the cached jsQR decoder, importing it once. */
async function getJsqr() {
  if (!cachedJsQR) {
    const { default: m } = await import("jsqr");
    cachedJsQR = m;
  }
  return cachedJsQR;
}

/**
 * QrScannerBase uses the device camera (via `getUserMedia`) to decode QR
 * codes in real time. It provides an imperative handle (`ref`) so parents
 * can control the camera lifecycle and scan images without camera access.
 *
 * --- Architecture overview ---
 *
 * The component has three main async loops:
 *
 *  1. **Camera startup** (`startCamera`) — calls `getUserMedia`, attaches
 *     the stream to a hidden `<video>` element, calls `video.play()`, then
 *     kicks off the scan loop via `requestAnimationFrame`.
 *
 *  2. **Scan loop** (`scanFrame`) — scheduled with `requestAnimationFrame`.
 *     Each frame draws the current video frame to an off-screen `<canvas>`,
 *     calls `jsQR` on the pixel data, and fires `onResult` when a QR code
 *     is detected. Respects `scanDelay` to avoid thrashing.
 *
 *  3. **Image scanning** (`scanImage` on the imperative handle) — decodes a
 *     QR code from a static `File` (e.g. an uploaded screenshot) without
 *     involving the camera at all.
 *
 * --- Race-condition guards ---
 *
 * Camera start/stop is inherently racy because `video.play()` returns a
 * Promise that resolves asynchronously. If `stopCamera()` (or the
 * `useEffect` cleanup) runs while `play()` is still pending, we must not
 * operate on the new stream that may have been set up in the meantime.
 *
 * Both `stopCamera` and the effect cleanup capture `streamRef.current` into
 * a local `streamToStop` variable at the time they are called. The actual
 * stop/cleanup logic (which may run later via `playPromise.then(...)`)
 * checks `video.srcObject === streamToStop` before pausing, ensuring it
 * only affects the stream that was active at the time of the request.
 *
 * --- Callback ref pattern ---
 *
 * `onResult`, `onError`, `onStart`, `onStop` are stored in refs and kept
 * current in the render body. The `useCallback` hooks for `scanFrame`,
 * `startCamera`, and `stopCamera` read from these refs instead of listing
 * the callbacks in their dependency arrays. This prevents the camera from
 * restarting every time the parent passes a new inline function reference.
 *
 * --- Error classification ---
 *
 * `getUserMedia` throws `DOMException` with specific names:
 *   - `NotFoundError`     → no camera hardware detected
 *   - `NotAllowedError`   → user denied permission
 *   - `NotReadableError`  → camera is busy (another app)
 *   - `AbortError`        → `play()` was interrupted by unmount
 *
 * The first three set `status` to `"no-camera"` and render a fallback UI.
 * `AbortError` is silently swallowed because it's a normal consequence of
 * unmounting during startup. All other errors set `status` to `"error"` and
 * display the error message.
 */
export function QrScannerBase({
  onResult,
  onError,
  onStart,
  onStop,
  facingMode = "environment",
  constraints,
  scanDelay = 500,
  continuous = false,
  fallbackText = "Camera not available",
  loadingText = "Starting camera...",
  noCameraText = "No camera detected",
  appearance,
  autoStart = true,
  className,
  ref,
  ...rest
}: QrScannerBaseProps) {
  // ---- Refs ----

  /** The hidden `<video>` element that plays the camera stream. */
  const videoRef = useRef<HTMLVideoElement>(null);

  /** The hidden `<canvas>` used to grab frames for jsQR decoding. */
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** The active `MediaStream`, or `null` when the camera is stopped. */
  const streamRef = useRef<MediaStream | null>(null);

  /**
   * Boolean ref that tracks whether the scan loop should keep running.
   * Checked at the top of `scanFrame`. Set to `false` by `stopCamera`.
   */
  const scanningRef = useRef(false);

  /**
   * Timestamp (ms) of the last successful frame decode. Used to implement
   * `scanDelay` — frames are skipped if they arrive before the delay
   * elapses.
   */
  const lastScanRef = useRef(0);

  /** The current `requestAnimationFrame` ID, used for cancellation. */
  const rafRef = useRef(0);

  /** Set to `true` on mount, `false` on unmount. Guards async callbacks. */
  const mountedRef = useRef(true);

  /**
   * Stores the pending `play()` promise so that `stopCamera` and the effect
   * cleanup can chain `.then()` on it. Without this, stopping the camera
   * while `play()` is in flight causes the browser warning:
   *   "The play() request was interrupted because the media was removed"
   */
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // ---- Callback refs (keep current without causing re-renders) ----

  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);
  const onStartRef = useRef(onStart);
  const onStopRef = useRef(onStop);
  onResultRef.current = onResult;
  onErrorRef.current = onError;
  onStartRef.current = onStart;
  onStopRef.current = onStop;

  // ---- State ----

  /** Whether the camera is actively scanning (used by `isScanning` on the imperative handle). */
  const [scanning, setScanning] = useState(false);

  /**
   * High-level lifecycle status, used to decide which UI to render:
   *   - `"idle"`        — Camera not yet requested.
   *   - `"starting"`    -- `getUserMedia` or `play()` in progress.
   *   - `"scanning"`    -- Camera is live and frames are being analysed.
   *   - `"error"`       -- `getUserMedia` threw a non-camera error.
   *   - `"no-camera"`   -- Camera not found, permission denied, or busy.
   */
  const [status, setStatus] = useState<
    "idle" | "starting" | "scanning" | "error" | "no-camera"
  >("idle");

  /** The error message to display when `status === "error"`. */
  const [error, setError] = useState<string | null>(null);

  /**
   * Tracks the mount lifecycle. The cleanup sets `mountedRef.current = false`,
   * which is checked by `startCamera` after each `await` point so it can bail
   * early if the component unmounted mid-startup.
   */
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // ---- Camera control ----

  /**
   * Stops the camera: cancels the animation frame, pauses the video, stops
   * all tracks on the captured stream, and nulls out refs.
   *
   * **Race-condition handling:**
   * Captures `streamRef.current` into `streamToStop` at call time. If `play()`
   * is pending, the actual stop logic is deferred to a `.then()` callback.
   * That callback checks `video.srcObject === streamToStop` so it only shuts
   * down the stream that was active when `stopCamera` was called, not a
   * newer stream that may have been started in the meantime.
   */
  const stopCamera = useCallback(() => {
    scanningRef.current = false;
    setScanning(false);
    setStatus("idle");
    cancelAnimationFrame(rafRef.current);

    const streamToStop = streamRef.current;

    const doStop = () => {
      if (videoRef.current && videoRef.current.srcObject === streamToStop) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
      if (streamToStop) {
        streamToStop.getTracks().forEach((track) => track.stop());
      }
      if (streamRef.current === streamToStop) {
        streamRef.current = null;
      }
      onStopRef.current?.();
    };

    if (playPromiseRef.current) {
      playPromiseRef.current.then(doStop, doStop);
      playPromiseRef.current = null;
    } else {
      doStop();
    }
  }, []);

  /**
   * The per-frame scan logic, scheduled via `requestAnimationFrame`.
   *
   * 1. Guards: exits early if scanning was cancelled, the component unmounted,
   *    or the video doesn't have enough data yet.
   * 2. Throttle: skips frames that arrive before `scanDelay` ms have elapsed
   *    since the last decode.
   * 3. Captures the current video frame onto the off-screen canvas.
   * 4. Runs jsQR on the canvas pixel data.
   * 5. On a match: fires `onResultRef.current`. If `continuous` is `false`,
   *    stops the camera immediately (single-scan mode).
   * 6. Re-schedules itself unless scanning was stopped.
   *
   * Frame processing errors (e.g. a corrupted frame) are silently caught and
   * the loop continues.
   */
  const scanFrame = useCallback(async () => {
    if (!scanningRef.current || !mountedRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    const now = Date.now();
    if (now - lastScanRef.current < scanDelay) {
      rafRef.current = requestAnimationFrame(scanFrame);
      return;
    }
    lastScanRef.current = now;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      rafRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    try {
      const jsqr = await getJsqr();
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsqr(imageData.data, imageData.width, imageData.height);

      if (code) {
        onResultRef.current(code.data);
        if (!continuous) {
          scanningRef.current = false;
          setScanning(false);
          stopCamera();
          return;
        }
      }
    } catch {
      // Frame processing error, continue scanning
    }

    if (mountedRef.current) {
      rafRef.current = requestAnimationFrame(scanFrame);
    }
  }, [scanDelay, continuous, stopCamera]);

  /**
   * Starts the camera: requests a `MediaStream`, attaches it to the video
   * element, waits for playback to settle, then begins the scan loop.
   *
   * Steps:
   *   1. Guard: skip if unmounted or `getUserMedia` is unavailable.
   *   2. Call `getUserMedia` with the configured `facingMode` and
   *      `constraints`.
   *   3. Guard: if unmounted during the await, stop the freshly-acquired
   *      stream and bail.
   *   4. Assign the stream to `streamRef.current` and the video element.
   *   5. Save the `play()` promise to `playPromiseRef` so it can be awaited
   *      by `stopCamera` / cleanup.
   *   6. Guard: if unmounted after play settles, call `stopCamera()` and
   *      bail.
   *   7. Mark scanning as active and schedule the first `scanFrame`.
   *
   * The `onStart` callback (via ref) is fired once scanning begins.
   *
   * `getUserMedia` availability is checked upfront because it only exists
   * in secure contexts (HTTPS or localhost). Without the check the call
   * would throw a confusing `TypeError` instead of a user-friendly message.
   */
  const startCamera = useCallback(async () => {
    if (!mountedRef.current) return;

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("no-camera");
      setError("Camera API not available in this context");
      onErrorRef.current?.(new Error("getUserMedia is not available"));
      return;
    }

    setStatus("starting");
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          ...constraints,
        },
      });

      if (!mountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        playPromiseRef.current = videoRef.current.play();
        await playPromiseRef.current;
        playPromiseRef.current = null;
      }

      if (!mountedRef.current) {
        stopCamera();
        return;
      }

      scanningRef.current = true;
      setScanning(true);
      setStatus("scanning");
      onStartRef.current?.();
      rafRef.current = requestAnimationFrame(scanFrame);
    } catch (err) {
      if (!mountedRef.current) return;
      if (err instanceof DOMException && err.name === "AbortError") return;

      const isNoCamera =
        err instanceof DOMException &&
        (err.name === "NotFoundError" ||
          err.name === "NotAllowedError" ||
          err.name === "NotReadableError");

      setStatus(isNoCamera ? "no-camera" : "error");
      setError(err instanceof Error ? err.message : String(err));
      onErrorRef.current?.(err);
    }
  }, [facingMode, constraints, scanFrame, stopCamera]);

  /**
   * Main lifecycle effect: starts the camera on mount (if `autoStart` is
   * true), and stops it on unmount.
   *
   * Captures `videoRef.current` at effect time to satisfy React's ref-stability
   * lint rule. The cleanup follows the same race-condition-safe pattern as
   * `stopCamera`: captures `streamRef.current` into `streamToStop` and guards
   * the `doCleanup` callback with `video.srcObject === streamToStop`.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (autoStart) {
      startCamera();
    }
    return () => {
      scanningRef.current = false;
      cancelAnimationFrame(rafRef.current);

      const streamToStop = streamRef.current;

      const doCleanup = () => {
        if (video && video.srcObject === streamToStop) {
          video.pause();
          video.srcObject = null;
        }
        if (streamToStop) {
          streamToStop.getTracks().forEach((track) => track.stop());
        }
      };

      if (playPromiseRef.current) {
        playPromiseRef.current.then(doCleanup, doCleanup);
        playPromiseRef.current = null;
      } else {
        doCleanup();
      }
    };
  }, [autoStart, startCamera]);

  // ---- Imperative handle ----

  /**
   * Exposes `start`, `stop`, `scanImage`, and `isScanning` to the parent
   * via the `ref` prop.
   *
   * `scanImage` decodes a QR code from a static image file without involving
   * the camera. It renders the file to an off-screen canvas via
   * `createImageBitmap` + `ctx.drawImage`, then runs jsQR on the pixel data.
   *
   * The `ImageBitmap` is always closed in the `finally` block to prevent
   * memory leaks (an `ImageBitmap` holds a reference to the underlying
   * `ArrayBuffer` until explicitly closed).
   */
  useImperativeHandle(
    ref,
    () => ({
      start: startCamera,
      stop: stopCamera,
      scanImage: async (file: File): Promise<string | null> => {
        let bitmap: ImageBitmap | null = null;
        try {
          bitmap = await createImageBitmap(file);
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = bitmap.width;
          tempCanvas.height = bitmap.height;
          const ctx = tempCanvas.getContext("2d");
          if (!ctx) return null;
          ctx.drawImage(bitmap, 0, 0);
          const imageData = ctx.getImageData(
            0,
            0,
            tempCanvas.width,
            tempCanvas.height,
          );
          const jsqr = await getJsqr();
          const code = jsqr(imageData.data, imageData.width, imageData.height);
          return code?.data ?? null;
        } catch {
          return null;
        } finally {
          bitmap?.close();
        }
      },
      isScanning: scanning,
    }),
    [startCamera, stopCamera, scanning],
  );

  // ---- Status renderer ----

  /**
   * Returns a status `<span>` based on the current `status` value, or `null`
   * when no status overlay is needed (i.e. the camera is working and the
   * video feed is visible).
   *
   * The status text is customisable via the `loadingText`, `noCameraText`,
   * and `fallbackText` props. Error messages come from the `error` state,
   * which is set to `err.message` from the caught exception.
   */
  const renderStatus = () => {
    if (status === "starting") {
      return <span className={qrScannerStatusVariants()}>{loadingText}</span>;
    }
    if (status === "error" && error) {
      return <span className={qrScannerStatusVariants()}>{error}</span>;
    }
    if (status === "no-camera") {
      return <span className={qrScannerStatusVariants()}>{noCameraText}</span>;
    }
    return null;
  };

  // ---- Render branches ----

  /**
   * Fallback UI shown when the camera is unavailable or an error occurred.
   *
   * The outer `<div>` still carries the same `data-slot` and variant classes
   * as the normal UI so that layout consistency is maintained.
   */
  if (status === "no-camera" || status === "error") {
    return (
      <div
        data-slot="qr-scanner"
        className={cn(qrScannerVariants({ appearance }), className)}
        {...rest}
      >
        <div className={qrScannerFallbackVariants()}>
          {fallbackText}
          {renderStatus()}
        </div>
      </div>
    );
  }

  /**
   * Normal UI: video feed with a viewfinder overlay and optional status text.
   *
   * Nested structure:
   *   <div data-slot="qr-scanner">     ← root (className, appearance, ...rest)
   *     <video />                       ← camera feed (playsInline, muted, autoPlay)
   *     <canvas className="hidden" />   ← off-screen canvas for frame capture
   *     <div>                           ← overlay container
   *       <div />                       ← viewfinder corners
   *     </div>
   *     {renderStatus()}                ← "Starting camera..." overlay text
   *   </div>
   */
  return (
    <div
      data-slot="qr-scanner"
      className={cn(qrScannerVariants({ appearance }), className)}
      {...rest}
    >
      <video
        ref={videoRef}
        data-slot="qr-scanner-video"
        className={qrScannerVideoVariants()}
        playsInline
        muted
        autoPlay
      />
      <canvas
        ref={canvasRef}
        className="hidden"
        data-slot="qr-scanner-canvas"
      />
      <div className={qrScannerOverlayVariants()}>
        <div className={qrScannerViewfinderVariants()} />
      </div>
      {renderStatus()}
    </div>
  );
}

QrScannerBase.displayName = "QrScanner";
