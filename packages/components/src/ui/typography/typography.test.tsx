import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Blockquote,
  CodeBlock,
  Heading,
  InlineCode,
  List,
  ListItem,
  Text,
} from "./index";

describe("Typography primitives", () => {
  it("should render Heading as the requested level with displayName", () => {
    render(<Heading level={2}>Section</Heading>);
    expect(
      screen.getByRole("heading", { level: 2, name: "Section" }),
    ).toBeInTheDocument();
    expect(Heading.displayName).toBe("Heading");
  });

  it("should apply tone classes on Text", () => {
    const { container } = render(
      <Text tone="muted" data-testid="muted-text">
        Body
      </Text>,
    );
    const node = container.querySelector('[data-testid="muted-text"]');
    expect(node?.className).toMatch(/text-slate-400/);
  });

  it("should render unordered List with list marker utilities", () => {
    const { container } = render(
      <List>
        <ListItem>Alpha</ListItem>
      </List>,
    );
    const ul = container.querySelector('[data-slot="typography-list"]');
    expect(ul?.tagName).toBe("UL");
    expect(ul?.className).toMatch(/list-disc/);
  });

  it("should render ordered List as ol", () => {
    const { container } = render(
      <List ordered>
        <ListItem>One</ListItem>
      </List>,
    );
    const ol = container.querySelector('[data-slot="typography-list"]');
    expect(ol?.tagName).toBe("OL");
    expect(ol?.className).toMatch(/list-decimal/);
  });

  it("should render Blockquote with optional attribution footer", () => {
    render(
      <Blockquote attribution="Source">
        <p>Quoted</p>
      </Blockquote>,
    );
    expect(screen.getByText("Quoted")).toBeInTheDocument();
    expect(screen.getByText("Source")).toBeInTheDocument();
  });

  it("should render InlineCode with monospace styling token", () => {
    const { container } = render(<InlineCode>npm i</InlineCode>);
    const code = container.querySelector('[data-slot="typography-inline-code"]');
    expect(code?.tagName).toBe("CODE");
    expect(code?.className).toMatch(/font-mono/);
  });

  it("should render CodeBlock with nested code element", () => {
    const { container } = render(
      <CodeBlock language="tsx">{`const x = 1;`}</CodeBlock>,
    );
    const pre = container.querySelector('[data-slot="typography-code-block"]');
    expect(pre?.tagName).toBe("PRE");
    expect(pre?.querySelector("code")?.textContent).toContain("const x");
  });
});
