import type { RelativeTimeProps } from "@zentauri-ui/zentauri-components/ui/relative-time";

export type RelativeTimeAppearance = NonNullable<
  RelativeTimeProps["appearance"]
>;
export type RelativeTimeSize = NonNullable<RelativeTimeProps["size"]>;

export type RelativeTimeDemoProps = {
  appearance: RelativeTimeAppearance;
  size: RelativeTimeSize;
  live: boolean;
};
