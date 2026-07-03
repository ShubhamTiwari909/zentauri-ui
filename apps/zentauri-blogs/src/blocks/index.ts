import type { Block } from "payload";

import { Accordion } from "./accordion";
import { Alert } from "./alert";
import { Badge } from "./badge";
import { Breadcrumb } from "./breadcrumb";
import { Button } from "./button";
import { Card } from "./card";
import { Code } from "./code";
import { Divider } from "./divider";
import { Drawer } from "./drawer";
import { JsonViewer } from "./json-viewer";
import { Kbd } from "./kbd";
import { Modal } from "./modal";
import { PackageInstallCommand } from "./package-install-command";
import { QrCode } from "./qr-code";
import { Row } from "./row";
import { SecretReveal } from "./secret-reveal";
import { Section } from "./section";
import { Spacer } from "./spacer";
import { Tabs } from "./tabs";
import { Text } from "./text";
import { Timeline } from "./timeline";
import { TreeView } from "./tree-view";
import { Table } from "./table";

export {
  Accordion,
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Code,
  Divider,
  Drawer,
  JsonViewer,
  Kbd,
  Modal,
  PackageInstallCommand,
  QrCode,
  Row,
  SecretReveal,
  Section,
  Spacer,
  Table,
  Tabs,
  Text,
  Timeline,
  TreeView,
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
  Table,
  Breadcrumb,
  Drawer,
  JsonViewer,
  Kbd,
  Modal,
  PackageInstallCommand,
  QrCode,
  SecretReveal,
  Tabs,
  Timeline,
  TreeView,
];
