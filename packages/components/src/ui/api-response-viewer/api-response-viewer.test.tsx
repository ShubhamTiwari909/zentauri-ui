import { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ApiResponseViewer } from "./api-response-viewer";
import {
  apiResponseReasonPhrase,
  apiResponseStatusTone,
  formatApiResponseBody,
} from "./api-response-viewer-base";

const SAMPLE = {
  status: 200,
  method: "GET",
  url: "https://api.example.com/v1/users/8f21",
  time: 128,
  responseSize: "2.4 KB",
  headers: {
    "content-type": "application/json",
    "x-request-id": "req_8f21",
  },
  body: { ok: true, user: { id: "u_8f21", name: "Ada Lovelace" } },
} as const;

describe("ApiResponseViewer", () => {
  it("should set displayName", () => {
    expect(ApiResponseViewer.displayName).toBe("ApiResponseViewer");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<ApiResponseViewer {...SAMPLE} />);
    expect(
      container.querySelector('[data-slot="api-response-viewer"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="api-response-viewer-panel"]'),
    ).toBeTruthy();
  });

  it("should render the status code and derived reason phrase", () => {
    const { container } = render(<ApiResponseViewer {...SAMPLE} />);
    const pill = container.querySelector(
      '[data-slot="api-response-viewer-status"]',
    );
    expect(pill?.textContent).toContain("200");
    expect(pill?.textContent).toContain("OK");
  });

  it("should tone a 200 status as success", () => {
    const { container } = render(<ApiResponseViewer status={200} body={{}} />);
    const pill = container.querySelector(
      '[data-slot="api-response-viewer-status"]',
    );
    expect(pill?.getAttribute("data-tone")).toBe("success");
  });

  it("should tone a 404 status as clientError", () => {
    const { container } = render(<ApiResponseViewer status={404} body={{}} />);
    const pill = container.querySelector(
      '[data-slot="api-response-viewer-status"]',
    );
    expect(pill?.getAttribute("data-tone")).toBe("clientError");
    expect(pill?.textContent).toContain("Not Found");
  });

  it("should render the method and url", () => {
    const { container } = render(<ApiResponseViewer {...SAMPLE} />);
    expect(
      container.querySelector('[data-slot="api-response-viewer-method"]')
        ?.textContent,
    ).toBe("GET");
    expect(
      container.querySelector('[data-slot="api-response-viewer-url"]')
        ?.textContent,
    ).toBe(SAMPLE.url);
  });

  it("should show the pretty body by default", () => {
    const { container } = render(<ApiResponseViewer {...SAMPLE} />);
    const body = container.querySelector(
      '[data-slot="api-response-viewer-body"]',
    );
    expect(body?.textContent).toContain('"ok": true');
  });

  it("should switch to the Headers tab and show a header key", () => {
    const { container } = render(<ApiResponseViewer {...SAMPLE} />);
    const headersTab = [
      ...container.querySelectorAll('[data-slot="api-response-viewer-tab"]'),
    ].find((t) => t.textContent === "Headers") as HTMLButtonElement;
    fireEvent.click(headersTab);
    const list = container.querySelector(
      '[data-slot="api-response-viewer-headers"]',
    );
    expect(list?.textContent).toContain("content-type");
    expect(list?.textContent).toContain("application/json");
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ApiResponseViewer {...SAMPLE} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("api-response-viewer");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <ApiResponseViewer {...SAMPLE} className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="api-response-viewer"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});

describe("api-response-viewer helpers", () => {
  it("derives status tone from the status class", () => {
    expect(apiResponseStatusTone(100)).toBe("info");
    expect(apiResponseStatusTone(204)).toBe("success");
    expect(apiResponseStatusTone(301)).toBe("redirect");
    expect(apiResponseStatusTone(404)).toBe("clientError");
    expect(apiResponseStatusTone(500)).toBe("serverError");
    expect(apiResponseStatusTone(999)).toBe("neutral");
  });

  it("resolves reason phrases", () => {
    expect(apiResponseReasonPhrase(200)).toBe("OK");
    expect(apiResponseReasonPhrase(404)).toBe("Not Found");
    expect(apiResponseReasonPhrase(200, "All good")).toBe("All good");
    // unknown code falls back to its class label
    expect(apiResponseReasonPhrase(599)).toBe("Server Error");
  });

  it("pretty-prints the body", () => {
    expect(formatApiResponseBody({ a: 1 })).toBe('{\n  "a": 1\n}');
    expect(formatApiResponseBody(undefined)).toBe("");
  });
});
