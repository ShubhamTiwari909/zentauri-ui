// Temporary QA route to verify PR #124 review-feedback fixes. Safe to delete once verified.
import { BlockRenderer } from "../components/blocks/BlockRenderer";
import { renderBlock } from "../components/blocks/converters";

const paragraph = (text: string) => ({
  type: "paragraph",
  version: 1,
  format: "" as const,
  indent: 0,
  direction: "ltr" as const,
  children: [
    {
      type: "text",
      version: 1,
      format: 0,
      detail: 0,
      mode: "normal",
      style: "",
      text,
    },
  ],
});

const richText = (text: string) => ({
  root: {
    type: "root",
    format: "" as const,
    indent: 0,
    direction: "ltr" as const,
    version: 1,
    children: [paragraph(text)],
  },
});

const sections = [
  {
    id: "s-white",
    blockType: "section" as const,
    sectionId: "white-section",
    bgColor: "white",
    content: richText(
      "White background section — this text must be dark/readable.",
    ),
  },
  {
    id: "s-blue",
    blockType: "section" as const,
    sectionId: "blue-section",
    bgColor: "blue",
    content: richText("Blue background section — this text should stay white."),
  },
];

const cardNoBg = {
  blockType: "card" as const,
  appearance: "glass",
  content: richText(
    "Card with appearance=glass, bg unset — should render glass, not overridden.",
  ),
};

const cardWithBg = {
  blockType: "card" as const,
  appearance: "glass",
  bg: "blue",
  content: richText(
    "Card with appearance=glass AND bg=blue explicitly — should render solid blue.",
  ),
};

export default function DevBlocksPreviewPage() {
  return (
    <main className="flex flex-col gap-6 bg-slate-900 p-6">
      <BlockRenderer blocks={sections as never} />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 text-white">
        <div>
          <h2 className="mb-2 text-sm uppercase text-white/50">Card (no bg)</h2>
          {renderBlock(cardNoBg as never, "a")}
        </div>
        <div>
          <h2 className="mb-2 text-sm uppercase text-white/50">
            Card (bg=blue)
          </h2>
          {renderBlock(cardWithBg as never, "b")}
        </div>
      </div>
    </main>
  );
}
