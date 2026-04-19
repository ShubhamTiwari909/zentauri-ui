// alert.tsx  ← users import this by default
import { AlertBase } from "./alert-base";
import type { AlertProps } from "./types";

export const Alert = (props: AlertProps) => {
  return <AlertBase {...props} />;
}

Alert.displayName = "Alert";