import type { DatePickerProps } from "@zentauri-ui/zentauri-components/ui/date-picker";
import type { DatePickerAnimation } from "@zentauri-ui/zentauri-components/ui/date-picker/animated";

export type DatePickerAppearance = NonNullable<DatePickerProps["appearance"]>;
export type DatePickerSize = NonNullable<DatePickerProps["size"]>;
export type DatePickerMode = NonNullable<DatePickerProps["mode"]>;

export type DatePickerDemoProps = {
  mode: DatePickerMode;
  appearance: DatePickerAppearance;
  size: DatePickerSize;
  clearable?: boolean;
  animation?: DatePickerAnimation;
};
