import type { Ref } from "react";

import type { ApiEndpointCardBaseProps } from "../types";
import type { ApiEndpointCardAnimation } from "./animations";

export type { ApiEndpointCardAnimation };

export type ApiEndpointCardAnimatedProps = ApiEndpointCardBaseProps & {
  animation?: ApiEndpointCardAnimation;
  ref?: Ref<HTMLDivElement>;
};
