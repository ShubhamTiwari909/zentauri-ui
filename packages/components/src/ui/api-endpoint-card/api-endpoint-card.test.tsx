import { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ApiEndpointCard } from "./api-endpoint-card";
import { apiMethodTone } from "./api-endpoint-card-base";

const SAMPLE = {
  method: "POST" as const,
  path: "/api/v1/users",
  description: "Create a new user account.",
  tags: ["users", "auth"],
  examples: [
    {
      title: "Create user",
      requestBody: { name: "Ada", email: "ada@example.com" },
      responseBody: { id: 1, name: "Ada" },
    },
  ],
};

describe("ApiEndpointCard", () => {
  it("should set displayName", () => {
    expect(ApiEndpointCard.displayName).toBe("ApiEndpointCard");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<ApiEndpointCard {...SAMPLE} />);
    expect(
      container.querySelector('[data-slot="api-endpoint-card"]'),
    ).toBeTruthy();
  });

  it("should render the method (uppercased) and path", () => {
    const { container } = render(<ApiEndpointCard {...SAMPLE} />);
    const method = container.querySelector(
      '[data-slot="api-endpoint-card-method"]',
    );
    expect(method?.textContent).toBe("POST");
    const path = container.querySelector(
      '[data-slot="api-endpoint-card-path"]',
    );
    expect(path?.textContent).toBe("/api/v1/users");
  });

  it("should stamp data-method on the badge", () => {
    const { container } = render(<ApiEndpointCard {...SAMPLE} />);
    const method = container.querySelector(
      '[data-slot="api-endpoint-card-method"]',
    );
    expect(method?.getAttribute("data-method")).toBe("POST");
  });

  it("should render description", () => {
    const { container } = render(<ApiEndpointCard {...SAMPLE} />);
    const desc = container.querySelector(
      '[data-slot="api-endpoint-card-description"]',
    );
    expect(desc?.textContent).toBe("Create a new user account.");
  });

  it("should render tags", () => {
    const { container } = render(<ApiEndpointCard {...SAMPLE} />);
    expect(container.textContent).toContain("users");
    expect(container.textContent).toContain("auth");
  });

  it("should hide tags when showTags is false", () => {
    const { container } = render(
      <ApiEndpointCard {...SAMPLE} showTags={false} />,
    );
    expect(
      container.querySelector('[data-slot="api-endpoint-card-tags"]'),
    ).toBeFalsy();
  });

  it("should toggle examples when the button is clicked", () => {
    const { container } = render(<ApiEndpointCard {...SAMPLE} />);
    const toggle = container.querySelector(
      '[data-slot="api-endpoint-card-example-toggle"]',
    ) as HTMLButtonElement;
    expect(toggle).toBeTruthy();

    expect(
      container.querySelector(
        '[data-slot="api-endpoint-card-example-content"]',
      ),
    ).toBeFalsy();

    fireEvent.click(toggle);
    expect(
      container.querySelector(
        '[data-slot="api-endpoint-card-example-content"]',
      ),
    ).toBeTruthy();

    fireEvent.click(toggle);
    expect(
      container.querySelector(
        '[data-slot="api-endpoint-card-example-content"]',
      ),
    ).toBeFalsy();
  });

  it("should hide examples when showExamples is false", () => {
    const { container } = render(
      <ApiEndpointCard {...SAMPLE} showExamples={false} />,
    );
    expect(
      container.querySelector('[data-slot="api-endpoint-card-example-toggle"]'),
    ).toBeFalsy();
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ApiEndpointCard {...SAMPLE} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("api-endpoint-card");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <ApiEndpointCard {...SAMPLE} className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="api-endpoint-card"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});

describe("api-endpoint-card helpers", () => {
  it("maps known methods to a tone and falls back to neutral", () => {
    expect(apiMethodTone("get")).toBe("GET");
    expect(apiMethodTone("POST")).toBe("POST");
    expect(apiMethodTone("delete")).toBe("DELETE");
    expect(apiMethodTone("UNKNOWN")).toBe("neutral");
  });
});
