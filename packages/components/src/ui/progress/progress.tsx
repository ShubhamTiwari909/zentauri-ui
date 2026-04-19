import { ProgressBase } from "./progress-base";
import type { ProgressProps } from "./types";

export const Progress = (props: ProgressProps) => {
  return (
    <ProgressBase
      {...props}
    />
  );
};

Progress.displayName = "Progress";