import { DesignSystem } from "@zentauri-ui/zentauri-components/design-system/facade";
import {
  zuiCssVariablePattern,
  zuiFocusRing,
  zuiRadius,
  zuiRingOffset,
} from "@zentauri-ui/zentauri-components/design-system/tokens";

import {
  ComponentTokenReferenceGroup,
  ZuiTokenReferenceGroup,
} from "./types";

// All token metadata is derived from the design-system facade
// (@zentauri-ui/zentauri-components/design-system/facade). The facade reads the
// `--zui-*` contract straight from the token strings, so this page stays in sync
// with the library without any hand-maintained variable lists.

export const zuiTokenPattern = zuiCssVariablePattern;

const globalSources = [
  {
    source: "zuiFocusRing.default",
    description: "Focus indicator color used by keyboard-visible focus states.",
    className: zuiFocusRing.default,
  },
  {
    source: "zuiRingOffset.default",
    description:
      "Surface color used behind focus rings when a ring offset is applied.",
    className: zuiRingOffset.default,
  },
  {
    source: "zuiRadius.xl",
    description:
      "Shared large radius primitive used by rounded component surfaces.",
    className: zuiRadius.xl,
  },
] as const;

export const zuiTokenReferenceGroups = globalSources.map((group) => ({
  source: group.source,
  description: group.description,
  tokens: DesignSystem.parse(group.className).map(
    (token) =>
      ({
        ...token,
        source: group.source,
        description: group.description,
      })
  ),
})) as readonly ZuiTokenReferenceGroup[];

export const zuiTokenReferences = zuiTokenReferenceGroups.flatMap(
  (group) => group.tokens,
);

export const componentTokenReferenceGroups = DesignSystem.listComponents().map(
  (component) => {
    const description = `${component.title} component CSS variables.`;

    return {
      slug: component.slug,
      title: component.title,
      description,
      tokens: component.variables().map(
        (token) =>
          ({
            ...token,
            source: component.title,
            description,
          })
      ),
    };
  },
) as readonly ComponentTokenReferenceGroup[];

export const componentTokenReferences = componentTokenReferenceGroups.flatMap(
  (group) => group.tokens,
);
