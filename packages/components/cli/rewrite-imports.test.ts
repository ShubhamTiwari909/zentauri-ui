import { describe, expect, it } from "vitest";

import {
  extractSiblingHookImports,
  rewriteImports,
} from "./rewrite-imports.mjs";

describe("rewriteImports", () => {
  it("should rewrite lib/utils and hooks with two or three parent segments", () => {
    const input = `
import { cn } from "../../lib/utils";
import { useFocusManagement } from "../../hooks/useFocusManagement";
import { cn as c2 } from "../../../lib/utils";
import { useFocusManagement as u } from "../../../hooks/useFocusManagement";
`;
    const { code, usedHooks } = rewriteImports(input, {
      utilsAlias: "@/lib/utils",
      hooksAlias: "@/hooks",
    });
    expect(usedHooks.sort()).toEqual(["useFocusManagement"]);
    expect(code).toContain('from "@/lib/utils"');
    expect(code).not.toContain("../../lib/utils");
    expect(code).toContain('from "@/hooks/useFocusManagement"');
    expect(code).not.toContain("../../hooks/");
  });

  it("should rewrite export-from hooks", () => {
    const input = `export { usePagination } from "../../hooks/usePagination";\n`;
    const { code, usedHooks } = rewriteImports(input, {
      utilsAlias: "@/lib/utils",
      hooksAlias: "@/hooks",
    });
    expect(usedHooks).toContain("usePagination");
    expect(code).toBe(
      'export { usePagination } from "@/hooks/usePagination";\n',
    );
  });

  it("should rewrite ui paths when uiAlias is set", () => {
    const input = `import type { X } from "../../ui/pagination/types";\n`;
    const { code } = rewriteImports(input, {
      utilsAlias: "@/lib/utils",
      hooksAlias: "@/hooks",
      uiAlias: "@/components/ui",
    });
    expect(code).toContain('from "@/components/ui/pagination/types"');
    expect(code).not.toContain("../../ui/");
  });

  it("should preserve single-quote import style", () => {
    const input = `import { cn } from '../../lib/utils';\n`;
    const { code } = rewriteImports(input, {
      utilsAlias: "@/lib/utils",
      hooksAlias: "@/hooks",
    });
    expect(code).toContain("from '@/lib/utils'");
  });
});

describe("extractSiblingHookImports", () => {
  it("should collect ../use* hook folder names", () => {
    const src = `
import { useBodyScrollLock } from "../useBodyScrollLock";
import { x } from "../useControllableState";
`;
    expect(extractSiblingHookImports(src).sort()).toEqual([
      "useBodyScrollLock",
      "useControllableState",
    ]);
  });
});
