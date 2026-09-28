"use client";

import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import {
  zuiOrbitSystemControl,
  zuiOrbitSystemCore,
  zuiOrbitSystemGlow,
  zuiOrbitSystemItem,
  zuiOrbitSystemRing,
} from "../../design-system/orbit-system";
import { cn } from "../../lib/utils";
import type { OrbitItemProps, OrbitProps, OrbitSystemProps } from "./types";
import { orbitSystemVariants } from "./variants";

type SceneContextValue = {
  width: number;
  height: number;
  scale: number;
  tilt: number;
  zoom: number;
  yaw: number;
  elapsed: number;
  interactive: boolean;
  selectedId: string | null;
  select: (id: string) => void;
};
type RingContextValue = {
  radius: number;
  duration: number;
  direction: 1 | -1;
  phase: number;
};
type PositionContextValue = { index: number; count: number };

const SceneContext = createContext<SceneContextValue | null>(null);
const RingContext = createContext<RingContextValue | null>(null);
const PositionContext = createContext<PositionContextValue | null>(null);

function clamp(value: number, min: number, max: number) {
  return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
}

function useScene() {
  const scene = useContext(SceneContext);
  if (!scene) throw new Error("ZuiOrbit must be inside ZuiOrbitSystem.");
  return scene;
}

export function ZuiOrbitSystem({
  appearance = "default",
  size = "md",
  center,
  autoRotate = true,
  paused = false,
  interactive = true,
  tilt = 55,
  zoom = 1,
  selectedId,
  defaultSelectedId = null,
  onSelectionChange,
  showControls = true,
  children,
  className,
  ref,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onPointerEnter,
  onPointerLeave,
  onKeyDown,
  ...props
}: OrbitSystemProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);
  const [bounds, setBounds] = useState({ width: 640, height: 384 });
  const [yaw, setYaw] = useState(0);
  const [cameraTilt, setCameraTilt] = useState(() => clamp(tilt, 15, 75));
  const [cameraZoom, setCameraZoom] = useState(() => clamp(zoom, 0.5, 2));
  const [elapsed, setElapsed] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [internalSelectedId, setInternalSelectedId] =
    useState(defaultSelectedId);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const maximumRadius = Children.toArray(children).reduce<number>(
    (maximum, child) => {
      if (!isValidElement<OrbitProps>(child) || child.type !== ZuiOrbit)
        return maximum;
      return Math.max(maximum, Math.max(0, child.props.radius));
    },
    0,
  );

  useEffect(() => {
    const element = rootRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setBounds({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!autoRotate || paused || userPaused || hovered || reducedMotion) return;
    let frame = 0;
    let last = 0;
    const advance = (now: number) => {
      if (last)
        setElapsed((value) => value + Math.min((now - last) / 1000, 0.05));
      last = now;
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [autoRotate, hovered, paused, reducedMotion, userPaused]);

  useEffect(() => {
    if (!interactive) return;
    const element = rootRef.current;
    if (!element) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      setCameraZoom((value) => clamp(value - event.deltaY * 0.001, 0.5, 2));
    };
    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [interactive]);

  const select = useCallback(
    (id: string) => {
      const next =
        (selectedId !== undefined ? selectedId : internalSelectedId) === id
          ? null
          : id;
      if (selectedId === undefined) setInternalSelectedId(next);
      onSelectionChange?.(next);
    },
    [internalSelectedId, onSelectionChange, selectedId],
  );

  const scene = useMemo<SceneContextValue>(
    () => ({
      ...bounds,
      scale:
        maximumRadius > 0
          ? Math.min(
              1,
              (Math.min(bounds.width, bounds.height) * 0.39) / maximumRadius,
            )
          : 1,
      tilt: cameraTilt,
      zoom: cameraZoom,
      yaw,
      elapsed,
      interactive,
      selectedId: selectedId !== undefined ? selectedId : internalSelectedId,
      select,
    }),
    [
      bounds,
      maximumRadius,
      cameraTilt,
      cameraZoom,
      yaw,
      elapsed,
      interactive,
      selectedId,
      internalSelectedId,
      select,
    ],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event);
    if (
      event.defaultPrevented ||
      !interactive ||
      (event.target as HTMLElement).closest("button")
    )
      return;
    dragRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (!dragRef.current || event.defaultPrevented) return;
    setYaw((value) => value + (event.clientX - dragRef.current!.x) * 0.45);
    setCameraTilt((value) =>
      clamp(value + (event.clientY - dragRef.current!.y) * 0.2, 15, 75),
    );
    dragRef.current = { x: event.clientX, y: event.clientY };
  };
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <SceneContext.Provider value={scene}>
      <div
        {...props}
        ref={rootRef}
        data-slot="orbit-system"
        data-appearance={appearance}
        data-paused={paused || userPaused || reducedMotion}
        role="region"
        aria-label={props["aria-label"] ?? "Interactive orbital system"}
        tabIndex={interactive ? (props.tabIndex ?? 0) : props.tabIndex}
        className={cn(orbitSystemVariants({ appearance, size }), className)}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          if (!event.defaultPrevented) setHovered(true);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          setHovered(false);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          endDrag(event);
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          endDrag(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            event.defaultPrevented ||
            !interactive ||
            event.target !== event.currentTarget
          )
            return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            setYaw((value) => value + (event.key === "ArrowRight" ? 12 : -12));
          } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            setCameraTilt((value) =>
              clamp(value + (event.key === "ArrowDown" ? 5 : -5), 15, 75),
            );
          } else if (event.key === "+" || event.key === "=") {
            event.preventDefault();
            setCameraZoom((value) => clamp(value + 0.1, 0.5, 2));
          } else if (event.key === "-") {
            event.preventDefault();
            setCameraZoom((value) => clamp(value - 0.1, 0.5, 2));
          }
        }}
      >
        <div
          data-slot="orbit-system-glow"
          aria-hidden="true"
          className={zuiOrbitSystemGlow}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(currentColor_0.5px,transparent_0.5px)] [background-size:27px_27px]"
        />
        {center != null && (
          <div data-slot="orbit-system-center" className={zuiOrbitSystemCore}>
            {center}
          </div>
        )}
        {Children.count(children) === 0 && (
          <p
            data-slot="orbit-system-empty"
            className="absolute inset-0 flex items-center justify-center text-sm opacity-70"
          >
            Add a ZuiOrbit to begin
          </p>
        )}
        {children}
        {showControls && interactive && (
          <div
            data-slot="orbit-system-controls"
            className="absolute bottom-3 right-3 z-40 flex gap-1.5"
          >
            {autoRotate && (
              <button
                type="button"
                className={zuiOrbitSystemControl}
                aria-label={
                  paused || reducedMotion
                    ? "Motion paused"
                    : userPaused
                      ? "Play orbits"
                      : "Pause orbits"
                }
                disabled={paused || reducedMotion}
                onClick={() => setUserPaused((value) => !value)}
              >
                {paused || reducedMotion
                  ? "Paused"
                  : userPaused
                    ? "Play"
                    : "Pause"}
              </button>
            )}
            <button
              type="button"
              className={zuiOrbitSystemControl}
              aria-label="Zoom out"
              onClick={() =>
                setCameraZoom((value) => clamp(value - 0.15, 0.5, 2))
              }
            >
              −
            </button>
            <button
              type="button"
              className={zuiOrbitSystemControl}
              aria-label="Zoom in"
              onClick={() =>
                setCameraZoom((value) => clamp(value + 0.15, 0.5, 2))
              }
            >
              +
            </button>
          </div>
        )}
      </div>
    </SceneContext.Provider>
  );
}

