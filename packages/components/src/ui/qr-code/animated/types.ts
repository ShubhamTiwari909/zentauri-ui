import type { Ref } from "react";
import type { QrCodeBaseProps } from "../types";
import type { QrCodeAnimation } from "./animations";

export type { QrCodeAnimation };

export type QrCodeAnimatedProps = QrCodeBaseProps & {
  animation?: QrCodeAnimation;
  ref?: Ref<HTMLDivElement>;
};
