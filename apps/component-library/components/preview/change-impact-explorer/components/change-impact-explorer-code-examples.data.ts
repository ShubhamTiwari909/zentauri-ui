import type {
  ChangeImpactNode,
  ChangeImpactEdge,
  ChangeImpactChange,
  ChangeImpactExplorerProps,
} from "@zentauri-ui/zentauri-components/ui/change-impact-explorer";
export const IMPACT_NODES: readonly ChangeImpactNode[] = [
  {
    id: "schema",
    label: "Customer schema",
    category: "API contract",
    priority: "high",
    description: "The contract used by customer-facing integrations.",
    metadata: "Owner: Platform team",
  },
  {
    id: "api",
    label: "Customer API",
    category: "Service",
    priority: "high",
    description: "Reads and validates customer records.",
  },
  {
    id: "sdk",
    label: "TypeScript SDK",
    category: "Integration",
    priority: "medium",
    description: "Generated types expose the public schema.",
  },
  {
    id: "billing",
    label: "Billing pipeline",
    category: "Service",
    priority: "high",
    description: "Maps customer identifiers to invoices.",
  },
  {
    id: "dashboard",
    label: "Account dashboard",
    category: "Application",
    priority: "medium",
    description: "Uses the SDK and billing data.",
  },
  {
    id: "docs",
    label: "Integration guide",
    category: "Documentation",
    priority: "low",
    description: "Documents the SDK's public fields.",
  },
  {
    id: "analytics",
    label: "Usage analytics",
    category: "Reporting",
    priority: "low",
    description: "Uses a separate event schema.",
  },
];
export const IMPACT_EDGES: readonly ChangeImpactEdge[] = [
  {
    id: "schema-api",
    source: "schema",
    target: "api",
    reason: "Validates requests against the customer schema",
  },
  {
    id: "schema-sdk",
    source: "schema",
    target: "sdk",
    reason: "Generates SDK types from the schema",
  },
  {
    id: "api-billing",
    source: "api",
    target: "billing",
    reason: "Uses customer identifiers returned by the API",
  },
  {
    id: "sdk-dashboard",
    source: "sdk",
    target: "dashboard",
    reason: "Imports customer types from the SDK",
  },
  {
    id: "billing-dashboard",
    source: "billing",
    target: "dashboard",
    reason: "Displays invoices from the billing pipeline",
  },
  {
    id: "sdk-docs",
    source: "sdk",
    target: "docs",
    reason: "Shows code examples using SDK fields",
  },
];
export const IMPACT_CHANGES: readonly ChangeImpactChange[] = [
  {
    id: "rename",
    label: "Rename customer_id",
    description:
      "Preview the reach of a public field rename before updating its consumers.",
    nodeIds: ["schema"],
    comparisons: [
      {
        nodeId: "schema",
        label: "Public field",
        before: "customer_id: string",
        after: "account_id: string",
      },
      {
        nodeId: "sdk",
        label: "Type definition",
        before: "type Customer = { customer_id: string }",
        after: "type Customer = { account_id: string }",
      },
      {
        nodeId: "dashboard",
        label: "Application usage",
        before: "customer.customer_id",
        after: "customer.account_id",
      },
    ],
  },
  {
    id: "billing",
    label: "Update invoice mapping",
    description: "Review the consumers of a billing pipeline change.",
    nodeIds: ["billing"],
    comparisons: [
      {
        nodeId: "billing",
        before: "Invoice.customer_id",
        after: "Invoice.account_id",
      },
    ],
  },
  {
    id: "docs",
    label: "Revise integration guide",
    description: "A leaf change has no downstream consumers in this graph.",
    nodeIds: ["docs"],
  },
  {
    id: "multi",
    label: "Coordinate API and SDK changes",
    description:
      "Two changed nodes share downstream consumers; each consumer is counted once.",
    nodeIds: ["api", "sdk"],
  },
];
export const IMPACT_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
  "blue",
  "cyan",
  "green",
  "lime",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "red",
  "slate",
  "gray",
  "zinc",
  "gradient-blue",
  "gradient-green",
  "gradient-purple",
  "gradient-orange",
  "gradient-pink",
] as const satisfies readonly NonNullable<
  ChangeImpactExplorerProps["appearance"]
>[];
export type ImpactOptions = {
  appearance: NonNullable<ChangeImpactExplorerProps["appearance"]>;
  size: "sm" | "md" | "lg";
  direction: "downstream" | "upstream";
  showMap: boolean;
  showOutsideAnalysis: boolean;
  virtualize: boolean;
  depth: "all" | "1" | "2";
  dataset: "example" | "10000";
  state: "ready" | "loading" | "error" | "empty";
  dir: "ltr" | "rtl";
};
export const IMPACT_DEFAULT_OPTIONS: ImpactOptions = {
  appearance: "default",
  size: "md",
  direction: "downstream",
  showMap: true,
  showOutsideAnalysis: false,
  virtualize: true,
  depth: "all",
  dataset: "example",
  state: "ready",
  dir: "ltr",
};
export const LARGE_NODES = Array.from({ length: 10000 }, (_, i) => ({
  id: `item-${i}`,
  label: `Consumer ${String(i).padStart(5, "0")}`,
  category: i === 0 ? "Contract" : "Integration",
}));
export const LARGE_EDGES = LARGE_NODES.slice(1).map((node) => ({
  id: node.id,
  source: "item-0",
  target: node.id,
  reason: "Consumes the shared contract",
}));
export const LARGE_CHANGES = [
  { id: "large", label: "Update shared contract", nodeIds: ["item-0"] },
];
