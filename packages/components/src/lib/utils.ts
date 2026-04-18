import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clampPage(page: number, pageCount: number): number {
  if (pageCount <= 0) {
    return 1;
  }
  return Math.min(pageCount, Math.max(1, Math.floor(page)));
}

export const range = (from: number, to: number): number[] => {
  const out: number[] = [];
  for (let i = from; i <= to; i += 1) {
    out.push(i);
  }
  return out;
}
