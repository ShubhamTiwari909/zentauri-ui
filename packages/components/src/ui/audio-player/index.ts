"use client";

export { AudioPlayer } from "./audio-player";
export {
  AudioPlayerBase,
  AudioPlayerProgress,
  AudioPlayerTime,
  AudioPlayerVolume,
  useAudioPlayer,
} from "./audio-player-base";
export type {
  AudioPlayerProps,
  AudioPlayerProgressProps,
  AudioPlayerTimeProps,
  AudioPlayerVolumeProps,
  AudioPlayerCtx,
  AudioPlayerVariantProps,
} from "./types";
export {
  audioPlayerVariants,
  audioPlayerTrackVariants,
  audioPlayerBarVariants,
  audioPlayerTimeVariants,
} from "./variants";
