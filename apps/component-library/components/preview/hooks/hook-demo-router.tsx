"use client";

import { useBodyScrollLock } from "@zentauri-ui/zentauri-components/hooks/useBodyScrollLock";
import { useClickOutside } from "@zentauri-ui/zentauri-components/hooks/useClickOutside";
import { useClipboard } from "@zentauri-ui/zentauri-components/hooks/useClipboard";
import { useControllableState } from "@zentauri-ui/zentauri-components/hooks/useControllableState";
import { useDebouncedValue } from "@zentauri-ui/zentauri-components/hooks/useDebouncedValue";
import { useDisclosure } from "@zentauri-ui/zentauri-components/hooks/useDisclosure";
import { useDocumentTitle } from "@zentauri-ui/zentauri-components/hooks/useDocumentTitle";
import { useFocusManagement } from "@zentauri-ui/zentauri-components/hooks/useFocusManagement";
import { useHover } from "@zentauri-ui/zentauri-components/hooks/useHover";
import { useInView } from "@zentauri-ui/zentauri-components/hooks/useInView";
import { useIntersectionObserver } from "@zentauri-ui/zentauri-components/hooks/useIntersectionObserver";
import { useIsomorphicLayoutEffect } from "@zentauri-ui/zentauri-components/hooks/useIsomorphicLayoutEffect";
import { useIsMounted } from "@zentauri-ui/zentauri-components/hooks/useIsMounted";
import { useLocalStorage } from "@zentauri-ui/zentauri-components/hooks/useLocalStorage";
import { useMediaQuery } from "@zentauri-ui/zentauri-components/hooks/useMediaQuery";
import { useNetworkStatus } from "@zentauri-ui/zentauri-components/hooks/useNetworkStatus";
import { usePageVisibility } from "@zentauri-ui/zentauri-components/hooks/usePageVisibility";
import {
  buildPaginationItems,
  usePagination,
} from "@zentauri-ui/zentauri-components/hooks/usePagination";
import { usePrefersColorScheme } from "@zentauri-ui/zentauri-components/hooks/usePrefersColorScheme";
import { usePrefersReducedMotion } from "@zentauri-ui/zentauri-components/hooks/usePrefersReducedMotion";
import { useResizeObserver } from "@zentauri-ui/zentauri-components/hooks/useResizeObserver";
import { useSessionStorage } from "@zentauri-ui/zentauri-components/hooks/useSessionStorage";
import { useThrottledCallback } from "@zentauri-ui/zentauri-components/hooks/useThrottledCallback";
import { useToggle } from "@zentauri-ui/zentauri-components/hooks/useToggle";
import { useWindowSize } from "@zentauri-ui/zentauri-components/hooks/useWindowSize";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import type { HookPreviewSlug } from "@/lib/hook-preview-registry";
import { useEffect, useRef, useState } from "react";
import { HookDemoPanel } from "./hook-demo-panel";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";

type HookDemoRouterProps = {
  slug: HookPreviewSlug;
};

export function HookDemoRouter({ slug }: HookDemoRouterProps) {
  switch (slug) {
    case "use-body-scroll-lock":
      return <BodyScrollLockDemo />;
    case "use-click-outside":
      return <ClickOutsideDemo />;
    case "use-clipboard":
      return <ClipboardDemo />;
    case "use-controllable-state":
      return <ControllableStateDemo />;
    case "use-debounced-value":
      return <DebouncedValueDemo />;
    case "use-disclosure":
      return <DisclosureDemo />;
    case "use-document-title":
      return <DocumentTitleDemo />;
    case "use-focus-management":
      return <FocusManagementDemo />;
    case "use-hover":
      return <HoverDemo />;
    case "use-in-view":
      return <InViewDemo />;
    case "use-intersection-observer":
      return <IntersectionObserverDemo />;
    case "use-isomorphic-layout-effect":
      return <IsomorphicLayoutEffectDemo />;
    case "use-is-mounted":
      return <IsMountedDemo />;
    case "use-local-storage":
      return <LocalStorageDemo />;
    case "use-media-query":
      return <MediaQueryDemo />;
    case "use-network-status":
      return <NetworkStatusDemo />;
    case "use-page-visibility":
      return <PageVisibilityDemo />;
    case "use-pagination":
      return <PaginationDemo />;
    case "use-prefers-color-scheme":
      return <PrefersColorSchemeDemo />;
    case "use-prefers-reduced-motion":
      return <PrefersReducedMotionDemo />;
    case "use-resize-observer":
      return <ResizeObserverDemo />;
    case "use-session-storage":
      return <SessionStorageDemo />;
    case "use-throttled-callback":
      return <ThrottledCallbackDemo />;
    case "use-toggle":
      return <ToggleDemo />;
    case "use-window-size":
      return <WindowSizeDemo />;
    default:
      return null;
  }
}

