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
 * If `restoreOnUnmount` is true, the captured title is restored on unmount so nested routes or modals do not leak titles.
 *
 * @param params.title - Desired `document.title` string.
 * @param params.restoreOnUnmount - Whether to restore the pre-mount title on cleanup (default `true`).
 */
export function useDocumentTitle({
  title,
  restoreOnUnmount = true,
}: UseDocumentTitleParams): void {
  const originalTitle = useRef<string | undefined>(undefined);

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
        !restoreOnUnmount ||
        typeof document === "undefined" ||
        originalTitle.current === undefined
      ) {
        return;
      }
      document.title = originalTitle.current;
    };
  }, [restoreOnUnmount]);
}
