import { useEffect } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { ToastAnimation } from "./types";

import { ToastProvider, ToastViewport, useToast } from "./toast";

function ToastHarness({
  title,
  appearance,
  id,
  durationMs,
  animation,
}: {
  title: string;
  appearance?: "default" | "success" | "error" | "warning" | "info";
  id?: string;
  durationMs?: number;
  animation?: ToastAnimation;
}) {
  const { toast: push } = useToast();
  useEffect(() => {
    push({ title, appearance, id, durationMs, animation });
  }, [animation, appearance, durationMs, id, push, title]);
  return <ToastViewport />;
}

describe("Toast", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should expose displayName on provider and viewport", () => {
    expect(ToastProvider.displayName).toBe("ToastProvider");
    expect(ToastViewport.displayName).toBe("ToastViewport");
  });

  it("should render pushed toasts in the viewport portal", async () => {
    render(
      <ToastProvider>
        <ToastHarness title="Saved" id="toast-saved" durationMs={60_000} />
      </ToastProvider>,
    );
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="toast-viewport"]')).toBeTruthy();
    expect(document.querySelector('[data-slot="toast"]')).toBeTruthy();
  });

  it("should use role alert for error toasts", async () => {
    render(
      <ToastProvider>
        <ToastHarness title="Failed" appearance="error" id="toast-err" durationMs={60_000} />
      </ToastProvider>,
    );
    const root = await screen.findByRole("alert");
    expect(root.getAttribute("data-slot")).toBe("toast");
    expect(root).toHaveTextContent("Failed");
  });

  it("should dismiss when the close control is used", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastHarness title="Closable" id="toast-close" durationMs={60_000} />
      </ToastProvider>,
    );
    expect(await screen.findByText("Closable")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /dismiss notification/i }));
    await waitFor(() => {
      expect(screen.queryByText("Closable")).not.toBeInTheDocument();
    });
  });

  it(
    "should auto-dismiss after durationMs",
    async () => {
      render(
        <ToastProvider>
          <ToastHarness
            title="Short lived"
            id="toast-auto"
            durationMs={80}
            animation="none"
          />
        </ToastProvider>,
      );
      expect(await screen.findByText("Short lived")).toBeInTheDocument();
      await waitFor(
        () => {
          expect(screen.queryByText("Short lived")).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    },
    5000,
  );
});
