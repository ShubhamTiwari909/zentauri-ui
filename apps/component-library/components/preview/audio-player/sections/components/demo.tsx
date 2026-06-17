"use client";

import {
  AudioPlayer,
  AudioPlayerProgress,
  AudioPlayerTime,
  AudioPlayerVolume,
  useAudioPlayer,
} from "@zentauri-ui/zentauri-components/ui/audio-player";
import {
  Button,
  ButtonProps,
} from "@zentauri-ui/zentauri-components/ui/buttons";

import type { AudioPlayerDemoProps } from "./types";

function PlayerControls({
  appearance,
}: {
  appearance: ButtonProps["appearance"];
}) {
  const { toggle, reset, isPlaying } = useAudioPlayer();

  return (
    <div className="flex flex-col gap-3">
      <AudioPlayerProgress />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AudioPlayerTime />
        <div className="flex items-center gap-2">
          <Button
            appearance="ghost"
            size="icon"
            onClick={reset}
            aria-label="Reset"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </Button>
          <Button
            appearance={appearance}
            size="icon"
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="rounded-full text-white dark:text-black"
          >
            {isPlaying ? (
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 translate-x-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </Button>
        </div>
        <AudioPlayerVolume />
      </div>
    </div>
  );
}

export function AudioPlayerDemo({
  appearance,
  size,
  shape,
  src,
}: AudioPlayerDemoProps) {
  return (
    <AudioPlayer src={src} appearance={appearance} size={size} shape={shape}>
      <PlayerControls appearance={appearance} />
    </AudioPlayer>
  );
}
