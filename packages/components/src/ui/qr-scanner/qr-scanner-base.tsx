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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanningRef = useRef(false);
  const lastScanRef = useRef(0);
  const rafRef = useRef(0);
  const mountedRef = useRef(true);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Callback refs so that scanFrame/startCamera/stopCamera don't need to list
  // the callbacks as deps — prevents the useEffect from restarting the camera
  // every time the parent renders with a new inline function reference.
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);
  const onStartRef = useRef(onStart);
  const onStopRef = useRef(onStop);
  onResultRef.current = onResult;
  onErrorRef.current = onError;
  onStartRef.current = onStart;
  onStopRef.current = onStop;

  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "starting" | "scanning" | "error" | "no-camera"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const stopCamera = useCallback(() => {
    scanningRef.current = false;
    setScanning(false);
    setStatus("idle");
    cancelAnimationFrame(rafRef.current);

    const doStop = () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
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
  }, []); // stable — uses onStopRef instead of onStop directly

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
      const { default: jsqr } = await import("jsqr");
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
  }, [scanDelay, continuous, stopCamera]); // onResult removed — accessed via ref

  const startCamera = useCallback(async () => {
    if (!mountedRef.current) return;
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
      // AbortError means play() was interrupted by unmount/cleanup — not a user-visible error
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
  }, [facingMode, constraints, scanFrame, stopCamera]); // onStart/onError removed — accessed via refs

  useEffect(() => {
    const video = videoRef.current;
    if (autoStart) {
      startCamera();
    }
    return () => {
      scanningRef.current = false;
      cancelAnimationFrame(rafRef.current);

      const doCleanup = () => {
        if (video) {
          video.pause();
          video.srcObject = null;
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };

      if (playPromiseRef.current) {
        // Wait for play() to settle before pausing — prevents the browser warning:
        // "The play() request was interrupted because the media was removed from the document"
        playPromiseRef.current.then(doCleanup, doCleanup);
        playPromiseRef.current = null;
      } else {
        doCleanup();
      }
    };
  }, [autoStart, startCamera]);

  useImperativeHandle(
    ref,
    () => ({
      start: startCamera,
      stop: stopCamera,
      scanImage: async (file: File): Promise<string | null> => {
        try {
          const bitmap = await createImageBitmap(file);
          const canvas = document.createElement("canvas");
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return null;
          ctx.drawImage(bitmap, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const { default: jsqr } = await import("jsqr");
          const code = jsqr(imageData.data, imageData.width, imageData.height);
          bitmap.close();
          return code?.data ?? null;
        } catch {
          return null;
        }
      },
      isScanning: scanning,
    }),
    [startCamera, stopCamera, scanning],
  );

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