export function ZuiOrbit({
  radius,
  duration = 28,
  direction = "clockwise",
  phase = 0,
  label,
  children,
  className,
  ref,
  style,
  ...props
}: OrbitProps) {
  const scene = useScene();
  const orbitRadius =
    Math.max(0, Number.isFinite(radius) ? radius : 0) *
    scene.scale *
    scene.zoom;
  const ellipseHeight = orbitRadius * Math.sin((scene.tilt * Math.PI) / 180);
  const items = Children.toArray(children);
  const ring = useMemo<RingContextValue>(
    () => ({
      radius: orbitRadius,
      duration: Math.max(0.1, duration),
      direction: direction === "counterclockwise" ? -1 : 1,
      phase,
    }),
    [orbitRadius, duration, direction, phase],
  );
  return (
    <RingContext.Provider value={ring}>
      <div
        {...props}
        ref={ref}
        data-slot="orbit"
        role="group"
        aria-label={label ?? `Orbit with ${items.length} items`}
        className={cn("absolute inset-0", className)}
        style={style}
      >
        <div
          data-slot="orbit-ring"
          aria-hidden="true"
          className={zuiOrbitSystemRing}
          style={
            {
              left: scene.width / 2 - orbitRadius,
              top: scene.height / 2 - ellipseHeight,
              width: orbitRadius * 2,
              height: ellipseHeight * 2,
            } as CSSProperties
          }
        />
        {items.map((child, index) => (
          <PositionContext.Provider
            key={isValidElement(child) ? (child.key ?? index) : index}
            value={{ index, count: items.length }}
          >
            {child}
          </PositionContext.Provider>
        ))}
      </div>
    </RingContext.Provider>
  );
}

export function ZuiOrbitItem({
  id,
  label,
  angle,
  onSelect,
  children,
  className,
  style,
  disabled,
  onClick,
  ref,
  ...props
}: OrbitItemProps) {
  const scene = useScene();
  const ring = useContext(RingContext);
  const position = useContext(PositionContext);
  const generatedId = useId();
  if (!ring || !position)
    throw new Error("ZuiOrbitItem must be inside ZuiOrbit.");
  const itemId = id ?? generatedId;
  const degrees =
    (angle ?? (360 * position.index) / Math.max(position.count, 1)) +
    ring.phase +
    scene.yaw +
    scene.elapsed * (360 / ring.duration) * ring.direction;
  const radians = (degrees * Math.PI) / 180;
  const depth = Math.sin(radians);
  const x = scene.width / 2 + Math.cos(radians) * ring.radius;
  const y =
    scene.height / 2 +
    depth * ring.radius * Math.sin((scene.tilt * Math.PI) / 180);
  const itemScale = 0.88 + (depth + 1) * 0.12;
  const selected = scene.selectedId === itemId;
  return (
    <button
      {...props}
      ref={ref}
      id={itemId}
      type="button"
      data-slot="orbit-item"
      data-selected={selected}
      aria-label={label}
      aria-pressed={scene.interactive ? selected : undefined}
      disabled={disabled || !scene.interactive}
      className={cn(zuiOrbitSystemItem, className)}
      style={{
        ...style,
        left: x,
        top: y,
        zIndex: Math.round(20 + depth * 10),
        transform: `translate(-50%, -50%) scale(${itemScale})`,
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && scene.interactive) {
          scene.select(itemId);
          onSelect?.(itemId);
        }
      }}
    >
      {children}
    </button>
  );
}
