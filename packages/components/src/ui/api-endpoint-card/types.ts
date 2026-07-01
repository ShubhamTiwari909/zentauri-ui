import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { apiEndpointCardVariants } from "./variants";

export type ApiEndpointCardVariantProps = VariantProps<
  typeof apiEndpointCardVariants
>;

export type ApiEndpointMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface ApiEndpointCardLabels {
  request?: ReactNode;
  response?: ReactNode;
}

export interface EndpointExample {
  title?: string;
  lang?: string;
  requestBody?: unknown;
  responseBody?: unknown;
}

export type ApiEndpointCardBaseProps = Omit<
  VariantProps<typeof apiEndpointCardVariants>,
  "size"
> &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    method: ApiEndpointMethod;
    path: string;
    description?: string;
    tags?: string[];
    examples?: EndpointExample[];
    showTags?: boolean;
    showExamples?: boolean;
    size?: NonNullable<VariantProps<typeof apiEndpointCardVariants>["size"]>;
    labels?: ApiEndpointCardLabels;
  };

export type ApiEndpointCardProps = ApiEndpointCardBaseProps;
