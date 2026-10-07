import type {
  AriaAttributes,
  ComponentPropsWithRef,
  ReactElement,
  ReactNode,
} from "react";
import type { VariantProps } from "class-variance-authority";
import type { fieldVariants } from "./variants";

export type FieldAppearance = NonNullable<
  VariantProps<typeof fieldVariants>["appearance"]
>;
export type FieldOrientation = NonNullable<
  VariantProps<typeof fieldVariants>["orientation"]
>;
/** Spread onto the actual focusable control. For custom controls use native={false}. */
export type FieldControlAttributes = Pick<
  AriaAttributes,
  "aria-labelledby" | "aria-describedby" | "aria-invalid" | "aria-required"
> & {
  id: string;
  disabled?: boolean;
  required?: boolean;
};
export type FormProps = ComponentPropsWithRef<"form">;
export type FieldProps = Omit<ComponentPropsWithRef<"div">, "children"> &
  VariantProps<typeof fieldVariants> & {
    /** ID for the focusable control. Overrides the child's id through FieldControl; wrapper id stays independent. */
    controlId?: string;
    /** Visible label connected to the control. Provide aria-label on the control if omitted. */
    label?: ReactNode;
    /** Instructions automatically connected through aria-describedby. */
    description?: ReactNode;
    /** Visible announced error; implies invalid unless invalid is explicitly false. */
    error?: ReactNode;
    /** Override the state inferred from error. Does not run validation. */
    invalid?: boolean;
    /** Apply native disabled to FieldControl. @default false */
    disabled?: boolean;
    /** Apply native required to FieldControl and show a decorative marker. @default false */
    required?: boolean;
    /** A FieldControl child, or a render function receiving attributes for your own control. */
    children?: ReactNode | ((control: FieldControlAttributes) => ReactNode);
  };
export type FieldControlProps = {
  /** Exactly one element that forwards id, aria attributes, disabled and required to its focusable control. */
  children: ReactElement;
  /** False uses aria-required instead of native required for a custom widget. Widget behavior is owned by the consumer. @default true */
  native?: boolean;
};
export type FieldLabelProps = ComponentPropsWithRef<"label"> & {
  required?: boolean;
};
export type FieldDescriptionProps = ComponentPropsWithRef<"p">;
export type FieldErrorProps = ComponentPropsWithRef<"p">;
export type FieldGroupProps = ComponentPropsWithRef<"fieldset"> & {
  /** Native legend naming this group. Omit when composing FieldLegend manually. */
  legend?: ReactNode;
  /** Instructions describing the group, connected to the fieldset. */
  description?: ReactNode;
};
export type FieldLegendProps = ComponentPropsWithRef<"legend">;
