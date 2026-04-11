import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./input";
import type { InputAnimation } from "./types";

const INPUT_SLOT_SELECTOR = '[data-slot="input"]';

function getInputSlot(container: HTMLElement = document.body) {
  const elements = container.querySelectorAll(INPUT_SLOT_SELECTOR);
  expect(
    elements.length,
    `Expected exactly one element matching ${INPUT_SLOT_SELECTOR} in the document, but found ${elements.length}`,
  ).toBe(1);
  return elements[0] as HTMLInputElement;
}

describe("Input (component library)", () => {
  describe("public contract and metadata", () => {
    it("should expose a stable displayName for devtools and documentation consumers", () => {
      expect(
        Input.displayName,
        "Input.displayName must be set for library discoverability",
      ).toBe("Input");
    });

    it("should stamp data-slot on the root element so apps can target the primitive", () => {
      render(<Input placeholder="Field" />);
      const root = getInputSlot();
      expect(
        root.getAttribute("data-slot"),
        "data-slot must equal 'input' for the documented contract",
      ).toBe("input");
    });
  });

  describe("default rendering", () => {
    it("should render a native textbox for default type", () => {
      render(<Input placeholder="Email" aria-label="Email" />);
      const control = screen.getByRole("textbox", { name: "Email" });
      expect(control.tagName, "Default must render an INPUT element").toBe(
        "INPUT",
      );
    });

    it("should use search role when type is search", () => {
      render(<Input type="search" aria-label="Search" />);
      expect(screen.getByRole("searchbox", { name: "Search" }).tagName).toBe(
        "INPUT",
      );
    });
  });

  describe("props: appearance (variant class application)", () => {
    it("should apply default appearance border tokens from the variant recipe", () => {
      render(<Input placeholder="x" aria-label="x" />);
      const root = getInputSlot();
      expect(
        root.className,
        "Default appearance must include neutral border utilities",
      ).toMatch(/border-white\/10/);
    });

    it("should apply error appearance when appearance='error'", () => {
      render(<Input appearance="error" placeholder="x" aria-label="x" />);
      const root = getInputSlot();
      expect(
        root.className,
        "Error appearance must surface danger border tokens",
      ).toMatch(/border-rose-500/);
    });

    it("should apply success appearance when appearance='success'", () => {
      render(<Input appearance="success" placeholder="x" aria-label="x" />);
      const root = getInputSlot();
      expect(
        root.className,
        "Success appearance must surface positive border tokens",
      ).toMatch(/border-emerald-500/);
    });

    const additionalAppearances: {
      appearance:
        | "warning"
        | "info"
        | "violet"
        | "amber"
        | "pink"
        | "indigo";
      borderPattern: RegExp;
    }[] = [
      {
        appearance: "warning",
        borderPattern: /border-yellow-500/,
      },
      { appearance: "info", borderPattern: /border-blue-500/ },
      { appearance: "violet", borderPattern: /border-violet-500/ },
      { appearance: "amber", borderPattern: /border-amber-500/ },
      { appearance: "pink", borderPattern: /border-pink-500/ },
      { appearance: "indigo", borderPattern: /border-indigo-500/ },
    ];

    it.each(additionalAppearances)(
      "should apply $appearance appearance border tokens from the variant recipe",
      ({ appearance, borderPattern }) => {
        render(
          <Input appearance={appearance} placeholder="x" aria-label="x" />,
        );
        const root = getInputSlot();
        expect(
          root.className,
          `${appearance} appearance must include its border scale utilities`,
        ).toMatch(borderPattern);
      },
    );
  });

  describe("props: ring (variant class application)", () => {
    it("should apply focus ring utilities when ring is true (default)", () => {
      render(<Input ring placeholder="x" aria-label="x" />);
      const root = getInputSlot();
      expect(
        root.className,
        "ring true must add generic focus-visible ring width and offset",
      ).toMatch(/focus-visible:ring-2/);
      expect(root.className).toMatch(/focus-visible:ring-offset-2/);
    });

    it("should omit generic focus ring utilities when ring is false", () => {
      render(<Input ring={false} placeholder="x" aria-label="x" />);
      const root = getInputSlot();
      expect(
        root.className,
        "ring false must not add the shared ring-2 / ring-offset-2 recipe",
      ).not.toMatch(/focus-visible:ring-2/);
      expect(root.className).not.toMatch(/focus-visible:ring-offset-2/);
    });

    it("should omit generic ring utilities when ring is false even for semantic appearances", () => {
      render(
        <Input
          appearance="error"
          ring={false}
          placeholder="x"
          aria-label="x"
        />,
      );
      const root = getInputSlot();
      expect(root.className).toMatch(/border-rose-500/);
      expect(root.className).not.toMatch(/focus-visible:ring-2/);
      expect(root.className).not.toMatch(/focus-visible:ring-offset-2/);
    });
  });

  describe("props: size", () => {
    it("should apply medium size classes by default", () => {
      render(<Input placeholder="x" aria-label="x" />);
      const root = getInputSlot();
      expect(root.className, "Default size must map to the md recipe").toMatch(
        /h-9/,
      );
    });

    it("should apply small size recipe when size='sm'", () => {
      render(<Input size="sm" placeholder="x" aria-label="x" />);
      const root = getInputSlot();
      expect(root.className, "Small size must use the sm height scale").toMatch(
        /h-8/,
      );
    });

    it("should apply large size recipe when size='lg'", () => {
      render(<Input size="lg" placeholder="x" aria-label="x" />);
      const root = getInputSlot();
      expect(root.className, "Large size must use the lg height scale").toMatch(
        /h-10/,
      );
    });
  });

  describe("props: className composition", () => {
    it("should merge consumer className with generated variant classes", () => {
      render(
        <Input className="my-custom-field" placeholder="x" aria-label="x" />,
      );
      const root = getInputSlot();
      expect(
        root.className,
        "Consumer class names must not replace variant output",
      ).toMatch(/border-white\/10/);
      expect(
        root.className,
        "Consumer class names must be merged for Tailwind overrides",
      ).toMatch(/my-custom-field/);
    });
  });

  describe("props: disabled state", () => {
    it("should mark the control disabled in the DOM", () => {
      render(<Input disabled placeholder="x" aria-label="x" />);
      expect(
        screen.getByRole("textbox", { name: "x" }),
        "Disabled inputs must expose disabled to assistive tech",
      ).toBeDisabled();
    });

    it("should not change value when disabled and user types", async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="locked" disabled aria-label="Field" />);
      const control = screen.getByRole("textbox", { name: "Field" });
      await user.type(control, "more");
      expect(
        control,
        "Typing must not mutate disabled field value",
      ).toHaveValue("locked");
    });
  });

  describe("event handlers", () => {
    it("should call onChange when the user types", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Input onChange={handleChange} placeholder="x" aria-label="Field" />,
      );
      const control = screen.getByRole("textbox", { name: "Field" });
      await user.type(control, "ab");
      expect(
        handleChange,
        "onChange must fire for each keystroke in controlled-like typing",
      ).toHaveBeenCalled();
    });

    it("should forward onFocus and onBlur for focus management patterns", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(
        <div>
          <Input
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="a"
            aria-label="A"
          />
          <button type="button">Other</button>
        </div>,
      );
      const control = screen.getByRole("textbox", { name: "A" });
      await user.click(control);
      expect(
        handleFocus,
        "onFocus must run when the input receives focus",
      ).toHaveBeenCalledTimes(1);
      await user.click(screen.getByRole("button", { name: "Other" }));
      expect(
        handleBlur,
        "onBlur must run when focus leaves the input",
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe("ref forwarding", () => {
    it("should attach ref to the underlying input element", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} placeholder="x" aria-label="Ref target" />);
      expect(
        ref.current,
        "ref must point at the actual DOM node for imperative focus/measure APIs",
      ).toBeInstanceOf(HTMLInputElement);
      expect(
        ref.current?.getAttribute("data-slot"),
        "ref node must be the rendered input instance",
      ).toBe("input");
    });
  });

  describe("passthrough DOM and ARIA attributes", () => {
    it("should forward arbitrary data-* attributes for integration test hooks", () => {
      render(
        <Input data-testid="email-field" placeholder="x" aria-label="Email" />,
      );
      expect(
        screen.getByTestId("email-field"),
        "data-testid must be preserved on the root element",
      ).toBe(getInputSlot());
    });

    it("should forward id for label association", () => {
      render(
        <>
          <label htmlFor="user-email">Email</label>
          <Input id="user-email" placeholder="you@example.com" />
        </>,
      );
      const control = document.getElementById("user-email");
      expect(control, "id must be applied to the interactive root").toBe(
        getInputSlot(),
      );
    });
  });

  describe("accessibility: aria-invalid", () => {
    it("should set aria-invalid true when appearance is error", () => {
      render(<Input appearance="error" placeholder="x" aria-label="Field" />);
      expect(
        screen
          .getByRole("textbox", { name: "Field" })
          .getAttribute("aria-invalid"),
      ).toBe("true");
    });

    it("should not set aria-invalid when appearance is default", () => {
      render(<Input placeholder="x" aria-label="Field" />);
      expect(
        screen
          .getByRole("textbox", { name: "Field" })
          .getAttribute("aria-invalid"),
      ).toBeNull();
    });

    it("should respect explicit aria-invalid false even when appearance is error", () => {
      render(
        <Input
          appearance="error"
          aria-invalid={false}
          placeholder="x"
          aria-label="Field"
        />,
      );
      expect(
        screen
          .getByRole("textbox", { name: "Field" })
          .getAttribute("aria-invalid"),
      ).toBe("false");
    });
  });

  describe("props: animation presets (smoke)", () => {
    const animations: InputAnimation[] = [
      "none",
      "lift",
      "press",
      "glow",
      "tilt",
      "bounce",
    ];

    it.each(animations)(
      "should render without throwing when animation=%s",
      (animation) => {
        const { unmount } = render(
          <Input animation={animation} placeholder="x" aria-label="Anim" />,
        );
        expect(
          getInputSlot(),
          `Animation preset '${animation}' must produce a mounted root`,
        ).toBeVisible();
        unmount();
      },
    );
  });

  describe("accessibility checklist", () => {
    it("should expose focus styles via focus-visible classes in the class list", () => {
      render(<Input placeholder="x" aria-label="x" />);
      const root = getInputSlot();
      expect(
        root.className,
        "Library inputs must ship focus-visible ring utilities for keyboard users",
      ).toMatch(/focus-visible:ring-2/);
    });

    it("should include disabled opacity utilities for visual vs AT state alignment", () => {
      render(<Input disabled placeholder="x" aria-label="x" />);
      const root = getInputSlot();
      expect(
        root.className,
        "Disabled styling must include opacity treatment from the recipe",
      ).toMatch(/disabled:opacity-50/);
    });
  });
});
