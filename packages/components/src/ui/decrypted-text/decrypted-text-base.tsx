"use client";

import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  type Ref,
} from "react";
import { cn } from "../../lib/utils";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsomorphicLayoutEffect";
import {
  zuiDecryptedTextGhost,
  zuiDecryptedTextGhostFade,
  zuiDecryptedTextGlyph,
  zuiDecryptedTextGlyphFade,
  zuiDecryptedTextVisual,
  zuiDecryptedTextWord,
} from "../../design-system/decrypted-text";
import type { DecryptedTextElement, DecryptedTextProps } from "./types";
import { decryptedTextCellVariants, decryptedTextVariants } from "./variants";

const DEFAULT_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=?<>";
const VIEW_THRESHOLD = 0.1;
const INTERACTIVE =
  "a[href], button, summary, label, [role=button], [role=link], [role=menuitem], [role=tab]";
const elements: readonly DecryptedTextElement[] = [
  "span",
  "p",
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const safe = (value: number, fallback: number, min: number, max: number) =>
  clamp(Number.isFinite(value) ? value : fallback, min, max);
const isSpace = (char: string) => /\s/.test(char);

// Glyph advance widths per font, measured once with a shared canvas.
const widthCache = new Map<string, Map<string, number>>();
let canvas: CanvasRenderingContext2D | null | undefined;
function glyphWidth(font: string, char: string) {
  if (canvas === undefined) {
    try {
      canvas = document.createElement("canvas").getContext("2d");
    } catch {
      canvas = null;
    }
  }
  if (!canvas || !font) return 0;
  let widths = widthCache.get(font);
  if (!widths) {
    widths = new Map();
    widthCache.set(font, widths);
  }
  let width = widths.get(char);
  if (width === undefined) {
    canvas.font = font;
    width = canvas.measureText(char).width;
    widths.set(char, width);
  }
  return width;
}

type Segment =
  | { kind: "space"; text: string; key: number }
  | { kind: "word"; indices: number[]; key: number };

export const DecryptedTextBase = forwardRef<HTMLElement, DecryptedTextProps>(
  function DecryptedText(
    {
      children,
      as = "span",
      appearance,
      trigger = "view",
      order = "start",
      speed = 50,
      iterations = 10,
      delay = 0,
      characters = DEFAULT_CHARACTERS,
      useOriginalChars = false,
      effect = "scramble",
      onComplete,
      className,
      ...rest
    },
    forwardedRef,
  ) {
    const root = useRef<HTMLElement>(null);
    const cells = useRef<(HTMLSpanElement | null)[]>([]);
    const glyphs = useRef<(HTMLSpanElement | null)[]>([]);
    const completeRef = useRef(onComplete);
    useImperativeHandle(forwardedRef, () => root.current!, []);
    useIsomorphicLayoutEffect(() => {
      completeRef.current = onComplete;
    });

    const text = typeof children === "string" ? children : "";
    const chars = useMemo(() => Array.from(text), [text]);
    const pool = useMemo(() => {
      const letters = chars.filter((char) => !isSpace(char));
      const source = useOriginalChars
        ? Array.from(new Set(letters))
        : Array.from(characters).filter((char) => !isSpace(char));
      return source.length
        ? source
        : letters.length
          ? letters
          : Array.from(DEFAULT_CHARACTERS);
    }, [chars, characters, useOriginalChars]);
    const segments = useMemo(() => {
      const list: Segment[] = [];
      chars.forEach((char, index) => {
        const last = list[list.length - 1];
        if (isSpace(char)) {
          if (last?.kind === "space") last.text += char;
          else list.push({ kind: "space", text: char, key: index });
        } else if (last?.kind === "word") last.indices.push(index);
        else list.push({ kind: "word", indices: [index], key: index });
      });
      return list;
    }, [chars]);
    // Deterministic first glyphs keep server and client HTML identical.
    const seedGlyph = (index: number) =>
      pool[
        ((chars[index]!.codePointAt(0) ?? 0) * 31 + index * 17) % pool.length
      ]!;
    const startsScrambled = trigger !== "hover";
    const poolKey = pool.join("");

    useIsomorphicLayoutEffect(() => {
      const host = root.current;
      if (!host) return;
      const reducedQuery = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      );
      const isReduced = () => reducedQuery?.matches ?? false;
      const step = safe(speed, 50, 16, 1000);
      const rounds = Math.round(safe(iterations, 10, 1, 100));
      const wait = safe(delay, 0, 0, 10000);
      const letters = chars.flatMap((char, index) =>
        isSpace(char) ? [] : [index],
      );
      const scrambled = chars.map(() => false);

      let font = "";
      let spacing = 0;
      let frame = 0;
      let running = false;
      let startAt: number | null = null;
      let lastStep = 0;
      let round = 0;
      let queue: number[] = [];

      const readFont = () => {
        const style = window.getComputedStyle(host);
        font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        spacing = parseFloat(style.letterSpacing) || 0;
      };

      const setGlyph = (index: number, char: string) => {
        const glyph = glyphs.current[index];
        if (!glyph) return;
        const node = glyph.firstChild;
        if (node?.nodeType === 3) {
          if (node.nodeValue !== char) node.nodeValue = char;
        } else glyph.textContent = char;
        // Squeeze a glyph wider than the real letter so the line never grows.
        const real = glyphWidth(font, chars[index]!) + spacing;
        const width = glyphWidth(font, char) + spacing;
        const fit =
          real > 0 && width > real + 0.01 ? Math.max(0.05, real / width) : 1;
        glyph.style.scale = fit < 1 ? `${fit.toFixed(3)} 1` : "";
      };

      const flipIn = (cell: HTMLSpanElement) => {
        if (
          effect !== "flip" ||
          isReduced() ||
          typeof cell.animate !== "function"
        )
          return;
        cell.animate(
          [
            { transform: "perspective(4em) rotateX(80deg)", opacity: 0.2 },
            {
              transform: "perspective(4em) rotateX(-14deg)",
              opacity: 1,
              offset: 0.7,
            },
            { transform: "perspective(4em) rotateX(0deg)", opacity: 1 },
          ],
          { duration: 420, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
        );
      };

      const setScrambled = (index: number, on: boolean, animate = true) => {
        const cell = cells.current[index];
        scrambled[index] = on;
        if (!cell) return;
        if (on) cell.setAttribute("data-scrambled", "");
        else if (cell.hasAttribute("data-scrambled")) {
          cell.removeAttribute("data-scrambled");
          if (animate) flipIn(cell);
        }
      };

      const randomGlyph = () =>
        pool[Math.floor(Math.random() * pool.length)] ?? "";

      const buildQueue = () => {
        const list = [...letters];
        if (order === "end") list.reverse();
        else if (order === "center") {
          const middle = (chars.length - 1) / 2;
          list.sort((a, b) => Math.abs(a - middle) - Math.abs(b - middle));
        } else if (order === "random") {
          for (let i = list.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j]!, list[i]!];
          }
        }
        return list;
      };

      const finish = () => {
        running = false;
        startAt = null;
        host.setAttribute("data-state", "resolved");
        completeRef.current?.();
      };

      const resolveAll = (animate: boolean) =>
        letters.forEach((index) => setScrambled(index, false, animate));

      const advance = () => {
        if (order === "together") {
          round += 1;
          if (round >= rounds) {
            resolveAll(true);
            finish();
            return;
          }
        } else {
          const next = queue.shift();
          if (next !== undefined) setScrambled(next, false);
          if (queue.length === 0) {
            finish();
            return;
          }
        }
        letters.forEach((index) => {
          if (scrambled[index]) setGlyph(index, randomGlyph());
        });
      };

      const tick = (now: number) => {
        frame = 0;
        if (!running) return;
        if (startAt === null) {
          startAt = now + wait;
          lastStep = startAt;
        }
        if (now >= startAt) {
          // Catch up on missed steps (e.g. a throttled tab) without looping forever.
          let due = Math.min(
            Math.floor((now - lastStep) / step),
            letters.length + rounds,
          );
          lastStep += due * step;
          while (due > 0 && running) {
            advance();
            due -= 1;
          }
        }
        if (running) frame = requestAnimationFrame(tick);
      };

      const start = () => {
        if (running) return;
        if (isReduced() || letters.length === 0) {
          resolveAll(false);
          finish();
          return;
        }
        readFont();
        letters.forEach((index) => {
          setScrambled(index, true);
          setGlyph(index, randomGlyph());
        });
        queue = buildQueue();
        round = 0;
        startAt = null;
        running = true;
        host.setAttribute("data-state", "decoding");
        frame = requestAnimationFrame(tick);
      };

      const stop = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        running = false;
        startAt = null;
      };

      // Make the DOM match this trigger's resting state, whatever React last rendered.
      readFont();
      if (startsScrambled && !isReduced()) {
        letters.forEach((index) => {
          setScrambled(index, true);
          setGlyph(index, glyphs.current[index]?.textContent ?? "");
        });
        host.setAttribute("data-state", "scrambled");
      } else {
        resolveAll(false);
        host.setAttribute("data-state", "resolved");
        if (startsScrambled) completeRef.current?.();
      }

      const observer =
        trigger === "view" &&
        !isReduced() &&
        typeof IntersectionObserver !== "undefined"
          ? new IntersectionObserver(
              (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                  observer?.disconnect();
                  start();
                }
              },
              { threshold: VIEW_THRESHOLD },
            )
          : undefined;
      if (startsScrambled && !isReduced()) {
        if (observer) observer.observe(host);
        else start();
      }

      const onEnter = (event: Event) => {
        if ((event as PointerEvent).isPrimary === false) return;
        if (!isReduced()) start();
      };
      // Inside a link or button, hovering or focusing the control decodes the text.
      const hoverTarget =
        host.parentElement?.closest<HTMLElement>(INTERACTIVE) ?? host;
      if (trigger === "hover") {
        hoverTarget.addEventListener("pointerenter", onEnter);
        hoverTarget.addEventListener("focusin", onEnter);
      }

      const refit = () => {
        readFont();
        letters.forEach((index) => {
          if (scrambled[index])
            setGlyph(index, glyphs.current[index]?.textContent ?? "");
        });
      };
      const fonts = document.fonts as FontFaceSet | undefined;
      const onFontsLoaded = () => {
        widthCache.delete(font);
        refit();
      };
      fonts?.addEventListener?.("loadingdone", onFontsLoaded);
      const resize =
        typeof ResizeObserver === "undefined"
          ? undefined
          : new ResizeObserver(refit);
      resize?.observe(host);

      const onReducedChange = () => {
        if (!isReduced()) return;
        const wasRunning = running || host.dataset.state === "scrambled";
        stop();
        observer?.disconnect();
        resolveAll(false);
        if (wasRunning) finish();
      };
      reducedQuery?.addEventListener?.("change", onReducedChange);

      return () => {
        stop();
        observer?.disconnect();
        resize?.disconnect();
        fonts?.removeEventListener?.("loadingdone", onFontsLoaded);
        hoverTarget.removeEventListener("pointerenter", onEnter);
        hoverTarget.removeEventListener("focusin", onEnter);
        reducedQuery?.removeEventListener?.("change", onReducedChange);
      };
    }, [chars, poolKey, trigger, order, speed, iterations, delay, effect]);

    const Tag = (elements.includes(as) ? as : "span") as "span";
    return (
      <Tag
        {...rest}
        ref={root as Ref<HTMLSpanElement>}
        data-slot="decrypted-text"
        data-effect={effect}
        className={cn(decryptedTextVariants({ appearance }), className)}
      >
        <span className="sr-only">{text}</span>
        <span
          aria-hidden="true"
          data-slot="decrypted-text-visual"
          className={zuiDecryptedTextVisual}
        >
          {segments.map((segment) =>
            segment.kind === "space" ? (
              segment.text
            ) : (
              <span
                key={segment.key}
                data-slot="decrypted-text-word"
                className={zuiDecryptedTextWord}
              >
                {segment.indices.map((index) => (
                  <span
                    key={index}
                    ref={(node) => {
                      cells.current[index] = node;
                    }}
                    data-slot="decrypted-text-letter"
                    data-scrambled={startsScrambled ? "" : undefined}
                    className={decryptedTextCellVariants({ effect })}
                  >
                    <span
                      className={cn(
                        zuiDecryptedTextGhost,
                        effect === "fade" && zuiDecryptedTextGhostFade,
                      )}
                    >
                      {chars[index]}
                    </span>
                    <span
                      ref={(node) => {
                        glyphs.current[index] = node;
                      }}
                      data-slot="decrypted-text-glyph"
                      className={cn(
                        zuiDecryptedTextGlyph,
                        effect === "fade" && zuiDecryptedTextGlyphFade,
                      )}
                    >
                      {seedGlyph(index)}
                    </span>
                  </span>
                ))}
              </span>
            ),
          )}
        </span>
      </Tag>
    );
  },
);
