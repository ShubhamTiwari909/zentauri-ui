/**
 * Slide content shared by every carousel demo and mirrored in the generated
 * snippets, so "Show code" describes the panels actually on screen.
 */
export const CAROUSEL_SLIDE_DATA = [
  {
    id: "analytics",
    label: "Analytics",
    body: "Sessions, retention, and funnel drop-off in one view.",
    tint: "from-sky-500 to-indigo-600",
  },
  {
    id: "releases",
    label: "Releases",
    body: "Every deploy, with the diff that shipped it.",
    tint: "from-emerald-500 to-teal-600",
  },
  {
    id: "incidents",
    label: "Incidents",
    body: "Alert timeline, owner, and time to acknowledge.",
    tint: "from-amber-500 to-orange-600",
  },
  {
    id: "billing",
    label: "Billing",
    body: "Usage against plan limits, invoice by invoice.",
    tint: "from-fuchsia-500 to-purple-600",
  },
  {
    id: "audit",
    label: "Audit log",
    body: "Who changed what, filtered by actor and resource.",
    tint: "from-rose-500 to-pink-600",
  },
  {
    id: "api-keys",
    label: "API keys",
    body: "Scopes, last use, and one-click rotation.",
    tint: "from-cyan-500 to-blue-600",
  },
] as const;

export type CarouselSlideDatum = (typeof CAROUSEL_SLIDE_DATA)[number];
