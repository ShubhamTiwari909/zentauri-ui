import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
} from "./modal";

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
        <ModalContent animation="none">
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
        <ModalContent animation="none">
          <ModalTitle>T</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    expect(screen.getByRole("button", { name: "Go" }).getAttribute("data-slot")).toBe("modal-trigger");
    await user.click(screen.getByRole("button", { name: "Go" }));
    await waitFor(() => {
      expect(document.querySelector('[data-slot="modal-portal"]')).toBeTruthy();
    });
  });

  it("should close when the overlay is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Modal defaultOpen>
        <ModalContent animation="none">
          <ModalTitle>Panel</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    const overlay = document.querySelector('[data-slot="modal-overlay"]') as HTMLElement;
    await user.click(overlay);
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should close when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(
      <Modal defaultOpen>
        <ModalContent animation="none">
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
        <ModalContent animation="none">
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
        <ModalContent animation="none">
          <ModalTitle>T</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await waitFor(() => expect(handleChange).toHaveBeenLastCalledWith(true));
    await user.keyboard("{Escape}");
    await waitFor(() => expect(handleChange).toHaveBeenLastCalledWith(false));
  });
});
