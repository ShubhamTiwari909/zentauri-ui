import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  CONTEXT_MENU_ITEM_VARIANTS,
  CONTEXT_MENU_PATTERNS,
  CONTEXT_MENU_SPACINGS,
} from "./components/context-menu-code-examples.data";
import { ContextMenuDemo } from "./components/context-menu-code-examples-demo";
import { contextMenuSnippet } from "./components/context-menu-code-examples.snippets";

export function ContextMenuCodeExamplesSection() {
  return (
    <Section className="max-w-7xl">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Context menu variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CONTEXT_MENU_ITEM_VARIANTS.map((itemVariant) => (
          <PreviewCodeShowcase
            key={`item-${itemVariant}`}
            code={contextMenuSnippet({ itemVariant })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Item variant:{" "}
              <span className="font-bold">{itemVariant.toUpperCase()}</span>
            </p>
            <ContextMenuDemo itemVariant={itemVariant} />
          </PreviewCodeShowcase>
        ))}

        {CONTEXT_MENU_SPACINGS.map((spacing) => (
          <PreviewCodeShowcase
            key={`spacing-${spacing}`}
            code={contextMenuSnippet({
              itemVariant: "outline",
              spacing,
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Content spacing:{" "}
              <span className="font-bold">{spacing.toUpperCase()}</span>
            </p>
            <ContextMenuDemo itemVariant="outline" spacing={spacing} />
          </PreviewCodeShowcase>
        ))}

        {CONTEXT_MENU_PATTERNS.map((pattern) => (
          <PreviewCodeShowcase
            key={`pattern-${pattern}`}
            code={contextMenuSnippet({
              itemVariant: "sky",
              pattern,
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Pattern:{" "}
              <span className="font-bold">{pattern.toUpperCase()}</span>
            </p>
            <ContextMenuDemo itemVariant="sky" pattern={pattern} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </Section>
  );
}
