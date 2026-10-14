import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Prose,
  Heading,
  Text,
  TextLink,
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
  DescriptionListDetails,
} from "./index";

describe("Prose content", () => {
  it("renders a native article, preserves content and forwards its ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Prose as="article" ref={ref} aria-label="Release notes">
        <h2>Release</h2>
        <p>
          Body <code>sample</code>
        </p>
      </Prose>,
    );
    expect(screen.getByRole("article", { name: "Release notes" })).toBe(
      ref.current,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Release",
    );
    expect(ref.current?.querySelector("code")?.textContent).toBe("sample");
  });
  it("defaults to a readable block and consumes its visual props", () => {
    const { container } = render(
      <Prose size="lg" measure="wide" tone="muted">
        Content
      </Prose>,
    );
    const root = container.firstElementChild;
    expect(root?.tagName).toBe("DIV");
    expect(root?.className).toContain("--zui-typography-measure-wide");
    expect(root?.className).toContain("--zui-typography-text-lg-size");
    for (const prop of ["as", "size", "measure", "tone"])
      expect(root).not.toHaveAttribute(prop);
  });
  it("preserves embedded component slots and opt-out boundaries", () => {
    render(
      <Prose>
        <Heading level={3}>Embedded title</Heading>
        <Text>Embedded body</Text>
        <div data-prose="ignore">
          <p>Panel text</p>
          <button>Panel action</button>
        </div>
      </Prose>,
    );
    expect(screen.getByRole("heading")).toHaveAttribute(
      "data-slot",
      "typography-heading",
    );
    expect(screen.getByText("Embedded body")).toHaveAttribute(
      "data-slot",
      "typography-text",
    );
    expect(screen.getByText("Panel text").parentElement).toHaveAttribute(
      "data-prose",
      "ignore",
    );
    expect(
      screen.getByRole("button", { name: "Panel action" }),
    ).toBeInTheDocument();
  });
  it("keeps nested lists, native tables and images in the supplied markup", () => {
    render(
      <Prose>
        <ul>
          <li>
            First
            <ul>
              <li>Nested</li>
            </ul>
          </li>
        </ul>
        <table>
          <caption>Data</caption>
          <tbody>
            <tr>
              <th scope="row">Key</th>
              <td>Value</td>
            </tr>
          </tbody>
        </table>
        <img src="/image.png" alt="Example" />
      </Prose>,
    );
    expect(screen.getAllByRole("list")).toHaveLength(2);
    expect(screen.getByRole("table", { name: "Data" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Example" })).toHaveAttribute(
      "src",
      "/image.png",
    );
  });
  it("updates size without rebuilding or processing the content tree", () => {
    const { rerender } = render(
      <Prose size="sm">
        <p>Stable</p>
      </Prose>,
    );
    const paragraph = screen.getByText("Stable");
    rerender(
      <Prose size="lg">
        <p>Stable</p>
      </Prose>,
    );
    expect(screen.getByText("Stable")).toBe(paragraph);
    expect(paragraph.parentElement?.className).toContain(
      "--zui-typography-text-lg-size",
    );
  });
});

describe("TextLink", () => {
  it("preserves native navigation, refs and accessible link names", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <TextLink href="/docs" ref={ref} title="Documentation">
        Read docs
      </TextLink>,
    );
    expect(screen.getByRole("link", { name: "Read docs" })).toBe(ref.current);
    expect(ref.current).toHaveAttribute("href", "/docs");
    expect(ref.current).toHaveAttribute("title", "Documentation");
    expect(ref.current).toHaveClass("underline");
  });
  it("merges new-tab rel protection without discarding caller tokens", () => {
    const { rerender } = render(
      <TextLink href="/docs" target="_blank" rel="author external">
        Docs
      </TextLink>,
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "rel",
      "author external noopener",
    );
    rerender(
      <TextLink href="/docs" target="_BLANK" rel="NoOpener noreferrer">
        Docs
      </TextLink>,
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "rel",
      "NoOpener noreferrer",
    );
  });
  it("does not change target or announce a decorative external indicator", () => {
    render(
      <TextLink href="https://example.com" externalIndicator>
        Reference
      </TextLink>,
    );
    const link = screen.getByRole("link", { name: "Reference" });
    expect(link).not.toHaveAttribute("target");
    expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(link.querySelector("svg")).toHaveAttribute("focusable", "false");
    expect(link).not.toHaveAttribute("externalIndicator");
  });
  it("supports downloadable links and caller interaction", () => {
    const onClick = vi.fn((event) => event.preventDefault());
    render(
      <TextLink href="/report.pdf" download="report.pdf" onClick={onClick}>
        Download
      </TextLink>,
    );
    fireEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("link")).toHaveAttribute("download", "report.pdf");
  });
  it("consumes appearance controls and accepts final class overrides", () => {
    render(
      <TextLink
        href="/docs"
        tone="muted"
        underline="hover"
        weight="normal"
        size="sm"
        className="underline"
      >
        Docs
      </TextLink>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("underline");
    expect(link).not.toHaveClass("no-underline");
    for (const prop of ["tone", "underline", "size", "weight"])
      expect(link).not.toHaveAttribute(prop);
  });
});

