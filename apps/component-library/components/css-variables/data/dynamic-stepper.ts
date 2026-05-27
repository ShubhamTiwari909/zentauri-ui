import { defineCssVariableReference } from "../css-variable-reference-types";

export const dynamicStepperCssVariables = defineCssVariableReference({
  title: "Dynamic stepper CSS variables",
  description:
    "Override these dynamic stepper variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    [
      "dynamic-stepper-indicator-default-border-complete",
      "oklch(55.4% 0.046 257.417 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-default-bg-complete",
      "oklch(55.4% 0.046 257.417 / 0.25)",
    ],
    [
      "dynamic-stepper-indicator-default-fg-complete",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-default-ring-complete",
      "oklch(55.4% 0.046 257.417 / 0.25)",
    ],
    [
      "dynamic-stepper-indicator-default-border-current",
      "oklch(44.6% 0.043 257.281)",
    ],
    [
      "dynamic-stepper-indicator-default-bg-current",
      "oklch(55.4% 0.046 257.417 / 0.35)",
    ],
    [
      "dynamic-stepper-indicator-default-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-default-ring-current",
      "oklch(44.6% 0.043 257.281 / 0.45)",
    ],
    ["dynamic-stepper-indicator-default-border-upcoming", "#00000026"],
    ["dynamic-stepper-indicator-default-bg-upcoming", "#0000000d"],
    [
      "dynamic-stepper-indicator-default-fg-upcoming",
      "oklch(55.4% 0.046 257.417)",
    ],
    [
      "dynamic-stepper-indicator-secondary-border-complete",
      "oklch(70.4% 0.04 256.788)",
    ],
    [
      "dynamic-stepper-indicator-secondary-bg-complete",
      "oklch(92.9% 0.013 255.508 / 0.7)",
    ],
    [
      "dynamic-stepper-indicator-secondary-fg-complete",
      "oklch(37.2% 0.044 257.287)",
    ],
    [
      "dynamic-stepper-indicator-secondary-ring-complete",
      "oklch(70.4% 0.04 256.788 / 0.35)",
    ],
    [
      "dynamic-stepper-indicator-secondary-border-current",
      "oklch(55.4% 0.046 257.417)",
    ],
    [
      "dynamic-stepper-indicator-secondary-bg-current",
      "oklch(86.9% 0.022 252.894 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-secondary-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-secondary-ring-current",
      "oklch(55.4% 0.046 257.417 / 0.45)",
    ],
    ["dynamic-stepper-indicator-secondary-border-upcoming", "#0000001a"],
    [
      "dynamic-stepper-indicator-secondary-bg-upcoming",
      "oklch(96.8% 0.007 247.896 / 0.5)",
    ],
    [
      "dynamic-stepper-indicator-secondary-fg-upcoming",
      "oklch(55.4% 0.046 257.417)",
    ],
    [
      "dynamic-stepper-indicator-destructive-border-complete",
      "oklch(64.5% 0.246 16.439 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-destructive-bg-complete",
      "oklch(64.5% 0.246 16.439 / 0.2)",
    ],
    [
      "dynamic-stepper-indicator-destructive-fg-complete",
      "oklch(41% 0.159 10.272)",
    ],
    [
      "dynamic-stepper-indicator-destructive-ring-complete",
      "oklch(71.2% 0.194 13.428 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-destructive-border-current",
      "oklch(58.6% 0.253 17.585)",
    ],
    [
      "dynamic-stepper-indicator-destructive-bg-current",
      "oklch(94.1% 0.03 12.58 / 0.5)",
    ],
    [
      "dynamic-stepper-indicator-destructive-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-destructive-ring-current",
      "oklch(71.2% 0.194 13.428 / 0.5)",
    ],
    ["dynamic-stepper-indicator-destructive-border-upcoming", "#00000026"],
    [
      "dynamic-stepper-indicator-destructive-bg-upcoming",
      "oklch(96.9% 0.015 12.422)",
    ],
    [
      "dynamic-stepper-indicator-destructive-fg-upcoming",
      "oklch(55.4% 0.046 257.417)",
    ],
    [
      "dynamic-stepper-indicator-outline-border-complete",
      "oklch(69.6% 0.17 162.48 / 0.55)",
    ],
    ["dynamic-stepper-indicator-outline-bg-complete", "transparent"],
    [
      "dynamic-stepper-indicator-outline-fg-complete",
      "oklch(90.5% 0.093 164.15)",
    ],
    [
      "dynamic-stepper-indicator-outline-ring-complete",
      "oklch(69.6% 0.17 162.48 / 0.25)",
    ],
    ["dynamic-stepper-indicator-outline-border-current", "#0000004d"],
    ["dynamic-stepper-indicator-outline-bg-current", "#0000001a"],
    [
      "dynamic-stepper-indicator-outline-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    ["dynamic-stepper-indicator-outline-ring-current", "#00000040"],
    ["dynamic-stepper-indicator-outline-border-upcoming", "#00000026"],
    ["dynamic-stepper-indicator-outline-bg-upcoming", "#0000000d"],
    [
      "dynamic-stepper-indicator-outline-fg-upcoming",
      "oklch(55.4% 0.046 257.417)",
    ],
    ["dynamic-stepper-indicator-ghost-border-complete", "transparent"],
    [
      "dynamic-stepper-indicator-ghost-bg-complete",
      "oklch(69.6% 0.17 162.48 / 0.15)",
    ],
    [
      "dynamic-stepper-indicator-ghost-fg-complete",
      "oklch(90.5% 0.093 164.15)",
    ],
    [
      "dynamic-stepper-indicator-ghost-ring-complete",
      "oklch(76.5% 0.177 163.223 / 0.2)",
    ],
    ["dynamic-stepper-indicator-ghost-border-current", "transparent"],
    ["dynamic-stepper-indicator-ghost-bg-current", "#0000001a"],
    [
      "dynamic-stepper-indicator-ghost-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    ["dynamic-stepper-indicator-ghost-ring-current", "#00000026"],
    ["dynamic-stepper-indicator-ghost-border-upcoming", "transparent"],
    ["dynamic-stepper-indicator-ghost-bg-upcoming", "transparent"],
    [
      "dynamic-stepper-indicator-ghost-fg-upcoming",
      "oklch(55.4% 0.046 257.417)",
    ],
    [
      "dynamic-stepper-indicator-link-border-complete",
      "oklch(71.5% 0.143 215.221 / 0.45)",
    ],
    [
      "dynamic-stepper-indicator-link-bg-complete",
      "oklch(98.4% 0.019 200.873)",
    ],
    ["dynamic-stepper-indicator-link-fg-complete", "oklch(91.7% 0.08 205.041)"],
    [
      "dynamic-stepper-indicator-link-ring-complete",
      "oklch(78.9% 0.154 211.53 / 0.25)",
    ],
    [
      "dynamic-stepper-indicator-link-border-current",
      "oklch(60.9% 0.126 221.723)",
    ],
    [
      "dynamic-stepper-indicator-link-bg-current",
      "oklch(39.8% 0.07 227.392 / 0.45)",
    ],
    ["dynamic-stepper-indicator-link-fg-current", "oklch(30.2% 0.056 229.695)"],
    [
      "dynamic-stepper-indicator-link-ring-current",
      "oklch(78.9% 0.154 211.53 / 0.45)",
    ],
    ["dynamic-stepper-indicator-link-border-upcoming", "#0000001a"],
    ["dynamic-stepper-indicator-link-bg-upcoming", "transparent"],
    [
      "dynamic-stepper-indicator-link-fg-upcoming",
      "oklch(55.4% 0.046 257.417)",
    ],
    ["dynamic-stepper-indicator-glass-border-complete", "#00000040"],
    ["dynamic-stepper-indicator-glass-bg-complete", "#0000001a"],
    [
      "dynamic-stepper-indicator-glass-fg-complete",
      "oklch(37.8% 0.077 168.94)",
    ],
    [
      "dynamic-stepper-indicator-glass-shadow-complete",
      "inset 0 1px 0 rgba(255,255,255,0.06)",
    ],
    [
      "dynamic-stepper-indicator-glass-ring-complete",
      "oklch(76.5% 0.177 163.223 / 0.25)",
    ],
    ["dynamic-stepper-indicator-glass-border-current", "#00000059"],
    ["dynamic-stepper-indicator-glass-bg-current", "#00000026"],
    [
      "dynamic-stepper-indicator-glass-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-glass-shadow-current",
      "inset 0 1px 0 rgba(255,255,255,0.08)",
    ],
    ["dynamic-stepper-indicator-glass-ring-current", "#0000004d"],
    ["dynamic-stepper-indicator-glass-border-upcoming", "#00000026"],
    ["dynamic-stepper-indicator-glass-bg-upcoming", "#0000000d"],
    [
      "dynamic-stepper-indicator-glass-fg-upcoming",
      "oklch(55.4% 0.046 257.417)",
    ],
    [
      "dynamic-stepper-indicator-emerald-border-complete",
      "oklch(69.6% 0.17 162.48 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-emerald-bg-complete",
      "oklch(69.6% 0.17 162.48 / 0.2)",
    ],
    [
      "dynamic-stepper-indicator-emerald-fg-complete",
      "oklch(37.8% 0.077 168.94)",
    ],
    [
      "dynamic-stepper-indicator-emerald-ring-complete",
      "oklch(76.5% 0.177 163.223 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-emerald-border-current",
      "oklch(59.6% 0.145 163.225)",
    ],
    [
      "dynamic-stepper-indicator-emerald-bg-current",
      "oklch(69.6% 0.17 162.48 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-emerald-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-emerald-ring-current",
      "oklch(76.5% 0.177 163.223 / 0.5)",
    ],
    ["dynamic-stepper-indicator-emerald-border-upcoming", "#00000026"],
    [
      "dynamic-stepper-indicator-emerald-bg-upcoming",
      "oklch(97.9% 0.021 166.113)",
    ],
    [
      "dynamic-stepper-indicator-emerald-fg-upcoming",
      "oklch(50.8% 0.118 165.612 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-indigo-border-complete",
      "oklch(58.5% 0.233 277.117 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-indigo-bg-complete",
      "oklch(58.5% 0.233 277.117 / 0.2)",
    ],
    [
      "dynamic-stepper-indicator-indigo-fg-complete",
      "oklch(35.9% 0.144 278.697)",
    ],
    [
      "dynamic-stepper-indicator-indigo-ring-complete",
      "oklch(67.3% 0.182 276.935 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-indigo-border-current",
      "oklch(51.1% 0.262 276.966)",
    ],
    [
      "dynamic-stepper-indicator-indigo-bg-current",
      "oklch(58.5% 0.233 277.117 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-indigo-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-indigo-ring-current",
      "oklch(67.3% 0.182 276.935 / 0.5)",
    ],
    ["dynamic-stepper-indicator-indigo-border-upcoming", "#00000026"],
    [
      "dynamic-stepper-indicator-indigo-bg-upcoming",
      "oklch(96.2% 0.018 272.314)",
    ],
    [
      "dynamic-stepper-indicator-indigo-fg-upcoming",
      "oklch(45.7% 0.24 277.023 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-purple-border-complete",
      "oklch(62.7% 0.265 303.9 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-purple-bg-complete",
      "oklch(62.7% 0.265 303.9 / 0.2)",
    ],
    [
      "dynamic-stepper-indicator-purple-fg-complete",
      "oklch(38.1% 0.176 304.987)",
    ],
    [
      "dynamic-stepper-indicator-purple-ring-complete",
      "oklch(71.4% 0.203 305.504 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-purple-border-current",
      "oklch(55.8% 0.288 302.321)",
    ],
    [
      "dynamic-stepper-indicator-purple-bg-current",
      "oklch(62.7% 0.265 303.9 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-purple-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-purple-ring-current",
      "oklch(71.4% 0.203 305.504 / 0.5)",
    ],
    ["dynamic-stepper-indicator-purple-border-upcoming", "#00000026"],
    [
      "dynamic-stepper-indicator-purple-bg-upcoming",
      "oklch(97.7% 0.014 308.299)",
    ],
    [
      "dynamic-stepper-indicator-purple-fg-upcoming",
      "oklch(49.6% 0.265 301.924 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-pink-border-complete",
      "oklch(65.6% 0.241 354.308 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-pink-bg-complete",
      "oklch(65.6% 0.241 354.308 / 0.2)",
    ],
    ["dynamic-stepper-indicator-pink-fg-complete", "oklch(40.8% 0.153 2.432)"],
    [
      "dynamic-stepper-indicator-pink-ring-complete",
      "oklch(71.8% 0.202 349.761 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-pink-border-current",
      "oklch(59.2% 0.249 0.584)",
    ],
    [
      "dynamic-stepper-indicator-pink-bg-current",
      "oklch(65.6% 0.241 354.308 / 0.3)",
    ],
    ["dynamic-stepper-indicator-pink-fg-current", "oklch(20.8% 0.042 265.755)"],
    [
      "dynamic-stepper-indicator-pink-ring-current",
      "oklch(71.8% 0.202 349.761 / 0.5)",
    ],
    ["dynamic-stepper-indicator-pink-border-upcoming", "#00000026"],
    [
      "dynamic-stepper-indicator-pink-bg-upcoming",
      "oklch(97.1% 0.014 343.198)",
    ],
    [
      "dynamic-stepper-indicator-pink-fg-upcoming",
      "oklch(52.5% 0.223 3.958 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-rose-border-complete",
      "oklch(64.5% 0.246 16.439 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-rose-bg-complete",
      "oklch(64.5% 0.246 16.439 / 0.2)",
    ],
    ["dynamic-stepper-indicator-rose-fg-complete", "oklch(41% 0.159 10.272)"],
    [
      "dynamic-stepper-indicator-rose-ring-complete",
      "oklch(71.2% 0.194 13.428 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-rose-border-current",
      "oklch(58.6% 0.253 17.585)",
    ],
    [
      "dynamic-stepper-indicator-rose-bg-current",
      "oklch(64.5% 0.246 16.439 / 0.3)",
    ],
    ["dynamic-stepper-indicator-rose-fg-current", "oklch(20.8% 0.042 265.755)"],
    [
      "dynamic-stepper-indicator-rose-ring-current",
      "oklch(71.2% 0.194 13.428 / 0.5)",
    ],
    ["dynamic-stepper-indicator-rose-border-upcoming", "#00000026"],
    ["dynamic-stepper-indicator-rose-bg-upcoming", "oklch(96.9% 0.015 12.422)"],
    [
      "dynamic-stepper-indicator-rose-fg-upcoming",
      "oklch(51.4% 0.222 16.935 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-sky-border-complete",
      "oklch(68.5% 0.169 237.323 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-sky-bg-complete",
      "oklch(68.5% 0.169 237.323 / 0.2)",
    ],
    ["dynamic-stepper-indicator-sky-fg-complete", "oklch(39.1% 0.09 240.876)"],
    [
      "dynamic-stepper-indicator-sky-ring-complete",
      "oklch(74.6% 0.16 232.661 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-sky-border-current",
      "oklch(58.8% 0.158 241.966)",
    ],
    [
      "dynamic-stepper-indicator-sky-bg-current",
      "oklch(68.5% 0.169 237.323 / 0.3)",
    ],
    ["dynamic-stepper-indicator-sky-fg-current", "oklch(20.8% 0.042 265.755)"],
    [
      "dynamic-stepper-indicator-sky-ring-current",
      "oklch(74.6% 0.16 232.661 / 0.5)",
    ],
    ["dynamic-stepper-indicator-sky-border-upcoming", "#00000026"],
    ["dynamic-stepper-indicator-sky-bg-upcoming", "oklch(97.7% 0.013 236.62)"],
    [
      "dynamic-stepper-indicator-sky-fg-upcoming",
      "oklch(50% 0.134 242.749 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-teal-border-complete",
      "oklch(70.4% 0.14 182.503 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-teal-bg-complete",
      "oklch(70.4% 0.14 182.503 / 0.2)",
    ],
    [
      "dynamic-stepper-indicator-teal-fg-complete",
      "oklch(38.6% 0.063 188.416)",
    ],
    [
      "dynamic-stepper-indicator-teal-ring-complete",
      "oklch(77.7% 0.152 181.912 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-teal-border-current",
      "oklch(60% 0.118 184.704)",
    ],
    [
      "dynamic-stepper-indicator-teal-bg-current",
      "oklch(70.4% 0.14 182.503 / 0.3)",
    ],
    ["dynamic-stepper-indicator-teal-fg-current", "oklch(20.8% 0.042 265.755)"],
    [
      "dynamic-stepper-indicator-teal-ring-current",
      "oklch(77.7% 0.152 181.912 / 0.5)",
    ],
    ["dynamic-stepper-indicator-teal-border-upcoming", "#00000026"],
    ["dynamic-stepper-indicator-teal-bg-upcoming", "oklch(98.4% 0.014 180.72)"],
    [
      "dynamic-stepper-indicator-teal-fg-upcoming",
      "oklch(51.1% 0.096 186.391 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-yellow-border-complete",
      "oklch(79.5% 0.184 86.047 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-yellow-bg-complete",
      "oklch(79.5% 0.184 86.047 / 0.2)",
    ],
    [
      "dynamic-stepper-indicator-yellow-fg-complete",
      "oklch(42.1% 0.095 57.708)",
    ],
    [
      "dynamic-stepper-indicator-yellow-ring-complete",
      "oklch(85.2% 0.199 91.936 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-yellow-border-current",
      "oklch(68.1% 0.162 75.834)",
    ],
    [
      "dynamic-stepper-indicator-yellow-bg-current",
      "oklch(97.3% 0.071 103.193 / 0.5)",
    ],
    [
      "dynamic-stepper-indicator-yellow-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-yellow-ring-current",
      "oklch(85.2% 0.199 91.936 / 0.5)",
    ],
    ["dynamic-stepper-indicator-yellow-border-upcoming", "#00000026"],
    [
      "dynamic-stepper-indicator-yellow-bg-upcoming",
      "oklch(98.7% 0.026 102.212)",
    ],
    [
      "dynamic-stepper-indicator-yellow-fg-upcoming",
      "oklch(55.4% 0.135 66.442 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-orange-border-complete",
      "oklch(70.5% 0.213 47.604 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-orange-bg-complete",
      "oklch(70.5% 0.213 47.604 / 0.2)",
    ],
    [
      "dynamic-stepper-indicator-orange-fg-complete",
      "oklch(40.8% 0.123 38.172)",
    ],
    [
      "dynamic-stepper-indicator-orange-ring-complete",
      "oklch(75% 0.183 55.934 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-orange-border-current",
      "oklch(64.6% 0.222 41.116)",
    ],
    [
      "dynamic-stepper-indicator-orange-bg-current",
      "oklch(95.4% 0.038 75.164 / 0.5)",
    ],
    [
      "dynamic-stepper-indicator-orange-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-orange-ring-current",
      "oklch(75% 0.183 55.934 / 0.5)",
    ],
    ["dynamic-stepper-indicator-orange-border-upcoming", "#00000026"],
    ["dynamic-stepper-indicator-orange-bg-upcoming", "oklch(98% 0.016 73.684)"],
    [
      "dynamic-stepper-indicator-orange-fg-upcoming",
      "oklch(55.3% 0.195 38.402 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-gray-border-complete",
      "oklch(55.1% 0.027 264.364 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-gray-bg-complete",
      "oklch(55.1% 0.027 264.364 / 0.2)",
    ],
    ["dynamic-stepper-indicator-gray-fg-complete", "oklch(21% 0.034 264.665)"],
    [
      "dynamic-stepper-indicator-gray-ring-complete",
      "oklch(70.7% 0.022 261.325 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-gray-border-current",
      "oklch(44.6% 0.03 256.802)",
    ],
    [
      "dynamic-stepper-indicator-gray-bg-current",
      "oklch(96.7% 0.003 264.542 / 0.5)",
    ],
    ["dynamic-stepper-indicator-gray-fg-current", "oklch(20.8% 0.042 265.755)"],
    [
      "dynamic-stepper-indicator-gray-ring-current",
      "oklch(70.7% 0.022 261.325 / 0.5)",
    ],
    ["dynamic-stepper-indicator-gray-border-upcoming", "#00000026"],
    [
      "dynamic-stepper-indicator-gray-bg-upcoming",
      "oklch(98.5% 0.002 247.839)",
    ],
    [
      "dynamic-stepper-indicator-gray-fg-upcoming",
      "oklch(87.2% 0.01 258.338 / 0.7)",
    ],
    [
      "dynamic-stepper-indicator-amber-border-complete",
      "oklch(76.9% 0.188 70.08 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-amber-bg-complete",
      "oklch(76.9% 0.188 70.08 / 0.2)",
    ],
    [
      "dynamic-stepper-indicator-amber-fg-complete",
      "oklch(41.4% 0.112 45.904)",
    ],
    [
      "dynamic-stepper-indicator-amber-ring-complete",
      "oklch(82.8% 0.189 84.429 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-amber-border-current",
      "oklch(66.6% 0.179 58.318)",
    ],
    [
      "dynamic-stepper-indicator-amber-bg-current",
      "oklch(96.2% 0.059 95.617 / 0.5)",
    ],
    [
      "dynamic-stepper-indicator-amber-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-amber-ring-current",
      "oklch(82.8% 0.189 84.429 / 0.5)",
    ],
    ["dynamic-stepper-indicator-amber-border-upcoming", "#00000026"],
    [
      "dynamic-stepper-indicator-amber-bg-upcoming",
      "oklch(98.7% 0.022 95.277)",
    ],
    [
      "dynamic-stepper-indicator-amber-fg-upcoming",
      "oklch(55.5% 0.163 48.998 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-violet-border-complete",
      "oklch(60.6% 0.25 292.717 / 0.6)",
    ],
    [
      "dynamic-stepper-indicator-violet-bg-complete",
      "oklch(60.6% 0.25 292.717 / 0.2)",
    ],
    [
      "dynamic-stepper-indicator-violet-fg-complete",
      "oklch(38% 0.189 293.745)",
    ],
    [
      "dynamic-stepper-indicator-violet-ring-complete",
      "oklch(70.2% 0.183 293.541 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-violet-border-current",
      "oklch(54.1% 0.281 293.009)",
    ],
    [
      "dynamic-stepper-indicator-violet-bg-current",
      "oklch(60.6% 0.25 292.717 / 0.3)",
    ],
    [
      "dynamic-stepper-indicator-violet-fg-current",
      "oklch(20.8% 0.042 265.755)",
    ],
    [
      "dynamic-stepper-indicator-violet-ring-current",
      "oklch(70.2% 0.183 293.541 / 0.5)",
    ],
    ["dynamic-stepper-indicator-violet-border-upcoming", "#00000026"],
    [
      "dynamic-stepper-indicator-violet-bg-upcoming",
      "oklch(96.9% 0.016 293.756)",
    ],
    [
      "dynamic-stepper-indicator-violet-fg-upcoming",
      "oklch(49.1% 0.27 292.581 / 0.55)",
    ],
  ],
  darkExamples: [
    [
      "dynamic-stepper-indicator-default-border-complete-dark",
      "oklch(37.2% 0.044 257.287 / 0.55)",
    ],
    [
      "dynamic-stepper-indicator-default-bg-complete-dark",
      "oklch(55.4% 0.046 257.417 / 0.25)",
    ],
  ],
  darkVariableCount: 119,
});
