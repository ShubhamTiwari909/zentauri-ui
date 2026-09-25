import { expect, it } from "vitest";
import ts from "typescript";
import { glassCardSnippet } from "./glass-card-code-examples.snippets";

it("generates valid TSX and preserves quoted, multiline strings and style objects", () => {
  const className = 'before:content-["{hello}"]\npath\\name';
  const style = { backgroundImage: 'url("/texture.png")', opacity: 0 };
  const snippet = glassCardSnippet({
    className,
    style,
    intensity: 0,
    glare: false,
    glow: undefined,
  });
  expect(snippet).toContain(`className={${JSON.stringify(className)}}`);
  expect(snippet).toContain(`style={${JSON.stringify(style)}}`);
  expect(snippet).toContain("intensity={0}");
  expect(snippet).toContain("glare={false}");
  expect(snippet).not.toContain("glow=");
  const result = ts.transpileModule(snippet, {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
    reportDiagnostics: true,
    fileName: "example.tsx",
  });
  expect(result.diagnostics).toEqual([]);
});

it("does not attempt to serialize child elements or callbacks from broader prop objects", () => {
  const props = {
    intensity: 12,
    children: { arbitrary: true },
    onClick: () => {},
  };
  const snippet = glassCardSnippet(props);
  expect(snippet).toContain("intensity={12}");
  expect(snippet).not.toContain("children=");
  expect(snippet).not.toContain("onClick=");
  expect(snippet).not.toContain("[object Object]");
});
