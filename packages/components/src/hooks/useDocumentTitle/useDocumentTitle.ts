"use client";

import { useEffect, useRef } from "react";

export type UseDocumentTitleParams = {
  title: string;
  /** When true (default), restores the document title from before this hook mounted when the component unmounts */
  restoreOnUnmount?: boolean;
};

/**
 * Keeps `document.title` in sync with `title` for the lifetime of the component.
 *
 * On first mount in the browser, the current title is captured. When `title` changes, the document title updates.
 * If `restoreOnUnmount` is true when the component unmounts, the captured title is restored so nested routes or
 * modals do not leak titles. Changing `restoreOnUnmount` while mounted does not run restore; only unmount does.
 *
 * @param params.title - Desired `document.title` string.
 * @param params.restoreOnUnmount - Whether to restore the pre-mount title on unmount (default `true`). The value
 *   read at unmount time determines behavior, not mid-mount prop changes.
 */
export function useDocumentTitle({
  title,
  restoreOnUnmount = true,
}: UseDocumentTitleParams): void {
  const originalTitle = useRef<string | undefined>(undefined);
  const restoreOnUnmountRef = useRef(restoreOnUnmount);
  restoreOnUnmountRef.current = restoreOnUnmount;

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    if (originalTitle.current === undefined) {
      originalTitle.current = document.title;
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (
        !restoreOnUnmountRef.current ||
        typeof document === "undefined" ||
        originalTitle.current === undefined
      ) {
        return;
      }
      document.title = originalTitle.current;
    };
  }, []);
}
