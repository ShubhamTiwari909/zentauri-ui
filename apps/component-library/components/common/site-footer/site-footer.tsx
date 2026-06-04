import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  siteChromeNavItems,
  type SiteChromeNavItem,
} from "@/components/common/site-chrome-nav";

import type { SiteFooterProps } from "./types";

type FooterLinkGroup = {
  title: string;
  links: SiteChromeNavItem[];
};

const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Build",
    links: siteChromeNavItems.filter((item) =>
      ["Installation", "Components", "Hooks", "Animations"].includes(
        item.label,
      ),
    ),
  },
  {
    title: "Explore",
    links: siteChromeNavItems.filter((item) =>
      ["Typography", "Charts", "Design tokens", "Demos"].includes(item.label),
    ),
  },
  {
    title: "Connect",
    links: siteChromeNavItems.filter((item) =>
      ["Contact", "GitHub"].includes(item.label),
    ),
  },
];

function FooterLink({ item }: { item: SiteChromeNavItem }) {
  const className =
    "group inline-flex items-center gap-2 text-sm leading-6 text-slate-400 transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  if (item.external) {
    return (
      <a
        href={item.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{item.label}</span>

      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      <span>{item.label}</span>
    </Link>
  );
}

export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      data-slot="site-footer"
      className={cn(
        "border-t border-white/10 bg-[radial-gradient(circle_at_15%_0%,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.94),#020617)] px-4 py-12 text-slate-400 backdrop-blur-md sm:px-6 lg:px-8",
        className,
      )}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1.6fr] lg:gap-16">
        <div className="max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-slate-100 transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 font-mono text-sm font-semibold text-cyan-100">
              Z
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-wide">
                Zentauri UI
              </span>
              <span className="block text-xs text-slate-500">
                React component library
              </span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            Polished primitives, hooks, charts, and motion-ready examples for
            product teams building with React and Tailwind CSS.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Tailwind v4", "TypeScript", "Framer Motion"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-3">
          {footerLinkGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {group.title}
              </p>
              <ul className="space-y-2">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Zentauri UI. All rights reserved.</p>
        <p className="text-slate-300">
          Built for fast previews, clear docs, and reusable product UI.
        </p>
      </div>
    </footer>
  );
}

SiteFooter.displayName = "SiteFooter";
