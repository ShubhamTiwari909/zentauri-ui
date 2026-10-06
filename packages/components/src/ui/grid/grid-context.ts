"use client";
import { createContext } from "react";
import type { GridLayoutMap } from "./grid-layout";
export const GridContext = createContext<{
  layouts: GridLayoutMap;
  stackOnMobile: boolean;
} | null>(null);
