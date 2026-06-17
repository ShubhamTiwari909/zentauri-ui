"use client";

import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  AudioPlayer,
  AudioPlayerProgress,
  AudioPlayerTime,
  AudioPlayerVolume,
  useAudioPlayer,
} from "@zentauri-ui/zentauri-components/ui/audio-player";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";

import { DEMO_AUDIO_SRC } from "./components/data";

function HeroPlayerControls() {
  const { toggle, reset, isPlaying } = useAudioPlayer();
  return (
    <div className="flex flex-col gap-3">
      <AudioPlayerProgress />
      <div className="flex items-center justify-between gap-3 flex-wrap">
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
            appearance="ghost"
            size="icon"
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="rounded-full [background:var(--audio-fill,currentColor)] text-white dark:text-black hover:opacity-80 hover:bg-transparent"
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

export function AudioPlayerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <AudioPlayer src={DEMO_AUDIO_SRC} appearance="blue" shape="rounded">
            <HeroPlayerControls />
          </AudioPlayer>
          <AudioPlayer
            src={DEMO_AUDIO_SRC}
            appearance="gradient-purple"
            shape="pill"
          >
            <HeroPlayerControls />
          </AudioPlayer>
        </div>
      </div>
    </Section>
  );
}
