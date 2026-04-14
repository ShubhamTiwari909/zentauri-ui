import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SidebarNav } from "./sidebar-nav";
import * as navigation from "next/navigation";

// Abstract out route data to mock it safely if needed.
// By default we use the real one, but we can verify classes logic here.
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

// Mock sidebar-data to inject specific scenarios for testing (disabled links, external links)
vi.mock("@/components/sidebar/sidebar-data", () => ({
  sidebarRouteData: [
    {
      title: "Test Group",
      items: [
        { title: "Active Link", href: "/active" },
        { title: "Inactive Link", href: "/inactive" },
        { title: "Disabled Link", href: "/disabled", disabled: true },
        { title: "External Link", href: "https://external.com", external: true },
      ],
    },
    {
      title: "Empty Group",
      items: [],
    }
  ],
}));

describe("SidebarNav", () => {
  beforeEach(() => {
    vi.mocked(navigation.usePathname).mockReturnValue("/active");
  });

  it("renders groups and links correctly", () => {
    render(<SidebarNav />);
    
    // Group headers
    expect(screen.getByText("Test Group")).toBeInTheDocument();
    expect(screen.getByText("Empty Group")).toBeInTheDocument();
    
    // Links
    expect(screen.getByText("Active Link")).toBeInTheDocument();
    expect(screen.getByText("Inactive Link")).toBeInTheDocument();
    expect(screen.getByText("Disabled Link")).toBeInTheDocument();
    expect(screen.getByText("External Link")).toBeInTheDocument();
  });

  it("highlights the active link correctly", () => {
    render(<SidebarNav />);
    
    const activeLink = screen.getByText("Active Link");
    expect(activeLink).toHaveClass("text-cyan-400"); // Based on styling for active state
    expect(activeLink).toHaveClass("font-medium");

    const inactiveLink = screen.getByText("Inactive Link");
    expect(inactiveLink).not.toHaveClass("text-cyan-400");
    expect(inactiveLink).toHaveClass("text-slate-400");
  });

  it("applies disabled attributes safely", () => {
    render(<SidebarNav />);
    
    const disabledLink = screen.getByText("Disabled Link");
    expect(disabledLink).toHaveAttribute("href", "#");
    expect(disabledLink).toHaveClass("cursor-not-allowed");
    expect(disabledLink).toHaveClass("opacity-60");
  });

  it("applies external target to external links safely", () => {
    render(<SidebarNav />);
    
    const externalLink = screen.getByText("External Link");
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noreferrer");
    expect(externalLink).toHaveAttribute("href", "https://external.com");
  });

  it("triggers onLinkClick when a link is clicked", () => {
    const onLinkClickMock = vi.fn();
    render(<SidebarNav onLinkClick={onLinkClickMock} />);
    
    const inactiveLink = screen.getByText("Inactive Link");
    fireEvent.click(inactiveLink);
    
    expect(onLinkClickMock).toHaveBeenCalledTimes(1);
  });
});
