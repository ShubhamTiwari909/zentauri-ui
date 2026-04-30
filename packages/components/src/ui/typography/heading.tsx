import { HeadingBase } from "./heading-base";
import type { HeadingProps } from "./types";

export const Heading = (props: HeadingProps) => {
  return <HeadingBase {...props} />;
};

Heading.displayName = "Heading";