function BodyScrollLockDemo() {
  const [locked, setLocked] = useState(false);
  useBodyScrollLock(locked);
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Toggle scroll lock on the document body. When locked, the page behind this
        panel should not scroll.
      </p>
      <Button type="button" onClick={() => setLocked((v) => !v)}>
        {locked ? "Unlock body scroll" : "Lock body scroll"}
      </Button>
      <div className="mt-6 h-64 overflow-auto rounded-lg border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-400">
        <p className="mb-2 font-medium text-slate-300">Tall inner scroll region</p>
        {Array.from({ length: 24 }, (_, i) => (
          <p key={i}>Line {i + 1} — scroll inside this box is independent of body lock.</p>
        ))}
      </div>
    </HookDemoPanel>
  );
}

function ClickOutsideDemo() {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside({ ref, setOpen });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        The panel starts open. Click outside the bordered region to close it.
      </p>
      {open ? (
        <div
          ref={ref}
          className="rounded-xl border border-cyan-500/40 bg-cyan-950/30 p-6 text-center text-cyan-100"
        >
          Inside — click outside to dismiss
        </div>
      ) : (
        <Button type="button" onClick={() => setOpen(true)}>
          Reset panel
        </Button>
      )}
    </HookDemoPanel>
  );
}

function ClipboardDemo() {
  const { copy, copied, error, reset } = useClipboard();
  return (
    <HookDemoPanel title="Interactive demo">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => void copy("zentauri-ui-clipboard-demo")}>
          Copy sample text
        </Button>
        <Button type="button" appearance="outline" onClick={reset}>
          Reset
        </Button>
      </div>
      <p className="mt-4 text-sm text-slate-400">
        Status:{" "}
        {copied ? (
          <span className="text-emerald-400">Copied</span>
        ) : error ? (
          <span className="text-rose-400">{error.message}</span>
        ) : (
          <span>Idle</span>
        )}
      </p>
    </HookDemoPanel>
  );
}

function ControllableStateDemo() {
  const [mode, setMode] = useState<"uncontrolled" | "controlled">("uncontrolled");
  const [controlled, setControlled] = useState(0);
  const [value, setValue] = useControllableState({
    value: mode === "controlled" ? controlled : undefined,
    defaultValue: 0,
    onChange: mode === "controlled" ? setControlled : undefined,
  });

  return (
    <HookDemoPanel title="Interactive demo">
      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          appearance={mode === "uncontrolled" ? "default" : "outline"}
          onClick={() => setMode("uncontrolled")}
        >
          Uncontrolled
        </Button>
        <Button
          type="button"
          size="sm"
          appearance={mode === "controlled" ? "default" : "outline"}
          onClick={() => {
            setMode("controlled");
            setControlled(value);
          }}
        >
          Controlled
        </Button>
      </div>
      <p className="mb-2 text-2xl font-semibold tabular-nums text-white">{value}</p>
      <Button type="button" onClick={() => setValue((v) => v + 1)}>
        Increment
      </Button>
    </HookDemoPanel>
  );
}

function DebouncedValueDemo() {
  const [raw, setRaw] = useState("");
  const debounced = useDebouncedValue(raw, 400);
  return (
    <HookDemoPanel title="Interactive demo">
      <label className="mb-2 block text-sm text-slate-400" htmlFor="debounce-input">
        Type quickly — debounced value updates 400ms after you pause.
      </label>
      <Input
        id="debounce-input"
        appearance="info"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder="Search…"
      />
      <dl className="grid gap-2 text-sm sm:grid-cols-2 mt-5">
        <dt className="text-slate-500">Live</dt>
        <dd className="font-mono text-cyan-200">{raw || "—"}</dd>
        <dt className="text-slate-500">Debounced</dt>
        <dd className="font-mono text-emerald-200">{debounced || "—"}</dd>
      </dl>
    </HookDemoPanel>
  );
}

