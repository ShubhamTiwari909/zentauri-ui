import { Modal as ModalBase } from "./modal-base";
import type { ModalProps } from "./types";

export const Modal = (props: ModalProps) => {
  return <ModalBase {...props} />;
};

Modal.displayName = "Modal";