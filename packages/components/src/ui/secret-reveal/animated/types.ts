import type { Ref } from "react";

import type { SecretRevealBaseProps } from "../types";
import type { SecretRevealAnimation } from "./animations";

export type { SecretRevealAnimation };

export type SecretRevealAnimatedProps = SecretRevealBaseProps & {
  animation?: SecretRevealAnimation;
  ref?: Ref<HTMLDivElement>;
};
