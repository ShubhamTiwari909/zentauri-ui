import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { AudioPlayerDemoProps } from "./types";

export function audioPlayerSnippet(opts: AudioPlayerDemoProps): string {
  const { appearance, size, shape } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const shapeAttr = shape === "rounded" ? "" : ` shape="${shape}"`;
  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}, shape · ${shape}`,
  );
  return `${lead}function PlayerControls() {
  const { toggle, reset, isPlaying } = useAudioPlayer();
  return (
    <div className="flex flex-col gap-3">
      <AudioPlayerProgress />
      <div className="flex items-center justify-between gap-3">
        <AudioPlayerTime />
        <div className="flex items-center gap-2">
          <Button appearance="ghost" size="icon" onClick={reset} aria-label="Reset">
            {/* reset icon */}
          </Button>
          <Button
            appearance="ghost"
            size="icon"
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="rounded-full [background:var(--audio-fill,currentColor)] text-white dark:text-black"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
        </div>
        <AudioPlayerVolume />
      </div>
    </div>
  );
}

<AudioPlayer src="/your-audio.mp3"${appearanceAttr}${sizeAttr}${shapeAttr}>
  <PlayerControls />
</AudioPlayer>`;
}
