import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonText,
} from "./skeleton";

describe("Skeleton", () => {
  it("should set displayName on skeleton primitives", () => {
    expect(Skeleton.displayName).toBe("Skeleton");
    expect(SkeletonText.displayName).toBe("SkeletonText");
    expect(SkeletonAvatar.displayName).toBe("SkeletonAvatar");
    expect(SkeletonCard.displayName).toBe("SkeletonCard");
    expect(SkeletonButton.displayName).toBe("SkeletonButton");
  });

  it("should stamp data-slot and hide the placeholder from assistive tech", () => {
    const { container } = render(<Skeleton busy />);
    const root = container.querySelector('[data-slot="skeleton"]');
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root).toHaveAttribute("aria-busy", "true");
  });

  it("should apply pulse motion when animation is not none", () => {
    const { container } = render(<Skeleton animation="pulse" />);
    expect(
      container.querySelector('[data-slot="skeleton"]')?.className,
    ).toMatch(/animate-pulse/);
  });

  it("should omit motion classes when animation is none", () => {
    const { container } = render(<Skeleton animation="none" />);
    expect(
      container.querySelector('[data-slot="skeleton"]')?.className,
    ).not.toMatch(/animate-pulse/);
  });

  it("should render the requested number of text lines", () => {
    const { container } = render(<SkeletonText lines={4} />);
    const root = container.querySelector('[data-slot="skeleton-text"]');
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root?.children.length).toBe(4);
    expect(root?.lastElementChild?.className).toMatch(/w-3\/5/);
  });

  it("should share parent animation with nested text placeholders", () => {
    const { container } = render(
      <Skeleton animation="none">
        <SkeletonText lines={2} />
      </Skeleton>,
    );
    const text = container.querySelector('[data-slot="skeleton-text"]');
    expect(text?.firstElementChild?.className).not.toMatch(/animate-pulse/);
  });

  it("should render avatar, button, and card slots", () => {
    const { container } = render(
      <>
        <SkeletonAvatar avatarSize="xl" />
        <SkeletonButton buttonSize="lg" />
        <SkeletonCard />
      </>,
    );

    expect(
      container.querySelector('[data-slot="skeleton-avatar"]'),
    ).toHaveClass("size-14");
    expect(
      container.querySelector('[data-slot="skeleton-button"]'),
    ).toHaveClass("h-12");
    expect(container.querySelector('[data-slot="skeleton-card"]')).toBeTruthy();
  });

  it("should forward refs to the base skeleton element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("skeleton");
  });
});
