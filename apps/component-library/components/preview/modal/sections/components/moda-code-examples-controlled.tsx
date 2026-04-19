"use client";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@zentauri-ui/zentauri-components/ui/modal";
import { ModalContentAnimated } from "@zentauri-ui/zentauri-components/ui/modal/animated";
import { useState } from "react";
import { MODAL_TRIGGER_CLASS } from "./modal-code-examples.data";

export function ModalControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger appearance="default" className={MODAL_TRIGGER_CLASS}>
        Modal controlled with useState
      </ModalTrigger>
      <ModalContentAnimated
        className="rounded-lg"
        size="md"
        position="center"
        appearance="default"
        animation="scale"
      >
        <ModalClose />
        <ModalHeader>
          <ModalTitle>Dialog</ModalTitle>
          <ModalDescription className="mb-5">
            Supporting description.
          </ModalDescription>
          <Button appearance="rose" size="sm" onClick={() => setOpen(false)}>
            Close
          </Button>
        </ModalHeader>
      </ModalContentAnimated>
    </Modal>
  );
}
