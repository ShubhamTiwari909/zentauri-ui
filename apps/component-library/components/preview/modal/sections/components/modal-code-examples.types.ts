import type { ModalContentProps } from "@zentauri-ui/zentauri-components/ui/modal";
import type { ModalAnimation } from "@zentauri-ui/zentauri-components/ui/modal/animated";

export type ModalDemoSize = NonNullable<ModalContentProps["size"]>;
export type ModalDemoPosition = NonNullable<ModalContentProps["position"]>;
export type ModalDemoAppearance = NonNullable<ModalContentProps["appearance"]>;
export type ModalDemoAnimation = ModalAnimation;

export type ModalDemoProps = {
  size: ModalDemoSize;
  position: ModalDemoPosition;
  appearance: ModalDemoAppearance;
  animation?: ModalDemoAnimation;
  label: string;
};
