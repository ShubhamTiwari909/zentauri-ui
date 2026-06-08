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
  { label: "Blue", appearance: "blue" as const },
  { label: "Cyan", appearance: "cyan" as const },
  { label: "Green", appearance: "green" as const },
  { label: "Lime", appearance: "lime" as const },
  { label: "Mint", appearance: "mint" as const },
  { label: "Ocean", appearance: "ocean" as const },
  { label: "Sapphire", appearance: "sapphire" as const },
  { label: "Lavender", appearance: "lavender" as const },
  { label: "Ruby", appearance: "ruby" as const },
  { label: "Red", appearance: "red" as const },
  { label: "Slate", appearance: "slate" as const },
  { label: "Zinc", appearance: "zinc" as const },
  { label: "Stone", appearance: "stone" as const },
  { label: "Royal", appearance: "royal" as const },
  { label: "Electric", appearance: "electric" as const },
  { label: "Forest", appearance: "forest" as const },
  { label: "Sunset", appearance: "sunset" as const },
  { label: "Magenta", appearance: "magenta" as const },
  { label: "Crimson", appearance: "crimson" as const },
  { label: "Aqua", appearance: "aqua" as const },
  { label: "Plum", appearance: "plum" as const },
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
