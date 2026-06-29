import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { QrCode } from "./qr-code";

vi.mock("qrcode", () => ({
  default: {
    toCanvas: vi.fn(
      (
        _canvas: HTMLCanvasElement,
        _value: string,
        _opts: unknown,
        cb?: (err?: Error) => void,
      ) => {
        cb?.();
      },
    ),
  },
}));

describe("QrCode", () => {
  it("should expose displayName", () => {
    expect(QrCode.displayName).toBe("QrCode");
  });

  it("should stamp data-slot", () => {
    render(<QrCode value="https://example.com" />);
    const root = document.querySelector('[data-slot="qr-code"]');
    expect(root).toBeTruthy();
    expect(root?.getAttribute("data-slot")).toBe("qr-code");
  });

  it("should render canvas element", () => {
    render(<QrCode value="https://example.com" />);
    const canvas = document.querySelector('[data-slot="qr-code-canvas"]');
    expect(canvas).toBeTruthy();
  });

  it("should render with caption", () => {
    render(<QrCode value="test" caption="Scan me" />);
    expect(screen.getByText("Scan me")).toBeInTheDocument();
  });

  it("should forward ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<QrCode value="test" ref={ref} />);
    expect(ref.current?.getAttribute("data-slot")).toBe("qr-code");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <QrCode value="test" className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="qr-code"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});
