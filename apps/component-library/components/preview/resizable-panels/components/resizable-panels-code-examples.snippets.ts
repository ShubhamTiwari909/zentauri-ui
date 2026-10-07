import type { PanelsOptions } from "./resizable-panels-code-examples.data";
const imports =
  'import { ResizablePanels, ResizablePanel, ResizableHandle } from "@zentauri-ui/zentauri-components/ui/resizable-panels";';
export const panelsBasicSnippet = `"use client";
import { useId } from "react";
${imports}

export default function BasicWorkspace() {
  const navigationId = useId();
  const contentId = useId();
  return (
    <ResizablePanels defaultSizes={[35, 65]} className="h-64">
      <ResizablePanel id={navigationId} minSize={20} collapsible appearance="blue" padding="lg">
        Navigation
      </ResizablePanel>
      <ResizableHandle aria-label="Navigation size" appearance="blue" />
      <ResizablePanel id={contentId} minSize={10} appearance="subtle" padding="lg">
        Content
      </ResizablePanel>
    </ResizablePanels>
  );
}`;
export const panelsNestedSnippet = `"use client";
import { useId } from "react";
${imports}

export default function NestedWorkspace() {
  const filesId = useId();
  const editorId = useId();
  const previewId = useId();
  const consoleId = useId();
  return (
    <ResizablePanels defaultSizes={[30, 70]} className="h-80">
      <ResizablePanel id={filesId} minSize={20} appearance="blue" padding="md">Files</ResizablePanel>
      <ResizableHandle aria-label="Files width" />
      <ResizablePanel id={editorId} minSize={30}>
        <ResizablePanels orientation="vertical" defaultSizes={[65, 35]} className="h-full">
          <ResizablePanel id={previewId} minSize={20} appearance="subtle" padding="md">Editor preview</ResizablePanel>
          <ResizableHandle aria-label="Editor height" />
          <ResizablePanel id={consoleId} minSize={15} collapsible appearance="emerald" padding="md">Console</ResizablePanel>
        </ResizablePanels>
      </ResizablePanel>
    </ResizablePanels>
  );
}`;
export function panelsPlaygroundSnippet(
  options: PanelsOptions,
  sizes: number[],
) {
  return `"use client";
import { useId, useState } from "react";
${imports}

export default function SplitWorkspace() {
  const navigationId = useId();
  const contentId = useId();
  const [sizes, setSizes] = useState(${JSON.stringify(sizes.map((n) => Math.round(n * 100) / 100))});

  return (
    <ResizablePanels
      sizes={sizes} onSizesChange={setSizes}
      orientation="${options.orientation}" dir="${options.direction}"
      keyboardStep={${options.keyboardStep}} disabled={${options.disabled}}
      className="h-96 text-slate-900 dark:text-slate-100"
    >
      <ResizablePanel id={navigationId} minSize={${options.minSize}} maxSize={${options.maxSize}}
        collapsible={${options.collapsible}} appearance="${options.appearance}" padding="${options.padding}">
        Navigation
      </ResizablePanel>
      <ResizableHandle aria-label="Navigation size" appearance="${options.handleAppearance}" size="${options.handleSize}" />
      <ResizablePanel id={contentId} minSize={10} appearance="${options.appearance}" padding="${options.padding}">
        Content
      </ResizablePanel>
    </ResizablePanels>
  );
}`;
}
