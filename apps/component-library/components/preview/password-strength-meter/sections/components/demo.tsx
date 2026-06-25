import { PasswordStrengthMeter } from "@zentauri-ui/zentauri-components/ui/password-strength-meter";
import { PasswordStrengthMeterAnimated } from "@zentauri-ui/zentauri-components/ui/password-strength-meter/animated";

import type { PasswordStrengthMeterDemoProps } from "./types";

export function PasswordStrengthMeterDemo({
  appearance,
  size,
  shape,
  animated,
  segmented,
}: PasswordStrengthMeterDemoProps) {
  const sharedProps = {
    appearance,
    size,
    shape,
    animated,
    segmented,
    value: 42,
    label: "Password",
  };

  return (
    <div>
      <p className="mb-5 text-xs md:text-sm text-slate-900 dark:text-slate-200">
        Appearance:{" "}
        <span className="font-bold">{appearance.toUpperCase()}</span>, Size:{" "}
        <span className="font-bold">{size.toUpperCase()}</span>, Shape:{" "}
        <span className="font-bold">{shape.toUpperCase()}</span>, Animated:{" "}
        <span className="font-bold">{animated ? "true" : "false"}</span>,
        Segmented:{" "}
        <span className="font-bold">{segmented ? "true" : "false"}</span>
      </p>
      {animated ? (
        <PasswordStrengthMeterAnimated {...sharedProps} animation="shimmer" />
      ) : (
        <PasswordStrengthMeter {...sharedProps} />
      )}
    </div>
  );
}
