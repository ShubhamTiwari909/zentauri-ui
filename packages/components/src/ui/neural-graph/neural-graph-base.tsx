"use client";

import { Children, isValidElement, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import {
  zuiNeuralGraphActiveSwatch,
  zuiNeuralGraphClusterSwatch,
  zuiNeuralGraphEdgeSwatch,
  zuiNeuralGraphNodeSwatch,
} from "../../design-system/neural-graph";
import { cn } from "../../lib/utils";
import { clampNeuralZoom, initialNeuralCamera, projectNeuralPoint } from "./geometry";
import type { NeuralCamera, ProjectedPoint } from "./geometry";
import type { NeuralClusterData, NeuralEdgeData, NeuralGraphProps, NeuralNodeData, ZuiClusterProps, ZuiEdgeProps, ZuiNodeProps } from "./types";
import { neuralGraphVariants } from "./variants";

/** Declarative graph descriptors. They are consumed by ZuiNeuralGraph. */
export const ZuiNode: (props: ZuiNodeProps) => null = () => null;
export const ZuiEdge: (props: ZuiEdgeProps) => null = () => null;
export const ZuiCluster: (props: ZuiClusterProps) => null = () => null;

type GraphData = { nodes: NeuralNodeData[]; edges: NeuralEdgeData[]; clusters: NeuralClusterData[] };

export function collectNeuralGraph(children: ReactNode, nodes: readonly NeuralNodeData[] = [], edges: readonly NeuralEdgeData[] = [], clusters: readonly NeuralClusterData[] = []): GraphData {
  const result: GraphData = { nodes: [...nodes], edges: [...edges], clusters: [...clusters] };
  function visit(items: ReactNode, cluster?: string) {
    Children.forEach(items, (child) => {
      if (!isValidElement(child)) return;
      if (child.type === ZuiNode) result.nodes.push({ ...(child.props as ZuiNodeProps), cluster: (child.props as ZuiNodeProps).cluster ?? cluster });
      else if (child.type === ZuiEdge) result.edges.push(child.props as ZuiEdgeProps);
      else if (child.type === ZuiCluster) {
        const props = child.props as ZuiClusterProps;
        result.clusters.push({ id: props.id, label: props.label });
        visit(props.children, props.id);
      } else if ("props" in child && typeof child.props === "object" && child.props !== null && "children" in child.props) {
        visit(child.props.children as ReactNode, cluster);
      }
    });
  }
  visit(children);
  const byId = new Map(result.nodes.filter((node) => node.id && node.position.every(Number.isFinite)).map((node) => [node.id, node]));
  result.nodes = [...byId.values()];
  result.edges = result.edges.filter((edge) => byId.has(edge.from) && byId.has(edge.to) && edge.from !== edge.to);
  return result;
}

type ScreenNode = { node: NeuralNodeData; point: ProjectedPoint; radius: number };
const EMPTY_NODES: readonly NeuralNodeData[] = [];
const EMPTY_EDGES: readonly NeuralEdgeData[] = [];
const EMPTY_CLUSTERS: readonly NeuralClusterData[] = [];

function pickNode(nodes: ScreenNode[], x: number, y: number): string | null {
  for (let index = nodes.length - 1; index >= 0; index--) {
    const item = nodes[index]!;
    const dx = x - item.point.x;
    const dy = y - item.point.y;
    if (dx * dx + dy * dy <= Math.max(12, item.radius + 4) ** 2) return item.node.id;
  }
  return null;
}

export function NeuralGraphBase({
  children, nodes = EMPTY_NODES, edges = EMPTY_EDGES, clusters = EMPTY_CLUSTERS, appearance = "default", size = "md", selectedId,
  defaultSelectedId = null, onSelectionChange, onNodeHover, animate = true, showLabels = true,
  interactive = true, showControls = true, showStatus = true, pixelRatio = 2, className, style, ref,
  onKeyDown: onRootKeyDown, ...rest
}: NeuralGraphProps) {
  const graph = useMemo(() => collectNeuralGraph(children, nodes, edges, clusters), [children, nodes, edges, clusters]);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenNodesRef = useRef<ScreenNode[]>([]);
  const dragRef = useRef<{ x: number; y: number; moved: boolean; mode: "orbit" | "pan" } | null>(null);
  const [camera, setCamera] = useState<NeuralCamera>(initialNeuralCamera);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(defaultSelectedId);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [themeRevision, setThemeRevision] = useState(0);
  const activeId = selectedId === undefined ? internalSelectedId : selectedId;
  const activeNode = graph.nodes.find((node) => node.id === activeId);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setDimensions({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => setThemeRevision((value) => value + 1));
    let element: HTMLElement | null = rootRef.current;
    while (element) {
      observer.observe(element, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
      element = element.parentElement;
    }
    const motionPreference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const refreshMotion = () => setThemeRevision((value) => value + 1);
    motionPreference?.addEventListener("change", refreshMotion);
    return () => { observer.disconnect(); motionPreference?.removeEventListener("change", refreshMotion); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root || !dimensions.width || !dimensions.height) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const width = dimensions.width;
    const height = dimensions.height;
    const ratio = Math.min(2, Math.max(1, pixelRatio), window.devicePixelRatio || 1);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const color = (slot: string, fallback: string) => {
      const element = root.querySelector<HTMLElement>(`[data-slot="neural-graph-${slot}-swatch"]`);
      return element ? getComputedStyle(element).color : fallback;
    };
    const palette = {
      node: color("node", "#818cf8"), edge: color("edge", "#64748b"),
      active: color("active", "#fbbf24"), cluster: color("cluster", "#818cf8"),
      label: getComputedStyle(root).color,
    };
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const motion = animate && !reduced && graph.edges.some((edge) => edge.animated);
    const projected = graph.nodes.map((node) => {
      const point = projectNeuralPoint(node.position, camera, width, height);
      return { node, point, radius: Math.max(2, Math.min(38, (node.radius ?? 0.22) * point.scale)) };
    }).sort((a, b) => a.point.depth - b.point.depth);
    screenNodesRef.current = projected;
    const points = new Map(projected.map((item) => [item.node.id, item]));
    const clusterShapes = graph.clusters.flatMap((cluster) => {
      const members = projected.filter((item) => item.node.cluster === cluster.id);
      if (!members.length) return [];
      const cx = members.reduce((sum, item) => sum + item.point.x, 0) / members.length;
      const cy = members.reduce((sum, item) => sum + item.point.y, 0) / members.length;
      const radius = members.reduce((maximum, item) => Math.max(maximum, Math.hypot(item.point.x - cx, item.point.y - cy) + 26), 35);
      return [{ cluster, cx, cy, radius }];
    });
    let frame = 0;
    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      // A faint projected lattice makes rotation and depth legible without a 3D runtime.
      context.strokeStyle = palette.edge;
      context.lineWidth = 0.6;
      context.globalAlpha = 0.1;
      for (let i = -4; i <= 4; i++) {
        for (const [a, b] of [[[-4, i, -3], [4, i, -3]], [[i, -4, -3], [i, 4, -3]]] as const) {
          const start = projectNeuralPoint(a, camera, width, height);
          const end = projectNeuralPoint(b, camera, width, height);
          context.beginPath(); context.moveTo(start.x, start.y); context.lineTo(end.x, end.y); context.stroke();
        }
      }
      context.globalAlpha = 1;

      for (const { cluster, cx, cy, radius } of clusterShapes) {
        context.beginPath(); context.arc(cx, cy, radius, 0, Math.PI * 2);
        context.fillStyle = palette.cluster; context.globalAlpha = 0.075; context.fill();
        context.globalAlpha = 0.26; context.strokeStyle = palette.cluster; context.setLineDash([5, 8]); context.stroke(); context.setLineDash([]);
        if (showLabels) {
          context.globalAlpha = 0.75; context.fillStyle = palette.label; context.font = "11px system-ui, sans-serif";
          context.fillText(cluster.label ?? cluster.id, cx - radius + 10, cy - radius + 15);
        }
        context.globalAlpha = 1;
      }

      for (const [edgeIndex, edge] of graph.edges.entries()) {
        const from = points.get(edge.from);
        const to = points.get(edge.to);
        if (!from || !to) continue;
        const emphasized = activeId === edge.from || activeId === edge.to || hoveredId === edge.from || hoveredId === edge.to;
        context.beginPath(); context.moveTo(from.point.x, from.point.y); context.lineTo(to.point.x, to.point.y);
        context.strokeStyle = emphasized ? palette.active : palette.edge;
        context.lineWidth = emphasized ? 2 : 1;
        context.globalAlpha = emphasized ? 0.9 : activeId || hoveredId ? 0.22 : 0.48;
        context.stroke(); context.globalAlpha = 1;
        if (motion && edge.animated && (graph.edges.length <= 600 || edgeIndex % Math.ceil(graph.edges.length / 600) === 0)) {
          const progress = ((time / 1800 + edgeIndex * 0.17) % 1 + 1) % 1;
          const x = from.point.x + (to.point.x - from.point.x) * progress;
          const y = from.point.y + (to.point.y - from.point.y) * progress;
          context.beginPath(); context.arc(x, y, emphasized ? 3.5 : 2.5, 0, Math.PI * 2);
          context.fillStyle = emphasized ? palette.active : palette.node;
          context.shadowColor = context.fillStyle; context.shadowBlur = 9; context.fill(); context.shadowBlur = 0;
        }
      }

      for (const item of projected) {
        const { node, point, radius } = item;
        if (point.x < -radius || point.x > width + radius || point.y < -radius || point.y > height + radius) continue;
        const highlighted = node.id === activeId || node.id === hoveredId;
        const nodeColor = highlighted ? palette.active : palette.node;
        if (highlighted) {
          context.beginPath(); context.arc(point.x, point.y, radius + 8, 0, Math.PI * 2);
          context.fillStyle = nodeColor; context.globalAlpha = 0.14; context.fill(); context.globalAlpha = 1;
        }
        context.beginPath(); context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        if (graph.nodes.length <= 250) {
          const gradient = context.createRadialGradient(point.x - radius * 0.35, point.y - radius * 0.4, 1, point.x, point.y, radius);
          gradient.addColorStop(0, "#ffffff"); gradient.addColorStop(0.23, nodeColor); gradient.addColorStop(1, "#172033");
          context.fillStyle = gradient;
        } else context.fillStyle = nodeColor;
        context.shadowColor = nodeColor; context.shadowBlur = highlighted ? 18 : 5; context.fill(); context.shadowBlur = 0;
        if (showLabels && ((graph.nodes.length <= 100 && width >= 500) || highlighted)) {
          context.font = highlighted ? "600 12px system-ui, sans-serif" : "11px system-ui, sans-serif";
          context.fillStyle = palette.label; context.textAlign = "center";
          context.fillText(node.label ?? node.id, point.x, point.y + radius + 16);
        }
      }
      if (motion) frame = requestAnimationFrame(draw);
    };
    draw(performance.now());
    return () => cancelAnimationFrame(frame);
  }, [graph, camera, dimensions, activeId, hoveredId, animate, showLabels, pixelRatio, appearance, themeRevision]);

  function select(id: string | null) {
    if (selectedId === undefined) setInternalSelectedId(id);
    onSelectionChange?.(id);
  }
  function localPoint(event: ReactPointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
  function onPointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!interactive) return;
    const { x, y } = localPoint(event);
    dragRef.current = { x, y, moved: false, mode: event.shiftKey || event.button === 1 ? "pan" : "orbit" };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function onPointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!interactive) return;
    const { x, y } = localPoint(event);
    const drag = dragRef.current;
    if (drag) {
      const dx = x - drag.x;
      const dy = y - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true;
      if (drag.moved) setCamera((current) => drag.mode === "pan"
        ? { ...current, panX: current.panX + dx, panY: current.panY + dy }
        : { ...current, yaw: current.yaw + dx * 0.008, pitch: Math.max(-1.45, Math.min(1.45, current.pitch + dy * 0.008)) });
      drag.x = x; drag.y = y;
      return;
    }
    const next = pickNode(screenNodesRef.current, x, y);
    if (next !== hoveredId) { setHoveredId(next); onNodeHover?.(next); }
  }
  function onPointerUp(event: ReactPointerEvent<HTMLCanvasElement>) {
    const drag = dragRef.current;
    if (drag && !drag.moved) {
      const { x, y } = localPoint(event);
      select(pickNode(screenNodesRef.current, x, y));
    }
    dragRef.current = null;
  }
  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    onRootKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (!interactive || event.target !== event.currentTarget || !graph.nodes.length) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const index = graph.nodes.findIndex((node) => node.id === activeId);
      const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
      select(graph.nodes[(index + step + graph.nodes.length) % graph.nodes.length]!.id);
    } else if (event.key === "Escape") select(null);
    else if (event.key === "+" || event.key === "=") setCamera((current) => ({ ...current, zoom: clampNeuralZoom(current.zoom * 1.2) }));
    else if (event.key === "-") setCamera((current) => ({ ...current, zoom: clampNeuralZoom(current.zoom / 1.2) }));
  }

  return (
    <div {...rest} ref={(element) => { rootRef.current = element; if (typeof ref === "function") ref(element); else if (ref) ref.current = element; }}
      data-slot="neural-graph" role={interactive ? "region" : "img"} aria-label={rest["aria-label"] ?? "3D neural graph"}
      tabIndex={interactive ? 0 : undefined} onKeyDown={onKeyDown}
      className={cn(neuralGraphVariants({ appearance, size }), "touch-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500", className)}
      style={style}>
      <canvas ref={canvasRef} data-slot="neural-graph-canvas" aria-hidden="true" className="absolute inset-0 h-full w-full"
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
        onPointerCancel={() => { dragRef.current = null; }}
        onPointerLeave={() => { if (!dragRef.current && hoveredId !== null) { setHoveredId(null); onNodeHover?.(null); } }}
        onWheel={(event) => { if (interactive) { event.preventDefault(); setCamera((current) => ({ ...current, zoom: clampNeuralZoom(current.zoom * (event.deltaY > 0 ? 0.9 : 1.1)) })); } }} />
      <span data-slot="neural-graph-node-swatch" className={cn("pointer-events-none absolute opacity-0", zuiNeuralGraphNodeSwatch)} aria-hidden="true" />
      <span data-slot="neural-graph-edge-swatch" className={cn("pointer-events-none absolute opacity-0", zuiNeuralGraphEdgeSwatch)} aria-hidden="true" />
      <span data-slot="neural-graph-active-swatch" className={cn("pointer-events-none absolute opacity-0", zuiNeuralGraphActiveSwatch)} aria-hidden="true" />
      <span data-slot="neural-graph-cluster-swatch" className={cn("pointer-events-none absolute opacity-0", zuiNeuralGraphClusterSwatch)} aria-hidden="true" />
      {graph.nodes.length === 0 ? <div data-slot="neural-graph-empty" className="absolute inset-0 grid place-items-center text-sm opacity-70">Add nodes to explore the graph</div> : null}
      {showControls && interactive ? <div data-slot="neural-graph-controls" className="absolute right-3 top-3 flex gap-1 rounded-lg border border-current/10 bg-white/80 p-1 text-xs shadow-sm backdrop-blur dark:bg-slate-900/80">
        <button type="button" aria-label="Zoom in" onClick={() => setCamera((current) => ({ ...current, zoom: clampNeuralZoom(current.zoom * 1.2) }))} className="rounded px-2 py-1 hover:bg-black/10 focus-visible:outline-2">+</button>
        <button type="button" aria-label="Zoom out" onClick={() => setCamera((current) => ({ ...current, zoom: clampNeuralZoom(current.zoom / 1.2) }))} className="rounded px-2 py-1 hover:bg-black/10 focus-visible:outline-2">−</button>
        <button type="button" aria-label="Reset camera" onClick={() => setCamera(initialNeuralCamera)} className="rounded px-2 py-1 hover:bg-black/10 focus-visible:outline-2">Reset</button>
      </div> : null}
      {showStatus ? <div data-slot="neural-graph-status" className="pointer-events-none absolute bottom-3 left-3 max-w-[75%] rounded-md bg-white/75 px-2 py-1 text-xs shadow-sm backdrop-blur dark:bg-slate-900/75" aria-live="polite">
        {activeNode ? `Selected: ${activeNode.label ?? activeNode.id}` : `${graph.nodes.length} nodes · ${graph.edges.length} connections`}
      </div> : null}
      {interactive ? <span className="sr-only">Drag to orbit. Shift and drag to pan. Scroll to zoom. Use arrow keys to select nodes, plus and minus to zoom, and Escape to clear selection.</span> : null}
    </div>
  );
}

NeuralGraphBase.displayName = "ZuiNeuralGraph";
