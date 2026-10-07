"use client";
import { useId } from "react";
import {
  ResizablePanels,
  ResizablePanel,
  ResizableHandle,
} from "@zentauri-ui/zentauri-components/ui/resizable-panels";
import type { PanelsOptions } from "./resizable-panels-code-examples.data";

export function PanelsPlaygroundDemo({
  options,
  sizes,
  onSizesChange,
  onResizeEnd,
}: {
  options: PanelsOptions;
  sizes: number[];
  onSizesChange: (sizes: number[]) => void;
  onResizeEnd: (sizes: number[]) => void;
}) {
  const id = useId();
  return (
    <ResizablePanels
      orientation={options.orientation}
      sizes={sizes}
      onSizesChange={onSizesChange}
      onResizeEnd={onResizeEnd}
      keyboardStep={options.keyboardStep}
      disabled={options.disabled}
      dir={options.direction}
      aria-label="Workspace layout"
      className="h-96 w-full text-slate-900 dark:text-slate-100"
    >
      <ResizablePanel
        id={`${id}-navigation`}
        minSize={options.minSize}
        maxSize={options.maxSize}
        collapsible={options.collapsible}
        appearance={options.appearance}
        padding={options.padding}
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide">
          Navigation
        </p>
        <nav aria-label="Workspace sections" className="space-y-2 text-sm">
          {["Overview", "Projects", "Activity", "Settings"].map((name) => (
            <button
              key={name}
              type="button"
              className="block w-full truncate rounded-md px-2 py-2 text-start hover:bg-black/5 dark:hover:bg-white/10"
            >
              {name}
            </button>
          ))}
        </nav>
        <p className="mt-6 text-xs leading-relaxed">
          Collapse this pane with Enter while its resize handle is focused.
        </p>
      </ResizablePanel>
      <ResizableHandle
        aria-label="Navigation resize handle"
        appearance={options.handleAppearance}
        size={options.handleSize}
      />
      <ResizablePanel
        id={`${id}-details`}
        minSize={10}
        appearance={options.appearance}
        padding={options.padding}
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide">
            Project workspace
          </p>
          <h3 className="text-lg font-semibold">Your layout, your space</h3>
          <p className="text-sm leading-relaxed">
            Drag the divider to make room for the content you are working on.
            Each pane keeps its own scrolling area.
          </p>
          <label className="block text-sm">
            Project name
            <input
              aria-label="Project name"
              defaultValue="Studio workspace"
              className="mt-2 w-full min-w-0 rounded-lg border border-current/20 bg-transparent p-2"
            />
          </label>
          <button
            type="button"
            className="rounded-lg border border-current/30 px-3 py-2 text-sm"
          >
            Open project
          </button>
        </div>
      </ResizablePanel>
    </ResizablePanels>
  );
}
export function PanelsBasicDemo() {
  const id = useId();
  return (
    <ResizablePanels
      defaultSizes={[35, 65]}
      className="h-64 w-full"
      aria-label="Basic split layout"
    >
      <ResizablePanel
        id={`${id}-navigation`}
        minSize={20}
        collapsible
        appearance="blue"
        padding="lg"
      >
        <h3 className="font-semibold">Navigation</h3>
        <p className="mt-2 text-sm">Resize or collapse with the keyboard.</p>
      </ResizablePanel>
      <ResizableHandle aria-label="Navigation size" appearance="blue" />
      <ResizablePanel
        id={`${id}-content`}
        minSize={10}
        appearance="subtle"
        padding="lg"
      >
        <h3 className="font-semibold">Content</h3>
        <p className="mt-2 text-sm">
          A flexible workspace with native controls.
        </p>
        <button
          type="button"
          className="mt-4 rounded-md border border-current/20 px-3 py-2 text-sm"
        >
          View details
        </button>
      </ResizablePanel>
    </ResizablePanels>
  );
}
export function PanelsNestedDemo() {
  const id = useId();
  return (
    <ResizablePanels
      defaultSizes={[30, 70]}
      className="h-80 w-full"
      aria-label="Nested workspace"
    >
      <ResizablePanel
        id={`${id}-files`}
        minSize={20}
        appearance="blue"
        padding="md"
      >
        Files
      </ResizablePanel>
      <ResizableHandle aria-label="Files width" appearance="blue" />
      <ResizablePanel id={`${id}-editor`} minSize={30}>
        <ResizablePanels
          orientation="vertical"
          defaultSizes={[65, 35]}
          className="h-full"
          aria-label="Editor and console"
        >
          <ResizablePanel
            id={`${id}-preview`}
            minSize={20}
            appearance="subtle"
            padding="md"
          >
            Editor preview
          </ResizablePanel>
          <ResizableHandle aria-label="Editor height" appearance="emerald" />
          <ResizablePanel
            id={`${id}-console`}
            minSize={15}
            collapsible
            appearance="emerald"
            padding="md"
          >
            Console
          </ResizablePanel>
        </ResizablePanels>
      </ResizablePanel>
    </ResizablePanels>
  );
}
