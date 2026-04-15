import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

describe("Drawer", () => {
  it("should expose displayName on exported parts", () => {
    expect(Drawer.displayName).toBe("Drawer");
    expect(DrawerTrigger.displayName).toBe("DrawerTrigger");
    expect(DrawerContent.displayName).toBe("DrawerContent");
    expect(DrawerTitle.displayName).toBe("DrawerTitle");
    expect(DrawerBody.displayName).toBe("DrawerBody");
    expect(DrawerClose.displayName).toBe("DrawerClose");
  });

  it("should open from the trigger and render a dialog in the portal", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent animation="none">
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerBody>Drawer content</DrawerBody>
        </DrawerContent>
      </Drawer>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    expect(screen.getByText("Drawer content")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="drawer-content"]')).toBeTruthy();
  });

  it("should stamp data-slot on trigger and portal shell", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Go</DrawerTrigger>
        <DrawerContent animation="none">
          <DrawerTitle>T</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    expect(screen.getByRole("button", { name: "Go" }).getAttribute("data-slot")).toBe("drawer-trigger");
    await user.click(screen.getByRole("button", { name: "Go" }));
    await waitFor(() => {
      expect(document.querySelector('[data-slot="drawer-portal"]')).toBeTruthy();
    });
  });

  it("should close when the overlay is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Drawer defaultOpen>
        <DrawerContent animation="none">
          <DrawerTitle>Panel</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    const overlay = document.querySelector('[data-slot="drawer-overlay"]') as HTMLElement;
    await user.click(overlay);
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should close when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(
      <Drawer defaultOpen>
        <DrawerContent animation="none">
          <DrawerTitle>Panel</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should close when DrawerClose is activated", async () => {
    const user = userEvent.setup();
    render(
      <Drawer defaultOpen>
        <DrawerContent animation="none">
          <DrawerTitle>Panel</DrawerTitle>
          <DrawerClose />
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: /close drawer/i }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should call onOpenChange when opening and closing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Drawer onOpenChange={handleChange}>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent animation="none">
          <DrawerTitle>T</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await waitFor(() => expect(handleChange).toHaveBeenLastCalledWith(true));
    await user.keyboard("{Escape}");
    await waitFor(() => expect(handleChange).toHaveBeenLastCalledWith(false));
  });
});
