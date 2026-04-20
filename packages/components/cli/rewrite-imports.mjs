/**
 * Rewrites internal package-relative imports to app aliases.
 *
 * @param {string} source
 * @param {{ utilsAlias: string; hooksAlias: string; uiAlias?: string }} options
 * @returns {{ code: string; usedHooks: string[] }}
 */
export function rewriteImports(source, options) {
  const { utilsAlias, hooksAlias, uiAlias } = options;
  const usedHooks = new Set();

  const collectHooks = (text) => {
    const re =
      /from\s+(["'])((?:\.\.\/)+)hooks\/([^'"]+)\1/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      usedHooks.add(m[3]);
    }
  };

  collectHooks(source);

  let code = source;

  code = code.replace(
    /from\s+(["'])((?:\.\.\/)+)lib\/utils\1/g,
    (_, quote) => `from ${quote}${utilsAlias}${quote}`,
  );

  code = code.replace(
    /from\s+(["'])((?:\.\.\/)+)hooks\/([^'"]+)\1/g,
    (_, quote, _rel, hookName) => `from ${quote}${hooksAlias}/${hookName}${quote}`,
  );

  if (uiAlias) {
    code = code.replace(
      /from\s+(["'])((?:\.\.\/)+)ui\/([^'"]+)\1/g,
      (_, quote, _rel, rest) => `from ${quote}${uiAlias}/${rest}${quote}`,
    );
  }

  return { code, usedHooks: [...usedHooks] };
}

/**
 * @param {string} source
 * @returns {string[]}
 */
export function extractSiblingHookImports(source) {
  const out = new Set();
  const re = /from\s+["']\.\.\/(use[^"']+)["']/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    out.add(m[1]);
  }
  return [...out];
}
