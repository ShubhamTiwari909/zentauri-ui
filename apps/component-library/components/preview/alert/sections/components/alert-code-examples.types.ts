import type { AlertProps } from "@zentauri-ui/zentauri-components/ui/alert";

export type AlertAppearance = NonNullable<AlertProps["appearance"]>;
export type AlertSize = NonNullable<AlertProps["size"]>;

export type AlertDemoProps = {
  appearance: AlertAppearance;
  size: AlertSize;
};
