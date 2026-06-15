const codeFiles = "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}";
const prettierOnlyFiles = "*.{json,md,mdx,yml,yaml,css,scss}";

export default {
  [codeFiles]: ["eslint --fix --no-warn-ignored", "prettier --write"],
  [prettierOnlyFiles]: "prettier --write",
};
