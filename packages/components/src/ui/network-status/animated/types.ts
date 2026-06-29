import type { Ref } from "react";

import type { NetworkStatusBaseProps } from "../types";
import type { NetworkStatusAnimation } from "./animations";

export type { NetworkStatusAnimation };

export type NetworkStatusAnimatedProps = NetworkStatusBaseProps & {
  animation?: NetworkStatusAnimation;
  ref?: Ref<HTMLSpanElement>;
};
