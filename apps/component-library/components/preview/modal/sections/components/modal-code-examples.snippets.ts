import { variantLeadComment } from "@/components/common/variant-code-prefix";

import { MODAL_TRIGGER_CLASS } from "./modal-code-examples.data";
import type { ModalDemoProps } from "./modal-code-examples.types";

export function modalSnippet(opts: ModalDemoProps): string {
  const { size, position, appearance, label } = opts;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const positionAttr = position === "center" ? "" : ` position="${position}"`;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  return `${variantLeadComment(`ModalContent · size · ${size}, position · ${position}, appearance · ${appearance}`)}<Modal>
  <ModalTrigger appearance="${appearance}" className="${MODAL_TRIGGER_CLASS}">
    ${label}
  </ModalTrigger>
  <ModalContent${sizeAttr}${positionAttr}${appearanceAttr} animation="scale">
    <ModalClose />
    <ModalHeader>
      <ModalTitle>Dialog</ModalTitle>
      <ModalDescription>Supporting description.</ModalDescription>
    </ModalHeader>
    <ModalBody>
      <p className="text-sm text-slate-300">Modal body copy.</p>
    </ModalBody>
  </ModalContent>
</Modal>`;
}

export function modalControlledSnippet(): string {
  return `<Modal open={open} onOpenChange={setOpen}>
  <ModalTrigger appearance="default" className={TRIGGER_CLASS}>
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
</Modal>`;
}