function DisclosureDemo() {
  const { isOpen, open, close, toggle } = useDisclosure({ defaultOpen: false });
  return (
    <HookDemoPanel title="Interactive demo">
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={open}>
          Open
        </Button>
        <Button type="button" appearance="outline" onClick={close}>
          Close
        </Button>
        <Button type="button" appearance="outline" onClick={toggle}>
          Toggle
        </Button>
      </div>
      <p className="mt-4 text-sm text-slate-400">
        Panel is <span className="text-white">{isOpen ? "open" : "closed"}</span>.
      </p>
      {isOpen ? (
        <div className="mt-4 rounded-lg border border-white/10 bg-slate-900/60 p-4 text-sm">
          Disclosure content — use close or toggle to hide.
        </div>
      ) : null}
    </HookDemoPanel>
  );
}

function DocumentTitleDemo() {
  const [title, setTitle] = useState("Hooks preview");
  useDocumentTitle({ title, restoreOnUnmount: true });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Updates the browser tab title live. Leaving this page restores the previous
        title when restoreOnUnmount is true.
      </p>
      <Input
        appearance="info"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </HookDemoPanel>
  );
}

function FocusManagementDemo() {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  useFocusManagement({ open, setOpen, contentRef });

  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Opens a focus-managed region with Escape to close. Tab should stay inside
        while open.
      </p>
      <Button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="presentation"
        >
          <div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-label="Focus trap demo"
            tabIndex={-1}
            className="max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl outline-none"
          >
            <p className="mb-4 text-sm text-slate-300">
              Try Tab through these controls, then Escape.
            </p>
            <div className="flex flex-col gap-3">
              <Button type="button">First action</Button>
              <Button type="button" appearance="outline">
                Second action
              </Button>
              <Button type="button" appearance="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </HookDemoPanel>
  );
}

function HoverDemo() {
  const [ref, hovered] = useHover<HTMLDivElement>();
  return (
    <HookDemoPanel title="Interactive demo">
      <div
        ref={ref}
        className={`inline-flex cursor-default rounded-xl border px-8 py-6 text-lg transition-colors ${
          hovered
            ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-100"
            : "border-white/15 bg-slate-900/50 text-slate-300"
        }`}
      >
        Hover this surface
      </div>
    </HookDemoPanel>
  );
}

function InViewDemo() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Scroll the sentinel into view — the hook reports intersection as a boolean.
      </p>
      <p className="mb-6 text-sm font-medium text-white">
        In view:{" "}
        <span className={inView ? "text-emerald-400" : "text-slate-500"}>
          {inView ? "yes" : "no"}
        </span>
      </p>
      <div className="h-48 overflow-y-auto rounded-lg border border-white/10 bg-slate-900/40 p-4">
        <div className="h-40 text-sm text-slate-500">Scroll down ↓</div>
        <div
          ref={ref}
          className="my-4 flex h-24 items-center justify-center rounded-lg bg-cyan-950/50 text-cyan-100"
        >
          Sentinel
        </div>
        <div className="h-40 text-sm text-slate-500">End</div>
      </div>
    </HookDemoPanel>
  );
}

function IntersectionObserverDemo() {
  const [ref, entry] = useIntersectionObserver<HTMLDivElement>({ threshold: [0, 0.5, 1] });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Raw observer entry — scroll the box to see intersectionRatio change.
      </p>
      <pre className="mb-4 max-h-28 overflow-auto rounded-lg border border-white/10 bg-slate-950/80 p-3 text-xs text-slate-300">
        {entry
          ? JSON.stringify(
              {
                isIntersecting: entry.isIntersecting,
                intersectionRatio: entry.intersectionRatio,
              },
              null,
              2,
            )
          : "null"}
      </pre>
      <div className="h-44 overflow-y-auto rounded-lg border border-white/10 bg-slate-900/40 p-4">
        <div className="h-32 text-slate-500">↓</div>
        <div
          ref={ref}
          className="flex h-20 items-center justify-center rounded-lg bg-indigo-950/50 text-indigo-100"
        >
          Observed
        </div>
        <div className="h-32 text-slate-500">↓</div>
      </div>
    </HookDemoPanel>
  );
}

function IsomorphicLayoutEffectDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState(0);
  const [effect, setEffect] = useState(0);

  useIsomorphicLayoutEffect(() => {
    setLayout(ref.current?.offsetHeight ?? 0);
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setEffect(ref.current?.offsetHeight ?? 0);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        After first paint, layout measurement from useIsomorphicLayoutEffect typically
        matches the element; both values are shown for this static box.
      </p>
      <div
        ref={ref}
        className="mb-4 inline-block min-h-[80px] rounded-lg border border-white/10 bg-slate-900/60 px-6 py-4"
      >
        Target box
      </div>
      <dl className="grid gap-1 text-sm sm:grid-cols-2">
        <dt className="text-slate-500">Layout effect height</dt>
        <dd className="font-mono text-cyan-200">{layout}px</dd>
        <dt className="text-slate-500">useEffect height (initial)</dt>
        <dd className="font-mono text-slate-300">{effect}px</dd>
      </dl>
    </HookDemoPanel>
  );
}

function IsMountedDemo() {
  const isMounted = useIsMounted();
  const [label, setLabel] = useState("");
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const run = () => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = undefined;
      if (!isMounted()) {
        return;
      }
      setLabel("mounted (still on this page after 50ms)");
    }, 50);
  };

  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Schedules a timeout, then updates state only if this demo is still mounted. Leave
        this page before 50ms and the callback does nothing (and the timer is cleared on
        unmount).
      </p>
      <Button type="button" onClick={run}>
        Check mounted in 50ms
      </Button>
      {label ? (
        <p className="mt-4 text-sm text-white">
          Result: <span className="text-cyan-300">{label}</span>
        </p>
      ) : null}
    </HookDemoPanel>
  );
}

function LocalStorageDemo() {
  const storageKey = "zentauri-ui.hooks.preview.local";
  const [value, setValue, remove] = useLocalStorage(storageKey, "");
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-2 text-xs text-slate-500">Key: {storageKey}</p>
      <Input
        appearance="info"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Persisted in localStorage"
      />
      <Button type="button" appearance="outline" onClick={remove}>
        Clear key
      </Button>
    </HookDemoPanel>
  );
}

function MediaQueryDemo() {
  const narrow = useMediaQuery("(max-width: 640px)");
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="text-sm text-slate-400">
        <span className="font-medium text-white">(max-width: 640px)</span> matches:{" "}
        <span className={narrow ? "text-emerald-400" : "text-slate-300"}>
          {narrow ? "true" : "false"}
        </span>
        . Resize the window to update.
      </p>
    </HookDemoPanel>
  );
}

function NetworkStatusDemo() {
  const online = useNetworkStatus();
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="text-sm text-slate-400">
        Navigator reports:{" "}
        <span className={online ? "text-emerald-400" : "text-rose-400"}>
          {online ? "online" : "offline"}
        </span>
        . Toggle your connection to test.
      </p>
    </HookDemoPanel>
  );
}

function PageVisibilityDemo() {
  const state = usePageVisibility();
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="text-sm text-slate-400">
        Current <code className="text-cyan-200">document.visibilityState</code>:{" "}
        <span className="font-mono text-white">{state}</span>. Switch tabs to see it
        change.
      </p>
    </HookDemoPanel>
  );
}