describe("DescriptionList", () => {
  it("uses native definition markup and forwards compound refs", () => {
    const ref = createRef<HTMLDListElement>();
    const termRef = createRef<HTMLElement>();
    render(
      <DescriptionList ref={ref} aria-label="Account">
        <DescriptionList.Item>
          <DescriptionList.Term ref={termRef}>Plan</DescriptionList.Term>
          <DescriptionList.Details>Pro</DescriptionList.Details>
        </DescriptionList.Item>
      </DescriptionList>,
    );
    expect(ref.current?.tagName).toBe("DL");
    expect(termRef.current?.tagName).toBe("DT");
    expect(ref.current?.querySelector("dd")?.textContent).toBe("Pro");
    expect(ref.current?.children[0]?.tagName).toBe("DIV");
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });
  it("supports named exports and multiple descriptions for one term", () => {
    render(
      <DescriptionList>
        <DescriptionListItem>
          <DescriptionListTerm>Contacts</DescriptionListTerm>
          <DescriptionListDetails>Primary</DescriptionListDetails>
          <DescriptionListDetails>Backup</DescriptionListDetails>
        </DescriptionListItem>
      </DescriptionList>,
    );
    expect(
      screen.getByText("Contacts").parentElement?.querySelectorAll("dd"),
    ).toHaveLength(2);
    expect(DescriptionList.Item).toBe(DescriptionListItem);
    expect(DescriptionList.Term).toBe(DescriptionListTerm);
    expect(DescriptionList.Details).toBe(DescriptionListDetails);
  });
  it("keeps nested values interactive and preserves explicit placeholders", () => {
    render(
      <DescriptionList>
        <DescriptionList.Item>
          <DescriptionList.Term>Website</DescriptionList.Term>
          <DescriptionList.Details>
            <TextLink href="/docs">Open docs</TextLink>
          </DescriptionList.Details>
        </DescriptionList.Item>
        <DescriptionList.Item>
          <DescriptionList.Term>Phone</DescriptionList.Term>
          <DescriptionList.Details>Not provided</DescriptionList.Details>
        </DescriptionList.Item>
      </DescriptionList>,
    );
    expect(screen.getByRole("link", { name: "Open docs" })).toHaveAttribute(
      "href",
      "/docs",
    );
    expect(screen.getByText("Not provided").tagName).toBe("DD");
  });
  it("consumes layout and separator props without adding ARIA table roles", () => {
    const { container } = render(
      <DescriptionList layout="inline" size="sm" tone="muted" separators>
        <DescriptionList.Item>
          <DescriptionList.Term>Key</DescriptionList.Term>
          <DescriptionList.Details>Value</DescriptionList.Details>
        </DescriptionList.Item>
      </DescriptionList>,
    );
    const root = container.firstElementChild;
    for (const prop of ["layout", "size", "tone", "separators"])
      expect(root).not.toHaveAttribute(prop);
    expect(root).not.toHaveAttribute("role");
  });
  it("supports an independently configured nested definition list", () => {
    render(
      <DescriptionList layout="inline">
        <DescriptionList.Item>
          <DescriptionList.Term>Details</DescriptionList.Term>
          <DescriptionList.Details>
            <DescriptionList layout="stacked">
              <DescriptionList.Item>
                <DescriptionList.Term>Nested</DescriptionList.Term>
                <DescriptionList.Details>Value</DescriptionList.Details>
              </DescriptionList.Item>
            </DescriptionList>
          </DescriptionList.Details>
        </DescriptionList.Item>
      </DescriptionList>,
    );
    const inner = screen.getByText("Nested").closest("dl");
    expect(inner?.parentElement?.tagName).toBe("DD");
    expect(inner?.className).toContain("[--_zui-description-value-column:1]");
  });
});

it("applies the documented default TextLink scale and state token fallbacks", () => {
  const { getByRole } = render(
    <TextLink href="/docs" tone="primary">
      Docs
    </TextLink>,
  );
  expect(getByRole("link").className).toContain(
    "--zui-typography-text-base-size",
  );
  expect(getByRole("link").className).toContain(
    "--zui-typography-link-primary-hover-fg,var(--zui-typography-link-primary-fg,",
  );
  expect(getByRole("link").className).toContain(
    "--zui-typography-link-primary-visited-fg-dark,var(--zui-typography-link-primary-fg-dark,",
  );
});
