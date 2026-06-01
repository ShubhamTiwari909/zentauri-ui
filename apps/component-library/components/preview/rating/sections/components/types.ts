import type { RatingProps } from "@zentauri-ui/zentauri-components/ui/rating";

export type RatingDemoProps = {
  allowClear?: boolean;
  allowHalf?: boolean;
  appearance: NonNullable<RatingProps["appearance"]>;
  icon?: RatingProps["icon"];
  max?: number;
  readOnly?: boolean;
  size: NonNullable<RatingProps["size"]>;
};
