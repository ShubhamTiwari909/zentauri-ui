"use client";

import { usePathname } from "next/navigation";
import {
  FiCheckCircle,
  FiEye,
  FiPackage,
  FiZap,
} from "react-icons/fi";

type NotesKind = "component" | "chart";

type RouteContext = {
  kind: NotesKind;
  slug: string;
};

type ComponentDocNote = {
  accessibility: string;
  dependency: string;
  dependencyTone?: "default" | "motion" | "chart";
};

const motionComponentSlugs = new Set([
  "accordion",
  "alert",
  "animated-number",
  "avatar",
  "badge",
  "buttons",
  "card",
  "checkbox",
  "command",
  "copy-button",
  "divider",
  "drawer",
  "empty-state",
  "inputs",
  "kbd",
  "modal",
  "popover",
  "progress",
  "radio-group",
  "skeleton",
  "spinner",
  "table",
  "tabs",
  "timeline",
  "toast",
  "toggle",
  "tooltip",
  "tree-view",
]);

const formControlSlugs = new Set([
  "checkbox",
  "combobox",
  "file-upload",
  "inputs",
  "otp-input",
  "radio-group",
  "search",
  "select",
  "slider",
  "toggle",
]);

const overlaySlugs = new Set([
  "command",
  "context-menu",
  "drawer",
  "dropdown",
  "modal",
  "popover",
  "toast",
  "tooltip",
]);

const staticDependencySlugs = new Set([
  "buttons",
  "badge",
  "breadcrumb",
  "card",
  "divider",
  "kbd",
  "pagination",
  "progress",
  "rating",
  "skeleton",
  "typography",
]);

function getRouteContext(pathname: string): RouteContext | null {
  if (!pathname) {
    return null;
  }
  const parts = pathname.split("/").filter(Boolean);
  const previewIndex = parts.indexOf("preview");

  if (previewIndex === -1) {
    return null;
  }

  const kind = parts[previewIndex + 1];
  const slug = parts[previewIndex + 2];

  if (!slug) {
    return null;
  }

  if (kind === "components") {
    if (slug === "installation" || slug === "tokens") {
      return null;
    }

    return { kind: "component", slug };
  }

  if (kind === "charts") {
    return { kind: "chart", slug };
  }

  return null;
}

function getAccessibilityNote(slug: string): string {
  if (formControlSlugs.has(slug)) {
    return "Keyboard accessible controls with labels, focus-visible rings, and state attributes. Keep visible labels or aria-labels when copying snippets.";
  }

  if (overlaySlugs.has(slug)) {
    return "Overlay patterns include focus, dismissal, and semantic roles where the component owns interaction. Verify trigger labels and escape behavior in your flow.";
  }

  if (slug === "accordion" || slug === "tabs") {
    return "Disclosure and tab patterns expose keyboard navigation and state. Keep headings, labels, and panel content meaningful for screen readers.";
  }

  if (slug === "table" || slug === "tree-view") {
    return "Structure-first markup keeps dense data navigable. Preserve row, heading, and item labels when adapting examples.";
  }

  return "Keyboard accessible by default with semantic markup, visible focus treatment, and tokenized states. Add descriptive labels for icon-only or decorative usage.";
}

function getComponentNote(slug: string): ComponentDocNote {
  const hasMotionEntry = motionComponentSlugs.has(slug);
  const isStaticOnly = staticDependencySlugs.has(slug) && !hasMotionEntry;

  if (slug === "spinner") {
    return {
      accessibility: getAccessibilityNote(slug),
      dependency:
        "Requires framer-motion because this preview uses the animated entry. Install it before using the component or the zentauri-ui add --animated flow.",
      dependencyTone: "motion",
    };
  }
  if (slug === "animated-number") {
    return {
      accessibility: getAccessibilityNote(slug),
      dependency:
        "Requires framer-motion because this component is inherently animated. Install it before using the component.",
      dependencyTone: "motion",
    };
  }

  if (hasMotionEntry) {
    return {
      accessibility: getAccessibilityNote(slug),
      dependency:
        "Static imports do not pull framer-motion. Use the animated entry only when you want motion and have framer-motion installed.",
      dependencyTone: "motion",
    };
  }

  if (isStaticOnly) {
    return {
      accessibility: getAccessibilityNote(slug),
      dependency:
        "No extra runtime dependency beyond React and the package peers already covered in Installation.",
    };
  }

  return {
    accessibility: getAccessibilityNote(slug),
    dependency:
      "Check Installation for shared peers. This component keeps styling in Tailwind classes and the --zui-* token contract.",
  };
}

function getChartNote(): ComponentDocNote {
  return {
    accessibility:
      "Charts render visual data through Recharts. Pair them with titles, summaries, and table fallbacks when the data is critical.",
    dependency:
      "Requires recharts. Install it alongside Zentauri UI before using chart entries.",
    dependencyTone: "chart",
  };
}

function getDocNote(context: RouteContext): ComponentDocNote {
  if (context.kind === "chart") {
    return getChartNote();
  }

  return getComponentNote(context.slug);
}

function NoteIcon({ tone }: { tone?: ComponentDocNote["dependencyTone"] }) {
  const Icon =
    tone === "motion" ? FiZap : tone === "chart" ? FiEye : FiCheckCircle;

  return <Icon className="h-4 w-4" aria-hidden />;
}

export function ComponentDocNotes() {
  const pathname = usePathname();
  const context = getRouteContext(pathname);

  if (!context) {
    return null;
  }

  const note = getDocNote(context);

  return (
    <section
      aria-label="Component adoption notes"
      className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300 shadow-xl shadow-slate-950/20 md:grid-cols-2"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/20">
          <FiCheckCircle className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <h2 className="font-semibold text-white">Accessibility notes</h2>
          <p className="mt-1 leading-6 text-slate-400">{note.accessibility}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-300/20">
          {note.dependencyTone ? (
            <NoteIcon tone={note.dependencyTone} />
          ) : (
            <FiPackage className="h-4 w-4" aria-hidden />
          )}
        </span>
        <div>
          <h2 className="font-semibold text-white">Dependency notes</h2>
          <p className="mt-1 leading-6 text-slate-400">{note.dependency}</p>
        </div>
      </div>
    </section>
  );
}
