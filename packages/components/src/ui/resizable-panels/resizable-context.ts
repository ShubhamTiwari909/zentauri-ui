"use client";
import { createContext, type RefObject } from "react";
import type { PanelConstraint } from "./resize-layout";
import type { ResizablePanelsOrientation } from "./types";

export const ResizableContext = createContext<{
  panels: PanelConstraint[];
  sizes: number[];
  orientation: ResizablePanelsOrientation;
  disabled: boolean;
  keyboardStep: number;
  root: RefObject<HTMLDivElement | null>;
  apply: (sizes: number[]) => boolean;
  end: (sizes: number[]) => void;
  setResizing: (resizing: boolean) => void;
  remembered: RefObject<Map<string, number>>;
} | null>(null);
export const ResizableSlotContext = createContext<number | null>(null);
