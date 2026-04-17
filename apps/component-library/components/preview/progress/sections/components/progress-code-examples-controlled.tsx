"use client";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";

import type { ProgressDemoProps } from "./progress-code-examples.types";
import { useEffect, useState } from "react";

export function ProgressControlledDemo({
  appearance,
  size,
  shape,
  striped,
  animated,
}: ProgressDemoProps) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [value]);
  return (
    <div>
      <p className="mb-5 text-xs md:text-sm">
        Value: <span className="font-bold">{value}</span>
      </p>
      <Progress
        appearance={appearance}
        size={size}
        shape={shape}
        striped={striped}
        animated={animated}
        value={value}
        animation="none"
      />
    </div>
  );
}
