import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui";

import type { CardDemoProps } from "./card-code-examples.types";

export function CardDemo({ appearance, size, rounded }: CardDemoProps) {
  return (
    <Card appearance={appearance} size={size} rounded={rounded} animation="none">
      <CardHeader>
        <CardTitle className="text-sm">
          Appearance:{" "}
          <span className="font-bold">{appearance.toUpperCase()}</span>, Size:{" "}
          <span className="font-bold">{size.toUpperCase()}</span>, Rounded:{" "}
          <span className="font-bold">{rounded.toUpperCase()}</span>
        </CardTitle>
        <CardDescription>Brief supporting description.</CardDescription>
      </CardHeader>
    </Card>
  );
}
