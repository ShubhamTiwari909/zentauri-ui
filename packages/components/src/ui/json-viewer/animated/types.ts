import type { Ref } from "react";

import type { JsonViewerBaseProps } from "../types";
import type { JsonViewerAnimation } from "./animations";

export type { JsonViewerAnimation };

export type JsonViewerAnimatedProps = JsonViewerBaseProps & {
  /** Expand/collapse motion preset for container nodes. */
  animation?: JsonViewerAnimation;
  ref?: Ref<HTMLDivElement>;
};
