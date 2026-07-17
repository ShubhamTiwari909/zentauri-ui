import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CalendarBase } from "./calendar-base";
import { Calendar } from "./calendar";
import type { DateRange } from "./date-utils";

// July 2026: starts on Wednesday, 31 days. Deterministic `today`/`locale`
// are always passed explicitly, per the component contract.
const JULY = new Date(2026, 6, 1);
const TODAY = new Date(2026, 6, 7);

const defaults = {
  defaultMonth: JULY,
  today: TODAY,
  locale: "en-US",
} as const;

function dayButtons(container: HTMLElement): HTMLButtonElement[] {
  return Array.from(
    container.querySelectorAll<HTMLButtonElement>(
      '[data-slot="calendar-day-button"]',
    ),
  );
}

function dayButton(container: HTMLElement, label: string): HTMLButtonElement {
  const match = dayButtons(container).find(
    (b) => b.getAttribute("aria-label") === label,
  );
  if (!match) throw new Error(`No day button labeled ${label}`);
  return match;
}

const JULY7 = "Tuesday, July 7, 2026";
const JULY10 = "Friday, July 10, 2026";

describe("Calendar", () => {
  it("has displayName and root data-slot", () => {
    expect(CalendarBase.displayName).toBe("Calendar");
    const { container } = render(<Calendar {...defaults} />);
    const root = container.querySelector('[data-slot="calendar"]');
    expect(root).not.toBeNull();
    expect(root?.getAttribute("data-mode")).toBe("single");
  });

  it("renders the correct grid for July 2026 with firstDayOfWeek 0 and 1", () => {
    const { container, rerender } = render(
      <Calendar {...defaults} firstDayOfWeek={0} />,
    );
    expect(
      container.querySelectorAll('[data-slot="calendar-week"]'),
    ).toHaveLength(5);
    // July 1 2026 is a Wednesday: column index 3 when weeks start Sunday.
    let firstRowCells = container
      .querySelectorAll('[data-slot="calendar-week"]')[0]!
      .querySelectorAll('[data-slot="calendar-day"]');
    expect(
      firstRowCells[3]!.querySelector("button")?.getAttribute("aria-label"),
    ).toBe("Wednesday, July 1, 2026");

    rerender(<Calendar {...defaults} firstDayOfWeek={1} />);
    firstRowCells = container
      .querySelectorAll('[data-slot="calendar-week"]')[0]!
      .querySelectorAll('[data-slot="calendar-day"]');
    // Column index 2 when weeks start Monday.
    expect(
      firstRowCells[2]!.querySelector("button")?.getAttribute("aria-label"),
    ).toBe("Wednesday, July 1, 2026");
    // Today gets aria-current.
    expect(
      container
        .querySelector('[data-today="true"]')
        ?.getAttribute("aria-current"),
    ).toBe("date");
  });

  it("localizes weekday headers, caption, and digits", () => {
    const { container } = render(<Calendar {...defaults} firstDayOfWeek={0} />);
    expect(screen.getByText("July 2026")).toBeTruthy();
    expect(
      container.querySelectorAll('[data-slot="calendar-weekday"]')[0]!
        .textContent,
    ).toBe("Sun");

    const { container: de } = render(
      <Calendar
        defaultMonth={JULY}
        today={TODAY}
        locale="de-DE"
        firstDayOfWeek={1}
      />,
    );
    expect(de.textContent).toContain("Juli 2026");
    expect(
      de.querySelectorAll('[data-slot="calendar-weekday"]')[0]!.textContent,
    ).toBe("Mo");

    const { container: ar } = render(
      <Calendar defaultMonth={JULY} today={TODAY} locale="ar-EG" />,
    );
    expect(ar.textContent).toContain("١٧"); // Arabic-Indic 17
  });

  it("selects and deselects in single mode; required blocks deselect", () => {
    const onValueChange = vi.fn();
    const { container, rerender } = render(
      <Calendar {...defaults} onValueChange={onValueChange} />,
    );
    const seven = dayButton(container, JULY7);
    fireEvent.click(seven);
    expect(onValueChange).toHaveBeenLastCalledWith(expect.any(Date));
    expect(seven.getAttribute("data-selected")).toBe("true");
    fireEvent.click(seven);
    expect(onValueChange).toHaveBeenLastCalledWith(undefined);
    expect(seven.getAttribute("data-selected")).toBeNull();

    rerender(<Calendar {...defaults} onValueChange={onValueChange} required />);
    fireEvent.click(dayButton(container, JULY7));
    fireEvent.click(dayButton(container, JULY7));
    expect(dayButton(container, JULY7).getAttribute("data-selected")).toBe(
      "true",
    );
  });

  it("controlled mode fires onValueChange without changing internally", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Calendar
        {...defaults}
        value={new Date(2026, 6, 10)}
        onValueChange={onValueChange}
      />,
    );
    expect(dayButton(container, JULY10).getAttribute("data-selected")).toBe(
      "true",
    );
    fireEvent.click(dayButton(container, JULY7));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    // Still the controlled value.
    expect(dayButton(container, JULY10).getAttribute("data-selected")).toBe(
      "true",
    );
    expect(
      dayButton(container, JULY7).getAttribute("data-selected"),
    ).toBeNull();
  });

  it("multiple mode toggles and respects max", () => {
    const { container } = render(
      <Calendar {...defaults} mode="multiple" max={2} />,
    );
    fireEvent.click(dayButton(container, "Wednesday, July 1, 2026"));
    fireEvent.click(dayButton(container, "Thursday, July 2, 2026"));
    fireEvent.click(dayButton(container, "Friday, July 3, 2026"));
    expect(
      container.querySelectorAll('[data-selected="true"]').length / 1,
    ).toBe(2);
    expect(
      container
        .querySelector('[data-slot="calendar"]')
        ?.getAttribute("data-selection-full"),
    ).toBe("true");
    // Toggling one off frees a slot.
    fireEvent.click(dayButton(container, "Wednesday, July 1, 2026"));
    fireEvent.click(dayButton(container, "Friday, July 3, 2026"));
    expect(dayButton(container, "Friday, July 3, 2026").dataset.selected).toBe(
      "true",
    );
  });

  it("range mode: forward pick, backward swap, hover paints middle, third click restarts", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Calendar {...defaults} mode="range" onValueChange={onValueChange} />,
    );
    fireEvent.click(dayButton(container, JULY7));
    // Hover paints the pending middle days.
    fireEvent.mouseEnter(dayButton(container, JULY10));
    expect(
      dayButton(container, "Wednesday, July 8, 2026").dataset.rangeMiddle,
    ).toBe("true");
    fireEvent.click(dayButton(container, JULY10));
    const completed = onValueChange.mock.calls.at(-1)?.[0] as DateRange;
    expect(completed.from?.getDate()).toBe(7);
    expect(completed.to?.getDate()).toBe(10);
    expect(dayButton(container, JULY7).dataset.rangeStart).toBe("true");
    expect(dayButton(container, JULY10).dataset.rangeEnd).toBe("true");
    expect(
      dayButton(container, "Wednesday, July 8, 2026").dataset.rangeMiddle,
    ).toBe("true");

    // Third click starts a new range.
    fireEvent.click(dayButton(container, "Monday, July 20, 2026"));
    const restarted = onValueChange.mock.calls.at(-1)?.[0] as DateRange;
    expect(restarted.from?.getDate()).toBe(20);
    expect(restarted.to).toBeUndefined();

    // Backward second pick swaps.
    fireEvent.click(dayButton(container, "Wednesday, July 15, 2026"));
    const swapped = onValueChange.mock.calls.at(-1)?.[0] as DateRange;
    expect(swapped.from?.getDate()).toBe(15);
    expect(swapped.to?.getDate()).toBe(20);
  });

  it("minDate/maxDate clamp navigation and disable days; matchers block clicks but allow focus", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Calendar
        {...defaults}
        minDate={new Date(2026, 6, 1)}
        maxDate={new Date(2026, 7, 31)}
        disabled={{ dayOfWeek: [0, 6] }}
        onValueChange={onValueChange}
      />,
    );
    const prev = container.querySelector<HTMLButtonElement>(
      '[data-slot="calendar-prev-button"]',
    )!;
    expect(prev.disabled).toBe(true);

    const saturday = dayButton(container, "Saturday, July 4, 2026");
    expect(saturday.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(saturday);
    expect(onValueChange).not.toHaveBeenCalled();
    // Still focusable (not a native disabled button).
    expect(saturday.hasAttribute("disabled")).toBe(false);

    const { container: fnDisabled } = render(
      <Calendar
        {...defaults}
        disabled={(d: Date) => d.getDate() === 7}
        onValueChange={onValueChange}
      />,
    );
    fireEvent.click(dayButton(fnDisabled, JULY7));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("full keyboard matrix moves focus; edges flip months; Enter selects", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Calendar
        {...defaults}
        firstDayOfWeek={0}
        onValueChange={onValueChange}
      />,
    );
    const seven = dayButton(container, JULY7);
    seven.focus();

    fireEvent.keyDown(seven, { key: "ArrowRight" });
    expect(document.activeElement?.getAttribute("aria-label")).toBe(
      "Wednesday, July 8, 2026",
    );
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
    expect(document.activeElement?.getAttribute("aria-label")).toBe(
      "Wednesday, July 15, 2026",
    );
    fireEvent.keyDown(document.activeElement!, { key: "ArrowUp" });
    fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });
    expect(document.activeElement?.getAttribute("aria-label")).toBe(JULY7);

    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    expect(document.activeElement?.getAttribute("aria-label")).toBe(
      "Sunday, July 5, 2026",
    );
    fireEvent.keyDown(document.activeElement!, { key: "End" });
    expect(document.activeElement?.getAttribute("aria-label")).toBe(
      "Saturday, July 11, 2026",
    );

    fireEvent.keyDown(document.activeElement!, { key: "PageDown" });
    expect(screen.getByText("August 2026")).toBeTruthy();
    expect(document.activeElement?.getAttribute("aria-label")).toBe(
      "Tuesday, August 11, 2026",
    );
    fireEvent.keyDown(document.activeElement!, { key: "PageUp" });
    expect(screen.getByText("July 2026")).toBeTruthy();

    fireEvent.keyDown(document.activeElement!, {
      key: "PageUp",
      shiftKey: true,
    });
    expect(screen.getByText("July 2025")).toBeTruthy();
    fireEvent.keyDown(document.activeElement!, {
      key: "PageDown",
      shiftKey: true,
    });
    expect(screen.getByText("July 2026")).toBeTruthy();

    // Arrow past the month edge flips the month and keeps focus.
    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    fireEvent.keyDown(document.activeElement!, { key: "ArrowUp" });
    expect(screen.getByText("June 2026")).toBeTruthy();

    fireEvent.keyDown(document.activeElement!, { key: "Enter" });
    expect(onValueChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it("keeps exactly one tabIndex=0 at all times (roving tabindex)", () => {
    const { container } = render(<Calendar {...defaults} />);
    const zeroTabs = () =>
      dayButtons(container).filter((b) => b.tabIndex === 0);
    expect(zeroTabs()).toHaveLength(1);
    fireEvent.keyDown(zeroTabs()[0]!, { key: "ArrowRight" });
    expect(zeroTabs()).toHaveLength(1);
    fireEvent.click(
      container.querySelector('[data-slot="calendar-next-button"]')!,
    );
    expect(zeroTabs()).toHaveLength(1);
  });

  it("renders numberOfMonths=2 with a single shared nav; hides outside days; fixedWeeks pads Feb", () => {
    const { container } = render(<Calendar {...defaults} numberOfMonths={2} />);
    expect(
      container.querySelectorAll('[data-slot="calendar-grid"]'),
    ).toHaveLength(2);
    expect(
      container.querySelectorAll('[data-slot="calendar-prev-button"]'),
    ).toHaveLength(1);
    expect(
      container.querySelectorAll('[data-slot="calendar-next-button"]'),
    ).toHaveLength(1);
    expect(screen.getByText("July 2026")).toBeTruthy();
    expect(screen.getByText("August 2026")).toBeTruthy();

    const { container: noOutside } = render(
      <Calendar {...defaults} showOutsideDays={false} />,
    );
    expect(noOutside.querySelector('[data-outside="true"]')).toBeNull();

    // Feb 2026 fits 4 natural rows; fixedWeeks forces 6.
    const { container: fixed } = render(
      <Calendar
        defaultMonth={new Date(2026, 1, 1)}
        today={TODAY}
        locale="en-US"
        fixedWeeks
      />,
    );
    expect(fixed.querySelectorAll('[data-slot="calendar-week"]')).toHaveLength(
      6,
    );
  });

  it("captionLayout dropdowns navigate months and years", () => {
    const { container } = render(
      <Calendar
        {...defaults}
        captionLayout="dropdowns"
        fromYear={2020}
        toYear={2030}
      />,
    );
    const monthSelect = container.querySelector<HTMLSelectElement>(
      '[data-slot="calendar-month-dropdown"]',
    )!;
    expect(monthSelect.value).toBe("6");
    fireEvent.change(monthSelect, { target: { value: "0" } });
    expect(dayButton(container, "Thursday, January 1, 2026")).toBeTruthy();
    fireEvent.change(
      container.querySelector<HTMLSelectElement>(
        '[data-slot="calendar-year-dropdown"]',
      )!,
      { target: { value: "2028" } },
    );
    expect(dayButton(container, "Saturday, January 1, 2028")).toBeTruthy();
  });

  it("renderDay output appears with correct state flags", () => {
    const { container } = render(
      <Calendar
        {...defaults}
        value={new Date(2026, 6, 7)}
        renderDay={(day, state) => (
          <span data-testid={`d-${day.getDate()}`}>
            {day.getDate()}
            {state.isSelected ? "!" : ""}
            {state.isToday ? "*" : ""}
          </span>
        )}
      />,
    );
    expect(screen.getByTestId("d-7").textContent).toBe("7!*");
    expect(screen.getByTestId("d-8").textContent).toBe("8");
    expect(container).toBeTruthy();
  });

  it("shows ISO week numbers when enabled", () => {
    const { container } = render(
      <Calendar {...defaults} showWeekNumbers firstDayOfWeek={1} />,
    );
    expect(
      container.querySelectorAll('[data-slot="calendar-week-number"]').length,
    ).toBeGreaterThan(0);
  });

  it("applies appearance and size variant classes and forwards className", () => {
    const { container } = render(
      <Calendar
        {...defaults}
        appearance="blue"
        size="lg"
        className="custom-cal"
      />,
    );
    const root = container.querySelector('[data-slot="calendar"]')!;
    expect(root.className).toContain("custom-cal");
    expect(root.className).toContain("text-base");
    const button = dayButtons(container as HTMLElement)[0]!;
    expect(button.className).toContain("--zui-calendar-blue-selected-bg");
  });

  it("never constructs Intl.DateTimeFormat in the day-cell render path", () => {
    const spy = vi.spyOn(Intl, "DateTimeFormat");
    const before = spy.mock.calls.length;
    const { rerender } = render(<Calendar {...defaults} />);
    const afterFirst = spy.mock.calls.length;
    rerender(<Calendar {...defaults} value={new Date(2026, 6, 8)} />);
    rerender(<Calendar {...defaults} value={new Date(2026, 6, 9)} />);
    // Re-renders with the same locale hit the module-level formatter cache.
    expect(spy.mock.calls.length).toBe(afterFirst);
    // And even the first render constructs only a handful of formatters, far
    // fewer than the 35 rendered day cells.
    expect(afterFirst - before).toBeLessThan(10);
    spy.mockRestore();
  });
});
