import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(packageRoot, "..", "..");
const reportDir = join(tmpdir(), "zentauri-ui");
const reportPath = join(reportDir, "components-vitest-health.json");

const docsHealthPath = join(
  repoRoot,
  "apps",
  "component-library",
  "components",
  "home",
  "marketing",
  "package-health-data.ts",
);

const packageReadmePath = join(packageRoot, "README.md");
const docsReadmePath = join(repoRoot, "apps", "component-library", "README.md");

const areas = [
  {
    id: "ui",
    label: "Components and UI utilities",
    matches: (rel) =>
      rel.startsWith("src/ui/") || rel.startsWith("src/charts/"),
  },
  {
    id: "animations",
    label: "Standalone animations",
    matches: (rel) => rel.startsWith("src/animations/"),
  },
  {
    id: "hooks",
    label: "React hooks",
    matches: (rel) => rel.startsWith("src/hooks/"),
  },
  {
    id: "design-system",
    label: "Design system facade",
    matches: (rel) => rel.startsWith("src/lib/"),
  },
  {
    id: "cli",
    label: "CLI and import rewriting",
    matches: (rel) => rel.startsWith("cli/"),
  },
  {
    id: "accessibility",
    label: "Accessibility (axe + keyboard)",
    matches: (rel) => rel.startsWith("src/accessibility/"),
  },
];

function posixRelative(from, to) {
  return relative(from, to).split("\\").join("/");
}

function runVitestJsonReport() {
  mkdirSync(reportDir, { recursive: true });
  rmSync(reportPath, { force: true });
  execFileSync(
    "pnpm",
    ["exec", "vitest", "run", "--reporter=json", `--outputFile=${reportPath}`],
    {
      cwd: packageRoot,
      stdio: "inherit",
      shell: true,
    },
  );
}

function readHealthReport() {
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  const suites = report.testResults.map((suite) => {
    const rel = posixRelative(packageRoot, suite.name);
    return {
      path: rel,
      status: suite.status,
      tests: suite.assertionResults.length,
      passed: suite.assertionResults.filter((test) => test.status === "passed")
        .length,
    };
  });

  const areaRows = areas.map((area) => {
    const matchingSuites = suites.filter((suite) => area.matches(suite.path));
    return {
      area: area.label,
      files: matchingSuites.length,
      tests: matchingSuites.reduce((total, suite) => total + suite.tests, 0),
    };
  });

  const uncovered = suites.filter(
    (suite) => !areas.some((area) => area.matches(suite.path)),
  );
  if (uncovered.length > 0) {
    throw new Error(
      `Unhandled test area(s): ${uncovered.map((suite) => suite.path).join(", ")}`,
    );
  }

  return {
    files: {
      total: report.testResults.length,
      passed: report.testResults.filter((suite) => suite.status === "passed")
        .length,
    },
    tests: {
      total: report.numTotalTests,
      passed: report.numPassedTests,
    },
    areas: areaRows,
    suites: suites
      .sort((a, b) => b.tests - a.tests || a.path.localeCompare(b.path))
      .map(({ path, tests }) => ({ path, tests })),
  };
}

