export const appearanceInputs = [
  { label: "Default", appearance: "default" as const },
  { label: "Warning", appearance: "warning" as const },
  { label: "Info", appearance: "info" as const },
  { label: "Error", appearance: "error" as const },
  { label: "Success", appearance: "success" as const },
];

export const appearanceInputsExtended = [
  ...appearanceInputs,
  { label: "Violet", appearance: "violet" as const },
  { label: "Amber", appearance: "amber" as const },
  { label: "Pink", appearance: "pink" as const },
  { label: "Indigo", appearance: "indigo" as const },
  { label: "Orange", appearance: "orange" as const },
];

export const sizeInputs = [
  { label: "Small", size: "sm" as const },
  { label: "Medium", size: "md" as const },
  { label: "Large", size: "lg" as const },
];

export const animationPresets = [
  ["Lift", "lift"],
  ["Press", "press"],
  ["Glow", "glow"],
  ["Tilt", "tilt"],
  ["Bounce", "bounce"],
  ["None", "none"],
] as const;
