import type {
  Product3DEnvironment,
  Product3DProps,
} from "@zentauri-ui/zentauri-components/ui/product-3d";
import { FOREST_ENVIRONMENT } from "./product-3d-code-examples.data";

export type Product3DDemoOptions = {
  appearance: NonNullable<Product3DProps["appearance"]>;
  environment: Product3DEnvironment;
  autoRotate: boolean;
  cameraControls: boolean;
  zoom: boolean;
  showHotspots: boolean;
  useEnvironmentMap: boolean;
};

export function product3DSnippet(options: Product3DDemoOptions): string {
  const props = [
    'model="/product.glb"',
    'poster="/product-poster.jpg"',
    'alt="Orange upholstered chair"',
    `appearance="${options.appearance}"`,
    `environment="${options.environment}"`,
    `autoRotate={${options.autoRotate}}`,
    `cameraControls={${options.cameraControls}}`,
    `zoom={${options.zoom}}`,
  ];
  if (options.useEnvironmentMap)
    props.push(`environmentImage="${FOREST_ENVIRONMENT}"`);
  if (options.showHotspots)
    props.push(
      'hotspots={[{ id: "fabric", label: "Velvet upholstery", position: [-0.2, 0.39, 0.17], description: "Soft tufted fabric" }]}',
    );
  return `import { ZuiProduct3D } from "@zentauri-ui/zentauri-components/ui/product-3d";

<ZuiProduct3D
  ${props.join("\n  ")}
/>`;
}
