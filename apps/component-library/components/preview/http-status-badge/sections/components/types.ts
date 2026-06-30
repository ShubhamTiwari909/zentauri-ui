import type { HttpStatusBadgeProps } from "@zentauri-ui/zentauri-components/ui/http-status-badge";

export type HttpStatusBadgeAppearance = NonNullable<
  HttpStatusBadgeProps["appearance"]
>;
export type HttpStatusBadgeSize = NonNullable<HttpStatusBadgeProps["size"]>;

export type HttpStatusBadgeDemoProps = {
  status: number;
  appearance: HttpStatusBadgeAppearance;
  size: HttpStatusBadgeSize;
  showText: boolean;
};
