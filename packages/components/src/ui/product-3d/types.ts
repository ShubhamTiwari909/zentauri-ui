import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { product3DVariants } from "./variants";

export type Product3DPosition = readonly [number, number, number];
export type Product3DHotspot = {
  id: string;
  label: string;
  position: Product3DPosition;
  normal?: Product3DPosition;
  description?: ReactNode;
};
export type Product3DEnvironment =
  | "studio"
  | "soft"
  | "dramatic"
  | "neutral"
  | "legacy";
export type Product3DVariantProps = VariantProps<typeof product3DVariants>;
export type Product3DProps = Product3DVariantProps &
  Omit<
    ComponentPropsWithRef<"div">,
    "children" | "onError" | "onLoad" | "onProgress"
  > & {
    /** URL for a self-contained GLB or a glTF file with reachable resources. */
    model?: string;
    alt?: string;
    poster?: string;
    environment?: Product3DEnvironment;
    /** Custom HDR, UltraHDR, or equirectangular image URL; overrides the preset map. */
    environmentImage?: string;
    skyboxImage?: string;
    autoRotate?: boolean;
    cameraControls?: boolean;
    zoom?: boolean;
    cameraOrbit?: string;
    exposure?: number;
    shadowIntensity?: number;
    shadowSoftness?: number;
    hotspots?: readonly Product3DHotspot[];
    selectedHotspotId?: string | null;
    defaultSelectedHotspotId?: string | null;
    onHotspotSelect?: (id: string | null) => void;
    onLoad?: () => void;
    onError?: () => void;
    onProgress?: (progress: number) => void;
    onFullscreenChange?: (fullscreen: boolean) => void;
    showControls?: boolean;
    showFullscreen?: boolean;
    loadingContent?: ReactNode;
    fallback?: ReactNode;
    children?: ReactNode;
  };
