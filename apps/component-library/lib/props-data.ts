import propsManifest from "@zentauri-ui/zentauri-components/props.json";

export type PropGroup =
  | "variant"
  | "controlled"
  | "behavior"
  | "content"
  | "dom";

export type ComponentPropDoc = {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
  group: PropGroup;
  deprecated: boolean;
  isVariant?: boolean;
  options?: string[];
  tokenRef?: string;
  variantGroup?: string;
};

export type ComponentSubcomponentDoc = {
  name: string;
  displayName: string;
  propsType: string;
  source: "static" | "animated";
  props: ComponentPropDoc[];
};

export type ComponentPropsDoc = {
  slug: string;
  subcomponents: ComponentSubcomponentDoc[];
};

export type PropsManifest = {
  version: number;
  generatedFrom: string;
  components: Record<string, ComponentPropsDoc>;
};

const manifest = propsManifest as PropsManifest;

export function getComponentProps(slug: string) {
  return manifest.components[slug];
}

export function listComponentPropsDocs() {
  return Object.values(manifest.components);
}
