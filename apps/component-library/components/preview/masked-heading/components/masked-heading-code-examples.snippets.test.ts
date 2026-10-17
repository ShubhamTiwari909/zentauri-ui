import { expect, it } from "vitest";
import ts from "typescript";
import { maskedHeadingSnippet } from "./masked-heading-code-examples.snippets";

const transpile = (code: string) =>
  ts.transpileModule(code, {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
    reportDiagnostics: true,
    fileName: "example.tsx",
  }).diagnostics;

it("generates valid TSX with string and expression attributes", () => {
  const snippet = maskedHeadingSnippet("Designed in the details", {
    src: "/photo.jpg",
    reveal: "wipe",
    duration: 0,
    outline: false,
    drift: undefined,
  });
  expect(snippet).toContain('src="/photo.jpg"');
  expect(snippet).toContain('reveal="wipe"');
  expect(snippet).toContain("duration={0}");
  expect(snippet).toContain("outline={false}");
  expect(snippet).not.toContain("drift=");
  expect(snippet).toContain("      Designed in the details\n");
  expect(transpile(snippet)).toEqual([]);
});

it("escapes copy that JSX would otherwise interpret", () => {
  const text = 'Ship {fast} <today> "now"';
  const snippet = maskedHeadingSnippet(text);
  expect(snippet).toContain(`{${JSON.stringify(text)}}`);
  expect(snippet).toContain("<MaskedHeading>");
  expect(transpile(snippet)).toEqual([]);
});

it("ignores callbacks passed in a broader props object", () => {
  const props = { reveal: "fade", onRevealComplete: () => {} } as const;
  const snippet = maskedHeadingSnippet("Hello", props);
  expect(snippet).toContain('reveal="fade"');
  expect(snippet).not.toContain("onRevealComplete");
});
