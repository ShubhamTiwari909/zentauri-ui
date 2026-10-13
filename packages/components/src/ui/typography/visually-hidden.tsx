import { VisuallyHiddenBase } from "./visually-hidden-base";
import type { VisuallyHiddenProps } from "./types";
export const VisuallyHidden = (props: VisuallyHiddenProps) => (
  <VisuallyHiddenBase {...props} />
);
VisuallyHidden.displayName = "VisuallyHidden";
