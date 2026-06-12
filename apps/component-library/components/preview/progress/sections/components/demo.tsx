import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import { ProgressAnimated } from "@zentauri-ui/zentauri-components/ui/progress/animated";

import type { ProgressDemoProps } from "./types";

export function ProgressDemo({
  appearance,
  size,
  shape,
  striped,
  animated,
}: ProgressDemoProps) {
  const sharedProps = { appearance, size, shape, striped, animated, value: 42 };

  return (
    <div>
      <p className="mb-5 text-xs md:text-sm text-slate-900 dark:text-slate-200">
        Appearance:{" "}
        <span className="font-bold">{appearance.toUpperCase()}</span>, Size:{" "}
        <span className="font-bold">{size.toUpperCase()}</span>, Shape:{" "}
        <span className="font-bold">{shape.toUpperCase()}</span>, Striped:{" "}
        <span className="font-bold">{striped ? "true" : "false"}</span>,
        Animated:{" "}
        <span className="font-bold">{animated ? "true" : "false"}</span>
      </p>
      {animated ? (
        <ProgressAnimated {...sharedProps} />
      ) : (
        <Progress {...sharedProps} />
      )}
    </div>
  );
}
