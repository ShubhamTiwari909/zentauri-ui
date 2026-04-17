import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { DrawerDemo } from "./components/drawer-code-examples-demo";
import {
  DRAWER_APPEARANCES,
  DRAWER_CODE_EXAMPLES_SECTION_CLASS,
  DRAWER_SIDES,
  DRAWER_SIZES,
} from "./components/drawer-code-examples.data";
import { drawerSnippet } from "./components/drawer-code-examples.snippets";

export function DrawerCodeExamplesSection() {
  return (
    <section className={DRAWER_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Drawer variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Edge, width tier, and surface style on the same panel structure. Each
        snippet begins with Variant: naming the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {DRAWER_SIDES.map((side) => (
          <PreviewCodeShowcase
            key={`side-${side}`}
            code={drawerSnippet({
              side,
              size: "md",
              appearance: "default",
              label: `Open ${side}`,
            })}
          >
            <DrawerDemo
              side={side}
              size="md"
              appearance="default"
              label={`Open ${side}`}
            />
          </PreviewCodeShowcase>
        ))}
        {DRAWER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={drawerSnippet({
              side: "right",
              size,
              appearance: "default",
              label: `Open (${size})`,
            })}
          >
            <DrawerDemo
              side="right"
              size={size}
              appearance="default"
              label={`Open (${size})`}
            />
          </PreviewCodeShowcase>
        ))}
        {DRAWER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={drawerSnippet({
              side: "right",
              size: "md",
              appearance,
              label: `Open (${appearance})`,
            })}
          >
            <DrawerDemo
              side="right"
              size="md"
              appearance={appearance}
              label={`Open (${appearance})`}
            />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
