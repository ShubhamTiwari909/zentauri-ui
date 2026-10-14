"use client";

import { useState } from "react";
import { useNumberFormat } from "@zentauri-ui/zentauri-components/hooks/useNumberFormat";

export function NumberFormatDemo() {
  const [locale, setLocale] = useState("en-IN");
  const [currency, setCurrency] = useState("INR");
  const { format, formatToParts, resolvedLocale } = useNumberFormat({
    locale,
    style: "currency",
    currency,
  });
  const value = 1234567.89;
  return (
    <div className="space-y-5 text-slate-900 dark:text-slate-100">
      <label className="block text-sm">
        Formatter locale
        <select
          value={locale}
          onChange={(event) => setLocale(event.target.value)}
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        >
          {["en-IN", "en-US", "fr-FR", "ja-JP"].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Formatter currency
        <select
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        >
          {["INR", "USD", "EUR", "JPY"].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <p
        data-demo="hook-number"
        className="wrap-anywhere text-2xl tabular-nums"
      >
        {format(value)}
      </p>
      <p className="text-sm">Resolved locale: {resolvedLocale}</p>
      <dl className="space-y-2 text-sm">
        {formatToParts(value).map((part, index) => (
          <div key={index} className="flex flex-wrap gap-3">
            <dt className="font-mono">{part.type}</dt>
            <dd className="font-mono">{JSON.stringify(part.value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
