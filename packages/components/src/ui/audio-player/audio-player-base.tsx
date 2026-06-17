"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";

import { cn } from "../../lib/utils";

import type {
  AudioPlayerCtx,
  AudioPlayerProgressProps,
  AudioPlayerProps,
  AudioPlayerTimeProps,
  AudioPlayerVolumeProps,
} from "./types";
import {
  audioPlayerBarVariants,
  audioPlayerTimeVariants,
  audioPlayerTrackVariants,
  audioPlayerVariants,
} from "./variants";

export const AudioPlayerContext = createContext<AudioPlayerCtx | null>(null);

export function useAudioPlayer(): AudioPlayerCtx {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error("useAudioPlayer must be used within <AudioPlayer>");
  }
  return ctx;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayerBase(props: AudioPlayerProps) {
  const {
    className,
    appearance = "default",
    size = "md",
    shape = "rounded",
    src,
    children,
    autoPlay = false,
    loop = false,
    onEnded,
    onPlay,
    onPause,
    onTimeUpdate,
    ref,
    ...rest
  } = props;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const callbacksRef = useRef({ onEnded, onPlay, onPause, onTimeUpdate });
  useEffect(() => {
    callbacksRef.current = { onEnded, onPlay, onPause, onTimeUpdate };
  });

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      callbacksRef.current.onTimeUpdate?.(audio.currentTime, audio.duration);
    };
    const handleDurationChange = () => {
      if (isFinite(audio.duration)) setDuration(audio.duration);
    };
    const handlePlay = () => {
      setIsPlaying(true);
      callbacksRef.current.onPlay?.();
    };
    const handlePause = () => {
      setIsPlaying(false);
      callbacksRef.current.onPause?.();
    };
    const handleEnded = () => {
      setIsPlaying(false);
      callbacksRef.current.onEnded?.();
    };
    const handleVolumeChange = () => {
      setVolumeState(audio.volume);
      setMuted(audio.muted);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadedmetadata", handleDurationChange);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  const reset = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(audio.duration) || audio.duration <= 0) return;
    audio.currentTime = Math.max(0, Math.min(seconds, audio.duration));
  }, []);

  const seekByPercent = useCallback((percent: number) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(audio.duration) || audio.duration <= 0) return;
    const clamped = Math.max(0, Math.min(percent, 100));
    audio.currentTime = (clamped / 100) * audio.duration;
  }, []);

  const setVolume = useCallback((vol: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = Math.max(0, Math.min(vol, 1));
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
  }, []);

  const ctx = useMemo<AudioPlayerCtx>(
    () => ({
      isPlaying,
      currentTime,
      duration,
      progress,
      volume,
      muted,
      play,
      pause,
      toggle,
      reset,
      seek,
      seekByPercent,
      setVolume,
      toggleMute,
      size: size ?? "md",
      shape: shape ?? "rounded",
      appearance: appearance ?? "default",
    }),
    [
      isPlaying,
      currentTime,
      duration,
      progress,
      volume,
      muted,
      play,
      pause,
      toggle,
      reset,
      seek,
      seekByPercent,
      setVolume,
      toggleMute,
      size,
      shape,
      appearance,
    ],
  );

  return (
    <AudioPlayerContext.Provider value={ctx}>
      <div
        ref={ref}
        data-slot="audio-player"
        className={cn(
          audioPlayerVariants({ appearance, size, shape }),
          className,
        )}
        {...rest}
      >
        <audio
          ref={audioRef}
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          preload="metadata"
          className="hidden"
          aria-hidden="true"
        />
        {children}
      </div>
    </AudioPlayerContext.Provider>
  );
}

AudioPlayerBase.displayName = "AudioPlayer";

