import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { ToastVariantDemoProps } from "./toast-code-examples.types";

export function toastCallSnippet(opts: ToastVariantDemoProps): string {
  const { appearance, size } = opts;
  return `${variantLeadComment(`toast() · appearance · ${appearance}, size · ${size}`)}const { toast } = useToast();

toast({
  title: "${appearance} toast",
  description: "Example at ${size} size.",
  appearance: "${appearance}",
  size: "${size}",
});`;
}
