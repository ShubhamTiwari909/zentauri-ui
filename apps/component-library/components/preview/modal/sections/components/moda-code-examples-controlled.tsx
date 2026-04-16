"use client";
import { Modal, ModalContent, ModalTrigger, ModalClose, ModalHeader, ModalTitle, ModalDescription, Button } from "@zentauri-ui/zentauri-components/ui";
import { useState } from "react";
import { MODAL_TRIGGER_CLASS } from "./modal-code-examples.data";

export function ModalControlledDemo() {
    const [open, setOpen] = useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger appearance="default" className={MODAL_TRIGGER_CLASS}>
          Modal controlled with useState
        </ModalTrigger>
        <ModalContent
          className="rounded-lg"
          size="md"
          position="center"
          appearance="default"
          animation="scale"
        >
          <ModalClose />
          <ModalHeader>
            <ModalTitle>Dialog</ModalTitle>
            <ModalDescription className="mb-5">Supporting description.</ModalDescription>
            <Button appearance="rose" size="sm" animation="none" onClick={() => setOpen(false)}>
              Close
            </Button>
          </ModalHeader>
        </ModalContent>
      </Modal>
    );
  }
      