export function AudioPlayerProgress({
  className,
  ref,
  ...rest
}: AudioPlayerProgressProps) {
  const { progress, seekByPercent, size, shape } = useAudioPlayer();
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const getPercentFromEvent = useCallback((clientX: number): number => {
    const el = trackRef.current;
    if (!el) return 0;
    const { left, width } = el.getBoundingClientRect();
    return Math.max(0, Math.min(((clientX - left) / width) * 100, 100));
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (draggingRef.current) return;
      seekByPercent(getPercentFromEvent(e.clientX));
    },
    [getPercentFromEvent, seekByPercent],
  );

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      draggingRef.current = true;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      seekByPercent(getPercentFromEvent(e.clientX));
    },
    [getPercentFromEvent, seekByPercent],
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      seekByPercent(getPercentFromEvent(e.clientX));
    },
    [getPercentFromEvent, seekByPercent],
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        seekByPercent(Math.min(progress + 1, 100));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        seekByPercent(Math.max(progress - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        seekByPercent(0);
      } else if (e.key === "End") {
        e.preventDefault();
        seekByPercent(100);
      }
    },
    [progress, seekByPercent],
  );

  return (
    <div
      ref={(node) => {
        (trackRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      data-slot="audio-player-progress"
      role="slider"
      aria-label="Audio progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      className={cn(
        audioPlayerTrackVariants({ size, shape }),
        "group",
        className,
      )}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div
        data-slot="audio-player-bar"
        className={cn(
          audioPlayerBarVariants(),
          "rounded-[inherit] group-hover:opacity-90 transition-opacity",
        )}
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}

AudioPlayerProgress.displayName = "AudioPlayerProgress";

export function AudioPlayerTime({
  className,
  format = formatTime,
}: AudioPlayerTimeProps) {
  const { currentTime, duration } = useAudioPlayer();
  return (
    <div
      data-slot="audio-player-time"
      className={cn(
        audioPlayerTimeVariants(),
        "flex items-center gap-1",
        className,
      )}
    >
      <span aria-label="Current time">{format(currentTime)}</span>
      <span aria-hidden="true">/</span>
      <span aria-label="Total duration">{format(duration)}</span>
    </div>
  );
}

AudioPlayerTime.displayName = "AudioPlayerTime";

export function AudioPlayerVolume({
  className,
  ref,
  ...rest
}: AudioPlayerVolumeProps) {
  const { volume, muted, setVolume, toggleMute } = useAudioPlayer();
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const getVolumeFromEvent = useCallback((clientX: number): number => {
    const el = trackRef.current;
    if (!el) return 0;
    const { left, width } = el.getBoundingClientRect();
    return Math.max(0, Math.min((clientX - left) / width, 1));
  }, []);

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      draggingRef.current = true;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      setVolume(getVolumeFromEvent(e.clientX));
    },
    [getVolumeFromEvent, setVolume],
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      setVolume(getVolumeFromEvent(e.clientX));
    },
    [getVolumeFromEvent, setVolume],
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (draggingRef.current) return;
      setVolume(getVolumeFromEvent(e.clientX));
    },
    [getVolumeFromEvent, setVolume],
  );

  const displayVolume = muted ? 0 : volume;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        setVolume(Math.min(volume + 0.05, 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        setVolume(Math.max(volume - 0.05, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        setVolume(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setVolume(1);
      }
    },
    [volume, setVolume],
  );

  return (
    <div
      data-slot="audio-player-volume"
      className={cn("flex items-center gap-2", className)}
      {...rest}
    >
      <button
        type="button"
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={toggleMute}
        className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--audio-fill,#0f172a)]"
      >
        {displayVolume === 0 ? (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : displayVolume < 0.5 ? (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
      <div
        ref={(node) => {
          (trackRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        role="slider"
        aria-label="Volume"
        aria-valuenow={Math.round(displayVolume * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className="relative h-1.5 w-20 cursor-pointer overflow-hidden rounded-full bg-[var(--zui-audio-player-track-bg,var(--zui-surface-muted,#0000001a))] dark:bg-[var(--zui-audio-player-track-bg-dark,var(--zui-surface-muted-dark,#ffffff1a))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--audio-fill,#0f172a)]"
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <div
          data-slot="audio-player-volume-bar"
          className="h-full origin-left [background:var(--audio-fill)] rounded-[inherit]"
          style={{ transform: `scaleX(${displayVolume})` }}
        />
      </div>
    </div>
  );
}

AudioPlayerVolume.displayName = "AudioPlayerVolume";
