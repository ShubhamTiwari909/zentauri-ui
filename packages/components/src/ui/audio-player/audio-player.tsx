import { AudioPlayerBase } from "./audio-player-base";
import type { AudioPlayerProps } from "./types";

export const AudioPlayer = (props: AudioPlayerProps) => {
  return <AudioPlayerBase {...props} />;
};

AudioPlayer.displayName = "AudioPlayer";
