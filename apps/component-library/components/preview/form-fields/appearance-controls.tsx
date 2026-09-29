"use client";

export const FORM_APPEARANCES = [
  "default",
  "outline",
  "subtle",
  "contrast",
  "glass",
  "gradient-blue",
  "error",
] as const;
export type FormAppearance = (typeof FORM_APPEARANCES)[number];
export type FormSize = "sm" | "md" | "lg";

export function AppearanceControls({
  appearance,
  size,
  onAppearanceChange,
  onSizeChange,
}: {
  appearance: FormAppearance;
  size: FormSize;
  onAppearanceChange: (appearance: FormAppearance) => void;
  onSizeChange: (size: FormSize) => void;
}) {
  return (
    <div className="my-6 space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-900 dark:text-white">
          Appearance
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {FORM_APPEARANCES.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={appearance === option}
              onClick={() => onAppearanceChange(option)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-left text-xs text-slate-700 transition-colors hover:border-sky-500 aria-pressed:border-sky-500 aria-pressed:bg-sky-500/10 dark:border-white/20 dark:text-slate-200 dark:aria-pressed:border-sky-400"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <label className="inline-flex items-center gap-3 text-sm text-slate-900 dark:text-white">
        Size
        <select
          value={size}
          onChange={(event) => onSizeChange(event.target.value as FormSize)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-white/20 dark:bg-slate-900 dark:text-white"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </label>
    </div>
  );
}
