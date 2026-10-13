import { createRef, act } from "react";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import { NumberText } from "./index";

it("renders a native span with formatted text, tabular styling and attributes/ref", () => {
  const ref = createRef<HTMLSpanElement>();
  render(
    <NumberText ref={ref} value={1234567.89} locale="en-IN" title="Revenue" />,
  );
  expect(ref.current?.tagName).toBe("SPAN");
  expect(ref.current).toHaveTextContent("12,34,567.89");
  expect(ref.current).toHaveClass("tabular-nums");
  expect(ref.current).toHaveAttribute("title", "Revenue");
});
it("supports paragraph/div refs, numeric overrides and typography controls", () => {
  const ref = createRef<HTMLParagraphElement>();
  const { rerender } = render(
    <NumberText
      as="p"
      ref={ref}
      value={12}
      numeric="normal"
      size="lg"
      weight="bold"
    />,
  );
  expect(ref.current?.tagName).toBe("P");
  expect(ref.current).toHaveClass("normal-nums");
  expect(ref.current).not.toHaveClass("tabular-nums");
  const div = createRef<HTMLDivElement>();
  rerender(<NumberText as="div" ref={div} value={13} />);
  expect(div.current?.tagName).toBe("DIV");
});
it("keeps native CSS style separate from Intl formatting style", () => {
  render(
    <NumberText
      data-testid="amount"
      value={12.5}
      style={{ color: "red" }}
      formatOptions={{ style: "currency", currency: "USD" }}
    />,
  );
  expect(screen.getByTestId("amount")).toHaveTextContent("$12.50");
  expect(screen.getByTestId("amount")).toHaveStyle({ color: "rgb(255, 0, 0)" });
});
it("styles parts while retaining locale order, complete text and literals", () => {
  const value = 1234.56;
  const options = { style: "currency", currency: "EUR" } as const;
  const { container } = render(
    <NumberText
      value={value}
      locale="fr-FR"
      formatOptions={options}
      partClassNames={{ currency: "currency", fraction: "fraction" }}
    />,
  );
  const parts = [...container.querySelectorAll("[data-number-part]")];
  const native = new Intl.NumberFormat("fr-FR", options).formatToParts(value);
  expect(parts.map((part) => part.textContent)).toEqual(
    native.map((part) => part.value),
  );
  expect(container.textContent).toBe(
    new Intl.NumberFormat("fr-FR", options).format(value),
  );
  expect(container.querySelector('[data-number-part="currency"]')).toHaveClass(
    "currency",
  );
  expect(container.querySelector('[data-number-part="fraction"]')).toHaveClass(
    "fraction",
  );
  expect(container.querySelector("[aria-hidden]")).toBeNull();
});
it("responds to value, locale and formatting-option changes", () => {
  const { container, rerender } = render(
    <NumberText value={12} locale="en-US" />,
  );
  rerender(
    <NumberText
      value={123456}
      locale="en-IN"
      formatOptions={{ style: "currency", currency: "INR" }}
    />,
  );
  expect(container.textContent).toBe(
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(123456),
  );
});
it("retains bigint precision and native nonfinite/negative-zero output", () => {
  for (const value of [9007199254740993123n, NaN, Infinity, -Infinity, -0]) {
    const { container, unmount } = render(
      <NumberText value={value} locale="en-US" />,
    );
    expect(container.textContent).toBe(
      new Intl.NumberFormat("en-US").format(value),
    );
    unmount();
  }
});
it("rejects strings and invalid formatting options", () => {
  expect(() =>
    renderToString(<NumberText value={"12" as unknown as number} />),
  ).toThrow(TypeError);
  expect(() =>
    renderToString(
      <NumberText value={12} formatOptions={{ style: "currency" }} />,
    ),
  ).toThrow(TypeError);
});
it("hydrates explicit-locale markup without depending on navigator language", async () => {
  const locale = vi
    .spyOn(navigator, "language", "get")
    .mockReturnValue("de-DE");
  const errors = vi.fn();
  const container = document.createElement("div");
  document.body.append(container);
  const node = (
    <NumberText
      value={1234567.89}
      locale="en-IN"
      formatOptions={{ style: "currency", currency: "INR" }}
      partClassNames={{ fraction: "fraction" }}
    />
  );
  container.innerHTML = renderToString(node);
  const before = container.innerHTML;
  let root: ReturnType<typeof hydrateRoot> | undefined;
  try {
    await act(async () => {
      root = hydrateRoot(container, node, { onRecoverableError: errors });
    });
    expect(container.innerHTML).toBe(before);
    expect(errors).not.toHaveBeenCalled();
    await act(async () => root?.unmount());
  } finally {
    container.remove();
    locale.mockRestore();
  }
});
