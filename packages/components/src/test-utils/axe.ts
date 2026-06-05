import axe from "axe-core";
import { expect } from "vitest";

/**
 * Local aliases for axe-core types used by this package-level test helper.
 *
 * Keeping these aliases close to the helper makes the public function
 * signatures easier to scan while still preserving axe-core's own type
 * definitions for options, DOM targets, and result records.
 */
type AxeRunOptions = axe.RunOptions;
type AxeResult = axe.Result;

/**
 * Default axe-core options for isolated component tests.
 *
 * These tests run at the `packages/components` level, usually against a single
 * rendered component in jsdom rather than a complete application page. A couple
 * of axe rules are intentionally disabled here because they need full-page
 * context that component unit tests do not provide reliably:
 *
 * - `color-contrast`: jsdom does not compute real layout and rendered color
 *   values well enough for this rule to be useful in unit tests.
 * - `region`: isolated component fixtures are often rendered without page
 *   landmarks, so this would produce false positives outside component scope.
 *
 * Individual tests can still override these defaults by passing options to
 * `assertNoAxeViolations`.
 */
const componentAxeOptions: AxeRunOptions = {
  rules: {
    "color-contrast": { enabled: false },
    region: { enabled: false },
  },
};

/**
 * Merge caller-provided axe options with the package defaults.
 *
 * axe-core uses a nested `rules` object, so a shallow spread is not enough:
 * replacing `rules` entirely would accidentally drop the component-test
 * defaults whenever a test enables or configures one additional rule. This
 * helper keeps defaults in place and lets the caller override only the pieces
 * they care about.
 *
 * @param options Optional axe-core run options supplied by a test.
 * @returns Merged options safe to pass to `axe.run`.
 */
function mergeAxeOptions(options: AxeRunOptions = {}): AxeRunOptions {
  return {
    ...componentAxeOptions,
    ...options,
    rules: {
      ...componentAxeOptions.rules,
      ...options.rules,
    },
  };
}

/**
 * Convert axe violations into a readable Vitest assertion message.
 *
 * axe-core returns rich structured results, but raw object diffs are noisy when
 * a test fails. This formatter keeps the high-signal details near the failed
 * assertion: rule id, human-readable help text, impact level, documentation
 * URL, the failing HTML snippet, and axe's node-level failure summary.
 *
 * @param violations Violations returned from `axe.run`.
 * @returns A multi-line diagnostic message for Vitest.
 */
function formatAxeViolations(violations: AxeResult[]) {
  return violations
    .map((violation) => {
      const nodes = violation.nodes
        .map((node) => {
          const summary = node.failureSummary
            ? `\n      ${node.failureSummary.replaceAll("\n", "\n      ")}`
            : "";
          return `    - ${node.html}${summary}`;
        })
        .join("\n");

      return [
        `${violation.id}: ${violation.help}`,
        `  impact: ${violation.impact ?? "unknown"}`,
        `  help: ${violation.helpUrl}`,
        nodes,
      ].join("\n");
    })
    .join("\n\n");
}

/**
 * Assert that a rendered component subtree has no axe-core violations.
 *
 * Tests should pass the smallest useful DOM target, usually the `container`
 * returned by Testing Library's `render(...)`. Keeping the target scoped to the
 * component fixture makes failures easier to understand and avoids auditing
 * unrelated test harness DOM.
 *
 * Example:
 *
 * ```ts
 * const { container } = render(<Button>Save</Button>);
 * await assertNoAxeViolations(container);
 * ```
 *
 * @param target DOM element, document, selector, or axe context to audit.
 * @param options Optional per-test axe-core run options.
 */
export async function assertNoAxeViolations(
  target: axe.ElementContext,
  options?: AxeRunOptions,
) {
  const results = await axe.run(target, mergeAxeOptions(options));

  expect(
    results.violations,
    formatAxeViolations(results.violations),
  ).toHaveLength(0);
}
