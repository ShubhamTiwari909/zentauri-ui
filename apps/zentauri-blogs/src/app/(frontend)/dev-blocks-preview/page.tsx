// Temporary QA route to visually verify tree-view 4-level nesting. Safe to delete once verified.
import { renderBlock } from "../components/blocks/converters";

const block = {
  blockType: "tree-view" as const,
  appearance: "default",
  size: "md",
  showGuides: true,
  nodes: [
    {
      label: "level-1",
      children: [
        {
          label: "level-2",
          children: [
            {
              label: "level-3",
              children: [{ label: "level-4" }],
            },
          ],
        },
      ],
    },
  ],
};

export default function DevBlocksPreviewPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 bg-slate-900 p-4 text-white">
      {renderBlock(block as never, 0)}
    </main>
  );
}
