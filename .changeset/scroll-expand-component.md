---
"@zentauri-ui/zentauri-components": minor
---

Add `ScrollExpand` (`@zentauri-ui/zentauri-components/ui/scroll-expand`): a sticky section whose rounded image or video frame grows to full bleed as the page, or the component itself, scrolls. Its headline lifts away and overlay content fades in, then holds before the section releases. The layout is pure CSS, so there is no shift after hydration. One time-smoothed animation loop writes only clip-path, transforms and opacity, and stops once settled. Hidden overlay content stays inert, video plays only on screen, and reduced motion shows the expanded composition without pinning or scroll-linked movement.
