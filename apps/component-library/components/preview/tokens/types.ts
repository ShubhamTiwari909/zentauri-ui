export type TokenTheme = "light" | "dark" | "shared";

export type ZuiTokenReference = {
  name: `--zui-${string}`;
  fallback: string;
  source: string;
  description: string;
  theme: TokenTheme;
  pairName?: `--zui-${string}`;
};

export type ZuiTokenReferenceGroup = {
  source: string;
  description: string;
  tokens: readonly ZuiTokenReference[];
};

export type ComponentTokenReferenceGroup = {
  slug: string;
  title: string;
  description: string;
  tokens: readonly ZuiTokenReference[];
};

export type TokenSource = {
  source: string;
  description: string;
  className: string;
};
