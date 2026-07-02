import type { Block } from "payload";

import { Accordion } from "./accordion";
import { Alert } from "./alert";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card } from "./card";
import { Code } from "./code";
import { Divider } from "./divider";
import { Row } from "./row";
import { Section } from "./section";
import { Spacer } from "./spacer";
import { Text } from "./text";

export {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  Code,
  Divider,
  Row,
  Section,
  Spacer,
  Text,
};

/** Config-level block registry — required for slug-based block references. */
export const allBlocks: Block[] = [
  Section,
  Text,
  Spacer,
  Code,
  Row,
  Accordion,
  Button,
  Alert,
  Badge,
  Card,
  Divider,
];
