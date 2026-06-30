import type { Ref } from "react";

import type { HttpRequestViewerBaseProps } from "../types";
import type { HttpRequestViewerAnimation } from "./animations";

export type { HttpRequestViewerAnimation };

export type HttpRequestViewerAnimatedProps = HttpRequestViewerBaseProps & {
  /** Panel-switch motion preset applied when the active tab changes. */
  animation?: HttpRequestViewerAnimation;
  ref?: Ref<HTMLDivElement>;
};
