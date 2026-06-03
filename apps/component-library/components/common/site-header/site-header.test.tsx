import type { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@zentauri-ui/shared/site-header";

const HEADER_SLOT_SELECTOR = '[data-slot="site-header"]';

function getHeaderSlot(container: HTMLElement = document.body) {
  const elements = container.querySelectorAll(HEADER_SLOT_SELECTOR);
  expect(elements.length).toBe(1);
  return elements[0] as HTMLElement;
}

function TestSearchOpenButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} aria-label="Open site search" />
  );
}

function renderSiteHeader(props?: Partial<ComponentProps<typeof SiteHeader>>) {
  return render(
    <SiteHeader
      site="library"
      SearchOpenButton={TestSearchOpenButton}
      {...props}
    />,
  );
}

describe("SiteHeader", () => {
  it("should stamp data-slot on the root element", () => {
    renderSiteHeader();
    expect(getHeaderSlot().getAttribute("data-slot")).toBe("site-header");
  });

  it("should set displayName for devtools", () => {
    expect(SiteHeader.displayName).toBe("SiteHeader");
  });

  it("should render logo link to home", () => {
    renderSiteHeader();
    const logo = screen.getByRole("link", { name: /Zentauri UI/ });
    expect(logo).toHaveAttribute("href", "/");
  });

  it("should render primary nav links", () => {
    renderSiteHeader();
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Installation" })).toHaveAttribute(
      "href",
      "/preview/installation",
    );
    expect(screen.getByRole("link", { name: "Demos" })).toHaveAttribute(
      "href",
      "https://zentauri-ui-demo.vercel.app/demo",
    );
  });

  it("should group catalog links into the UI dropdown", async () => {
    const user = userEvent.setup();
    renderSiteHeader();

    await user.click(screen.getByRole("button", { name: /UI/ }));

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Components" })).toHaveAttribute(
      "href",
      "/preview/components",
    );
    expect(screen.getByRole("link", { name: "Animations" })).toHaveAttribute(
      "href",
      "/preview/animations",
    );
    expect(screen.getByRole("link", { name: "Charts" })).toHaveAttribute(
      "href",
      "/preview/charts",
    );
    expect(screen.getByRole("link", { name: "Typography" })).toHaveAttribute(
      "href",
      "/preview/typography",
    );
  });

  it("should wire menu toggle with aria-expanded and aria-controls when enabled", async () => {
    const user = userEvent.setup();
    const onMenuToggle = vi.fn();

    renderSiteHeader({
      showMenuToggle: true,
      isMenuOpen: false,
      onMenuToggle,
      menuControlsId: "sidebar-nav",
    });

    const toggle = screen.getByRole("button", {
      name: "Toggle navigation menu",
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "sidebar-nav");

    await user.click(toggle);
    expect(onMenuToggle).toHaveBeenCalledTimes(1);
  });

  it("should reflect open state on menu toggle", () => {
    renderSiteHeader({
      showMenuToggle: true,
      isMenuOpen: true,
      onMenuToggle: vi.fn(),
      menuControlsId: "sidebar-nav",
    });
    expect(
      screen.getByRole("button", { name: "Toggle navigation menu" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("should open glass drawer with mobile nav when site navigation trigger is used", async () => {
    const user = userEvent.setup();
    renderSiteHeader();

    const openSiteNav = screen.getByRole("button", {
      name: "Open site navigation",
      hidden: true,
    });
    await user.click(openSiteNav);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog.getAttribute("data-slot")).toBe("drawer-content");
    expect(dialog.className).toMatch(/backdrop-blur/);
    expect(
      screen.getByRole("heading", { name: "Navigate" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Mobile main" }),
    ).toBeInTheDocument();
  });
});
