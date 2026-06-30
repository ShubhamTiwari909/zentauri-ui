import type { Ref } from "react";

import type { ApiResponseViewerBaseProps } from "../types";
import type { ApiResponseViewerAnimation } from "./animations";

export type { ApiResponseViewerAnimation };

export type ApiResponseViewerAnimatedProps = ApiResponseViewerBaseProps & {
  /** Transition preset for the panel content when switching tabs. */
  animation?: ApiResponseViewerAnimation;
  ref?: Ref<HTMLDivElement>;
};
