import type { Ref } from "react";

import type { CodeBlockBaseProps } from "../types";
import type { CodeBlockAnimation } from "./animations";

export type { CodeBlockAnimation };

export type CodeBlockAnimatedProps = CodeBlockBaseProps & {
  animation?: CodeBlockAnimation;
  ref?: Ref<HTMLDivElement>;
};
