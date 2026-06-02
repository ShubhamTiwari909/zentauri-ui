import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Modal } from "./modal";
import {
  ModalTrigger,
  ModalContent,
  ModalTitle,
  ModalBody,
  ModalDescription,
  ModalClose,
} from "./modal-base";

describe("Modal", () => {
  it("should expose displayName on exported parts", () => {
    expect(Modal.displayName).toBe("Modal");
    expect(ModalTrigger.displayName).toBe("ModalTrigger");
    expect(ModalContent.displayName).toBe("ModalContent");
    expect(ModalTitle.displayName).toBe("ModalTitle");
    expect(ModalBody.displayName).toBe("ModalBody");
    expect(ModalDescription.displayName).toBe("ModalDescription");
    expect(ModalClose.displayName).toBe("ModalClose");
  });

  it("should open from the trigger and render a dialog in the portal", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <ModalTrigger>Open</ModalTrigger>
        <ModalContent>
          <ModalTitle>Confirm</ModalTitle>
          <ModalDescription>Please review</ModalDescription>
          <ModalBody>Details</ModalBody>
        </ModalContent>
      </Modal>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="modal-content"]')).toBeTruthy();
  });

  it("should stamp data-slot on trigger and portal shell", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <ModalTrigger>Go</ModalTrigger>
        <ModalContent>
          <ModalTitle>T</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    expect(
      screen.getByRole("button", { name: "Go" }).getAttribute("data-slot"),
    ).toBe("modal-trigger");
    await user.click(screen.getByRole("button", { name: "Go" }));
    await waitFor(() => {
      expect(document.querySelector('[data-slot="modal-portal"]')).toBeTruthy();
    });
  });

  it("should close when the overlay is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Modal defaultOpen>
        <ModalContent>
          <ModalTitle>Panel</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    const overlay = document.querySelector(
      '[data-slot="modal-overlay"]',
    ) as HTMLElement;
    await user.click(overlay);
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should render overlay as non-focusable presentation surface", async () => {
    render(
      <Modal defaultOpen>
        <ModalContent>
          <ModalTitle>T</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    const overlay = document.querySelector('[data-slot="modal-overlay"]');
    expect(overlay?.tagName.toLowerCase()).toBe("div");
    expect(overlay).toHaveAttribute("role", "presentation");
    expect((overlay as HTMLElement).tabIndex).toBe(-1);
  });

  it("should close when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(
      <Modal defaultOpen>
        <ModalContent>
          <ModalTitle>Panel</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should close when ModalClose is activated", async () => {
    const user = userEvent.setup();
    render(
      <Modal defaultOpen>
        <ModalContent>
          <ModalTitle>Panel</ModalTitle>
          <ModalClose />
        </ModalContent>
      </Modal>,
    );
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: /close dialog/i }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should call onOpenChange when opening and closing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Modal onOpenChange={handleChange}>
        <ModalTrigger>Open</ModalTrigger>
        <ModalContent>
          <ModalTitle>T</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await waitFor(() => expect(handleChange).toHaveBeenLastCalledWith(true));
    await user.keyboard("{Escape}");
    await waitFor(() => expect(handleChange).toHaveBeenLastCalledWith(false));
  });

  it("should restore focus to the trigger after the dialog closes", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <ModalTrigger>Open</ModalTrigger>
        <ModalContent>
          <ModalTitle>T</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    const trigger = screen.getByRole("button", { name: "Open" });
    trigger.focus();
    await user.click(trigger);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });

  it("should expose aria-modal and wire labelledby/describedby to its title and description", async () => {
    render(
      <Modal defaultOpen>
        <ModalContent>
          <ModalTitle>Confirm</ModalTitle>
          <ModalDescription>Please review</ModalDescription>
        </ModalContent>
      </Modal>,
    );
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");

    const labelledby = dialog.getAttribute("aria-labelledby");
    const describedby = dialog.getAttribute("aria-describedby");
    expect(labelledby).toBeTruthy();
    expect(describedby).toBeTruthy();
    expect(document.getElementById(labelledby as string)).toHaveTextContent(
      "Confirm",
    );
    expect(document.getElementById(describedby as string)).toHaveTextContent(
      "Please review",
    );
  });
});
