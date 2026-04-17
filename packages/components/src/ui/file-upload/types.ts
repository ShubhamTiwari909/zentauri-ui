import type { VariantProps } from "class-variance-authority";
import type { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from "react";

import type { fileUploadVariants } from "./variants";

export type FileUploadVariantProps = VariantProps<typeof fileUploadVariants>;

export type FileUploadProps = FileUploadVariantProps &
  Omit<ComponentPropsWithoutRef<"div">, "children" | "onChange"> & {
    /** Called when the user selects or drops files */
    onFiles?: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    /** Visually hidden input `name` for forms */
    name?: string;
    /** Optional controlled file list (not enforced; mainly for forms) */
    children?: ReactNode;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    appearance?: FileUploadVariantProps["appearance"];
  };
