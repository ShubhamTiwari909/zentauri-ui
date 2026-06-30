import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HttpStatusBadge } from "./http-status-badge";
import { httpStatusText, httpStatusTone } from "./http-status-badge-base";

describe("HttpStatusBadge", () => {
  it("should set displayName", () => {
    expect(HttpStatusBadge.displayName).toBe("HttpStatusBadge");
  });

  it("should stamp data-slot on the root element", () => {
    const { container } = render(<HttpStatusBadge status={200} />);
    expect(
      container.querySelector('[data-slot="http-status-badge"]'),
    ).toBeTruthy();
  });

  it("should render the code and reason phrase", () => {
    const { container } = render(<HttpStatusBadge status={200} />);
    const root = container.querySelector('[data-slot="http-status-badge"]');
    expect(root?.textContent).toContain("200");
    expect(root?.textContent).toContain("OK");
  });

  it("should derive data-tone from the status class", () => {
    const { container, rerender } = render(<HttpStatusBadge status={200} />);
    const root = () =>
      container.querySelector('[data-slot="http-status-badge"]');
    expect(root()?.getAttribute("data-tone")).toBe("success");
    rerender(<HttpStatusBadge status={404} />);
    expect(root()?.getAttribute("data-tone")).toBe("clientError");
    rerender(<HttpStatusBadge status={503} />);
    expect(root()?.getAttribute("data-tone")).toBe("serverError");
  });

  it("should honor a statusText override", () => {
    const { container } = render(
      <HttpStatusBadge status={418} statusText="I'm a teapot" />,
    );
    const root = container.querySelector('[data-slot="http-status-badge"]');
    expect(root?.textContent).toContain("I'm a teapot");
  });

  it("should show only the code when showText is false", () => {
    const { container } = render(
      <HttpStatusBadge status={200} showText={false} />,
    );
    const root = container.querySelector('[data-slot="http-status-badge"]');
    expect(root?.textContent).toBe("200");
    expect(
      container.querySelector('[data-slot="http-status-badge-text"]'),
    ).toBeFalsy();
  });

  it("should render each appearance variant", () => {
    for (const appearance of ["solid", "soft", "outline"] as const) {
      const { container } = render(
        <HttpStatusBadge status={200} appearance={appearance} />,
      );
      expect(
        container.querySelector('[data-slot="http-status-badge"]'),
      ).toBeTruthy();
    }
  });

  it("should forward refs to the root span", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<HttpStatusBadge status={200} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("http-status-badge");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <HttpStatusBadge status={200} className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="http-status-badge"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});

describe("http-status-badge helpers", () => {
  it("maps status codes to tones", () => {
    expect(httpStatusTone(100)).toBe("info");
    expect(httpStatusTone(200)).toBe("success");
    expect(httpStatusTone(301)).toBe("redirect");
    expect(httpStatusTone(404)).toBe("clientError");
    expect(httpStatusTone(503)).toBe("serverError");
    expect(httpStatusTone(999)).toBe("neutral");
  });

  it("resolves reason phrases with tone-label fallback", () => {
    expect(httpStatusText(200)).toBe("OK");
    expect(httpStatusText(404)).toBe("Not Found");
    expect(httpStatusText(599)).toBe("Server Error");
    expect(httpStatusText(250)).toBe("Success");
  });
});
