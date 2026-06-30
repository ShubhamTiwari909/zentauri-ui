import type { JsonViewerProps } from "@zentauri-ui/zentauri-components/ui/json-viewer";
import type { JsonViewerAnimation } from "@zentauri-ui/zentauri-components/ui/json-viewer/animated";

export const JSON_VIEWER_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
] as const satisfies readonly NonNullable<JsonViewerProps["appearance"]>[];

export const JSON_VIEWER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<JsonViewerProps["size"]>[];

export const JSON_VIEWER_ANIMATIONS = [
  "none",
  "collapse",
  "fade",
] as const satisfies readonly JsonViewerAnimation[];

/** Sample payloads the playground can render. */
export const JSON_VIEWER_DATASETS = {
  "API response": {
    ok: true,
    status: 200,
    user: {
      id: "u_8f21",
      name: "Ada Lovelace",
      roles: ["admin", "editor"],
      verified: true,
      lastLogin: null,
    },
    items: [
      { id: 1, title: "First post", tags: ["intro"] },
      { id: 2, title: "Second post", tags: ["update", "release"] },
    ],
  },
  Config: {
    name: "zentauri-ui",
    version: "2.5.0",
    private: false,
    scripts: { dev: "turbo run dev", build: "turbo run build" },
    engines: { node: ">=20" },
  },
  Array: [1, "two", false, null, { nested: true }, [10, 20, 30]],
} as const;

export const JSON_VIEWER_DATASET_KEYS = Object.keys(
  JSON_VIEWER_DATASETS,
) as readonly (keyof typeof JSON_VIEWER_DATASETS)[];
