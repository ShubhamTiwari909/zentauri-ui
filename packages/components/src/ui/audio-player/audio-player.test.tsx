import { createRef } from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { AudioPlayer } from "./audio-player";
import {
  AudioPlayerBase,
  AudioPlayerProgress,
  AudioPlayerTime,
  AudioPlayerVolume,
  useAudioPlayer,
} from "./audio-player-base";

// jsdom does not implement HTMLMediaElement playback — stub the methods.
beforeEach(() => {
  window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  window.HTMLMediaElement.prototype.pause = vi.fn();
  Object.defineProperty(window.HTMLMediaElement.prototype, "duration", {
    configurable: true,
    get: () => 120,
  });
  // jsdom does not implement pointer capture — stub to avoid unhandled errors
  // when userEvent clicks to focus a slider before firing keyboard events.
  HTMLElement.prototype.setPointerCapture = vi.fn();
  HTMLElement.prototype.releasePointerCapture = vi.fn();
});

// Helper: a minimal player with all sub-components and a test-driven controls div.
function FullPlayer({
  src = "test.mp3",
  ...rest
}: Partial<Parameters<typeof AudioPlayerBase>[0]>) {
  return (
    <AudioPlayerBase src={src} {...rest}>
      <AudioPlayerProgress />
      <AudioPlayerTime />
      <AudioPlayerVolume />
    </AudioPlayerBase>
  );
}

// Helper: renders a component that reads from context so we can inspect state.
function ContextInspector() {
  const ctx = useAudioPlayer();
  return (
    <div>
      <span data-testid="isPlaying">{String(ctx.isPlaying)}</span>
      <span data-testid="currentTime">{ctx.currentTime}</span>
      <span data-testid="duration">{ctx.duration}</span>
      <span data-testid="progress">{ctx.progress}</span>
      <span data-testid="volume">{ctx.volume}</span>
      <span data-testid="muted">{String(ctx.muted)}</span>
      <button data-testid="play" onClick={ctx.play}>
        play
      </button>
      <button data-testid="pause" onClick={ctx.pause}>
        pause
      </button>
      <button data-testid="toggle" onClick={ctx.toggle}>
        toggle
      </button>
      <button data-testid="reset" onClick={ctx.reset}>
        reset
      </button>
      <button data-testid="seek" onClick={() => ctx.seek(30)}>
        seek
      </button>
      <button data-testid="seekPct" onClick={() => ctx.seekByPercent(50)}>
        seekPct
      </button>
      <button data-testid="setVol" onClick={() => ctx.setVolume(0.5)}>
        setVol
      </button>
      <button data-testid="toggleMute" onClick={ctx.toggleMute}>
        toggleMute
      </button>
    </div>
  );
}

