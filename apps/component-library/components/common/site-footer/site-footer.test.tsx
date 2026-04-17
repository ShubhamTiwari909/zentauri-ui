import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./site-footer";

const FOOTER_SLOT_SELECTOR = '[data-slot="site-footer"]';

function getFooterSlot(container: HTMLElement = document.body) {
  const elements = container.querySelectorAll(FOOTER_SLOT_SELECTOR);
  expect(elements.length).toBe(1);
  return elements[0] as HTMLElement;
}

describe("SiteFooter", () => {
  it("should stamp data-slot on the root element", () => {
    render(<SiteFooter />);
    const root = getFooterSlot();
    expect(root.getAttribute("data-slot")).toBe("site-footer");
  });

  it("should set displayName for devtools", () => {
    expect(SiteFooter.displayName).toBe("SiteFooter");
  });

  it("should expose footer landmark and navigation region", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Footer" }),
    ).toBeInTheDocument();
  });

  it("should render primary nav links", () => {
    render(<SiteFooter />);
    const nav = screen.getByRole("navigation", { name: "Footer" });
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      within(nav).getByRole("link", { name: "Components" }),
    ).toHaveAttribute("href", "/preview");
    const github = within(nav).getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute(
      "href",
      "https://github.com/ShubhamTiwari909/zentauri-ui",
    );
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
  });
});
