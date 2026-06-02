import {
  cssVariableReferences,
  type CssVariableReferenceSlug,
} from "@/components/css-variables/reference-data";
import {
  zuiCssVariablePattern,
  zuiFocusRing,
  zuiRadius,
  zuiRingOffset,
} from "@zentauri-ui/zentauri-components/design-system/tokens";

import {
  ComponentTokenReferenceGroup,
  TokenSource,
  ZuiTokenReference,
  ZuiTokenReferenceGroup,
} from "./types";

const inferredDarkFallback = "Override with your dark theme value";

const tokenSources = [
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
] as const satisfies readonly TokenSource[];

function readBalancedExpression(input: string, startIndex: number) {
  let depth = 0;

  for (let index = startIndex; index < input.length; index += 1) {
    const char = input[index];

    if (char === "(") {
      depth += 1;
      continue;
    }

    if (char === ")") {
      depth -= 1;

      if (depth === 0) {
        return input.slice(startIndex + 1, index);
      }
    }
  }

  return "";
}

function findTopLevelComma(input: string) {
  let depth = 0;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (char === "(") {
      depth += 1;
      continue;
    }

    if (char === ")") {
      depth -= 1;
      continue;
    }

    if (char === "," && depth === 0) {
      return index;
    }
  }

  return -1;
}

function extractCssVariables(className: string) {
  const variables: Array<Pick<ZuiTokenReference, "name" | "fallback">> = [];
  let searchIndex = 0;

  while (searchIndex < className.length) {
    const varIndex = className.indexOf("var(", searchIndex);

    if (varIndex === -1) {
      break;
    }

    const content = readBalancedExpression(className, varIndex + "var".length);
    const commaIndex = findTopLevelComma(content);

    if (commaIndex > -1) {
      const name = content.slice(0, commaIndex).trim();
      const fallback = content.slice(commaIndex + 1).trim();

      if (name.startsWith("--zui-")) {
        variables.push({
          name: name as `--zui-${string}`,
          fallback,
        });
      }
    }

    searchIndex = varIndex + "var(".length;
  }

  return variables;
}

const extractedGroups = tokenSources.map((tokenSource) => ({
  source: tokenSource.source,
  description: tokenSource.description,
  tokens: extractCssVariables(tokenSource.className).map((token) => ({
    ...token,
    source: tokenSource.source,
    description: tokenSource.description,
  })),
}));

const darkBaseNames = new Set(
  extractedGroups.flatMap((group) =>
    group.tokens
      .filter((token) => token.name.endsWith("-dark"))
      .map((token) => token.name.replace(/-dark$/, "") as `--zui-${string}`),
  ),
);

export const zuiTokenPattern = zuiCssVariablePattern;

export const zuiTokenReferenceGroups = extractedGroups.map((group) => ({
  ...group,
  tokens: group.tokens.map((token) => {
    const isDark = token.name.endsWith("-dark");
    const baseName = isDark
      ? (token.name.replace(/-dark$/, "") as `--zui-${string}`)
      : token.name;
    const darkName = `${baseName}-dark` as `--zui-${string}`;
    const hasDarkPair = darkBaseNames.has(baseName);

    return {
      ...token,
      theme: isDark ? "dark" : hasDarkPair ? "light" : "shared",
      pairName: isDark ? baseName : hasDarkPair ? darkName : undefined,
    } satisfies ZuiTokenReference;
  }),
})) as readonly ZuiTokenReferenceGroup[];

export const zuiTokenReferences = zuiTokenReferenceGroups.flatMap(
  (group) => group.tokens,
);

function toZuiVariableName(name: string) {
  return `--zui-${name}` as `--zui-${string}`;
}

function getComponentDarkTokens(
  slug: CssVariableReferenceSlug,
  title: string,
  description: string,
) {
  const reference = cssVariableReferences[slug];
  const darkExamples = new Map(reference.darkExamples);
  const darkTokenNames = new Set<string>();
  const darkTokens: ZuiTokenReference[] = [];

  for (const [name] of reference.darkExamples) {
    darkTokenNames.add(name);
    const lightPairName = name.replace(/-dark$/, "");

    darkTokens.push({
      name: toZuiVariableName(name),
      fallback: darkExamples.get(name) ?? inferredDarkFallback,
      source: slug,
      description,
      theme: "dark",
      pairName: toZuiVariableName(lightPairName),
    });
  }

  for (const [name] of reference.lightVariables) {
    if (darkTokenNames.size >= reference.darkVariableCount) {
      break;
    }

    const darkName = `${name}-dark`;

    if (darkTokenNames.has(darkName)) {
      continue;
    }

    darkTokenNames.add(darkName);
    darkTokens.push({
      name: toZuiVariableName(darkName),
      fallback: inferredDarkFallback,
      source: slug,
      description,
      theme: "dark",
      pairName: toZuiVariableName(name),
    });
  }

  return darkTokens.map((token) => ({
    ...token,
    source: title,
  }));
}

export const componentTokenReferenceGroups = Object.entries(
  cssVariableReferences,
).map(([slug, reference]) => {
  const description = reference.description;
  const lightTokens = reference.lightVariables.map(([name, fallback]) => {
    const darkName = `${name}-dark`;
    const hasDarkPair =
      reference.darkVariableCount > 0 &&
      reference.darkExamples.some(([darkExampleName]) => darkExampleName === darkName);

    return {
      name: toZuiVariableName(name),
      fallback,
      source: reference.title,
      description,
      theme: hasDarkPair ? "light" : "shared",
      pairName: hasDarkPair ? toZuiVariableName(darkName) : undefined,
    } satisfies ZuiTokenReference;
  });
  const darkTokens = getComponentDarkTokens(
    slug as CssVariableReferenceSlug,
    reference.title,
    description,
  );
  const darkTokenNames = new Set(darkTokens.map((token) => token.name));

  return {
    slug,
    title: reference.title,
    description,
    tokens: [
      ...lightTokens.map((token) => {
        const darkName = `${token.name}-dark` as `--zui-${string}`;

        return {
          ...token,
          theme: darkTokenNames.has(darkName) ? "light" : token.theme,
          pairName: darkTokenNames.has(darkName) ? darkName : token.pairName,
        } satisfies ZuiTokenReference;
      }),
      ...darkTokens,
    ],
  };
}) as readonly ComponentTokenReferenceGroup[];

export const componentTokenReferences = componentTokenReferenceGroups.flatMap(
  (group) => group.tokens,
);
