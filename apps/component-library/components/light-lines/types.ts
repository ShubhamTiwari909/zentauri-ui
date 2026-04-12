export type LightLinesProps = {
  className?: string;
  linesOpacity?: number;
  lightsOpacity?: number;
  speedMultiplier?: number;
  gradientFrom?: string;
  gradientTo?: string;
  lightColor?: string;
  lineColor?: string;
  children?: React.ReactNode;
};

export type AnimatedLightRef = {
  element: SVGPathElement | null;
  from: number;
  to: number;
  duration: number;
};
