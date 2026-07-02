"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import {
  Alert,
  AlertDescription,
} from "@zentauri-ui/zentauri-components/ui/alert";
import type { AlertProps } from "@zentauri-ui/zentauri-components/ui/alert";

type DismissibleAlertProps = {
  appearance?: AlertProps["appearance"];
  size?: AlertProps["size"];
  children: ReactNode;
};

/**
 * Client wrapper so a `closable` alert can actually dismiss itself. The rich
 * text content is rendered on the server and passed in as `children`.
 */
export function DismissibleAlert({
  appearance,
  size,
  children,
}: DismissibleAlertProps) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <Alert
      appearance={appearance}
      size={size}
      closable
      onClose={() => setOpen(false)}
    >
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