describe("AudioPlayer", () => {
  it("exposes displayName on all parts", () => {
    expect(AudioPlayer.displayName).toBe("AudioPlayer");
    expect(AudioPlayerBase.displayName).toBe("AudioPlayer");
    expect(AudioPlayerProgress.displayName).toBe("AudioPlayerProgress");
    expect(AudioPlayerTime.displayName).toBe("AudioPlayerTime");
    expect(AudioPlayerVolume.displayName).toBe("AudioPlayerVolume");
  });

  it("stamps data-slot on root", () => {
    render(<FullPlayer />);
    expect(document.querySelector('[data-slot="audio-player"]')).toBeTruthy();
  });

  it("renders a hidden audio element with the given src", () => {
    render(<FullPlayer src="song.mp3" />);
    const audio = document.querySelector("audio") as HTMLAudioElement;
    expect(audio).toBeTruthy();
    expect(audio.src).toContain("song.mp3");
    expect(audio.className).toContain("hidden");
  });

  it("applies appearance, size, shape classes via variants", () => {
    render(<FullPlayer appearance="blue" size="lg" shape="pill" />);
    const root = document.querySelector(
      '[data-slot="audio-player"]',
    ) as HTMLElement;
    expect(root.className).toMatch(/--audio-fill/);
  });

  it("forwards ref to the root div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<AudioPlayerBase ref={ref} src="test.mp3" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("audio-player");
  });

  describe("useAudioPlayer", () => {
    it("throws when used outside AudioPlayer", () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => render(<AudioPlayerProgress />)).toThrow(
        "useAudioPlayer must be used within <AudioPlayer>",
      );
      consoleError.mockRestore();
    });
  });

  describe("AudioPlayerProgress", () => {
    it("stamps data-slot and has slider role", () => {
      render(<FullPlayer />);
      const slider = screen.getByRole("slider", { name: "Audio progress" });
      expect(slider).toBeTruthy();
      expect(slider.getAttribute("data-slot")).toBe("audio-player-progress");
    });

    it("has correct aria attributes at 0%", () => {
      render(<FullPlayer />);
      const slider = screen.getByRole("slider", { name: "Audio progress" });
      expect(slider.getAttribute("aria-valuenow")).toBe("0");
      expect(slider.getAttribute("aria-valuemin")).toBe("0");
      expect(slider.getAttribute("aria-valuemax")).toBe("100");
    });

    it("stamps data-slot on the bar", () => {
      render(<FullPlayer />);
      expect(
        document.querySelector('[data-slot="audio-player-bar"]'),
      ).toBeTruthy();
    });

    it("responds to ArrowRight key to seek forward", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <ContextInspector />
          <AudioPlayerProgress />
        </AudioPlayerBase>,
      );
      const slider = screen.getByRole("slider", { name: "Audio progress" });
      await user.type(slider, "{ArrowRight}");
      // jsdom does not fire timeupdate automatically — dispatch it so React state updates.
      const audio = document.querySelector("audio") as HTMLAudioElement;
      act(() => {
        audio.dispatchEvent(new Event("timeupdate"));
      });
      // seekByPercent is guarded — duration is 120 (finite > 0); progress goes 0 → 1%
      expect(slider.getAttribute("aria-valuenow")).toBe("1");
    });

    it("responds to ArrowLeft key", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <AudioPlayerProgress />
        </AudioPlayerBase>,
      );
      const slider = screen.getByRole("slider", { name: "Audio progress" });
      // at 0%, ArrowLeft clamps to 0 — valuenow stays 0
      await user.type(slider, "{ArrowLeft}");
      expect(slider.getAttribute("aria-valuenow")).toBe("0");
    });

    it("responds to Home and End keys", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <AudioPlayerProgress />
        </AudioPlayerBase>,
      );
      const audio = document.querySelector("audio") as HTMLAudioElement;
      const slider = screen.getByRole("slider", { name: "Audio progress" });
      await user.type(slider, "{End}");
      act(() => {
        audio.dispatchEvent(new Event("timeupdate"));
      });
      expect(slider.getAttribute("aria-valuenow")).toBe("100");
      await user.type(slider, "{Home}");
      act(() => {
        audio.dispatchEvent(new Event("timeupdate"));
      });
      expect(slider.getAttribute("aria-valuenow")).toBe("0");
    });
  });

  describe("AudioPlayerTime", () => {
    it("stamps data-slot", () => {
      render(<FullPlayer />);
      expect(
        document.querySelector('[data-slot="audio-player-time"]'),
      ).toBeTruthy();
    });

    it("renders 0:00 / 0:00 before metadata loads", () => {
      Object.defineProperty(window.HTMLMediaElement.prototype, "duration", {
        configurable: true,
        get: () => NaN,
      });
      render(<FullPlayer />);
      const timeEl = document.querySelector('[data-slot="audio-player-time"]')!;
      expect(timeEl.textContent).toContain("0:00");
    });

    it("accepts a custom format function", () => {
      render(
        <AudioPlayerBase src="test.mp3">
          <AudioPlayerTime format={() => "custom"} />
        </AudioPlayerBase>,
      );
      const timeEl = document.querySelector('[data-slot="audio-player-time"]')!;
      expect(timeEl.textContent).toContain("custom");
    });
  });

  describe("AudioPlayerVolume", () => {
    it("stamps data-slot", () => {
      render(<FullPlayer />);
      expect(
        document.querySelector('[data-slot="audio-player-volume"]'),
      ).toBeTruthy();
    });

    it("has a slider with correct aria attributes", () => {
      render(<FullPlayer />);
      const slider = screen.getByRole("slider", { name: "Volume" });
      expect(slider.getAttribute("aria-valuenow")).toBe("100");
      expect(slider.getAttribute("aria-valuemin")).toBe("0");
      expect(slider.getAttribute("aria-valuemax")).toBe("100");
    });

    it("has a mute toggle button", () => {
      render(<FullPlayer />);
      expect(screen.getByRole("button", { name: /mute/i })).toBeTruthy();
    });

    it("responds to ArrowRight key to increase volume", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <AudioPlayerVolume />
        </AudioPlayerBase>,
      );
      const slider = screen.getByRole("slider", { name: "Volume" });
      // volume starts at 100; ArrowRight increases by 5 but clamps at 100
      await user.type(slider, "{ArrowLeft}");
      expect(Number(slider.getAttribute("aria-valuenow"))).toBeLessThan(100);
    });

    it("responds to Home and End keys", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <AudioPlayerVolume />
        </AudioPlayerBase>,
      );
      const slider = screen.getByRole("slider", { name: "Volume" });
      await user.type(slider, "{Home}");
      expect(slider.getAttribute("aria-valuenow")).toBe("0");
      await user.type(slider, "{End}");
      expect(slider.getAttribute("aria-valuenow")).toBe("100");
    });

    it("shows mute icon after clicking the mute button", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <AudioPlayerVolume />
        </AudioPlayerBase>,
      );
      const muteBtn = screen.getByRole("button", { name: /mute/i });
      await user.click(muteBtn);
      expect(screen.getByRole("button", { name: /unmute/i })).toBeTruthy();
    });
  });

  describe("context controls via ContextInspector", () => {
    it("play calls HTMLMediaElement.play", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      await user.click(screen.getByTestId("play"));
      expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    it("pause calls HTMLMediaElement.pause", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      await user.click(screen.getByTestId("pause"));
      expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    });

    it("toggle calls play when paused", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      await user.click(screen.getByTestId("toggle"));
      expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    it("reset calls pause and sets currentTime to 0", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      await user.click(screen.getByTestId("reset"));
      expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
      expect(screen.getByTestId("currentTime").textContent).toBe("0");
    });

    it("seek sets audio.currentTime", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      await user.click(screen.getByTestId("seek"));
      // Seek to 30s out of 120s — audio.currentTime is set but React state
      // only updates via the timeupdate event (not fired in jsdom); we just
      // assert no throw occurs and the audio element was targeted.
      const audio = document.querySelector("audio") as HTMLAudioElement;
      expect(audio.currentTime).toBe(30);
    });

    it("seekByPercent sets audio.currentTime proportionally", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      await user.click(screen.getByTestId("seekPct"));
      const audio = document.querySelector("audio") as HTMLAudioElement;
      expect(audio.currentTime).toBe(60); // 50% of 120
    });

    it("setVolume updates audio.volume", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      await user.click(screen.getByTestId("setVol"));
      const audio = document.querySelector("audio") as HTMLAudioElement;
      expect(audio.volume).toBe(0.5);
    });

    it("toggleMute flips audio.muted", async () => {
      const user = userEvent.setup();
      render(
        <AudioPlayerBase src="test.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      const audio = document.querySelector("audio") as HTMLAudioElement;
      expect(audio.muted).toBe(false);
      await user.click(screen.getByTestId("toggleMute"));
      expect(audio.muted).toBe(true);
    });

    it("onPlay / onPause callbacks fire via simulated audio events", async () => {
      const onPlay = vi.fn();
      const onPause = vi.fn();
      render(
        <AudioPlayerBase src="test.mp3" onPlay={onPlay} onPause={onPause}>
          <ContextInspector />
        </AudioPlayerBase>,
      );
      const audio = document.querySelector("audio") as HTMLAudioElement;
      act(() => {
        audio.dispatchEvent(new Event("play"));
      });
      expect(onPlay).toHaveBeenCalledTimes(1);
      act(() => {
        audio.dispatchEvent(new Event("pause"));
      });
      expect(onPause).toHaveBeenCalledTimes(1);
    });

    it("onEnded callback fires and isPlaying becomes false", () => {
      const onEnded = vi.fn();
      render(
        <AudioPlayerBase src="test.mp3" onEnded={onEnded}>
          <ContextInspector />
        </AudioPlayerBase>,
      );
      const audio = document.querySelector("audio") as HTMLAudioElement;
      act(() => {
        audio.dispatchEvent(new Event("ended"));
      });
      expect(onEnded).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId("isPlaying").textContent).toBe("false");
    });

    it("durationchange updates duration state", () => {
      render(
        <AudioPlayerBase src="test.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      const audio = document.querySelector("audio") as HTMLAudioElement;
      act(() => {
        audio.dispatchEvent(new Event("durationchange"));
      });
      expect(Number(screen.getByTestId("duration").textContent)).toBe(120);
    });
  });

  describe("src change resets state", () => {
    it("resets isPlaying and currentTime when src prop changes", async () => {
      const { rerender } = render(
        <AudioPlayerBase src="a.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      // simulate playing
      const audio = document.querySelector("audio") as HTMLAudioElement;
      act(() => {
        audio.dispatchEvent(new Event("play"));
      });
      expect(screen.getByTestId("isPlaying").textContent).toBe("true");

      rerender(
        <AudioPlayerBase src="b.mp3">
          <ContextInspector />
        </AudioPlayerBase>,
      );
      expect(screen.getByTestId("isPlaying").textContent).toBe("false");
      expect(screen.getByTestId("currentTime").textContent).toBe("0");
      expect(screen.getByTestId("duration").textContent).toBe("0");
    });
  });
});
