import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("should expose displayName", () => {
    expect(Spinner.displayName).toBe("Spinner");
  });

  it("should stamp data-slot and status role on the root", () => {
    render(<Spinner />);
    const root = document.querySelector('[data-slot="spinner"]');
    expect(root).toBeTruthy();
    expect(screen.getByRole("status", { name: "Loading" })).toBe(root);
  });

  it("should honor a custom aria-label", () => {
    render(<Spinner aria-label="Saving" />);
    expect(screen.getByRole("status", { name: "Saving" })).toBeInTheDocument();
  });

  it.each(["ring", "dots", "pulse", "bars"] as const)(
    "should render without throwing for variant=%s",
    (variant) => {
      const { unmount } = render(<Spinner variant={variant} />);
      expect(screen.getByRole("status")).toBeVisible();
      unmount();
    },
  );

  describe("ref forwarding", () => {
    it("should attach ref to the root span", () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.getAttribute("data-slot")).toBe("spinner");
    });
  });
});
