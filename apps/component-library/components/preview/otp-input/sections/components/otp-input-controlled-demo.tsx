"use client";

import { useState } from "react";
import { OTPInput } from "@zentauri-ui/zentauri-components/ui/otp-input";

export function OTPInputControlledDemo() {
  const [code, setCode] = useState("");
  const complete = code.length === 6;

  return (
    <div className="grid gap-3">
      <OTPInput
        appearance={complete ? "success" : "outline"}
        label="Secure sign in"
        onComplete={setCode}
        onValueChange={setCode}
        value={code}
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {complete ? `Ready to verify ${code}` : "Waiting for a complete code."}
      </p>
    </div>
  );
}
