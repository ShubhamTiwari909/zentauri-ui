import {
  FiCheckCircle,
  FiCommand,
  FiEye,
  FiMove,
  FiTarget,
} from "react-icons/fi";

import { PACKAGE_TEST_HEALTH } from "./package-health-data";
import { SectionShell } from "./section-shell";

const ACCESSIBILITY_AREA = PACKAGE_TEST_HEALTH.areas.find((area) =>
  area.area.startsWith("Accessibility"),
);

const A11Y_TEST_COUNT = ACCESSIBILITY_AREA?.tests ?? 0;

const A11Y_PILLARS = [
  {
    icon: FiCheckCircle,
    title: "axe-core on every interactive component",
    body: "Buttons, inputs, overlays, menus, and listboxes are rendered in their real opened states and audited with axe-core—each suite asserts zero violations.",
  },
  {
    icon: FiMove,
    title: "Arrow-key navigation",
    body: "Tabs, Select, Combobox, and menus roam with Arrow keys and jump with Home/End, skipping disabled items the way assistive tech expects.",
  },
  {
    icon: FiTarget,
    title: "Focus order and roving tabindex",
    body: "Compound components keep a single stop in the tab sequence and move focus deliberately, so keyboard users never get lost between controls.",
  },
  {
    icon: FiCommand,
    title: "Escape, Enter, and Space",
    body: "Dialogs close on Escape and restore focus to their trigger; items activate on Enter and Space—covered by tests, not assumptions.",
  },
  {
    icon: FiEye,
    title: "Focus trapping in overlays",
    body: "Modal, Drawer, and Popover trap focus inside the dialog and hand it back on close, verified through the shared focus-management hook.",
  },
  {
    icon: FiCheckCircle,
    title: "Wired ARIA relationships",
    body: "Triggers, listboxes, tabpanels, and dialogs expose the roles, labels, and aria-* wiring that screen readers rely on to announce state.",
  },
] as const;

export function HomeAccessibility() {
  return (
    <SectionShell
      eyebrow="Accessibility"
      title="Keyboard-ready and screen-reader friendly"
      lead={`Accessibility is exercised in CI, not just documented. ${A11Y_TEST_COUNT} dedicated accessibility tests pair axe-core audits with keyboard-interaction coverage across the library's interactive and compound components.`}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {A11Y_PILLARS.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className="group flex min-h-44 flex-col gap-3 rounded-lg border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/25 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-slate-900/80"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-200 ring-1 ring-white/10 transition group-hover:bg-cyan-400/15 group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="text-sm leading-6 text-slate-400">{body}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
