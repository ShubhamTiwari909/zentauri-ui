import type { AudioPlayerProps } from "@zentauri-ui/zentauri-components/ui/audio-player";

export const AUDIO_PLAYER_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "blue",
  "cyan",
  "green",
  "lime",
  "mint",
  "ocean",
  "sapphire",
  "lavender",
  "ruby",
  "red",
  "slate",
  "zinc",
  "royal",
  "electric",
  "forest",
  "sunset",
  "magenta",
  "crimson",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<AudioPlayerProps["appearance"]>[];

export const AUDIO_PLAYER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<AudioPlayerProps["size"]>[];

export const AUDIO_PLAYER_SHAPES = [
  "flat",
  "rounded",
  "pill",
] as const satisfies readonly NonNullable<AudioPlayerProps["shape"]>[];

export const DEMO_AUDIO_SRC =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
