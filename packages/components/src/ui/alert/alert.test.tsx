import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  AlertClose,
  AlertDefaultIcon,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "./alert-base";
import { Alert } from "./alert";

describe("Alert", () => {
  describe("public contract and metadata", () => {
    it("should expose displayName on compound parts", () => {
      expect(Alert.displayName).toBe("Alert");
      expect(AlertIcon.displayName).toBe("AlertIcon");
      expect(AlertTitle.displayName).toBe("AlertTitle");
      expect(AlertDescription.displayName).toBe("AlertDescription");
      expect(AlertClose.displayName).toBe("AlertClose");
    });

    it("should stamp data-slot on the root element", () => {
      render(
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
        </Alert>,
      );
      const root = document.querySelector('[data-slot="alert"]');
      expect(root).toBeTruthy();
      expect(root?.getAttribute("data-slot")).toBe("alert");
    });
  });

  describe("semantics and live region", () => {
    it("should use role alert and polite live region for non-error appearances", () => {
      render(
        <Alert appearance="info">
          <AlertTitle>Info</AlertTitle>
        </Alert>,
      );
      const live = screen.getByRole("alert");
      expect(live.getAttribute("aria-live")).toBe("polite");
    });

    it("should use assertive live region for error appearance", () => {
      render(
        <Alert appearance="error">
          <AlertTitle>Error</AlertTitle>
        </Alert>,
      );
      expect(screen.getByRole("alert").getAttribute("aria-live")).toBe(
        "assertive",
      );
    });
  });

  describe("closable behavior", () => {
    it("should render a dismiss control when closable is true", () => {
      render(
        <Alert closable closeLabel="Remove warning">
          <AlertTitle>Warning</AlertTitle>
        </Alert>,
      );
      expect(
        screen.getByRole("button", { name: "Remove warning" }),
      ).toHaveAttribute("data-slot", "alert-close");
    });

    it("should invoke onClose when the built-in dismiss button is activated", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(
        <Alert closable onClose={handleClose}>
          <AlertTitle>Dismissible</AlertTitle>
        </Alert>,
      );
      await user.click(screen.getByRole("button", { name: /dismiss alert/i }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("should allow AlertClose to run a custom handler", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(
        <Alert>
          <AlertTitle>Manual close</AlertTitle>
          <AlertClose aria-label="Close" onClick={handleClose}>
            ×
          </AlertClose>
        </Alert>,
      );
      await user.click(screen.getByRole("button", { name: "Close" }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("composition", () => {
    it("should render compound slots for icon, title, and description", () => {
      render(
        <Alert>
          <AlertIcon>
            <span data-testid="custom-icon">!</span>
          </AlertIcon>
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Description body</AlertDescription>
        </Alert>,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      expect(
        document.querySelector('[data-slot="alert-title"]'),
      ).toHaveTextContent("Title");
      expect(
        document.querySelector('[data-slot="alert-description"]'),
      ).toHaveTextContent("Description body");
    });

    it("should apply appearance classes from the variant recipe", () => {
      render(
        <Alert appearance="success">
          <AlertTitle>Done</AlertTitle>
        </Alert>,
      );
      const root = document.querySelector('[data-slot="alert"]') as HTMLElement;
      expect(root.className).toMatch(/border-emerald-500/);
    });
  });

  describe("ref forwarding", () => {
    it("should forward ref to the motion root", () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Alert ref={ref}>
          <AlertTitle>Ref</AlertTitle>
        </Alert>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.getAttribute("data-slot")).toBe("alert");
    });
  });

  describe("AlertDefaultIcon", () => {
    it("should render error icon markup when appearance is error", () => {
      const { container } = render(<AlertDefaultIcon appearance="error" />);
      expect(container.querySelector("svg")).toBeTruthy();
    });
  });
});