function markdownHealthSection(health, { includeSuites }) {
  const areaColumnWidth = Math.max(
    "Area".length,
    ...health.areas.map((area) => area.area.length),
  );
  const areaFilesColumnWidth = Math.max(
    "Test files".length,
    ...health.areas.map((area) => String(area.files).length),
  );
  const areaTestsColumnWidth = Math.max(
    "Tests".length,
    ...health.areas.map((area) => String(area.tests).length),
  );
  const lines = [
    "## Package status and test coverage",
    "",
    "Generated from the component package Vitest JSON report via `pnpm --filter @zentauri-ui/zentauri-components update:test-health`.",
    "",
    "| Metric     | Result           |",
    "| ---------- | ---------------- |",
    `| Test files | ${health.files.passed} passed (${health.files.total})   |`,
    `| Tests      | ${health.tests.passed} passed (${health.tests.total}) |`,
    "",
    `| ${"Area".padEnd(areaColumnWidth)} | ${"Test files".padEnd(areaFilesColumnWidth)} | ${"Tests".padEnd(areaTestsColumnWidth)} |`,
    `| ${"-".repeat(areaColumnWidth)} | ${"-".repeat(areaFilesColumnWidth)} | ${"-".repeat(areaTestsColumnWidth)} |`,
  ];

  for (const area of health.areas) {
    lines.push(
      `| ${area.area.padEnd(areaColumnWidth)} | ${String(area.files).padEnd(areaFilesColumnWidth)} | ${String(area.tests).padEnd(areaTestsColumnWidth)} |`,
    );
  }

  if (!includeSuites) {
    return `${lines.join("\n")}\n\n`;
  }

  lines.push("", "### Per-suite snapshot", "");
  const suiteColumnWidth = Math.max(
    "Suite".length,
    ...health.suites.map((suite) => `\`${suite.path}\``.length),
  );
  const suiteTestsColumnWidth = Math.max(
    "Tests".length,
    ...health.suites.map((suite) => String(suite.tests).length),
  );
  lines.push(
    `| ${"Suite".padEnd(suiteColumnWidth)} | ${"Tests".padEnd(suiteTestsColumnWidth)} |`,
    `| ${"-".repeat(suiteColumnWidth)} | ${`${"-".repeat(Math.max(suiteTestsColumnWidth - 1, 3))}:`.padStart(suiteTestsColumnWidth)} |`,
  );
  for (const suite of health.suites) {
    const suiteCell = `\`${suite.path}\``.padEnd(suiteColumnWidth);
    lines.push(
      `| ${suiteCell} | ${String(suite.tests).padStart(suiteTestsColumnWidth)} |`,
    );
  }

  return `${lines.join("\n")}\n\n`;
}

function replaceBetween(text, startMarker, endMarker, replacement) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (start === -1 || end === -1) {
    throw new Error(`Could not find README section markers: ${startMarker}`);
  }
  return `${text.slice(0, start)}${replacement}${text.slice(end)}`;
}

function updatePackageReadme(health) {
  const text = readFileSync(packageReadmePath, "utf8");
  const updatedSection = markdownHealthSection(health, { includeSuites: true });
  const withSection = replaceBetween(
    text,
    "## Package status and test coverage",
    "## Package exports",
    updatedSection,
  );
  const withDevelopmentLine = withSection.replace(
    /- `pnpm test` \/ `pnpm test:watch` — \*\*Vitest\*\* and \*\*Testing Library\*\* unit tests \/\/ (?:currently )?covered \d+ test cases in total/,
    `- \`pnpm test\` / \`pnpm test:watch\` — **Vitest** and **Testing Library** unit tests // currently covered ${health.tests.total} test cases in total`,
  );
  writeFileSync(packageReadmePath, withDevelopmentLine, "utf8");
}

function updateDocsReadme(health) {
  const text = readFileSync(docsReadmePath, "utf8");
  const updatedSection = markdownHealthSection(health, {
    includeSuites: false,
  });
  const withSection = replaceBetween(
    text,
    "## Package status and test coverage",
    "## Tech stack",
    updatedSection,
  );
  writeFileSync(docsReadmePath, withSection, "utf8");
}

function updateDocsHealthData(health) {
  const docsHealth = {
    files: health.files,
    tests: health.tests,
    areas: health.areas,
  };
  const data = `// Generated by packages/components/scripts/update-test-health.mjs. Do not edit by hand.
export const PACKAGE_TEST_HEALTH = ${toTypeScriptLiteral(docsHealth)} as const;
`;
  writeFileSync(docsHealthPath, data, "utf8");
}

function toTypeScriptLiteral(value, depth = 0) {
  const indent = "  ".repeat(depth);
  const nextIndent = "  ".repeat(depth + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }
    const items = value
      .map((item) => `${nextIndent}${toTypeScriptLiteral(item, depth + 1)}`)
      .join(",\n");
    return `[\n${items},\n${indent}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return "{}";
    }
    const props = entries
      .map(([key, item]) => {
        const prop = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
          ? key
          : JSON.stringify(key);
        return `${nextIndent}${prop}: ${toTypeScriptLiteral(item, depth + 1)},`;
      })
      .join("\n");
    return `{\n${props}\n${indent}}`;
  }

  return JSON.stringify(value);
}

runVitestJsonReport();
const health = readHealthReport();
updatePackageReadme(health);
updateDocsReadme(health);
updateDocsHealthData(health);

console.log(
  `Updated package health: ${health.files.passed}/${health.files.total} files, ${health.tests.passed}/${health.tests.total} tests.`,
);
