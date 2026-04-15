import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const CARD_SLOT = '[data-slot="card"]';

function getCardRoot(container: HTMLElement = document.body) {
  const elements = container.querySelectorAll(CARD_SLOT);
  expect(elements.length).toBe(1);
  return elements[0] as HTMLElement;
}

describe("Card", () => {
  it("should set displayName on compound parts", () => {
    expect(Card.displayName).toBe("Card");
    expect(CardHeader.displayName).toBe("CardHeader");
    expect(CardBody.displayName).toBe("CardBody");
    expect(CardFooter.displayName).toBe("CardFooter");
    expect(CardTitle.displayName).toBe("CardTitle");
    expect(CardDescription.displayName).toBe("CardDescription");
  });

  it("should stamp data-slot on the root article", () => {
    render(
      <Card>
        <CardBody>Content</CardBody>
      </Card>,
    );
    const root = getCardRoot();
    expect(root.tagName).toBe("ARTICLE");
    expect(root.getAttribute("data-slot")).toBe("card");
  });

  it("should apply default appearance classes", () => {
    render(<Card>Inner</Card>);
    expect(getCardRoot().className).toMatch(/border-white\/10/);
  });

  it("should apply glass appearance when requested", () => {
    render(<Card appearance="glass">Inner</Card>);
    expect(getCardRoot().className).toMatch(/backdrop-blur-md/);
  });

  it("should forward ref to the article element", () => {
    const ref = createRef<HTMLElement>();
    render(<Card ref={ref}>R</Card>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("card");
  });

  it("should render semantic heading for CardTitle", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title text</CardTitle>
        </CardHeader>
      </Card>,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Title text" }),
    ).toBeInTheDocument();
  });

  it("should allow CardTitle as h2", () => {
    render(
      <Card>
        <CardTitle as="h2">Primary</CardTitle>
      </Card>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Primary" })).toBeInTheDocument();
  });
});
