import { expect, it } from "vitest";
import ts from "typescript";
import { decryptedTextSnippet } from "./decrypted-text-code-examples.snippets";

const diagnostics = (code: string) =>
  ts.transpileModule(code, {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
    reportDiagnostics: true,
    fileName: "example.tsx",
  }).diagnostics;

it("generates valid TSX with string and expression attributes", () => {
  const snippet = decryptedTextSnippet("Access granted", {
    order: "center",
    speed: 0,
    useOriginalChars: false,
    characters: "01",
    delay: undefined,
  });
  expect(snippet).toContain('order="center"');
  expect(snippet).toContain('characters="01"');
  expect(snippet).toContain("speed={0}");
  expect(snippet).toContain("useOriginalChars={false}");
  expect(snippet).not.toContain("delay=");
  expect(snippet).toContain("      Access granted\n");
  expect(diagnostics(snippet)).toEqual([]);
});

it("escapes character pools and copy that JSX would misread", () => {
  const snippet = decryptedTextSnippet("Ship {fast} <now>", {
    characters: '!@#"<>{}',
  });
  expect(snippet).toContain(`{${JSON.stringify("Ship {fast} <now>")}}`);
  expect(snippet).toContain(`characters={${JSON.stringify('!@#"<>{}')}}`);
  expect(diagnostics(snippet)).toEqual([]);
});

it("ignores callbacks from a broader props object", () => {
  const props = { effect: "flip", onComplete: () => {} } as const;
  const snippet = decryptedTextSnippet("Hello", props);
  expect(snippet).toContain('effect="flip"');
  expect(snippet).not.toContain("onComplete");
});
