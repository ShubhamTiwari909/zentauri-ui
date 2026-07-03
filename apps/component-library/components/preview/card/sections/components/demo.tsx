import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";

import type { CardDemoProps } from "./types";

export function CardDemo({ appearance, bg, size, rounded }: CardDemoProps) {
  return (
    <Card appearance={appearance} bg={bg} size={size} rounded={rounded}>
      <CardHeader>
        <CardTitle className="text-sm">
          Appearance:{" "}
          <span className="font-bold">{appearance.toUpperCase()}</span>, Size:{" "}
          <span className="font-bold">{size.toUpperCase()}</span>, Rounded:{" "}
          <span className="font-bold">{rounded.toUpperCase()}</span>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CardDescription>Brief supporting description.</CardDescription>
      </CardBody>
    </Card>
  );
}
