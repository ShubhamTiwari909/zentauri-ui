"use client";
import { useId, useState } from "react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarToggle,
  ToolbarLink,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarItem,
} from "@zentauri-ui/zentauri-components/ui/toolbar";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import type { ToolbarOptions } from "./toolbar-code-examples.data";

export function ToolbarActionsDemo() {
  const [message, setMessage] = useState("Ready to work.");
  return (
    <div className="space-y-3">
      <Toolbar aria-label="Document actions" appearance="subtle">
        <ToolbarButton onClick={() => setMessage("Document saved.")}>
          Save
        </ToolbarButton>
        <ToolbarButton onClick={() => setMessage("Export prepared.")}>
          Export
        </ToolbarButton>
        <ToolbarButton onClick={() => setMessage("Print preview prepared.")}>
          Print
        </ToolbarButton>
      </Toolbar>
      <p role="status" className="text-sm">
        {message}
      </p>
    </div>
  );
}

export function ToolbarFormattingDemo() {
  const id = useId();
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [saved, setSaved] = useState("");
  return (
    <div className="space-y-3">
      <Toolbar
        aria-label="Text formatting"
        aria-controls={id}
        appearance="blue"
      >
        <ToolbarGroup aria-label="Text style">
          <ToolbarToggle pressed={bold} onPressedChange={setBold}>
            Bold
          </ToolbarToggle>
          <ToolbarToggle pressed={italic} onPressedChange={setItalic}>
            Italic
          </ToolbarToggle>
          <ToolbarToggle pressed={underline} onPressedChange={setUnderline}>
            Underline
          </ToolbarToggle>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarButton onClick={() => setSaved("Formatting saved.")}>
          Save
        </ToolbarButton>
      </Toolbar>
      <p
        id={id}
        className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"
        style={{
          fontWeight: bold ? 700 : 400,
          fontStyle: italic ? "italic" : "normal",
          textDecoration: underline ? "underline" : "none",
        }}
      >
        A small change can make an idea clearer.
      </p>
      <p role="status" className="text-sm">
        {saved}
      </p>
    </div>
  );
}

export function ToolbarVerticalDemo() {
  const [message, setMessage] = useState("Select a canvas tool.");
  return (
    <div className="space-y-3">
      <Toolbar
        aria-label="Canvas tools"
        orientation="vertical"
        appearance="contrast"
        className="w-fit"
      >
        <ToolbarButton onClick={() => setMessage("Move tool selected.")}>
          Move
        </ToolbarButton>
        <ToolbarButton onClick={() => setMessage("Draw tool selected.")}>
          Draw
        </ToolbarButton>
        <ToolbarButton onClick={() => setMessage("Erase tool selected.")}>
          Erase
        </ToolbarButton>
      </Toolbar>
      <p role="status" className="text-sm">
        {message}
      </p>
    </div>
  );
}

export function ToolbarCompositionDemo() {
  const id = useId();
  const [message, setMessage] = useState("Nothing selected yet.");
  return (
    <div className="space-y-3">
      <Toolbar aria-label="Workspace shortcuts" appearance="glass">
        <ToolbarItem>
          <Button
            appearance="outline"
            onClick={() => setMessage("Changes saved.")}
          >
            Save changes
          </Button>
        </ToolbarItem>
        <ToolbarButton disabled>Undo</ToolbarButton>
        <ToolbarSeparator decorative={false} />
        <ToolbarLink href={`#${id}`}>Keyboard help</ToolbarLink>
        <ToolbarButton onClick={() => setMessage("Share link prepared.")}>
          Share
        </ToolbarButton>
      </Toolbar>
      <p role="status" className="text-sm">
        {message}
      </p>
      <p id={id} className="text-sm">
        Tab enters once. Arrows move between available controls; Home and End
        jump to the edges.
      </p>
    </div>
  );
}

export function ToolbarPlaygroundDemo({
  options,
}: {
  options: ToolbarOptions;
}) {
  const { disableExport, ...toolbarOptions } = options;
  const [bold, setBold] = useState(false);
  const [lastAction, setLastAction] = useState("No action yet.");
  return (
    <div className="space-y-3">
      <Toolbar
        aria-label="Playground commands"
        {...toolbarOptions}
        className={options.orientation === "vertical" ? "w-fit" : undefined}
      >
        <ToolbarToggle pressed={bold} onPressedChange={setBold}>
          Bold
        </ToolbarToggle>
        <ToolbarButton onClick={() => setLastAction("Saved the document.")}>
          Save
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton
          disabled={disableExport}
          onClick={() => setLastAction("Prepared an export.")}
        >
          Export
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setLastAction("Prepared the share link.")}
        >
          Share
        </ToolbarButton>
      </Toolbar>
      <p role="status" className="text-sm">
        {lastAction} Bold is {bold ? "on" : "off"}.
      </p>
    </div>
  );
}
