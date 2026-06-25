"use client";
import { useCallback, useState } from "react";
import { PasswordStrengthMeter } from "@zentauri-ui/zentauri-components/ui/password-strength-meter";

import type { PasswordStrengthMeterDemoProps } from "./types";

function calculatePasswordStrength(password: string): number {
  let score = 0;
  if (password.length > 0) score += 10;
  if (password.length >= 6) score += 10;
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 10;
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/\d/.test(password)) score += 10;
  if (/[^a-zA-Z0-9]/.test(password)) score += 10;
  if (password.length >= 16) score += 10;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 10;
  return Math.min(score, 100);
}

export function PasswordStrengthMeterControlledDemo({
  appearance,
  size,
  shape,
  animated,
  segmented,
}: PasswordStrengthMeterDemoProps) {
  const [password, setPassword] = useState("");
  const score = calculatePasswordStrength(password);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  return (
    <div className="space-y-3">
      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Type a password..."
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
      />
      <PasswordStrengthMeter
        appearance={appearance}
        size={size}
        shape={shape}
        animated={animated}
        segmented={segmented}
        value={score}
        label="Password strength"
        showScoreLabel
      />
    </div>
  );
}
