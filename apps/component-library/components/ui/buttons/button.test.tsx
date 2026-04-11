import { createRef } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";
import type { ButtonAnimation } from "./types";

/** Stable selector contract for consumers of the design-system Button. */
const BUTTON_SLOT_SELECTOR = '[data-slot="button"]';

function getButtonSlot(container: HTMLElement = document.body) {
  const el = container.querySelector(BUTTON_SLOT_SELECTOR);
  expect(
    el,
    `Expected exactly one element matching ${BUTTON_SLOT_SELECTOR} in the document`,
  ).not.toBeNull();
  return el as HTMLElement;
}

describe("Button (component library)", () => {
  describe("public contract and metadata", () => {
    it("should expose a stable displayName for devtools and documentation consumers", () => {
      expect(Button.displayName, "Button.displayName must be set for library discoverability").toBe(
        "Button",
      );
    });

    it("should stamp data-slot on the root element so apps can target the primitive without role ambiguity", () => {
      render(<Button>Label</Button>);
      const root = getButtonSlot();
      expect(root.getAttribute("data-slot"), "data-slot must equal 'button' for the documented contract").toBe(
        "button",
      );
    });
  });

  describe("default rendering (button mode)", () => {
    it("should render a native button element with implicit button role for assistive technologies", () => {
      render(<Button>Save changes</Button>);
      const control = screen.getByRole("button", { name: "Save changes" });
      expect(control.tagName, "Default variant must render a BUTTON element").toBe("BUTTON");
    });

    it("should default type to button so it does not accidentally submit parent forms", () => {
      render(<Button>Neutral</Button>);
      const control = screen.getByRole("button", { name: "Neutral" });
      expect(control.getAttribute("type"), "type must default to 'button' inside forms").toBe("button");
    });

    it("should render provided text children as the accessible name", () => {
      render(<Button>Continue to checkout</Button>);
      expect(
        screen.getByRole("button", { name: "Continue to checkout" }),
        "Visible label must map to the control's accessible name",
      ).toBeVisible();
    });

    it("should support complex children while preserving a single root slot", () => {
      render(
        <Button>
          <span data-testid="leading-icon" aria-hidden="true">
            →
          </span>
          <span>Next</span>
        </Button>,
      );
      const root = getButtonSlot();
      expect(within(root).getByTestId("leading-icon"), "Leading decoration must stay inside the button root").toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Next" }), "Name from text content must remain resolvable").toBeInTheDocument();
    });
  });

  describe("props: type (native button semantics)", () => {
    it("should forward type='submit' for form submission controls", () => {
      render(<Button type="submit">Send</Button>);
      expect(
        screen.getByRole("button", { name: "Send" }).getAttribute("type"),
        "Consumers must be able to opt into submit behavior explicitly",
      ).toBe("submit");
    });

    it("should forward type='reset' for form reset controls", () => {
      render(<Button type="reset">Clear</Button>);
      expect(
        screen.getByRole("button", { name: "Clear" }).getAttribute("type"),
        "Consumers must be able to opt into reset behavior explicitly",
      ).toBe("reset");
    });
  });

  describe("props: appearance (variant class application)", () => {
    it("should apply default appearance styles from the variant recipe", () => {
      render(<Button>Default</Button>);
      const root = getButtonSlot();
      expect(root.className, "Default appearance must include the default surface token classes").toMatch(
        /bg-slate-50/,
      );
    });

    it("should apply secondary appearance when appearance='secondary'", () => {
      render(<Button appearance="secondary">Secondary</Button>);
      const root = getButtonSlot();
      expect(root.className, "Secondary appearance must switch to the slate surface recipe").toMatch(
        /bg-slate-800/,
      );
    });

    it("should apply destructive appearance when appearance='destructive'", () => {
      render(<Button appearance="destructive">Delete</Button>);
      const root = getButtonSlot();
      expect(root.className, "Destructive appearance must surface danger styling").toMatch(/bg-rose-600/);
    });

    it("should apply outline appearance when appearance='outline'", () => {
      render(<Button appearance="outline">Outline</Button>);
      const root = getButtonSlot();
      expect(root.className, "Outline appearance must include border and translucent surface classes").toMatch(
        /border-white\/10/,
      );
    });

    it("should apply gradient appearance tokens for gradient presets", () => {
      render(<Button appearance="gradient-blue">Gradient</Button>);
      const root = getButtonSlot();
      expect(
        root.className,
        "Gradient-blue appearance must include directional gradient utilities",
      ).toMatch(/bg-gradient-to-r/);
    });
  });

  describe("props: size", () => {
    it("should apply medium size classes by default", () => {
      render(<Button>MD</Button>);
      const root = getButtonSlot();
      expect(root.className, "Default size must map to the md recipe (responsive height utilities)").toMatch(
        /h-9/,
      );
    });

    it("should apply small size recipe when size='sm'", () => {
      render(
        <Button size="sm">
          SM
        </Button>,
      );
      const root = getButtonSlot();
      expect(root.className, "Small size must use the sm height scale").toMatch(/h-7/);
    });

    it("should apply icon size recipe when size='icon'", () => {
      render(<Button size="icon" aria-label="Open menu">☰</Button>);
      const root = getButtonSlot();
      expect(root.className, "Icon size must enforce square dimensions").toMatch(/h-10/);
      expect(root.className, "Icon size must enforce square dimensions").toMatch(/w-10/);
    });
  });

  describe("props: className composition", () => {
    it("should merge consumer className with generated variant classes", () => {
      render(
        <Button className="my-custom-trigger" appearance="secondary">
          Merge
        </Button>,
      );
      const root = getButtonSlot();
      expect(root.className, "Consumer class names must not replace variant output").toMatch(/bg-slate-800/);
      expect(root.className, "Consumer class names must be appended for Tailwind overrides").toMatch(
        /my-custom-trigger/,
      );
    });
  });

  describe("props: disabled state", () => {
    it("should mark the control disabled in the DOM and omit it from the tab order", () => {
      render(<Button disabled>Unavailable</Button>);
      const control = screen.getByRole("button", { name: "Unavailable" });
      expect(control, "Disabled buttons must expose the disabled property to assistive tech").toBeDisabled();
      expect(control.getAttribute("tabindex"), "Unless overridden, disabled buttons should not be focused via tab").not.toBe(
        "0",
      );
    });

    it("should not invoke onClick when the control is disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Blocked
        </Button>,
      );
      await user.click(screen.getByRole("button", { name: "Blocked" }));
      expect(handleClick, "Pointer interaction on disabled buttons must not run handlers").not.toHaveBeenCalled();
    });
  });

  describe("event handlers", () => {
    it("should call onClick once per activation with pointer input", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole("button", { name: "Click me" }));
      expect(handleClick, "onClick must fire for enabled primary actions").toHaveBeenCalledTimes(1);
    });

    it("should forward onKeyDown for keyboard-driven interactions", async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();
      render(<Button onKeyDown={handleKeyDown}>Keyboard</Button>);
      const control = screen.getByRole("button", { name: "Keyboard" });
      control.focus();
      await user.keyboard("{Enter}");
      expect(handleKeyDown, "onKeyDown must receive keyboard events on the button").toHaveBeenCalled();
    });

    it("should forward onFocus and onBlur for focus management patterns", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(
        <div>
          <Button onFocus={handleFocus} onBlur={handleBlur}>
            Focus ring
          </Button>
          <button type="button">Other</button>
        </div>,
      );
      const control = screen.getByRole("button", { name: "Focus ring" });
      await user.click(control);
      expect(handleFocus, "onFocus must run when the button receives focus").toHaveBeenCalledTimes(1);
      await user.click(screen.getByRole("button", { name: "Other" }));
      expect(handleBlur, "onBlur must run when focus leaves the button").toHaveBeenCalledTimes(1);
    });
  });

  describe("ref forwarding", () => {
    it("should attach ref to the underlying button element in button mode", () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Button ref={ref} type="button">
          Ref target
        </Button>,
      );
      expect(ref.current, "ref must point at the actual DOM node for imperative focus/measure APIs").toBeInstanceOf(
        HTMLButtonElement,
      );
      expect(ref.current?.textContent, "ref node must be the rendered button instance").toContain("Ref target");
    });

    it("should attach ref to the underlying anchor element in link mode", () => {
      const ref = createRef<HTMLAnchorElement>();
      render(
        <Button as="link" ref={ref} href="/settings">
          Settings
        </Button>,
      );
      expect(ref.current, "ref must point at the anchor for link mode").toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.getAttribute("href"), "ref node must include the consumer href").toBe("/settings");
    });
  });

  describe("passthrough DOM and ARIA attributes", () => {
    it("should forward arbitrary data-* attributes for integration test hooks", () => {
      render(<Button data-testid="primary-cta">Go</Button>);
      expect(screen.getByTestId("primary-cta"), "data-testid must be preserved on the root element").toBe(
        getButtonSlot(),
      );
    });

    it("should respect aria-label when the visible label is decorative or missing", () => {
      render(
        <Button aria-label="Close dialog" size="icon">
          ×
        </Button>,
      );
      expect(
        screen.getByRole("button", { name: "Close dialog" }),
        "Icon-only buttons must remain nameable via aria-label",
      ).toBeInTheDocument();
    });

    it("should forward aria-expanded for toggle / menu button patterns", () => {
      render(
        <Button aria-expanded="true" aria-controls="menu-id">
          Menu
        </Button>,
      );
      const control = screen.getByRole("button", { name: "Menu" });
      expect(control.getAttribute("aria-expanded"), "aria-expanded must pass through unchanged").toBe("true");
      expect(control.getAttribute("aria-controls"), "aria-controls must pass through unchanged").toBe("menu-id");
    });

    it("should forward id for label association", () => {
      render(
        <>
          <label htmlFor="agree">Agree</label>
          <Button id="agree" type="button">
            checkbox stand-in
          </Button>
        </>,
      );
      const control = document.getElementById("agree");
      expect(control, "id must be applied to the interactive root").toBe(getButtonSlot());
    });
  });

  describe("link mode (as='link')", () => {
    it("should render an anchor with href and implicit link role", () => {
      render(
        <Button as="link" href="/docs/getting-started">
          Read docs
        </Button>,
      );
      const link = screen.getByRole("link", { name: "Read docs" });
      expect(link.tagName, "Link mode must render an A element").toBe("A");
      expect(link.getAttribute("href"), "href must be forwarded for navigation").toBe("/docs/getting-started");
    });

    it("should add rel='noopener noreferrer' when target is _blank", () => {
      render(
        <Button as="link" href="https://example.com" target="_blank">
          External
        </Button>,
      );
      const link = screen.getByRole("link", { name: "External" });
      expect(link.getAttribute("rel"), "External tabs must include noopener/noreferrer for tab safety").toBe(
        "noopener noreferrer",
      );
    });

    it("should omit rel when target is not _blank", () => {
      render(
        <Button as="link" href="/internal" target="_self">
          Internal
        </Button>,
      );
      const link = screen.getByRole("link", { name: "Internal" });
      expect(link.getAttribute("rel"), "rel should not be forced for same-context navigation").toBeNull();
    });

    it("should still stamp data-slot on anchors for consistent styling hooks", () => {
      render(
        <Button as="link" href="/pricing">
          Pricing
        </Button>,
      );
      expect(getButtonSlot().tagName, "Link mode must keep the same data-slot contract").toBe("A");
    });
  });

  describe("props: animation presets (smoke)", () => {
    const animations: ButtonAnimation[] = ["none", "lift", "press", "glow", "tilt", "bounce"];

    it.each(animations)("should render without throwing when animation=%s", (animation) => {
      const { unmount } = render(
        <Button animation={animation} appearance="secondary">
          {animation}
        </Button>,
      );
      expect(getButtonSlot(), `Animation preset '${animation}' must produce a mounted root`).toBeVisible();
      unmount();
    });
  });

  describe("accessibility checklist", () => {
    it("should expose focus styles via focus-visible classes in the class list", () => {
      render(<Button>Focusable</Button>);
      const root = getButtonSlot();
      expect(
        root.className,
        "Library buttons must ship focus-visible ring utilities for keyboard users",
      ).toMatch(/focus-visible:ring-2/);
    });

    it("should include disabled opacity utilities for visual vs AT state alignment", () => {
      render(<Button disabled>Faded</Button>);
      const root = getButtonSlot();
      expect(root.className, "Disabled styling must include opacity treatment from the recipe").toMatch(
        /disabled:opacity-50/,
      );
    });
  });
});
