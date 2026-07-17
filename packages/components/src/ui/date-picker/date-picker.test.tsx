import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DatePickerBase } from "./date-picker-base";
import { DatePicker } from "./date-picker";
import type { DateRange } from "./types";

const TODAY = new Date(2026, 6, 7);

const defaults = {
  today: TODAY,
  locale: "en-US",
} as const;

function trigger(container: HTMLElement): HTMLButtonElement {
  return container.querySelector<HTMLButtonElement>(
    '[data-slot="date-picker-trigger"]',
  )!;
}

function dialog(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-slot="date-picker-content"]');
}

function dayButton(container: HTMLElement, label: string): HTMLButtonElement {
  const match = Array.from(
    container.querySelectorAll<HTMLButtonElement>(
      '[data-slot="calendar-day-button"]',
    ),
  ).find((b) => b.getAttribute("aria-label") === label);
  if (!match) throw new Error(`No day button labeled ${label}`);
  return match;
}

const JULY7 = "Tuesday, July 7, 2026";
const JULY10 = "Friday, July 10, 2026";

const mediumFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

describe("DatePicker", () => {
  it("has displayName and renders a closed trigger by default", () => {
    expect(DatePickerBase.displayName).toBe("DatePicker");
    const { container } = render(<DatePicker {...defaults} />);
    const btn = trigger(container);
    expect(btn.getAttribute("data-state")).toBe("closed");
    expect(btn.getAttribute("data-empty")).toBe("true");
    expect(btn.getAttribute("aria-haspopup")).toBe("dialog");
    expect(btn.textContent).toContain("Pick a date");
    expect(dialog(container)).toBeNull();
  });

  it("opens on click and ArrowDown, focuses the grid, and Escape returns focus to the trigger", () => {
    const { container } = render(<DatePicker {...defaults} />);
    const btn = trigger(container);

    fireEvent.click(btn);
    expect(dialog(container)).not.toBeNull();
    expect(dialog(container)?.getAttribute("role")).toBe("dialog");
    expect(dialog(container)?.getAttribute("aria-label")).toBe("Choose date");
    // Focus lands on the roving-tabindex day (today).
    expect(document.activeElement?.getAttribute("aria-label")).toBe(JULY7);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(dialog(container)).toBeNull();
    expect(document.activeElement).toBe(btn);

    // ArrowDown re-opens (Enter/Space rely on the browser's native
    // button-activation click, which jsdom does not simulate).
    fireEvent.keyDown(btn, { key: "ArrowDown" });
    expect(dialog(container)).not.toBeNull();
  });

  it("single mode: picking a day formats the trigger and closes; closeOnSelect=false keeps it open", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <DatePicker {...defaults} onValueChange={onValueChange} />,
    );
    fireEvent.click(trigger(container));
    fireEvent.click(dayButton(container, JULY7));

    expect(onValueChange).toHaveBeenCalledWith(expect.any(Date));
    expect(dialog(container)).toBeNull();
    expect(trigger(container).textContent).toContain(
      mediumFormatter.format(new Date(2026, 6, 7)),
    );
    expect(trigger(container).getAttribute("data-empty")).toBeNull();
    expect(document.activeElement).toBe(trigger(container));

    const { container: sticky } = render(
      <DatePicker {...defaults} closeOnSelect={false} />,
    );
    fireEvent.click(trigger(sticky));
    fireEvent.click(dayButton(sticky, JULY7));
    expect(dialog(sticky)).not.toBeNull();
  });

  it("range mode: from/to flow shows the formatted range and closes on completion", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <DatePicker {...defaults} mode="range" onValueChange={onValueChange} />,
    );
    fireEvent.click(trigger(container));
    fireEvent.click(dayButton(container, JULY7));
    // Pending range keeps the popover open.
    expect(dialog(container)).not.toBeNull();
    fireEvent.click(dayButton(container, JULY10));
    expect(dialog(container)).toBeNull();

    const completed = onValueChange.mock.calls.at(-1)?.[0] as DateRange;
    expect(completed.from?.getDate()).toBe(7);
    expect(completed.to?.getDate()).toBe(10);

    // Assert via the same formatter the component uses (Node-ICU-proof).
    const expected =
      typeof mediumFormatter.formatRange === "function"
        ? mediumFormatter.formatRange(
            new Date(2026, 6, 7),
            new Date(2026, 6, 10),
          )
        : `${mediumFormatter.format(new Date(2026, 6, 7))} – ${mediumFormatter.format(new Date(2026, 6, 10))}`;
    expect(trigger(container).textContent).toContain(expected);
  });

  it("supports controlled value and controlled open", () => {
    const onValueChange = vi.fn();
    const onOpenChange = vi.fn();
    const { container } = render(
      <DatePicker
        {...defaults}
        value={new Date(2026, 6, 10)}
        onValueChange={onValueChange}
        open
        onOpenChange={onOpenChange}
      />,
    );
    expect(dialog(container)).not.toBeNull();
    expect(trigger(container).textContent).toContain(
      mediumFormatter.format(new Date(2026, 6, 10)),
    );

    fireEvent.click(dayButton(container, JULY7));
    expect(onValueChange).toHaveBeenCalledWith(expect.any(Date));
    // Controlled: still shows the controlled value, still open (prop-driven).
    expect(trigger(container).textContent).toContain(
      mediumFormatter.format(new Date(2026, 6, 10)),
    );
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(dialog(container)).not.toBeNull();
  });

  it("clearable clears the value and sets data-empty", () => {
    const { container } = render(
      <DatePicker
        {...defaults}
        defaultValue={new Date(2026, 6, 10)}
        clearable
      />,
    );
    expect(trigger(container).getAttribute("data-empty")).toBeNull();
    const clear = container.querySelector<HTMLButtonElement>(
      '[data-slot="date-picker-clear"]',
    )!;
    fireEvent.click(clear);
    expect(trigger(container).getAttribute("data-empty")).toBe("true");
    expect(document.activeElement).toBe(trigger(container));
    expect(
      container.querySelector('[data-slot="date-picker-clear"]'),
    ).toBeNull();
  });

  it("emits local-date yyyy-MM-dd hidden inputs for single and range", () => {
    // 00:30 local time: toISOString() would shift to the previous UTC day in
    // any timezone ahead of UTC — catches toISOString regressions.
    const { container } = render(
      <DatePicker
        {...defaults}
        name="starts"
        value={new Date(2026, 6, 7, 0, 30)}
      />,
    );
    const single = container.querySelector<HTMLInputElement>(
      'input[name="starts"]',
    )!;
    expect(single.value).toBe("2026-07-07");

    const { container: rangeContainer } = render(
      <DatePicker
        {...defaults}
        mode="range"
        name="stay"
        value={{
          from: new Date(2026, 6, 7, 0, 30),
          to: new Date(2026, 6, 10, 23, 45),
        }}
      />,
    );
    expect(
      rangeContainer.querySelector<HTMLInputElement>('input[name="stay"]')!
        .value,
    ).toBe("2026-07-07");
    expect(
      rangeContainer.querySelector<HTMLInputElement>('input[name="stay-end"]')!
        .value,
    ).toBe("2026-07-10");
  });

  it("whole-control disabled blocks opening; disabledDates threads to the calendar", () => {
    const { container } = render(<DatePicker {...defaults} disabled />);
    expect(trigger(container).disabled).toBe(true);
    fireEvent.click(trigger(container));
    expect(dialog(container)).toBeNull();

    const { container: withMatcher } = render(
      <DatePicker
        {...defaults}
        disabledDates={{ dayOfWeek: [0, 6] }}
        defaultOpen
      />,
    );
    expect(
      dayButton(withMatcher, "Saturday, July 4, 2026").getAttribute(
        "aria-disabled",
      ),
    ).toBe("true");
  });

  it("threads the locale to the trigger format and calendar headers", () => {
    const { container } = render(
      <DatePicker
        today={TODAY}
        locale="de-DE"
        value={new Date(2026, 6, 7)}
        defaultOpen
        firstDayOfWeek={1}
      />,
    );
    const deFormatter = new Intl.DateTimeFormat("de-DE", {
      dateStyle: "medium",
    });
    expect(trigger(container).textContent).toContain(
      deFormatter.format(new Date(2026, 6, 7)),
    );
    expect(
      container.querySelectorAll('[data-slot="calendar-weekday"]')[0]!
        .textContent,
    ).toBe("Mo");
  });

  it("forwards className and appearance/size variant classes to the trigger", () => {
    const { container } = render(
      <DatePicker
        {...defaults}
        appearance="blue"
        size="lg"
        className="custom-dp"
      />,
    );
    const btn = trigger(container);
    expect(btn.className).toContain("custom-dp");
    expect(btn.className).toContain("--zui-date-picker-trigger-blue-border");
    expect(btn.className).toContain("--zui-date-picker-trigger-h-lg");
  });
});
