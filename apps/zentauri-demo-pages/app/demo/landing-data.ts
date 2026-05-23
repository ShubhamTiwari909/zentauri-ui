export type LayoutKind =
  | "split"
  | "dashboard"
  | "centered"
  | "sidebar"
  | "bento"
  | "minimal"
  | "terminal"
  | "pricing";

export type CardAppearance =
  | "default"
  | "sky"
  | "rose"
  | "purple"
  | "pink"
  | "orange"
  | "yellow"
  | "teal"
  | "indigo"
  | "emerald"
  | "amber"
  | "violet"
  | "gradient-blue"
  | "gradient-green"
  | "gradient-purple"
  | "gradient-indigo"
  | "gradient-pink"
  | "gradient-orange"
  | "gradient-teal";

export type ButtonAppearance =
  | "sky"
  | "emerald"
  | "purple"
  | "teal"
  | "orange"
  | "rose"
  | "indigo"
  | "yellow"
  | "pink"
  | "gradient-blue"
  | "gradient-green"
  | "gradient-purple"
  | "gradient-indigo"
  | "gradient-pink"
  | "gradient-orange"
  | "gradient-teal";

export type DemoTheme = {
  slug: string;
  label: string;
  accent: CardAppearance;
  button: ButtonAppearance;
};

export type DemoLayoutRoute = {
  slug: LayoutKind;
  label: string;
  description: string;
  layout: LayoutKind;
};

export type DemoLandingContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  metric: string;
  metricLabel: string;
  progress: number;
  tags: string[];
  highlights: string[];
  proof: string;
  panelTitle: string;
  panelItems: Array<{
    label: string;
    value: string;
  }>;
};

export const demoLandingContent = {
  eyebrow: "Analytics OS",
  title: "Turn scattered product signals into a launch-ready story.",
  description:
    "Signal Analytics helps growth teams collect events, segment demand, and ship crisp weekly decisions from one calm dashboard.",
  primaryCta: "Explore signals",
  secondaryCta: "Switch layout",
  metric: "42%",
  metricLabel: "faster insight cycles",
  progress: 82,
  tags: ["Cohorts", "Funnels", "Forecasts"],
  highlights: [
    "Live retention map",
    "No-code milestone tracking",
    "Board-ready summaries",
  ],
  proof:
    "Teams use the weekly signal brief to replace four recurring status meetings.",
  panelTitle: "Launch readiness",
  panelItems: [
    { label: "Activation", value: "91%" },
    { label: "Expansion", value: "+18%" },
    { label: "Risk", value: "Low" },
  ],
} satisfies DemoLandingContent;

export const themeOptions = [
  {
    slug: "teal",
    label: "Teal",
    accent: "gradient-teal",
    button: "gradient-teal",
  },
  {
    slug: "emerald",
    label: "Emerald",
    accent: "emerald",
    button: "emerald",
  },
  {
    slug: "sky",
    label: "Sky",
    accent: "sky",
    button: "sky",
  },
  {
    slug: "indigo",
    label: "Indigo",
    accent: "gradient-indigo",
    button: "gradient-indigo",
  },
  {
    slug: "violet",
    label: "Violet",
    accent: "gradient-purple",
    button: "gradient-purple",
  },
  {
    slug: "purple",
    label: "Purple",
    accent: "purple",
    button: "purple",
  },
  {
    slug: "pink",
    label: "Pink",
    accent: "gradient-pink",
    button: "gradient-pink",
  },
  {
    slug: "rose",
    label: "Rose",
    accent: "rose",
    button: "rose",
  },
  {
    slug: "yellow",
    label: "Yellow",
    accent: "yellow",
    button: "yellow",
  },
  {
    slug: "orange",
    label: "Orange",
    accent: "gradient-orange",
    button: "gradient-orange",
  },
  {
    slug: "green",
    label: "Green",
    accent: "gradient-green",
    button: "gradient-green",
  },
  {
    slug: "blue",
    label: "Blue",
    accent: "gradient-blue",
    button: "gradient-blue",
  },
] satisfies DemoTheme[];

export const layoutRoutes = [
  {
    slug: "split",
    label: "Split Layout",
    description:
      "A classic hero and product panel composition for high-conversion SaaS landing pages.",
    layout: "split",
  },
  {
    slug: "dashboard",
    label: "Dashboard Layout",
    description:
      "A product-forward composition with the live workspace leading the page.",
    layout: "dashboard",
  },
  {
    slug: "centered",
    label: "Editorial Layout",
    description:
      "A centered, campaign-style page with a wide proof panel and calmer reading rhythm.",
    layout: "centered",
  },
  {
    slug: "sidebar",
    label: "Sidebar Layout",
    description:
      "A narrow navigation-style intro paired with a larger product surface for documentation and tools.",
    layout: "sidebar",
  },
  {
    slug: "bento",
    label: "Bento Layout",
    description:
      "A modular grid-inspired page that feels like a launch dashboard composed from compact cards.",
    layout: "bento",
  },
  {
    slug: "minimal",
    label: "Minimal Layout",
    description:
      "A restrained, copy-led landing page with narrow measure and quiet product proof.",
    layout: "minimal",
  },
  {
    slug: "terminal",
    label: "Terminal Layout",
    description:
      "A compact operations-console layout for technical products and command-center previews.",
    layout: "terminal",
  },
  {
    slug: "pricing",
    label: "Pricing Layout",
    description:
      "A conversion page shaped like a plan selection surface with proof and outcome cards close at hand.",
    layout: "pricing",
  },
] satisfies DemoLayoutRoute[];

export const getLayoutRoute = (slug: string) =>
  layoutRoutes.find((route) => route.slug === slug);
