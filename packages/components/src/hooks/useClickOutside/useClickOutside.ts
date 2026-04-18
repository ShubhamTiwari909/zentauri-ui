"use client";

import type { RefObject } from "react";
import { Dispatch, SetStateAction, useEffect } from "react";

/** DOM events that can represent an “outside” press for closing overlays. */
export type ClickOutsideEventType =
  | "mousedown"
  | "pointerdown"
  | "touchstart";

export type UseClickOutsideParams = {
  /** Called with `false` when a qualifying event target is outside `ref.current`. */
  setOpen: (open: boolean) => void | Dispatch<SetStateAction<boolean>>;
  /** Root element of the floating UI; clicks inside this node do not close. */
  ref: RefObject<HTMLElement | null>;
  /** Defaults to `["mousedown"]` for backward compatibility */
  listenEvents?: ClickOutsideEventType[];
};

/**
 * Registers document-level listeners so that when the user activates outside of `ref`, `setOpen(false)`
 * runs. Useful for dropdowns, popovers, and menus paired with `open` state.
 *
 * @param params.setOpen - State setter or callback that closes the surface.
 * @param params.ref - Container ref; outside is determined with `contains()` on the event target.
 * @param params.listenEvents - Which events to listen for; default is `mousedown` only.
 */
export const useClickOutside = ({
  setOpen,
  ref,
  listenEvents,
}: UseClickOutsideParams) => {
  useEffect(() => {
    const events =
      listenEvents && listenEvents.length > 0 ? listenEvents : ["mousedown"];
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handleClickOutside);
    }
    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleClickOutside);
      }
    };
  }, [listenEvents, ref, setOpen]);
};
