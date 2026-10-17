---
"@zentauri-ui/zentauri-components": minor
---

Add `DecryptedText` (`@zentauri-ui/zentauri-components/ui/decrypted-text`): text that cycles random glyphs and resolves into the real string without shifting the line. It decodes on mount, in view, or on hover and keyboard focus. Letters resolve from the start, end, centre or at random, or all together after a set number of steps, and land with a scramble, fade or flip effect. The real text stays in a visually hidden copy for assistive tech, and the server HTML is deterministic. Reduced motion and no-script environments show the final text. No animation dependency is required.
