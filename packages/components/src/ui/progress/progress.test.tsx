import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Progress,
  ProgressBar,
  ProgressLabel,
  ProgressValue,
} from "./progress";

describe("Progress", () => {
  it("should expose displayName on compound parts", () => {
    expect(Progress.displayName).toBe("Progress");
    expect(ProgressBar.displayName).toBe("ProgressBar");
    expect(ProgressLabel.displayName).toBe("ProgressLabel");
    expect(ProgressValue.displayName).toBe("ProgressValue");
  });

  it("should stamp data-slot on the root and default bar track", () => {
    render(<Progress value={40} />);
    expect(document.querySelector('[data-slot="progress"]')).toBeTruthy();
    expect(document.querySelector('[data-slot="progress-track"]')).toBeTruthy();
    expect(document.querySelector('[data-slot="progress-bar"]')).toBeTruthy();
  });

  it("should expose progressbar semantics with clamped value", () => {
    render(<Progress value={120} min={0} max={100} label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
    expect(bar.getAttribute("aria-valuenow")).toBe("100");
  });

  it("should clamp below the minimum", () => {
    render(<Progress value={-5} min={0} max={100} />);
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe(
      "0",
    );
  });

  it("should render ProgressLabel and ProgressValue slots", () => {
    render(
      <Progress value={25} min={0} max={100}>
        <ProgressLabel>Status</ProgressLabel>
        <ProgressBar />
        <ProgressValue />
      </Progress>,
    );
    expect(
      document.querySelector('[data-slot="progress-label"]'),
    ).toHaveTextContent("Status");
    expect(
      document.querySelector('[data-slot="progress-value"]'),
    ).toHaveTextContent("25%");
  });

  it("should allow ProgressValue children to override the default percentage text", () => {
    render(
      <Progress value={10} min={0} max={100}>
        <ProgressBar />
        <ProgressValue>Almost empty</ProgressValue>
      </Progress>,
    );
    expect(
      document.querySelector('[data-slot="progress-value"]'),
    ).toHaveTextContent("Almost empty");
  });

  it("should apply appearance classes from the variant recipe", () => {
    render(<Progress value={50} appearance="emerald" />);
    const root = document.querySelector(
      '[data-slot="progress"]',
    ) as HTMLElement;
    expect(root.className).toMatch(/--progress-fill/);
  });

  describe("ref forwarding", () => {
    it("should forward ref to the motion root", () => {
      const ref = createRef<HTMLDivElement>();
      render(<Progress ref={ref} value={5} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.getAttribute("data-slot")).toBe("progress");
    });
  });
});