function PaginationDemo() {
  const pageCount = 12;
  const { currentPage, items, setPage, goPrev, goNext, canGoPrev, canGoNext } =
    usePagination({
      pageCount,
      defaultPage: 1,
      siblingCount: 1,
      boundaryCount: 1,
    });
  const built = buildPaginationItems({
    pageCount,
    currentPage,
    siblingCount: 1,
    boundaryCount: 1,
  });

  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        usePagination state plus buildPaginationItems for the same window (should
        match <span className="font-mono text-cyan-200">items</span>).
      </p>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button type="button" disabled={!canGoPrev} onClick={goPrev}>
          Prev
        </Button>
        <Button type="button" disabled={!canGoNext} onClick={goNext}>
          Next
        </Button>
        <span className="ml-2 text-sm text-slate-400">
          Page {currentPage} / {pageCount}
        </span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {items.map((item) =>
          item.type === "ellipsis" ? (
            <span key={item.key} className="px-2 text-slate-500">
              …
            </span>
          ) : (
            <Button
              key={item.value}
              type="button"
              size="sm"
              appearance={item.value === currentPage ? "default" : "outline"}
              onClick={() => setPage(item.value)}
            >
              {item.value}
            </Button>
          ),
        )}
      </div>
      <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">
        buildPaginationItems snapshot
      </p>
      <pre className="max-h-32 overflow-auto rounded-lg border border-white/10 bg-slate-950/80 p-3 text-xs text-slate-300">
        {JSON.stringify(built, null, 2)}
      </pre>
    </HookDemoPanel>
  );
}

function PrefersColorSchemeDemo() {
  const scheme = usePrefersColorScheme("light");
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="text-sm text-slate-400">
        System color scheme preference:{" "}
        <span className="font-medium text-white">{scheme}</span>. Change OS theme to
        update.
      </p>
    </HookDemoPanel>
  );
}

function PrefersReducedMotionDemo() {
  const reduce = usePrefersReducedMotion();
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="text-sm text-slate-400">
        <code className="text-cyan-200">prefers-reduced-motion: reduce</code> matches:{" "}
        <span className="text-white">{reduce ? "true" : "false"}</span>
      </p>
    </HookDemoPanel>
  );
}

function ResizeObserverDemo() {
  const [setRef, size] = useResizeObserver<HTMLTextAreaElement>();
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Drag the textarea corner — content box size updates from ResizeObserver.
      </p>
      <textarea
        ref={setRef}
        rows={3}
        className="min-h-16 w-full max-w-md resize rounded-lg border border-white/15 bg-slate-900/80 p-3 text-sm text-white outline-none focus:border-cyan-500/50"
        defaultValue="Resize me…"
      />
      <p className="mt-4 font-mono text-sm text-cyan-200">
        {size ? `${Math.round(size?.width ?? 0)} × ${Math.round(size?.height ?? 0)} px` : "—"}
      </p>
    </HookDemoPanel>
  );
}

function SessionStorageDemo() {
  const storageKey = "zentauri-ui.hooks.preview.session";
  const [value, setValue, remove] = useSessionStorage(storageKey, "");
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-2 text-xs text-slate-500">Key: {storageKey}</p>
      <Input
        appearance="info"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Persists for this tab session"
        className="mb-5"
      />
      <Button type="button" appearance="outline" onClick={remove}>
        Clear key
      </Button>
    </HookDemoPanel>
  );
}

function ThrottledCallbackDemo() {
  const [count, setCount] = useState(0);
  const onBurst = useThrottledCallback(() => {
    setCount((c) => c + 1);
  }, 500);
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Clicks are throttled to at most one handled call per 500ms.
      </p>
      <Button type="button" onClick={onBurst}>
        Click rapidly
      </Button>
      <p className="mt-4 text-sm text-slate-400">
        Handler invocations:{" "}
        <span className="text-2xl font-semibold text-white">{count}</span>
      </p>
    </HookDemoPanel>
  );
}

function ToggleDemo() {
  const [on, toggle, set] = useToggle(false);
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        State: <span className="text-white">{on ? "on" : "off"}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={toggle}>
          Toggle
        </Button>
        <Button type="button" appearance="outline" onClick={() => set(true)}>
          Set on
        </Button>
        <Button type="button" appearance="outline" onClick={() => set(false)}>
          Set off
        </Button>
      </div>
    </HookDemoPanel>
  );
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize();
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="text-sm text-slate-400">
        Window inner size:{" "}
        <span className="font-mono text-cyan-200">
          {width} × {height}
        </span>{" "}
        px — resize the browser to update.
      </p>
    </HookDemoPanel>
  );
}
