import { Section } from "@/components/common/Section";
import { Calendar } from "@zentauri-ui/zentauri-components/ui/calendar";

import { CalendarPlayground } from "./components/playground";

const LOCALES = [
  { locale: "en-US", label: "English (US)" },
  { locale: "de-DE", label: "Deutsch" },
  { locale: "ar-EG", label: "العربية (مصر)" },
  { locale: "ja-JP", label: "日本語" },
] as const;

const DEMO_MONTH = new Date(2026, 6, 1);
const DEMO_TODAY = new Date(2026, 6, 7);

export function CalendarCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Calendar variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a selection mode, appearance, size, caption layout, and animation
        to preview the calendar live. Toggle Show output / Show code and the
        snippet updates to match the selected variant.
      </p>
      <CalendarPlayground />

      <h2 className="mt-16 text-2xl font-semibold text-slate-900 dark:text-white">
        One locale prop, fully localized
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Month names, weekday headers, first-day-of-week, and even the digits
        come from the platform&apos;s Intl APIs — no date library, no locale
        bundles.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {LOCALES.map(({ locale, label }) => (
          <div key={locale} className="flex flex-col items-start gap-2">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {label}{" "}
              <span className="font-normal text-slate-500 dark:text-slate-400">
                · {locale}
              </span>
            </p>
            <Calendar
              locale={locale}
              defaultMonth={DEMO_MONTH}
              today={DEMO_TODAY}
              defaultValue={new Date(2026, 6, 7)}
              size="sm"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
