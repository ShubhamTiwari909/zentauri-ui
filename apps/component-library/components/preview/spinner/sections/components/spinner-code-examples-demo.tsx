import { Spinner } from "@zentauri-ui/zentauri-components/ui";

import type { SpinnerDemoProps } from "./spinner-code-examples.types";

export function SpinnerDemo({ appearance, variant, size }: SpinnerDemoProps) {
  return <Spinner appearance={appearance} variant={variant} size={size} aria-label="Loading" />;
}
