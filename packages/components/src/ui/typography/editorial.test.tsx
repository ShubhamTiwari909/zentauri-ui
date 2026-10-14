import { createRef, act } from "react";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import {
  Footnotes,
  FootnoteReference,
  FootnoteItem,
  FootnoteBacklink,
} from "./index";

function Article({ scopeId }: { scopeId?: string }) {
  return (
    <Footnotes scopeId={scopeId}>
      <p>
        First
        <Footnotes.Reference noteId="shared" referenceId="opening" number={1} />
      </p>
      <p>
        Again
        <Footnotes.Reference noteId="shared" referenceId="closing" number={1} />
      </p>
      <Footnotes.List>
        <Footnotes.Item noteId="shared" number={1}>
          A note.{" "}
          <Footnotes.Backlink
            noteId="shared"
            referenceId="opening"
            label="Back to opening reference"
          />{" "}
          <Footnotes.Backlink
            noteId="shared"
            referenceId="closing"
            label="Back to closing reference"
          />
        </Footnotes.Item>
      </Footnotes.List>
    </Footnotes>
  );
}
function target(link: HTMLElement) {
  return decodeURIComponent(link.getAttribute("href")!.slice(1));
}

describe("Footnotes", () => {
  it("links multiple references to one numbered native list item with separate backlinks", () => {
    const { container } = render(<Article scopeId="article" />);
    const refs = screen.getAllByRole("link", { name: "Footnote 1" });
    const item = container.querySelector("li")!;
    expect(refs).toHaveLength(2);
    expect(item.value).toBe(1);
    expect(target(refs[0]!)).toBe(item.id);
    expect(target(refs[1]!)).toBe(item.id);
    expect(refs[0]?.id).not.toBe(refs[1]?.id);
    expect(
      target(screen.getByRole("link", { name: "Back to opening reference" })),
    ).toBe(refs[0]?.id);
    expect(
      target(screen.getByRole("link", { name: "Back to closing reference" })),
    ).toBe(refs[1]?.id);
    expect(item).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("list", { name: "Footnotes" }).tagName).toBe("OL");
  });
  it("scopes identical authored IDs across multiple default-root articles", () => {
    const { container } = render(
      <>
        <Article />
        <Article />
      </>,
    );
    const ids = [...container.querySelectorAll("[id]")].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const ref of screen.getAllByRole("link", { name: "Footnote 1" }))
      expect(document.getElementById(target(ref))).not.toBeNull();
  });
  it("keeps nested article roots independent", () => {
    const { container } = render(
      <Footnotes scopeId="outer">
        <Footnotes.Reference noteId="one" referenceId="ref" number={1} />
        <Footnotes.List>
          <Footnotes.Item noteId="one" number={1}>
            Outer
          </Footnotes.Item>
        </Footnotes.List>
        <Footnotes scopeId="inner">
          <Footnotes.Reference noteId="one" referenceId="ref" number={1} />
          <Footnotes.List>
            <Footnotes.Item noteId="one" number={1}>
              Inner
            </Footnotes.Item>
          </Footnotes.List>
        </Footnotes>
      </Footnotes>,
    );
    const refs = screen.getAllByRole("link");
    const items = [...container.querySelectorAll("li")];
    expect(target(refs[0]!)).toBe(items[0]?.id);
    expect(target(refs[1]!)).toBe(items[1]?.id);
  });
  it("preserves native attributes/refs and localized accessible names", () => {
    const root = createRef<HTMLDivElement>();
    const item = createRef<HTMLLIElement>();
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Footnotes ref={root}>
        <FootnoteReference
          ref={ref}
          noteId="one"
          referenceId="intro"
          number={1}
          aria-label="Nota 1"
          title="Read note"
        />
        <Footnotes.List aria-label="Notas">
          <FootnoteItem ref={item} noteId="one" number={1}>
            Text
            <FootnoteBacklink
              noteId="one"
              referenceId="intro"
              label="Volver al texto"
            />
          </FootnoteItem>
        </Footnotes.List>
      </Footnotes>,
    );
    expect(root.current).toHaveAttribute("data-slot", "typography-footnotes");
    expect(ref.current).toHaveAttribute("title", "Read note");
    expect(screen.getByRole("link", { name: "Nota 1" })).toBe(ref.current);
    expect(item.current?.tagName).toBe("LI");
    expect(screen.getByRole("list", { name: "Notas" })).toBeInTheDocument();
  });
  it("encodes Unicode/special fragment characters without losing the actual target", () => {
    const { container } = render(
      <Footnotes scopeId="article:#">
        <Footnotes.Reference noteId="é?#" referenceId="引用" number={1} />
        <Footnotes.Item noteId="é?#" number={1}>
          Note
        </Footnotes.Item>
      </Footnotes>,
    );
    const ref = screen.getByRole("link");
    expect(target(ref)).toBe(container.querySelector("li")?.id);
    expect(ref.getAttribute("href")).toContain("%23");
  });
  it("does not collide when authored IDs contain separator-like text", () => {
    const { container } = render(
      <Footnotes scopeId="article">
        <Footnotes.Reference noteId="x-r1-y" referenceId="z" number={1} />
        <Footnotes.Reference noteId="x" referenceId="y-r1-z" number={2} />
      </Footnotes>,
    );
    const ids = [...container.querySelectorAll("a")].map((node) => node.id);
    expect(new Set(ids).size).toBe(2);
  });
  it("requires a root for references, items and backlinks", () => {
    expect(() =>
      renderToString(
        <FootnoteReference noteId="one" referenceId="intro" number={1} />,
      ),
    ).toThrow("within Footnotes");
    expect(() =>
      renderToString(<FootnoteItem noteId="one" number={1} />),
    ).toThrow("within Footnotes");
    expect(() =>
      renderToString(
        <FootnoteBacklink noteId="one" referenceId="intro" label="Back" />,
      ),
    ).toThrow("within Footnotes");
  });
  it("rejects invalid identifiers, note ordinals and empty backlink labels", () => {
    expect(() => renderToString(<Footnotes scopeId="bad id" />)).toThrow(
      TypeError,
    );
    expect(() =>
      renderToString(
        <Footnotes>
          <Footnotes.Reference noteId="" referenceId="intro" number={1} />
        </Footnotes>,
      ),
    ).toThrow(TypeError);
    expect(() =>
      renderToString(
        <Footnotes>
          <Footnotes.Reference
            noteId={"note\uD800"}
            referenceId="intro"
            number={1}
          />
        </Footnotes>,
      ),
    ).toThrow(TypeError);
    for (const number of [0, -1, 1.5, Infinity, 2147483648])
      expect(() =>
        renderToString(
          <Footnotes>
            <Footnotes.Item noteId="one" number={number} />
          </Footnotes>,
        ),
      ).toThrow(RangeError);
    expect(() =>
      renderToString(
        <Footnotes>
          <Footnotes.Backlink noteId="one" referenceId="intro" label=" " />
        </Footnotes>,
      ),
    ).toThrow(TypeError);
  });
  it("hydrates generated scope IDs without changing references or backlinks", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    container.innerHTML = renderToString(<Article />);
    const ids = [...container.querySelectorAll("[id]")].map((node) => node.id);
    const errors = vi.fn();
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      await act(async () => {
        root = hydrateRoot(container, <Article />, {
          onRecoverableError: errors,
        });
      });
      expect(
        [...container.querySelectorAll("[id]")].map((node) => node.id),
      ).toEqual(ids);
      expect(errors).not.toHaveBeenCalled();
      await act(async () => root?.unmount());
    } finally {
      container.remove();
    }
  });
});
