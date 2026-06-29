import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SpeechRecognition } from "./speech-recognition";

describe("SpeechRecognition", () => {
  it("should set displayName", () => {
    expect(SpeechRecognition.displayName).toBe("SpeechRecognition");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<SpeechRecognition />);
    const root = container.querySelector('[data-slot="speech-recognition"]');
    expect(root).toBeTruthy();
  });

  it("should render a mic button", () => {
    const { container } = render(<SpeechRecognition />);
    const btn = container.querySelector('[data-slot="speech-recognition-btn"]');
    expect(btn).toBeTruthy();
  });

  it("should render a status label", () => {
    const { container } = render(<SpeechRecognition />);
    const status = container.querySelector(
      '[data-slot="speech-recognition-status"]',
    );
    expect(status).toBeTruthy();
    expect(status?.textContent).toContain("start listening");
  });

  it("should render children when provided", () => {
    const { container } = render(
      <SpeechRecognition>
        <div data-testid="child" />
      </SpeechRecognition>,
    );
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it("should expose an imperative handle with start, stop, abort methods", () => {
    const ref = createRef<{
      start: () => void;
      stop: () => void;
      abort: () => void;
      state: string;
    }>();
    render(<SpeechRecognition ref={ref as any} />);
    expect(ref.current).toBeTruthy();
    expect(typeof ref.current?.start).toBe("function");
    expect(typeof ref.current?.stop).toBe("function");
    expect(typeof ref.current?.abort).toBe("function");
  });

  it("should set default state to idle", () => {
    const ref = createRef<{
      start: () => void;
      stop: () => void;
      abort: () => void;
      state: string;
    }>();
    render(<SpeechRecognition ref={ref as any} />);
    expect(ref.current?.state).toBe("idle");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <SpeechRecognition className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="speech-recognition"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});
