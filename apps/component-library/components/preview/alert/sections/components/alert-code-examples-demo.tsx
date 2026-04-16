import { Alert, AlertDescription, AlertTitle } from "@zentauri-ui/zentauri-components/ui/alert";

import type { AlertDemoProps } from "./alert-code-examples.types";

export function AlertDemo({ appearance, size }: AlertDemoProps) {
  return (
    <Alert
      appearance={appearance}
      size={size}
      animation="none"
      className="text-xs md:text-sm"
    >
      <div className="space-y-1">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          Short supporting copy for this alert.
        </AlertDescription>
      </div>
    </Alert>
  );
}
