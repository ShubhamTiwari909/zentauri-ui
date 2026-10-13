import { createRef } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { Mark, HighlightText, TruncateText, ExpandableText } from "./index";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Mark and HighlightText", () => {
  it("preserves relevance semantics, native attributes and refs", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Mark ref={ref} title="Matched">
        result
      </Mark>,
    );
    expect(ref.current?.tagName).toBe("MARK");
    expect(ref.current).toHaveAttribute("title", "Matched");
    expect(ref.current).not.toHaveAttribute("role");
  });
  it("matches punctuation literally and preserves whitespace and casing", () => {
    const { container } = render(
      <HighlightText text="A [x]. (x) + x*  [X]." query="[x]." />,
    );
    expect(
      [...container.querySelectorAll("mark")].map((node) => node.textContent),
    ).toEqual(["[x].", "[X]."]);
    expect(container.textContent).toBe("A [x]. (x) + x*  [X].");
  });
  it("escapes every regular expression metacharacter", () => {
    const text = "[.*+?^${}()|\\]";
    const { container } = render(<HighlightText text={text} query={text} />);
    expect(container.querySelector("mark")?.textContent).toBe(text);
  });
  it("chooses leftmost matches and the longest match at the same start", () => {
    const { container } = render(
      <HighlightText
        text="catalog catalog"
        query={["cat", "catalog", "atalog", ""]}
      />,
    );
    expect(
      [...container.querySelectorAll("mark")].map((node) => node.textContent),
    ).toEqual(["catalog", "catalog"]);
    expect(container.textContent).toBe("catalog catalog");
  });
  it("handles Unicode case folding without damaging emoji or original offsets", () => {
    const { container } = render(
      <HighlightText text="🙂 CAFÉ Σςσ İ" query={["🙂", "café", "σ"]} />,
    );
    expect(
      [...container.querySelectorAll("mark")].map((node) => node.textContent),
    ).toEqual(["🙂", "CAFÉ", "Σ", "ς", "σ"]);
    expect(container.textContent).toBe("🙂 CAFÉ Σςσ İ");
  });
  it("does not strip accents or apply locale-specific equivalence", () => {
    const { container } = render(
      <HighlightText text="café İ" query={["cafe", "i"]} />,
    );
    expect(container.querySelector("mark")).toBeNull();
  });
  it("supports case sensitivity, empty queries, and query changes", () => {
    const { container, rerender } = render(
      <HighlightText text="Cat cat" query="cat" caseSensitive />,
    );
    expect(container.querySelector("mark")?.textContent).toBe("cat");
    rerender(<HighlightText text="Cat cat" query={["", ""]} />);
    expect(container.querySelector("mark")).toBeNull();
    rerender(
      <HighlightText text="Cat cat" query="Cat" markClassName="match" />,
    );
    expect(container.querySelectorAll("mark")).toHaveLength(2);
    expect(container.querySelector("mark")).toHaveClass("match");
  });
  it("renders markup-looking strings as text", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(
      <HighlightText ref={ref} text="<img src=x>" query="img" />,
    );
    expect(ref.current?.tagName).toBe("SPAN");
    expect(container.querySelector("img")).toBeNull();
    expect(container.textContent).toBe("<img src=x>");
  });
});

describe("TruncateText", () => {
  it("retains the complete string without automatically adding a tooltip", () => {
    const ref = createRef<HTMLParagraphElement>();
    render(
      <TruncateText as="p" ref={ref} lines={2}>
        Full content remains available to copy.
      </TruncateText>,
    );
    expect(ref.current?.tagName).toBe("P");
    expect(ref.current).toHaveTextContent(
      "Full content remains available to copy.",
    );
    expect(ref.current?.style.webkitLineClamp).toBe("2");
    expect(ref.current).not.toHaveAttribute("title");
  });
  it("clears multiline constraints when changed to one line", () => {
    const { container, rerender } = render(
      <TruncateText lines={4}>Content</TruncateText>,
    );
    rerender(<TruncateText>Content</TruncateText>);
    expect((container.firstChild as HTMLElement).style.webkitLineClamp).toBe(
      "",
    );
    expect(container.firstChild).toHaveClass("truncate");
  });
  it("rejects invalid line counts", () => {
    for (const lines of [0, -1, 1.5, Infinity, NaN])
      expect(() =>
        renderToString(<TruncateText lines={lines}>Content</TruncateText>),
      ).toThrow(RangeError);
  });
});

describe("ExpandableText", () => {
  it("keeps initial server output deterministic with full text and no measured control", () => {
    const html = renderToString(<ExpandableText text="Complete text" />);
    expect(html).toContain("Complete text");
    expect(html).not.toContain("<button");
  });
  it("supports fallback disclosure, localized labels and focus retention", () => {
    const onChange = vi.fn();
    render(
      <ExpandableText
        text="Long text"
        showToggle="always"
        moreLabel="Lire plus"
        lessLabel="Lire moins"
        onExpandedChange={onChange}
      />,
    );
    const button = screen.getByRole("button", { name: "Lire plus" });
    const controlled = document.getElementById(
      button.getAttribute("aria-controls")!,
    );
    expect(controlled).toHaveTextContent("Long text");
    button.focus();
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveTextContent("Lire moins");
    expect(button).toHaveFocus();
    expect(onChange).toHaveBeenCalledWith(true);
    expect(document.getElementById(button.getAttribute("aria-controls")!)).toBe(
      controlled,
    );
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
  });
  it("follows controlled state without expanding before the parent updates", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <ExpandableText
        text="Text"
        expanded={false}
        onExpandedChange={onChange}
        showToggle="always"
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    rerender(
      <ExpandableText
        text="Text"
        expanded
        onExpandedChange={onChange}
        showToggle="always"
      />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });
  it("uses unique IDs, supports default expansion and root refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <>
        <ExpandableText
          ref={ref}
          text="First"
          defaultExpanded
          showToggle="always"
        />
        <ExpandableText text="Second" showToggle="always" />
      </>,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[0]?.getAttribute("aria-controls")).not.toBe(
      buttons[1]?.getAttribute("aria-controls"),
    );
    expect(ref.current).toHaveAttribute(
      "data-slot",
      "typography-expandable-text",
    );
  });
  it("keeps the disclosure after expansion when collapsed measurements overflow", async () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      width: 100,
    } as DOMRect);
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(40);
    vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(100);
    render(<ExpandableText text="Long content" />);
    const button = await screen.findByRole("button", { name: "Show more" });
    button.focus();
    fireEvent.click(button);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Show less" })).toBe(button),
    );
    expect(button).toHaveFocus();
    expect(document.body.querySelector('[aria-hidden="true"]')).toBeNull();
  });
});
