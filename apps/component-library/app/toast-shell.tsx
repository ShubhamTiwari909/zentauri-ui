"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ToastProvider,
  ToastViewport,
} from "@zentauri-ui/zentauri-components/ui/toast";

export function ToastShell({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <ToastProvider>
      {children}
      {mounted ? <ToastViewport position="bottom-right" /> : null}
    </ToastProvider>
  );
}
