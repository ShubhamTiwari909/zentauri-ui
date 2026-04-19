import { SkeletonAnimated } from "@zentauri-ui/zentauri-components/ui/skeleton/animated";

import type { SkeletonDemoProps } from "./skeleton-code-examples.types";

export function SkeletonDemo({
  appearance,
  size,
  rounded,
  shimmerTone,
  animation,
}: SkeletonDemoProps) {
  return (
    <div>
      <p className="mb-5">
        Appearance: <span className="font-bold">{appearance}</span> | Size:{" "}
        <span className="font-bold">{size}</span> | Rounded:{" "}
        <span className="font-bold">{rounded}</span> | Animation:{" "}
        <span className="font-bold">{animation}</span> | Shimmer Tone:{" "}
        <span className="font-bold">{shimmerTone}</span>
      </p>
      <SkeletonAnimated
        className="max-w-md min-h-10"
        appearance={appearance}
        size={size}
        rounded={rounded}
        animation={animation}
        shimmerTone={shimmerTone}
      />
    </div>
  );
}
