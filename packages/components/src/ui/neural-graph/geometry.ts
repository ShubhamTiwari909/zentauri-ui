import type { NeuralPosition } from "./types";

export type NeuralCamera = { yaw: number; pitch: number; zoom: number; panX: number; panY: number };
export type ProjectedPoint = { x: number; y: number; depth: number; scale: number };

export const initialNeuralCamera: NeuralCamera = { yaw: -0.32, pitch: 0.22, zoom: 1, panX: 0, panY: 0 };

export function projectNeuralPoint(position: NeuralPosition, camera: NeuralCamera, width: number, height: number): ProjectedPoint {
  const [x, y, z] = position;
  const cy = Math.cos(camera.yaw);
  const sy = Math.sin(camera.yaw);
  const cp = Math.cos(camera.pitch);
  const sp = Math.sin(camera.pitch);
  const rx = x * cy + z * sy;
  const rz = z * cy - x * sy;
  const ry = y * cp - rz * sp;
  const depth = y * sp + rz * cp;
  const scale = Math.min(width / 10, height / 7) * camera.zoom * (12 / Math.max(2, 12 - depth));
  return { x: width / 2 + camera.panX + rx * scale, y: height / 2 + camera.panY - ry * scale, depth, scale };
}

export function clampNeuralZoom(zoom: number): number {
  return Math.min(4, Math.max(0.35, zoom));
}
