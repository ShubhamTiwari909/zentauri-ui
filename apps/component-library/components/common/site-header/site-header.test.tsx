import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SiteHeader } from "./site-header";

const HEADER_SLOT_SELECTOR = '[data-slot="site-header"]';

function getHeaderSlot(container: HTMLElement = document.body) {
  const elements = container.querySelectorAll(HEADER_SLOT_SELECTOR);
  expect(elements.length).toBe(1);
  return elements[0] as HTMLElement;
}

describe("SiteHeader", () => {
  it("should stamp data-slot on the root element", () => {
    render(<SiteHeader />);
    expect(getHeaderSlot().getAttribute("data-slot")).toBe("site-header");
  });

  it("should set displayName for devtools", () => {
    expect(SiteHeader.displayName).toBe("SiteHeader");
  });

  it("should render logo link to home", () => {
    render(<SiteHeader />);
    const logo = screen.getByRole("link", { name: "Zentauri UI" });
    expect(logo).toHaveAttribute("href", "/");
  });

  it("should render primary nav links", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Components" })).toHaveAttribute("href", "/preview");
  });

  it("should wire menu toggle with aria-expanded and aria-controls when enabled", async () => {
    const user = userEvent.setup();
    const onMenuToggle = vi.fn();

    render(
      <SiteHeader
        showMenuToggle
        isMenuOpen={false}
        onMenuToggle={onMenuToggle}
        menuControlsId="sidebar-nav"
      />,
    );

    const toggle = screen.getByRole("button", { name: "Toggle navigation menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "sidebar-nav");

    await user.click(toggle);
    expect(onMenuToggle).toHaveBeenCalledTimes(1);
  });

  it("should reflect open state on menu toggle", () => {
    render(
      <SiteHeader
        showMenuToggle
        isMenuOpen
        onMenuToggle={vi.fn()}
        menuControlsId="sidebar-nav"
      />,
    );
    expect(screen.getByRole("button", { name: "Toggle navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("should open glass drawer with mobile nav when site navigation trigger is used", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const openSiteNav = screen.getByRole("button", { name: "Open site navigation", hidden: true });
    await user.click(openSiteNav);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog.getAttribute("data-slot")).toBe("drawer-content");
    expect(dialog.className).toMatch(/backdrop-blur/);
    expect(screen.getByRole("heading", { name: "Navigate" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Mobile main" })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });
});
