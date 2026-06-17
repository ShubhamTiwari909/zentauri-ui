import type { AudioPlayerProps } from "@zentauri-ui/zentauri-components/ui/audio-player";

export type AudioPlayerAppearance = NonNullable<AudioPlayerProps["appearance"]>;
export type AudioPlayerSize = NonNullable<AudioPlayerProps["size"]>;
export type AudioPlayerShape = NonNullable<AudioPlayerProps["shape"]>;

export type AudioPlayerDemoProps = {
  appearance: AudioPlayerAppearance;
  size: AudioPlayerSize;
  shape: AudioPlayerShape;
  src: string;
};
