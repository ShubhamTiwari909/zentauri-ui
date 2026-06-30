import type { Ref } from "react";

import type { RequestTimelineViewerBaseProps } from "../types";
import type { RequestTimelineViewerAnimation } from "./animations";

export type { RequestTimelineViewerAnimation };

export type RequestTimelineViewerAnimatedProps =
  RequestTimelineViewerBaseProps & {
    /** Enter-motion preset for the bars and rows. */
    animation?: RequestTimelineViewerAnimation;
    ref?: Ref<HTMLDivElement>;
  };
