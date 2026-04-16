import type { ToastInput } from "@zentauri-ui/zentauri-components/ui";

export type ToastDemoAppearance = NonNullable<ToastInput["appearance"]>;
export type ToastDemoSize = NonNullable<ToastInput["size"]>;

export type ToastVariantDemoProps = {
  appearance: ToastDemoAppearance;
  size: ToastDemoSize;
};
