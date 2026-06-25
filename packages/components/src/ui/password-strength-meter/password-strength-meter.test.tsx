import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PasswordStrengthMeter } from "./password-strength-meter";
import { PasswordStrengthMeterBar } from "./password-strength-meter-base";

describe("PasswordStrengthMeter", () => {
  it("should expose displayName on compound parts", () => {
    expect(PasswordStrengthMeter.displayName).toBe("PasswordStrengthMeter");
    expect(PasswordStrengthMeterBar.displayName).toBe(
      "PasswordStrengthMeterBar",
    );
  });

  it("should stamp data-slot on the root and default bar track", () => {
    render(<PasswordStrengthMeter value={40} />);
    expect(
      document.querySelector('[data-slot="password-strength-meter"]'),
    ).toBeTruthy();
    expect(
      document.querySelector('[data-slot="password-strength-meter-track"]'),
    ).toBeTruthy();
    expect(
      document.querySelector('[data-slot="password-strength-meter-bar"]'),
    ).toBeTruthy();
  });

  it("should expose meter semantics with clamped value", () => {
    render(<PasswordStrengthMeter value={120} min={0} max={100} />);
    const meter = screen.getByRole("meter");
    expect(meter.getAttribute("aria-valuemin")).toBe("0");
    expect(meter.getAttribute("aria-valuemax")).toBe("100");
    expect(meter.getAttribute("aria-valuenow")).toBe("100");
  });

  it("should clamp below the minimum", () => {
    render(<PasswordStrengthMeter value={-5} min={0} max={100} />);
    expect(screen.getByRole("meter").getAttribute("aria-valuenow")).toBe("0");
  });

  it("should render strength label based on value", () => {
    render(<PasswordStrengthMeter value={10} showScoreLabel />);
    expect(
      document.querySelector(
        '[data-slot="password-strength-meter-score-label"]',
      ),
    ).toHaveTextContent("Weak");
  });

  it("should render 'Very strong' for high values", () => {
    render(<PasswordStrengthMeter value={95} showScoreLabel />);
    expect(
      document.querySelector(
        '[data-slot="password-strength-meter-score-label"]',
      ),
    ).toHaveTextContent("Very strong");
  });

  it("should not show score label when showScoreLabel is false", () => {
    render(<PasswordStrengthMeter value={50} showScoreLabel={false} />);
    expect(
      document.querySelector(
        '[data-slot="password-strength-meter-score-label"]',
      ),
    ).toBeNull();
  });

  it("should render custom label", () => {
    render(<PasswordStrengthMeter value={50} label="Password" />);
    expect(
      document.querySelector('[data-slot="password-strength-meter-label"]'),
    ).toHaveTextContent("Password");
  });

  it("should render custom scoreLabel", () => {
    render(<PasswordStrengthMeter value={50} scoreLabel="Medium" />);
    expect(
      document.querySelector(
        '[data-slot="password-strength-meter-score-label"]',
      ),
    ).toHaveTextContent("Medium");
  });

  it("should apply appearance classes from the variant recipe", () => {
    render(<PasswordStrengthMeter value={50} appearance="emerald" />);
    const root = document.querySelector(
      '[data-slot="password-strength-meter"]',
    ) as HTMLElement;
    expect(root.className).toMatch(/--psm-fill/);
  });

  describe("ref forwarding", () => {
    it("should forward ref to the root", () => {
      const ref = createRef<HTMLDivElement>();
      render(<PasswordStrengthMeter ref={ref} value={5} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.getAttribute("data-slot")).toBe(
        "password-strength-meter",
      );
    });
  });
});
