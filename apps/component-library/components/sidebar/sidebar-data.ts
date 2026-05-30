import { HOOK_PREVIEW_REGISTRY } from "@/lib/constants";
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
        title: "Components",
        href: "/preview/components",
      },
      {
        title: "Hooks",
        href: "/preview/hooks",
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
    title: "Area",
    href: "/preview/charts/area",
  },
  {
    title: "Bubble",
    href: "/preview/charts/bubble",
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
        title: "Command palette",
        href: "/preview/components/command",
      },
      {
        title: "Context menu",
        href: "/preview/components/context-menu",
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
        title: "Popover",
        href: "/preview/components/popover",
      },
      {
        title: "Progress",
        href: "/preview/components/progress",
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
        title: "Slider",
        href: "/preview/components/slider",
      },
      {
        title: "Spinner",
        href: "/preview/components/spinner",
      },
      {
        title: "Stepper",
        href: "/preview/components/stepper",
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
    ],
  },
];
