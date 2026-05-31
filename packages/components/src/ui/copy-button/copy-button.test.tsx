import { createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CopyButton } from "./copy-button";

describe("CopyButton", () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: originalClipboard,
    });
  });

  it("should expose displayName", () => {
    expect(CopyButton.displayName).toBe("CopyButton");
  });

  it("should stamp data-slot", () => {
    render(<CopyButton value="npm i zentauri" />);
    expect(
      document.querySelector('[data-slot="copy-button"]'),
    ).toBeInTheDocument();
  });

  it("should write the value to the clipboard on click", async () => {
    render(<CopyButton value="copy me" />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("copy me"),
    );
  });

  it("should call onCopy after a successful copy", async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    render(<CopyButton value="token-123" onCopy={onCopy} />);
    await user.click(screen.getByRole("button"));
    await waitFor(() => expect(onCopy).toHaveBeenCalledWith("token-123"));
  });

  it("should flip to the copied state and mark data-copied", async () => {
    const user = userEvent.setup();
    render(<CopyButton value="x" timeout={0} copiedLabel="Copied!" />);
    const button = screen.getByRole("button");
    await user.click(button);
    await waitFor(() =>
      expect(button.getAttribute("data-copied")).toBe("true"),
    );
  });

  it("should render the label when iconOnly is false", () => {
    render(<CopyButton value="x" iconOnly={false} label="Copy code" />);
    expect(screen.getByText("Copy code")).toBeInTheDocument();
  });

  it("should apply the secondary appearance token", () => {
    render(<CopyButton value="x" appearance="secondary" />);
    const button = document.querySelector(
      '[data-slot="copy-button"]',
    ) as HTMLElement;
    expect(button.className).toMatch(/--zui-copy-button-secondary-bg/);
  });

  it("should forward ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<CopyButton ref={ref} value="x" />);
    expect(ref.current?.getAttribute("data-slot")).toBe("copy-button");
  });
});
