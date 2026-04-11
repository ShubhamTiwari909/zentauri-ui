import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SidebarLayout } from "./sidebar-layout";

// Mock next/navigation for SidebarNav which is rendered inside SidebarLayout
vi.mock("next/navigation", () => ({
  usePathname: () => "/preview",
}));

describe("SidebarLayout", () => {
  const OriginalInnerWidth = window.innerWidth;

  beforeEach(() => {
    // Reset window width back to mobile for tests by default
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));
  });

  afterEach(() => {
    // Restore
    global.innerWidth = OriginalInnerWidth;
    vi.restoreAllMocks();
  });

  it("renders children successfully", () => {
    render(
      <SidebarLayout>
        <div data-testid="test-child">Child Content</div>
      </SidebarLayout>,
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("has mobile menu closed by default", () => {
    render(<SidebarLayout>Test</SidebarLayout>);

    // The aside should have the class "-translate-x-full" which hides it
    const aside = screen.getByRole("complementary"); // aside element
    expect(aside).toHaveClass("-translate-x-full");
  });

  it("opens mobile menu when hamburger is clicked", () => {
    render(<SidebarLayout>Test</SidebarLayout>);

    const toggleButton = screen.getByLabelText("Toggle navigation menu");
    fireEvent.click(toggleButton);

    const aside = screen.getByRole("complementary");
    expect(aside).toHaveClass("translate-x-0");
  });

  it("closes mobile menu when close button is clicked", () => {
    render(<SidebarLayout>Test</SidebarLayout>);

    const toggleButton = screen.getByLabelText("Toggle navigation menu");

    // Open it
    fireEvent.click(toggleButton);
    expect(screen.getByRole("complementary")).toHaveClass("translate-x-0");

    // Close it
    fireEvent.click(toggleButton);
    expect(screen.getByRole("complementary")).toHaveClass("-translate-x-full");
  });

  it("closes mobile menu when overlay is clicked", () => {
    render(<SidebarLayout>Test</SidebarLayout>);

    const toggleButton = screen.getByLabelText("Toggle navigation menu");

    // Open it
    fireEvent.click(toggleButton);

    // An overlay should be present when open
    // We didn't give it a role, but we can query by its class or structure
    // It's the div with fixed inset-0 z-30
    const overlay = document.querySelector(".fixed.inset-0.z-30");
    expect(overlay).toBeInTheDocument();

    if (overlay) {
      fireEvent.click(overlay);
    }

    expect(screen.getByRole("complementary")).toHaveClass("-translate-x-full");
  });
});
