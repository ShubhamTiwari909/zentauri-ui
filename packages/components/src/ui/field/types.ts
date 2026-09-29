import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import type { fieldVariants } from "./variants";

export type FieldControlProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "aria-invalid" | "aria-describedby" | "aria-required"
>;

export type FieldProps = Omit<ComponentPropsWithRef<"div">, "children"> &
  VariantProps<typeof fieldVariants> & {
    label?: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
    required?: boolean;
    invalid?: boolean;
    controlId?: string;
    children: ReactNode | ((props: FieldControlProps) => ReactNode);
  };

export type FieldsetProps = ComponentPropsWithRef<"fieldset"> & {
  legend: ReactNode;
  description?: ReactNode;
};
