"use client";

import { useEffect, useState } from "react";

/**
 * Creates a dedicated portal target appended to `document.body` for rendering
 * toasts, and removes it on unmount. Shared by both the static
 * (`ToastViewport`) and animated (`ToastViewportAnimated`) viewports so the
 * portal lifecycle stays in one place.
 *
 * Returns `null` until the target exists (i.e. after the first client effect),
 * so callers should bail out of rendering the portal while it is `null`.
 */
export function useToastPortal(): HTMLElement | null {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const target = document.createElement("div");
    target.setAttribute("data-zui-toast-portal", "");
    document.body.appendChild(target);
    setPortalTarget(target);

    return () => {
      target.remove();
    };
  }, []);

  return portalTarget;
}
