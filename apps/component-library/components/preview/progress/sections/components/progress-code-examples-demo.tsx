import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";

import type { ProgressDemoProps } from "./progress-code-examples.types";

export function ProgressDemo({
  appearance,
  size,
  shape,
  striped,
  animated,
}: ProgressDemoProps) {
  return (
    <div>
      <p className="mb-5 text-xs md:text-sm">
        Appearance:{" "}
        <span className="font-bold">{appearance.toUpperCase()}</span>, Size:{" "}
        <span className="font-bold">{size.toUpperCase()}</span>, Shape:{" "}
        <span className="font-bold">{shape.toUpperCase()}</span>, Striped:{" "}
        <span className="font-bold">{striped ? "true" : "false"}</span>,
        Animated:{" "}
        <span className="font-bold">{animated ? "true" : "false"}</span>
      </p>
      <Progress
        appearance={appearance}
        size={size}
        shape={shape}
        striped={striped}
        animated={animated}
        value={42}
        animation="none"
      />
    </div>
  );
}
