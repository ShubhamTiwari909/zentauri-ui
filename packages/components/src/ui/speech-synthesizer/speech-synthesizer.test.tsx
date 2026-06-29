import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SpeechSynthesizer } from "./speech-synthesizer";

describe("SpeechSynthesizer", () => {
  it("should set displayName", () => {
    expect(SpeechSynthesizer.displayName).toBe("SpeechSynthesizer");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<SpeechSynthesizer />);
    const root = container.querySelector('[data-slot="speech-synthesizer"]');
    expect(root).toBeTruthy();
  });

  it("should render a play button when idle", () => {
    const { container } = render(<SpeechSynthesizer />);
    const btn = container.querySelector(
      '[data-slot="speech-synthesizer-play-btn"]',
    );
    expect(btn).toBeTruthy();
  });

  it("should render text when provided", () => {
    const { container } = render(<SpeechSynthesizer text="Hello world" />);
    const textEl = container.querySelector(
      '[data-slot="speech-synthesizer-text"]',
    );
    expect(textEl).toBeTruthy();
    expect(textEl?.textContent).toBe("Hello world");
  });

  it("should not render text when not provided", () => {
    const { container } = render(<SpeechSynthesizer />);
    const textEl = container.querySelector(
      '[data-slot="speech-synthesizer-text"]',
    );
    expect(textEl).toBeFalsy();
  });

  it("should render children when provided", () => {
    const { container } = render(
      <SpeechSynthesizer>
        <div data-testid="child" />
      </SpeechSynthesizer>,
    );
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it("should expose an imperative handle with speak, pause, resume, stop methods", () => {
    const ref = createRef<{
      speak: () => void;
      pause: () => void;
      resume: () => void;
      stop: () => void;
      state: string;
    }>();
    render(<SpeechSynthesizer ref={ref as any} />);
    expect(ref.current).toBeTruthy();
    expect(typeof ref.current?.speak).toBe("function");
    expect(typeof ref.current?.pause).toBe("function");
    expect(typeof ref.current?.resume).toBe("function");
    expect(typeof ref.current?.stop).toBe("function");
  });

  it("should set default state to idle", () => {
    const ref = createRef<{
      speak: () => void;
      pause: () => void;
      resume: () => void;
      stop: () => void;
      state: string;
    }>();
    render(<SpeechSynthesizer ref={ref as any} />);
    expect(ref.current?.state).toBe("idle");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <SpeechSynthesizer className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="speech-synthesizer"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});
