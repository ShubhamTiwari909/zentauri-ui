import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { audioPlayerVariants } from "./variants";

export type AudioPlayerVariantProps = VariantProps<typeof audioPlayerVariants>;

export type AudioPlayerProps = AudioPlayerVariantProps &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    src: string;
    children?: ReactNode;
    autoPlay?: boolean;
    loop?: boolean;
    onEnded?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
  };

export type AudioPlayerProgressProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  className?: string;
};

export type AudioPlayerTimeProps = {
  className?: string;
  format?: (seconds: number) => string;
};

export type AudioPlayerVolumeProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  className?: string;
};

export type AudioPlayerCtx = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  muted: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  seek: (seconds: number) => void;
  seekByPercent: (percent: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  size: NonNullable<AudioPlayerVariantProps["size"]>;
  shape: NonNullable<AudioPlayerVariantProps["shape"]>;
  appearance: NonNullable<AudioPlayerVariantProps["appearance"]>;
};
