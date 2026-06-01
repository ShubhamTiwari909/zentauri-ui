import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { TreeViewDemo } from "./components/demo";
import {
  TREE_VIEW_APPEARANCES,
  TREE_VIEW_SIZES,
  TREE_VIEW_TRANSITIONS,
} from "./components/data";
import { treeViewSnippet } from "./components/snippets";

export function TreeViewCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Tree view variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TREE_VIEW_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={treeViewSnippet({ appearance, size: "md" })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span>
            </p>
            <TreeViewDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}

        {TREE_VIEW_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={treeViewSnippet({ appearance: "outline", size })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance: <span className="font-bold">OUTLINE</span> | Size:{" "}
              <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <TreeViewDemo appearance="outline" size={size} />
          </PreviewCodeShowcase>
        ))}

        <PreviewCodeShowcase
          key="guides"
          code={treeViewSnippet({
            appearance: "ghost",
            size: "md",
            showGuides: true,
          })}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Indentation guides: <span className="font-bold">ON</span> |
            Appearance: <span className="font-bold">GHOST</span>
          </p>
          <TreeViewDemo appearance="ghost" size="md" showGuides />
        </PreviewCodeShowcase>

        {TREE_VIEW_TRANSITIONS.map((transition) => (
          <PreviewCodeShowcase
            key={`transition-${transition}`}
            code={treeViewSnippet({
              appearance: "sky",
              size: "md",
              animated: true,
              transition,
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Animated transition:{" "}
              <span className="font-bold">{transition.toUpperCase()}</span> |
              Appearance: <span className="font-bold">SKY</span>
            </p>
            <TreeViewDemo
              appearance="sky"
              size="md"
              animated
              transition={transition}
            />
          </PreviewCodeShowcase>
        ))}
      </div>
    </Section>
  );
}
