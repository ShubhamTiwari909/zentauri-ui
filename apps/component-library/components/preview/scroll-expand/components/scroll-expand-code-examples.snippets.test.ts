import { expect, it } from "vitest";
import ts from "typescript";
import { scrollExpandSnippet } from "./scroll-expand-code-examples.snippets";

const diagnostics = (code: string) =>
  ts.transpileModule(code, {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
    reportDiagnostics: true,
    fileName: "example.tsx",
  }).diagnostics;

it("generates valid TSX with overlay children", () => {
  const snippet = scrollExpandSnippet(
    {
      src: "/photo.jpg",
      title: "Built to scale",
      startWidth: 42,
      smoothing: 0,
      scroller: "self",
      className: "h-[520px]",
      hint: undefined,
    },
    { heading: "Every pixel", body: "Opens as you scroll." },
  );
  expect(snippet).toContain('src="/photo.jpg"');
  expect(snippet).toContain("startWidth={42}");
  expect(snippet).toContain("smoothing={0}");
  expect(snippet).toContain('className="h-[520px]"');
  expect(snippet).not.toContain("hint=");
  expect(snippet).toContain("<h3>Every pixel</h3>");
  expect(diagnostics(snippet)).toEqual([]);
});

it("self-closes without overlay content and escapes risky text", () => {
  const snippet = scrollExpandSnippet({ src: "/a.jpg", alt: 'Say "hi"' });
  expect(snippet).toContain(`alt={${JSON.stringify('Say "hi"')}}`);
  expect(snippet).toContain("/>");
  expect(diagnostics(snippet)).toEqual([]);
  const escaped = scrollExpandSnippet(
    { src: "/a.jpg" },
    { heading: "Fast {and} <safe>", body: "ok" },
  );
  expect(escaped).toContain(
    `<h3>{${JSON.stringify("Fast {and} <safe>")}}</h3>`,
  );
  expect(diagnostics(escaped)).toEqual([]);
});
