import { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HttpRequestViewer } from "./http-request-viewer";
import { formatRequestBody, httpMethodTone } from "./http-request-viewer-base";

const SAMPLE = {
  method: "post",
  url: "https://api.example.com/v1/login",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer t0k3n",
  },
  query: { redirect: "/dashboard" },
  body: { email: "ada@example.com", remember: true },
};

describe("HttpRequestViewer", () => {
  it("should set displayName", () => {
    expect(HttpRequestViewer.displayName).toBe("HttpRequestViewer");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<HttpRequestViewer {...SAMPLE} />);
    expect(
      container.querySelector('[data-slot="http-request-viewer"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="http-request-viewer-header"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="http-request-viewer-panel"]'),
    ).toBeTruthy();
  });

  it("should render the method (uppercased) and url", () => {
    const { container } = render(<HttpRequestViewer {...SAMPLE} />);
    const method = container.querySelector(
      '[data-slot="http-request-viewer-method"]',
    );
    expect(method?.textContent).toBe("POST");
    const url = container.querySelector(
      '[data-slot="http-request-viewer-url"]',
    );
    expect(url?.textContent).toBe("https://api.example.com/v1/login");
  });

  it("should stamp data-method on the badge", () => {
    const { container } = render(<HttpRequestViewer {...SAMPLE} />);
    const method = container.querySelector(
      '[data-slot="http-request-viewer-method"]',
    );
    expect(method?.getAttribute("data-method")).toBe("POST");
  });

  it("should show headers in the default panel", () => {
    const { container } = render(<HttpRequestViewer {...SAMPLE} />);
    expect(container.textContent).toContain("Content-Type");
    expect(container.textContent).toContain("application/json");
  });

  it("should switch to the query tab and show query content", () => {
    const { container } = render(<HttpRequestViewer {...SAMPLE} />);
    const queryTab = [
      ...container.querySelectorAll('[data-slot="http-request-viewer-tab"]'),
    ].find((t) => t.textContent === "Query") as HTMLButtonElement;
    fireEvent.click(queryTab);
    expect(queryTab.getAttribute("data-active")).toBe("true");
    expect(container.textContent).toContain("redirect");
    expect(container.textContent).toContain("/dashboard");
  });

  it("should switch to the body tab and show pretty JSON", () => {
    const { container } = render(<HttpRequestViewer {...SAMPLE} />);
    const bodyTab = [
      ...container.querySelectorAll('[data-slot="http-request-viewer-tab"]'),
    ].find((t) => t.textContent === "Body") as HTMLButtonElement;
    fireEvent.click(bodyTab);
    const body = container.querySelector(
      '[data-slot="http-request-viewer-body"]',
    );
    expect(body?.textContent).toContain('"email": "ada@example.com"');
  });

  it("should show an empty-state line for a missing section", () => {
    const { container } = render(
      <HttpRequestViewer method="get" url="/health" />,
    );
    expect(container.textContent).toContain("No headers");
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<HttpRequestViewer {...SAMPLE} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("http-request-viewer");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <HttpRequestViewer {...SAMPLE} className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="http-request-viewer"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});

describe("http-request-viewer helpers", () => {
  it("maps known methods to a tone and falls back to neutral", () => {
    expect(httpMethodTone("get")).toBe("GET");
    expect(httpMethodTone("POST")).toBe("POST");
    expect(httpMethodTone("delete")).toBe("DELETE");
    expect(httpMethodTone("OPTIONS")).toBe("neutral");
  });

  it("pretty-prints a request body as JSON", () => {
    expect(formatRequestBody({ a: 1 })).toBe('{\n  "a": 1\n}');
  });
});
