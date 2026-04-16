import { Modal, ModalBody, ModalClose, ModalContent, ModalDescription, ModalHeader, ModalTitle, ModalTrigger } from "@zentauri-ui/zentauri-components/ui/modal";

import { MODAL_TRIGGER_CLASS } from "./modal-code-examples.data";
import type { ModalDemoProps } from "./modal-code-examples.types";

export function ModalDemo({
  size,
  position,
  appearance,
  animation,
  label,
}: ModalDemoProps) {
  return (
    <Modal>
      <ModalTrigger appearance={appearance} className={MODAL_TRIGGER_CLASS}>
        {label}
      </ModalTrigger>
      <ModalContent
        className="rounded-lg"
        size={size}
        position={position}
        appearance={appearance}
        animation={animation}
      >
        <ModalClose />
        <ModalHeader>
          <ModalTitle>Dialog</ModalTitle>
          <ModalDescription>Supporting description.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-slate-300">Modal body copy.</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
