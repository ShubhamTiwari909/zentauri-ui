import type { Product3DEnvironment, Product3DHotspot, Product3DProps } from "@zentauri-ui/zentauri-components/ui/product-3d";

export const PRODUCT_MODEL = "/models/product-3d/sheen-chair.glb";
export const PRODUCT_POSTER = "/models/product-3d/sheen-chair-poster.jpg";
export const FOREST_ENVIRONMENT = "/models/product-3d/forest-environment.jpg";

export const product3DAppearances = [
  "default", "primary", "secondary", "success", "destructive", "warning", "info",
  "blue", "cyan", "emerald", "violet", "rose", "amber", "slate",
  "gradient-blue", "gradient-emerald", "gradient-rose", "glass",
] as const satisfies readonly NonNullable<Product3DProps["appearance"]>[];

export const product3DEnvironments = ["studio", "soft", "dramatic", "neutral", "legacy"] as const satisfies readonly Product3DEnvironment[];

export const product3DHotspots: Product3DHotspot[] = [
  { id: "fabric", label: "Velvet upholstery", position: [-0.2, 0.39, 0.17], normal: [0, 0, 1], description: "Soft tufted fabric with a subtle sheen." },
  { id: "frame", label: "Wood frame", position: [0.27, 0.17, 0.19], normal: [0, 0, 1], description: "Dark wood and polished metal details." },
];
