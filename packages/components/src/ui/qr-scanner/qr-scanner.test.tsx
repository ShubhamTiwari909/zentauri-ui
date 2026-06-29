import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeAll } from "vitest";

import { QrScanner } from "./qr-scanner";
import type { QrScannerRef } from "./types";

const mockGetUserMedia = vi.fn();

beforeAll(() => {
  Object.defineProperty(globalThis.navigator, "mediaDevices", {
    value: {
      getUserMedia: mockGetUserMedia,
    },
    configurable: true,
  });
});

describe("QrScanner", () => {
  it("should expose displayName", () => {
    expect(QrScanner.displayName).toBe("QrScanner");
  });

  it("should stamp data-slot", () => {
    render(<QrScanner onResult={vi.fn()} autoStart={false} />);
    const root = document.querySelector('[data-slot="qr-scanner"]');
    expect(root).toBeTruthy();
    expect(root?.getAttribute("data-slot")).toBe("qr-scanner");
  });

  it("should show fallback when camera fails", async () => {
    mockGetUserMedia.mockRejectedValueOnce(
      new DOMException("Camera not found", "NotFoundError"),
    );
    render(<QrScanner onResult={vi.fn()} autoStart={true} />);
    const fallback = await screen.findByText("Camera not available");
    expect(fallback).toBeInTheDocument();
  });

  it("should forward ref with imperative handle", () => {
    const ref = createRef<QrScannerRef>();
    render(<QrScanner onResult={vi.fn()} autoStart={false} ref={ref} />);
    expect(ref.current).toBeTruthy();
    expect(typeof ref.current?.start).toBe("function");
    expect(typeof ref.current?.stop).toBe("function");
    expect(typeof ref.current?.scanImage).toBe("function");
    expect(typeof ref.current?.isScanning).toBe("boolean");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <QrScanner
        onResult={vi.fn()}
        autoStart={false}
        className="custom-class"
      />,
    );
    const root = container.querySelector('[data-slot="qr-scanner"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});
