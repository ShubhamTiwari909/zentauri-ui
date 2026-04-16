"use client";

import { Button, type ButtonProps } from "@zentauri-ui/zentauri-components/ui/buttons";
import { useToast } from "@zentauri-ui/zentauri-components/ui/toast";

import type { ToastVariantDemoProps } from "./toast-code-examples.types";

const buttonsAppearance = {
  default: "default",
  success: "emerald",
  warning: "amber",
  error: "rose",
  info: "sky",
  ghost: "ghost",
  purple: "purple",
  pink: "pink",
  orange: "orange",
  yellow: "yellow",
  teal: "teal",
  indigo: "indigo",
  emerald: "emerald",
  gray: "gray",
  amber: "amber",
  violet: "violet",
  "gradient-blue": "gradient-blue",
  "gradient-green": "gradient-green",
  "gradient-red": "gradient-red",
  "gradient-yellow": "gradient-yellow",
  "gradient-purple": "gradient-purple",
  "gradient-teal": "gradient-teal",
  "gradient-indigo": "gradient-indigo",
  "gradient-pink": "gradient-pink",
  "gradient-orange": "gradient-orange",
} as const;

export function ToastVariantDemo({ appearance, size }: ToastVariantDemoProps) {
  const { toast } = useToast();
  return (
    <Button
      appearance={buttonsAppearance[appearance] as NonNullable<ButtonProps["appearance"]>}
      size="sm"
      animation="none"
      type="button"
      onClick={() =>
        toast({
          title: `${appearance} toast`,
          description: `Example at ${size} size.`,
          appearance,
          size,
        })
      }
    >
      Show {appearance} ({size})
    </Button>
  );
}
