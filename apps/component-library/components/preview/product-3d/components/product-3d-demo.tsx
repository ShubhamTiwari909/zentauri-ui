"use client";

import { ZuiProduct3D } from "@zentauri-ui/zentauri-components/ui/product-3d";
import type { Product3DProps } from "@zentauri-ui/zentauri-components/ui/product-3d";
import {
  PRODUCT_MODEL,
  PRODUCT_POSTER,
  product3DHotspots,
} from "./product-3d-code-examples.data";

export function Product3DDemo({
  showHotspots = true,
  ...props
}: Omit<Product3DProps, "model" | "poster" | "alt" | "hotspots"> & {
  showHotspots?: boolean;
}) {
  return (
    <ZuiProduct3D
      model={PRODUCT_MODEL}
      poster={PRODUCT_POSTER}
      alt="Orange upholstered chair with dark wooden legs"
      cameraOrbit="-25deg 70deg auto"
      hotspots={showHotspots ? product3DHotspots : []}
      {...props}
    />
  );
}
