import type { Ref } from "react";

import type { LogViewerBaseProps } from "../types";
import type { LogViewerAnimation } from "./animations";

export type { LogViewerAnimation };

export type LogViewerAnimatedProps = LogViewerBaseProps & {
  animation?: LogViewerAnimation;
  ref?: Ref<HTMLDivElement>;
};
