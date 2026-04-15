import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

describe("Accordion", () => {
  describe("public contract and metadata", () => {
    it("should expose displayName on compound parts", () => {
      expect(Accordion.displayName).toBe("Accordion");
      expect(AccordionItem.displayName).toBe("AccordionItem");
      expect(AccordionTrigger.displayName).toBe("AccordionTrigger");
      expect(AccordionContent.displayName).toBe("AccordionContent");
    });

    it("should stamp data-slot on the root container", () => {
      render(
        <Accordion defaultValue="one">
          <AccordionItem value="one">
            <AccordionTrigger>One</AccordionTrigger>
            <AccordionContent>Panel one</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      const root = document.querySelector('[data-slot="accordion"]');
      expect(root).toBeTruthy();
      expect(root?.getAttribute("data-slot")).toBe("accordion");
    });
  });

  describe("single mode", () => {
    it("should show panel content when defaultValue matches", () => {
      render(
        <Accordion defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>Item A</AccordionTrigger>
            <AccordionContent>Content A</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      expect(screen.getByRole("region")).toHaveTextContent("Content A");
      expect(screen.getByRole("button", { name: "Item A" })).toHaveAttribute("aria-expanded", "true");
    });

    it("should toggle aria-expanded and panel visibility when the trigger is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Accordion defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>Item A</AccordionTrigger>
            <AccordionContent>Content A</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      await user.click(screen.getByRole("button", { name: "Item A" }));
      expect(screen.getByRole("button", { name: "Item A" })).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });

    it("should wire aria-controls to the panel id", () => {
      render(
        <Accordion defaultValue="x">
          <AccordionItem value="x">
            <AccordionTrigger>Open</AccordionTrigger>
            <AccordionContent>Inside</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      const trigger = screen.getByRole("button", { name: "Open" });
      const controls = trigger.getAttribute("aria-controls");
      expect(controls).toBe("x-panel");
      expect(document.getElementById("x-panel")).toBe(screen.getByRole("region"));
    });
  });

  describe("multiple mode", () => {
    it("should allow more than one panel open when type is multiple", async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="multiple" defaultValues={["a"]}>
          <AccordionItem value="a">
            <AccordionTrigger>A</AccordionTrigger>
            <AccordionContent>Panel A</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>B</AccordionTrigger>
            <AccordionContent>Panel B</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      await user.click(screen.getByRole("button", { name: "B" }));
      expect(screen.getByRole("button", { name: "A" })).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("button", { name: "B" })).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Panel A")).toBeInTheDocument();
      expect(screen.getByText("Panel B")).toBeInTheDocument();
    });
  });

  describe("controlled single mode", () => {
    it("should reflect external value changes and invoke onValueChange", async () => {
      const user = userEvent.setup();
      function Controlled() {
        const [value, setValue] = useState<string | undefined>("a");
        return (
          <Accordion type="single" value={value} onValueChange={setValue}>
            <AccordionItem value="a">
              <AccordionTrigger>A</AccordionTrigger>
              <AccordionContent>Panel A</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>B</AccordionTrigger>
              <AccordionContent>Panel B</AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }
      render(<Controlled />);
      await user.click(screen.getByRole("button", { name: "B" }));
      expect(screen.getByRole("button", { name: "B" })).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Panel B")).toBeInTheDocument();
    });
  });
});
