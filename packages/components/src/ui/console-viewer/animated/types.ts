import type { Ref } from "react";

import type { ConsoleViewerBaseProps } from "../types";
import type { ConsoleViewerAnimation } from "./animations";

export type { ConsoleViewerAnimation };

export type ConsoleViewerAnimatedProps = ConsoleViewerBaseProps & {
  animation?: ConsoleViewerAnimation;
  ref?: Ref<HTMLDivElement>;
};
