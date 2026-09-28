import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { zuiProduct3DAppearances } from "../../design-system/product-3d";
import { Product3DBase } from "./product-3d-base";

vi.mock("@google/model-viewer", () => ({}));

function mockMotionPreference(matches = false) {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    media: query,
    matches,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

afterEach(() => vi.restoreAllMocks());

describe("ZuiProduct3D", () => {
  it("renders a useful empty state and merges classes", () => {
    render(<Product3DBase className="custom-product" />);
    expect(
      screen.getByText("Add a GLB or glTF model to begin"),
    ).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveClass("custom-product");
  });

  it("wires the model, poster, camera, environment, and lighting attributes", () => {
    mockMotionPreference();
    const { container } = render(
      <Product3DBase
        model="/chair.glb"
        poster="/chair.jpg"
        alt="Orange chair"
        autoRotate
        cameraControls
        environment="dramatic"
        environmentImage="/studio.hdr"
      />,
    );
    const viewer = container.querySelector("model-viewer");
    expect(viewer).toHaveAttribute("src", "/chair.glb");
    expect(viewer).toHaveAttribute("camera-controls");
    expect(viewer).toHaveAttribute("auto-rotate");
    expect(viewer).toHaveAttribute("environment-image", "/studio.hdr");
    expect(viewer).toHaveAttribute("tone-mapping", "aces");
    expect(screen.getByRole("group")).toHaveAttribute("data-state", "loading");
    expect(
      container.querySelector('[data-slot="product-3d-poster"]'),
    ).toHaveAttribute("src", "/chair.jpg");
  });

  it("reports progress and load, then removes the poster overlay", () => {
    const onLoad = vi.fn();
    const onProgress = vi.fn();
    const { container } = render(
      <Product3DBase
        model="/chair.glb"
        poster="/chair.jpg"
        onLoad={onLoad}
        onProgress={onProgress}
      />,
    );
    const viewer = container.querySelector("model-viewer")!;
    fireEvent(
      viewer,
      new CustomEvent("progress", { detail: { totalProgress: 0.42 } }),
    );
    expect(onProgress).toHaveBeenCalledWith(0.42);
    expect(screen.getByText("Loading 3D model · 42%")).toBeInTheDocument();
    fireEvent(viewer, new Event("load"));
    expect(onLoad).toHaveBeenCalledOnce();
    expect(screen.getByRole("group")).toHaveAttribute("data-state", "ready");
    expect(
      container.querySelector('[data-slot="product-3d-poster"]'),
    ).toBeNull();
  });

  it("shows custom fallback content on failure, retaining valid zero content", () => {
    const onError = vi.fn();
    const { container } = render(
      <Product3DBase model="/bad.glb" fallback={0} onError={onError} />,
    );
    fireEvent(container.querySelector("model-viewer")!, new Event("error"));
    expect(onError).toHaveBeenCalledOnce();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveAttribute("data-state", "error");
  });

  it("supports hotspots, annotations, and controlled selection", () => {
    const onHotspotSelect = vi.fn();
    const hotspots = [
      {
        id: "fabric",
        label: "Fabric",
        position: [0, 1, 0] as const,
        description: "Velvet finish",
      },
    ];
    const { container, rerender } = render(
      <Product3DBase
        model="/chair.glb"
        hotspots={hotspots}
        onHotspotSelect={onHotspotSelect}
      />,
    );
    const hotspot = screen.getByRole("button", { name: "Fabric" });
    expect(hotspot).toHaveAttribute("slot", "hotspot-fabric");
    expect(hotspot).toHaveAttribute("data-position", "0m 1m 0m");
    fireEvent.click(hotspot);
    expect(onHotspotSelect).toHaveBeenCalledWith("fabric");
    expect(screen.getByText("Velvet finish")).toBeInTheDocument();
    rerender(
      <Product3DBase
        model="/chair.glb"
        hotspots={hotspots}
        selectedHotspotId="fabric"
        onHotspotSelect={onHotspotSelect}
      />,
    );
    fireEvent.click(
      container.querySelector('[data-slot="product-3d-hotspot"]')!,
    );
    expect(onHotspotSelect).toHaveBeenLastCalledWith(null);
    expect(screen.getByText("Velvet finish")).toBeInTheDocument();
  });

  it("zooms and resets the camera with toolbar controls", () => {
    const { container } = render(<Product3DBase model="/chair.glb" />);
    const viewer = container.querySelector("model-viewer") as HTMLElement & {
      getCameraOrbit: () => { theta: number; phi: number; radius: number };
      cameraOrbit: string;
      jumpCameraToGoal: () => void;
    };
    viewer.getCameraOrbit = () => ({ theta: 0, phi: 1, radius: 2 });
    viewer.jumpCameraToGoal = vi.fn();
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(viewer.cameraOrbit).toContain("1.6m");
    fireEvent.click(screen.getByRole("button", { name: "Reset camera" }));
    expect(viewer.cameraOrbit).toBe("auto auto auto");
  });

  it("requests fullscreen from its own root", () => {
    render(<Product3DBase model="/chair.glb" />);
    const root = screen.getByRole("group");
    root.requestFullscreen = vi.fn().mockResolvedValue(undefined);
    fireEvent.click(screen.getByRole("button", { name: "Enter fullscreen" }));
    expect(root.requestFullscreen).toHaveBeenCalledOnce();
  });

  it("pauses auto rotation while the viewer is being inspected", () => {
    mockMotionPreference();
    const { container } = render(
      <Product3DBase model="/chair.glb" autoRotate />,
    );
    const root = screen.getByRole("group");
    const viewer = container.querySelector("model-viewer");
    expect(viewer).toHaveAttribute("auto-rotate");
    fireEvent.pointerEnter(root);
    expect(viewer).not.toHaveAttribute("auto-rotate");
    fireEvent.focus(root);
    fireEvent.pointerLeave(root);
    expect(viewer).not.toHaveAttribute("auto-rotate");
    fireEvent.blur(root, { relatedTarget: document.body });
    expect(viewer).toHaveAttribute("auto-rotate");
  });

  it("respects the reduced-motion preference for auto rotation", () => {
    mockMotionPreference(true);
    const { container } = render(
      <Product3DBase model="/chair.glb" autoRotate />,
    );
    expect(container.querySelector("model-viewer")).not.toHaveAttribute(
      "auto-rotate",
    );
  });

  it("ships paired theme tokens for every appearance", () => {
    expect(Object.keys(zuiProduct3DAppearances)).toHaveLength(18);
    for (const appearance of Object.keys(
      zuiProduct3DAppearances,
    ) as (keyof typeof zuiProduct3DAppearances)[]) {
      const { unmount } = render(<Product3DBase appearance={appearance} />);
      expect(screen.getByRole("group").className).toContain(
        `--zui-product-3d-${appearance}-accent`,
      );
      unmount();
    }
  });
});
