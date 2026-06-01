import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "./empty-state";
import {
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "./empty-state-base";

const EMPTY_STATE_SLOT = '[data-slot="empty-state"]';

function getEmptyStateRoot(container: HTMLElement = document.body) {
  const elements = container.querySelectorAll(EMPTY_STATE_SLOT);
  expect(elements.length).toBe(1);
  return elements[0] as HTMLElement;
}

describe("EmptyState", () => {
  it("should set displayName on compound parts", () => {
    expect(EmptyState.displayName).toBe("EmptyState");
    expect(EmptyStateIcon.displayName).toBe("EmptyStateIcon");
    expect(EmptyStateTitle.displayName).toBe("EmptyStateTitle");
    expect(EmptyStateDescription.displayName).toBe("EmptyStateDescription");
    expect(EmptyStateAction.displayName).toBe("EmptyStateAction");
  });

  it("should stamp data-slot on the root section", () => {
    render(<EmptyState>Nothing here</EmptyState>);
    const root = getEmptyStateRoot();
    expect(root.tagName).toBe("SECTION");
    expect(root).toHaveAttribute("data-slot", "empty-state");
  });

  it("should render title, description, icon, and action slots", () => {
    render(
      <EmptyState>
        <EmptyStateIcon>!</EmptyStateIcon>
        <EmptyStateTitle>No results</EmptyStateTitle>
        <EmptyStateDescription>Try another filter.</EmptyStateDescription>
        <EmptyStateAction>
          <button type="button">Reset</button>
        </EmptyStateAction>
      </EmptyState>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "No results" }),
    ).toHaveAttribute("data-slot", "empty-state-title");
    expect(screen.getByText("Try another filter.")).toHaveAttribute(
      "data-slot",
      "empty-state-description",
    );
    expect(screen.getByText("!")).toHaveAttribute(
      "data-slot",
      "empty-state-icon",
    );
    expect(screen.getByRole("button", { name: "Reset" })).toBeVisible();
  });

  it("should apply live region state when requested", () => {
    render(<EmptyState liveRegion="assertive">Updated</EmptyState>);
    expect(getEmptyStateRoot()).toHaveAttribute("aria-live", "assertive");
  });

  it("should apply size classes to nested text slots through context", () => {
    render(
      <EmptyState size="lg">
        <EmptyStateTitle>Large title</EmptyStateTitle>
        <EmptyStateDescription>Large description</EmptyStateDescription>
      </EmptyState>,
    );

    expect(screen.getByText("Large title").className).toMatch(/text-xl/);
    expect(screen.getByText("Large description").className).toMatch(
      /text-base/,
    );
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLElement>();
    render(<EmptyState ref={ref}>Empty</EmptyState>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("empty-state");
  });
});
