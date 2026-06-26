import { HOOK_PREVIEW_REGISTRY } from "@/lib/constants";
import {
  ANIMATION_PREVIEW_SLUGS,
  animationPreviewLabels,
} from "@/lib/animations-preview-registry";
import { SidebarNavGroup } from "./types";

const hookSidebarItems = [...HOOK_PREVIEW_REGISTRY]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((hook) => ({
    title: hook.name,
    href: `/preview/hooks/${hook.slug}`,
  }));

const sidebarRouteDataShared = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Installation",
        href: "/preview/installation",
      },
      {
        title: "Design tokens",
        href: "/preview/tokens",
      },
      {
        title: "Components",
        href: "/preview/components",
      },
      {
        title: "Hooks",
        href: "/preview/hooks",
      },
      {
        title: "Animations",
        href: "/preview/animations",
      },
      {
        title: "Typography",
        href: "/preview/typography",
      },
      {
        title: "Charts",
        href: "/preview/charts",
      },
    ],
  },
];

const typographySidebarItems = [
  {
    title: "Heading",
    href: "/preview/typography/heading",
  },
  {
    title: "Paragraph",
    href: "/preview/typography/paragraph",
  },
  {
    title: "Lists",
    href: "/preview/typography/lists",
  },
  {
    title: "Blockquote",
    href: "/preview/typography/blockquote",
  },
  {
    title: "Inline",
    href: "/preview/typography/inline",
  },
  {
    title: "Code Block",
    href: "/preview/typography/code-block",
  },
];

export const sidebarTypographyData: SidebarNavGroup[] = [
  ...sidebarRouteDataShared,
  {
    title: "Typography",
    items: [...typographySidebarItems],
  },
];

export const sidebarHooksData: SidebarNavGroup[] = [
  ...sidebarRouteDataShared,
  {
    title: "Hooks",
    items: [...hookSidebarItems],
  },
];

const animationsSidebarItems = ANIMATION_PREVIEW_SLUGS.map((slug) => ({
  title: animationPreviewLabels[slug],
  href: `/preview/animations/${slug}`,
}));

export const sidebarAnimationsData: SidebarNavGroup[] = [
  ...sidebarRouteDataShared,
  {
    title: "Animations",
    items: [...animationsSidebarItems],
  },
];

const chartsSidebarItems = [
  {
    title: "Line",
    href: "/preview/charts/line",
  },
  {
    title: "Bar",
    href: "/preview/charts/bar",
  },
  {
    title: "Stacked Bar",
    href: "/preview/charts/stacked-bar",
  },
  {
    title: "Area",
    href: "/preview/charts/area",
  },
  {
    title: "Radar",
    href: "/preview/charts/radar",
  },
  {
    title: "Scatter",
    href: "/preview/charts/scatter",
  },
  {
    title: "Bubble",
    href: "/preview/charts/bubble",
  },
  {
    title: "Funnel",
    href: "/preview/charts/funnel",
  },
  {
    title: "Pie",
    href: "/preview/charts/pie",
  },
];

export const sidebarChartsData: SidebarNavGroup[] = [
  ...sidebarRouteDataShared,
  {
    title: "Charts",
    items: [...chartsSidebarItems],
  },
];

export const sidebarComponentsData: SidebarNavGroup[] = [
  ...sidebarRouteDataShared,
  {
    title: "Components",
    items: [
      {
        title: "Accordion",
        href: "/preview/components/accordion",
      },
      {
        title: "Alert",
        href: "/preview/components/alert",
      },
      {
        title: "Animated Number",
        href: "/preview/components/animated-number",
      },
      {
        title: "Audio Player",
        href: "/preview/components/audio-player",
      },
      {
        title: "Avatar",
        href: "/preview/components/avatar",
      },
      {
        title: "Badge",
        href: "/preview/components/badge",
      },
      {
        title: "Breadcrumb",
        href: "/preview/components/breadcrumb",
      },
      {
        title: "Buttons",
        href: "/preview/components/buttons",
      },
      {
        title: "Card",
        href: "/preview/components/card",
      },
      {
        title: "Checkbox",
        href: "/preview/components/checkbox",
      },
      {
        title: "Code Diff",
        href: "/preview/components/code-diff",
      },
      {
        title: "Combobox",
        href: "/preview/components/combobox",
      },
      {
        title: "Command palette",
        href: "/preview/components/command",
      },
      {
        title: "Context menu",
        href: "/preview/components/context-menu",
      },
      {
        title: "Copy button",
        href: "/preview/components/copy-button",
      },
      {
        title: "DataTable",
        href: "/preview/components/data-table",
      },
      {
        title: "Divider",
        href: "/preview/components/divider",
      },
      {
        title: "Drawer",
        href: "/preview/components/drawer",
      },
      {
        title: "Dropdown",
        href: "/preview/components/dropdown",
      },
      {
        title: "Dynamic stepper",
        href: "/preview/components/dynamic-stepper",
      },
      {
        title: "Empty state",
        href: "/preview/components/empty-state",
      },
      {
        title: "File upload",
        href: "/preview/components/file-upload",
      },
      {
        title: "Inputs",
        href: "/preview/components/inputs",
      },
      {
        title: "Kbd",
        href: "/preview/components/kbd",
      },
      {
        title: "Marquee",
        href: "/preview/components/marquee",
      },
      {
        title: "Modal",
        href: "/preview/components/modal",
      },
      {
        title: "OTP input",
        href: "/preview/components/otp-input",
      },
      {
        title: "Pagination",
        href: "/preview/components/pagination",
      },
      {
        title: "Password strength meter",
        href: "/preview/components/password-strength-meter",
      },
      {
        title: "Popover",
        href: "/preview/components/popover",
      },
      {
        title: "Progress",
        href: "/preview/components/progress",
      },
      {
        title: "Rating",
        href: "/preview/components/rating",
      },
      {
        title: "Radio group",
        href: "/preview/components/radio-group",
      },
      {
        title: "Scroll area",
        href: "/preview/components/scroll-area",
      },
      {
        title: "Search",
        href: "/preview/components/search",
      },
      {
        title: "Select",
        href: "/preview/components/select",
      },
      {
        title: "Skeleton",
        href: "/preview/components/skeleton",
      },
      {
        title: "Split button",
        href: "/preview/components/split-button",
      },
      {
        title: "Slider",
        href: "/preview/components/slider",
      },
      {
        title: "Spinner",
        href: "/preview/components/spinner",
      },
      {
        title: "Table",
        href: "/preview/components/table",
      },
      {
        title: "Tabs",
        href: "/preview/components/tabs",
      },
      {
        title: "Timeline",
        href: "/preview/components/timeline",
      },
      {
        title: "Toast",
        href: "/preview/components/toast",
      },
      {
        title: "Toggle",
        href: "/preview/components/toggle",
      },
      {
        title: "Tooltip",
        href: "/preview/components/tooltip",
      },
      {
        title: "Tree view",
        href: "/preview/components/tree-view",
      },
      {
        title: "Typing indicator",
        href: "/preview/components/typing-indicator",
      },
    ],
  },
];
