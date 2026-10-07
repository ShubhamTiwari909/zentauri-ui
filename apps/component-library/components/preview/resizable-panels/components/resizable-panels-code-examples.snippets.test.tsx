import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import ts from "typescript";
import * as panels from "@zentauri-ui/zentauri-components/ui/resizable-panels";
import {
  panelsBasicSnippet,
  panelsNestedSnippet,
  panelsPlaygroundSnippet,
} from "./resizable-panels-code-examples.snippets";
import { PANELS_DEFAULT_OPTIONS } from "./resizable-panels-code-examples.data";

it("keeps copied recipes valid and their panel IDs unique across repeated instances", () => {
  const recipes = [
    panelsBasicSnippet,
    panelsNestedSnippet,
    panelsPlaygroundSnippet(PANELS_DEFAULT_OPTIONS, [35, 65]),
  ];
  const instances = recipes.map((snippet) => {
    const result = ts.transpileModule(snippet, {
      fileName: "recipe.tsx",
      reportDiagnostics: true,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    });
    expect(result.diagnostics).toEqual([]);
    const exports: { default?: React.ComponentType } = {};
    const dependencies: Record<string, unknown> = {
      react: React,
      "react/jsx-runtime": jsxRuntime,
      "@zentauri-ui/zentauri-components/ui/resizable-panels": panels,
    };
    new Function("require", "exports", result.outputText)((name: string) => {
      if (!(name in dependencies))
        throw new Error(`Unexpected recipe dependency ${name}`);
      return dependencies[name];
    }, exports);
    return exports.default!;
  });
  const { container } = render(
    <>
      {instances.map((Recipe, i) => (
        <React.Fragment key={i}>
          <Recipe />
          <Recipe />
        </React.Fragment>
      ))}
    </>,
  );
  const paneNodes = Array.from(
    container.querySelectorAll("[data-slot=resizable-panel]"),
  );
  expect(paneNodes).toHaveLength(16);
  expect(new Set(paneNodes.map((node) => node.id)).size).toBe(paneNodes.length);
  for (const handle of screen.getAllByRole("separator"))
    expect(document.getElementById(handle.getAttribute("aria-controls")!)).toBe(
      handle.previousElementSibling,
    );
});
