"use client";

import { useBodyScrollLock } from "@zentauri-ui/zentauri-components/hooks/useBodyScrollLock";
import { useClickOutside } from "@zentauri-ui/zentauri-components/hooks/useClickOutside";
import { useClipboard } from "@zentauri-ui/zentauri-components/hooks/useClipboard";
import { useControllableState } from "@zentauri-ui/zentauri-components/hooks/useControllableState";
import { useCookie } from "@zentauri-ui/zentauri-components/hooks/useCookie";
import { useCountdown } from "@zentauri-ui/zentauri-components/hooks/useCountdown";
import { useDebouncedValue } from "@zentauri-ui/zentauri-components/hooks/useDebouncedValue";
import { useEventListener } from "@zentauri-ui/zentauri-components/hooks/useEventListener";
import { useGeolocation } from "@zentauri-ui/zentauri-components/hooks/useGeolocation";
import { useHotkeys } from "@zentauri-ui/zentauri-components/hooks/useHotkeys";
import { useIdleTimeout } from "@zentauri-ui/zentauri-components/hooks/useIdleTimeout";
import { useInterval } from "@zentauri-ui/zentauri-components/hooks/useInterval";
import { useKeyPress } from "@zentauri-ui/zentauri-components/hooks/useKeyPress";
import { useLongPress } from "@zentauri-ui/zentauri-components/hooks/useLongPress";
import { usePrevious } from "@zentauri-ui/zentauri-components/hooks/usePrevious";
import { useScrollPosition } from "@zentauri-ui/zentauri-components/hooks/useScrollPosition";
import { useTimeout } from "@zentauri-ui/zentauri-components/hooks/useTimeout";
import { useVirtualList } from "@zentauri-ui/zentauri-components/hooks/useVirtualList";
import { useDisclosure } from "@zentauri-ui/zentauri-components/hooks/useDisclosure";
import { useDocumentTitle } from "@zentauri-ui/zentauri-components/hooks/useDocumentTitle";
import { useFocusManagement } from "@zentauri-ui/zentauri-components/hooks/useFocusManagement";
import { useHash } from "@zentauri-ui/zentauri-components/hooks/useHash";
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
import { useDynamicStepper } from "@zentauri-ui/zentauri-components/hooks/useDynamicStepper";
import { usePrefersColorScheme } from "@zentauri-ui/zentauri-components/hooks/usePrefersColorScheme";
import { usePrefersReducedMotion } from "@zentauri-ui/zentauri-components/hooks/usePrefersReducedMotion";
import { useResizeObserver } from "@zentauri-ui/zentauri-components/hooks/useResizeObserver";
import { useSessionStorage } from "@zentauri-ui/zentauri-components/hooks/useSessionStorage";
import { useTableFilter } from "@zentauri-ui/zentauri-components/hooks/useTableFilter";
import { useTableSort } from "@zentauri-ui/zentauri-components/hooks/useTableSort";
import { useThrottledCallback } from "@zentauri-ui/zentauri-components/hooks/useThrottledCallback";
import { useToggle } from "@zentauri-ui/zentauri-components/hooks/useToggle";
import { useWindowSize } from "@zentauri-ui/zentauri-components/hooks/useWindowSize";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import type { HookPreviewSlug } from "@/lib/hook-preview-registry";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { HookDemoPanel } from "./demo-panel";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zentauri-ui/zentauri-components/ui/table";

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
    case "use-cookie":
      return <CookieDemo />;
    case "use-countdown":
      return <CountdownDemo />;
    case "use-debounced-value":
      return <DebouncedValueDemo />;
    case "use-event-listener":
      return <EventListenerDemo />;
    case "use-geolocation":
      return <GeolocationDemo />;
    case "use-hotkeys":
      return <HotkeysDemo />;
    case "use-idle-timeout":
      return <IdleTimeoutDemo />;
    case "use-interval":
      return <IntervalDemo />;
    case "use-key-press":
      return <KeyPressDemo />;
    case "use-long-press":
      return <LongPressDemo />;
    case "use-previous":
      return <PreviousDemo />;
    case "use-scroll-position":
      return <ScrollPositionDemo />;
    case "use-timeout":
      return <TimeoutDemo />;
    case "use-virtual-list":
      return <VirtualListDemo />;
    case "use-disclosure":
      return <DisclosureDemo />;
    case "use-document-title":
      return <DocumentTitleDemo />;
    case "use-focus-management":
      return <FocusManagementDemo />;
    case "use-hash":
      return <HashDemo />;
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
    case "use-table-filter":
      return <TableFilterDemo />;
    case "use-table-sort":
      return <TableSortDemo />;
    case "use-dynamic-stepper":
      return <DynamicStepperHookDemo />;
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
        Toggle scroll lock on the document body. When locked, the page behind
        this panel should not scroll.
      </p>
      <Button type="button" onClick={() => setLocked((v) => !v)}>
        {locked ? "Unlock body scroll" : "Lock body scroll"}
      </Button>
      <div className="mt-6 h-64 overflow-auto rounded-lg border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-400">
        <p className="mb-2 font-medium text-slate-300">
          Tall inner scroll region
        </p>
        {Array.from({ length: 24 }, (_, i) => (
          <p key={i}>
            Line {i + 1} — scroll inside this box is independent of body lock.
          </p>
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
        <Button
          type="button"
          onClick={() => void copy("zentauri-ui-clipboard-demo")}
        >
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
  const [mode, setMode] = useState<"uncontrolled" | "controlled">(
    "uncontrolled",
  );
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
      <p className="mb-2 text-2xl font-semibold tabular-nums text-white">
        {value}
      </p>
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
      <label
        className="mb-2 block text-sm text-slate-400"
        htmlFor="debounce-input"
      >
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
        Panel is{" "}
        <span className="text-white">{isOpen ? "open" : "closed"}</span>.
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
        Updates the browser tab title live. Leaving this page restores the
        previous title when restoreOnUnmount is true.
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
        Opens a focus-managed region with Escape to close. Tab should stay
        inside while open.
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
              <Button
                type="button"
                appearance="outline"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </HookDemoPanel>
  );
}

function HashDemo() {
  const [input, setInput] = useState("");
  const { hash, isHashing, error } = useHash(input, "sha256");
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Type text and see the SHA-256 hash update in real time — all computation
        happens client-side via the Web Crypto API.
      </p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={2}
        className="mb-4 w-full rounded-lg border border-white/15 bg-slate-900/80 p-3 text-sm text-white outline-none focus:border-cyan-500/50"
        placeholder="Enter text to hash…"
        aria-label="Input text to hash using SHA-256"
      />
      {error ? (
        <p className="text-sm text-red-400">Error: {error.message}</p>
      ) : (
        <p className="text-sm text-slate-400">
          Hash:{" "}
          {isHashing ? (
            <span className="text-slate-500">computing…</span>
          ) : (
            <span className="break-all font-mono text-cyan-200">
              {hash || "—"}
            </span>
          )}
        </p>
      )}
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
        Scroll the sentinel into view — the hook reports intersection as a
        boolean.
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
  const [ref, entry] = useIntersectionObserver<HTMLDivElement>({
    threshold: [0, 0.5, 1],
  });
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
        After first paint, layout measurement from useIsomorphicLayoutEffect
        typically matches the element; both values are shown for this static
        box.
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
        Schedules a timeout, then updates state only if this demo is still
        mounted. Leave this page before 50ms and the callback does nothing (and
        the timer is cleared on unmount).
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
        <span className="font-medium text-white">(max-width: 640px)</span>{" "}
        matches:{" "}
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
        <span className="font-mono text-white">{state}</span>. Switch tabs to
        see it change.
      </p>
    </HookDemoPanel>
  );
}

function DynamicStepperHookDemo() {
  const steps = [{ label: "Account" }, { label: "Plan" }, { label: "Billing" }];
  const { activeStep, goPrevious, goNext, canGoPrevious, canGoNext } =
    useDynamicStepper({
      stepCount: steps.length,
      defaultActiveStep: 0,
    });

  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Minimal labels wired to{" "}
        <span className="font-mono text-cyan-200">useDynamicStepper</span>. Same
        API backs{" "}
        <span className="font-mono text-cyan-200">DynamicStepper</span> UI.
      </p>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button type="button" disabled={!canGoPrevious} onClick={goPrevious}>
          Previous
        </Button>
        <Button type="button" disabled={!canGoNext} onClick={goNext}>
          Next
        </Button>
        <span className="ml-2 text-sm text-slate-400">
          Step {activeStep + 1} / {steps.length}:{" "}
          <span className="font-medium text-white">
            {steps[activeStep]?.label}
          </span>
        </span>
      </div>
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
        usePagination state plus buildPaginationItems for the same window
        (should match <span className="font-mono text-cyan-200">items</span>).
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

type TableFilterRow = {
  name: string;
  status: "active" | "paused";
  seats: number;
};

type TableFilterKey = keyof TableFilterRow;

const tableFilterRows: TableFilterRow[] = [
  { name: "Atlas", status: "active", seats: 12 },
  { name: "Beacon", status: "paused", seats: 4 },
  { name: "Comet", status: "active", seats: 8 },
];

function TableFilterDemo() {
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { filteredData, hasActiveFilters, clearFilters } = useTableFilter<
    TableFilterRow,
    TableFilterKey
  >({
    data: tableFilterRows,
    filters: {
      name: nameFilter,
      status: statusFilter,
    },
    onFiltersChange: (nextFilters) => {
      setNameFilter(nextFilters.name ?? "");
      setStatusFilter(nextFilters.status ?? "");
    },
  });

  return (
    <HookDemoPanel title="Interactive demo">
      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <Input
          aria-label="Filter by name"
          appearance="info"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
          placeholder="Filter name..."
        />
        <Input
          aria-label="Filter by status"
          appearance="info"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          placeholder="active or paused"
        />
        <Button
          type="button"
          appearance="outline"
          disabled={!hasActiveFilters}
          onClick={clearFilters}
        >
          Clear
        </Button>
      </div>
      <Table appearance="bordered" size="sm">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Seats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell className="text-right tabular-nums">
                {row.seats}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </HookDemoPanel>
  );
}

type TableSortRow = {
  name: string;
  team: string;
  tickets: number;
};

type TableSortKey = keyof TableSortRow;

const tableSortRows: TableSortRow[] = [
  { name: "Avery Stone", team: "Support", tickets: 24 },
  { name: "Mira Chen", team: "Platform", tickets: 16 },
  { name: "Noah Rivera", team: "Design", tickets: 31 },
  { name: "Priya Shah", team: "Support", tickets: 12 },
];

function compareTableSortValues(a: string | number, b: string | number) {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  return String(a).localeCompare(String(b));
}

function TableSortDemo() {
  const { sortKey, sortDirection, getSortProps, clearSort } =
    useTableSort<TableSortKey>({
      defaultSortKey: "name",
      defaultSortDirection: "ascending",
    });

  const sortedRows = useMemo(() => {
    if (!sortKey || sortDirection === "none") {
      return tableSortRows;
    }

    const activeSortKey = sortKey as TableSortKey;
    return [...tableSortRows].sort((a, b) => {
      const result = compareTableSortValues(a[activeSortKey], b[activeSortKey]);
      return sortDirection === "ascending" ? result : -result;
    });
  }, [sortDirection, sortKey]);

  return (
    <HookDemoPanel title="Interactive demo">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          Click a sortable header to cycle ascending, descending, and none.
        </p>
        <Button
          type="button"
          size="sm"
          appearance="outline"
          onClick={clearSort}
        >
          Clear sort
        </Button>
      </div>
      <Table appearance="bordered" size="sm">
        <TableHeader>
          <TableRow>
            <TableHead {...getSortProps("name")}>Name</TableHead>
            <TableHead {...getSortProps("team")}>Team</TableHead>
            <TableHead {...getSortProps("tickets")} className="text-right">
              Tickets
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.team}</TableCell>
              <TableCell className="text-right tabular-nums">
                {row.tickets}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <pre className="mt-4 overflow-auto rounded-lg border border-white/10 bg-slate-950/80 p-3 text-xs text-slate-300">
        {JSON.stringify({ sortKey, sortDirection }, null, 2)}
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
        <span className="font-medium text-white">{scheme}</span>. Change OS
        theme to update.
      </p>
    </HookDemoPanel>
  );
}

function PrefersReducedMotionDemo() {
  const reduce = usePrefersReducedMotion();
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="text-sm text-slate-400">
        <code className="text-cyan-200">prefers-reduced-motion: reduce</code>{" "}
        matches: <span className="text-white">{reduce ? "true" : "false"}</span>
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
        {size
          ? `${Math.round(size?.width ?? 0)} × ${Math.round(size?.height ?? 0)} px`
          : "—"}
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

function CookieDemo() {
  const [value, setCookie, removeCookie] = useCookie(
    "zentauri-ui.hooks.preview.cookie",
  );
  const [draft, setDraft] = useState("");
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Stored cookie value:{" "}
        <span className="font-mono text-cyan-200">{value ?? "—"}</span>
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Input
          aria-label="Cookie value"
          appearance="info"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Cookie value…"
        />
        <Button
          type="button"
          onClick={() => setCookie(draft, { maxAgeSeconds: 3600 })}
        >
          Save (1h)
        </Button>
        <Button
          type="button"
          appearance="outline"
          onClick={() => removeCookie()}
        >
          Remove
        </Button>
      </div>
    </HookDemoPanel>
  );
}

function CountdownDemo() {
  const { count, isRunning, isComplete, start, pause, resume, reset } =
    useCountdown({ countStart: 10 });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-4xl font-semibold tabular-nums text-white">
        {count}
        <span className="ml-3 text-sm font-normal text-slate-500">
          {isComplete ? "complete" : isRunning ? "running" : "paused"}
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={start}>
          Start
        </Button>
        <Button type="button" appearance="outline" onClick={pause}>
          Pause
        </Button>
        <Button type="button" appearance="outline" onClick={resume}>
          Resume
        </Button>
        <Button type="button" appearance="outline" onClick={reset}>
          Reset
        </Button>
      </div>
    </HookDemoPanel>
  );
}

function EventListenerDemo() {
  const [lastKey, setLastKey] = useState<string | null>(null);
  useEventListener("keydown", (event) => {
    setLastKey(event.key);
  });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="text-sm text-slate-400">
        A keydown listener on <code className="text-cyan-200">window</code> —
        press any key. Last key:{" "}
        <span className="font-mono text-white">{lastKey ?? "—"}</span>
      </p>
    </HookDemoPanel>
  );
}

function GeolocationDemo() {
  const [enabled, setEnabled] = useState(false);
  const { isSupported, loading, permission, position, error } = useGeolocation({
    enabled,
  });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        The position request (and permission prompt) is deferred until you click
        — <span className="font-mono text-cyan-200">enabled</span> starts false.
      </p>
      <Button type="button" onClick={() => setEnabled((v) => !v)}>
        {enabled ? "Stop watching" : "Request my location"}
      </Button>
      <dl className="mt-4 grid gap-1 text-sm sm:grid-cols-2">
        <dt className="text-slate-500">Supported</dt>
        <dd className="text-white">{isSupported ? "yes" : "no"}</dd>
        <dt className="text-slate-500">Permission</dt>
        <dd className="font-mono text-white">{permission}</dd>
        <dt className="text-slate-500">Status</dt>
        <dd className="text-white">
          {error ? (
            <span className="text-rose-400">{error.message}</span>
          ) : loading ? (
            "locating…"
          ) : position ? (
            "fixed"
          ) : (
            "idle"
          )}
        </dd>
        <dt className="text-slate-500">Coordinates</dt>
        <dd className="font-mono text-cyan-200">
          {position
            ? `${position.latitude.toFixed(4)}, ${position.longitude.toFixed(4)}`
            : "—"}
        </dd>
      </dl>
    </HookDemoPanel>
  );
}

function HotkeysDemo() {
  const [count, setCount] = useState(0);
  useHotkeys({
    "mod+k": () => setCount((c) => c + 1),
    escape: () => setCount(0),
  });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="text-sm text-slate-400">
        Press <Kbd>⌘/Ctrl</Kbd> + <Kbd>K</Kbd> to increment, <Kbd>Esc</Kbd> to
        reset (ignored while typing in inputs).
      </p>
      <p className="mt-4 text-3xl font-semibold tabular-nums text-white">
        {count}
      </p>
    </HookDemoPanel>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded border border-white/20 bg-slate-900 px-1.5 py-0.5 font-mono text-xs text-slate-200">
      {children}
    </kbd>
  );
}

function IdleTimeoutDemo() {
  const { isIdle, reset } = useIdleTimeout({ timeoutMs: 4000 });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Stop moving the mouse and touching the keyboard for 4 seconds.
      </p>
      <p className="mb-4 text-sm">
        Status:{" "}
        <span className={isIdle ? "text-amber-400" : "text-emerald-400"}>
          {isIdle ? "idle" : "active"}
        </span>
      </p>
      <Button type="button" onClick={reset}>
        Mark active
      </Button>
    </HookDemoPanel>
  );
}

function IntervalDemo() {
  const [running, setRunning] = useState(true);
  const [ticks, setTicks] = useState(0);
  useInterval(() => setTicks((t) => t + 1), running ? 500 : null);
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Ticks every 500ms; a{" "}
        <span className="font-mono text-cyan-200">null</span> delay pauses the
        interval.
      </p>
      <p className="mb-4 text-3xl font-semibold tabular-nums text-white">
        {ticks}
      </p>
      <Button type="button" onClick={() => setRunning((v) => !v)}>
        {running ? "Pause" : "Resume"}
      </Button>
    </HookDemoPanel>
  );
}

function KeyPressDemo() {
  const arrowPressed = useKeyPress(["ArrowUp", "ArrowDown"]);
  const kPressed = useKeyPress("k");
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Hold the keys and watch the state — it clears on keyup and window blur.
      </p>
      <dl className="grid gap-1 text-sm sm:grid-cols-2">
        <dt className="text-slate-500">Arrow Up / Down held</dt>
        <dd className={arrowPressed ? "text-emerald-400" : "text-slate-300"}>
          {arrowPressed ? "true" : "false"}
        </dd>
        <dt className="text-slate-500">K held</dt>
        <dd className={kPressed ? "text-emerald-400" : "text-slate-300"}>
          {kPressed ? "true" : "false"}
        </dd>
      </dl>
    </HookDemoPanel>
  );
}

function LongPressDemo() {
  const [status, setStatus] = useState("idle");
  const handlers = useLongPress(() => setStatus("long-pressed!"), {
    thresholdMs: 600,
    onStart: () => setStatus("holding…"),
    onCancel: () => setStatus("cancelled"),
  });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Press and hold for 600ms. Releasing early or dragging away cancels.
      </p>
      <button
        type="button"
        {...handlers}
        className="select-none rounded-xl border border-cyan-500/40 bg-cyan-950/30 px-8 py-6 text-cyan-100"
        style={{ touchAction: "none" }}
      >
        Hold me
      </button>
      <p className="mt-4 text-sm text-slate-400">
        Status: <span className="font-mono text-white">{status}</span>
      </p>
    </HookDemoPanel>
  );
}

function PreviousDemo() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);
  return (
    <HookDemoPanel title="Interactive demo">
      <dl className="mb-4 grid gap-1 text-sm sm:grid-cols-2">
        <dt className="text-slate-500">Current</dt>
        <dd className="font-mono text-cyan-200">{count}</dd>
        <dt className="text-slate-500">Previous render</dt>
        <dd className="font-mono text-slate-300">{previous ?? "—"}</dd>
      </dl>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setCount((c) => c + 1)}>
          Increment
        </Button>
        <Button
          type="button"
          appearance="outline"
          onClick={() => setCount((c) => c - 1)}
        >
          Decrement
        </Button>
      </div>
    </HookDemoPanel>
  );
}

function ScrollPositionDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const { x, y } = useScrollPosition({ target: boxRef });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        Scroll the box — offsets come from a passive scroll listener on the
        element. Omit <span className="font-mono text-cyan-200">target</span> to
        track the window instead.
      </p>
      <p className="mb-4 font-mono text-sm text-cyan-200">
        x: {Math.round(x)}px, y: {Math.round(y)}px
      </p>
      <div
        ref={boxRef}
        className="h-40 overflow-auto rounded-lg border border-white/10 bg-slate-900/40 p-4 text-sm text-slate-500"
      >
        <div className="w-240">
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i}>Row {i + 1} — keep scrolling in both directions…</p>
          ))}
        </div>
      </div>
    </HookDemoPanel>
  );
}

function TimeoutDemo() {
  const [fired, setFired] = useState(false);
  const { clear, reset } = useTimeout(() => setFired(true), 2000);
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        A 2s timeout armed on mount. Reset restarts the delay; clear cancels it.
      </p>
      <p className="mb-4 text-sm">
        Status:{" "}
        <span className={fired ? "text-emerald-400" : "text-slate-300"}>
          {fired ? "fired" : "pending"}
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={() => {
            setFired(false);
            reset();
          }}
        >
          Reset
        </Button>
        <Button type="button" appearance="outline" onClick={clear}>
          Clear
        </Button>
      </div>
    </HookDemoPanel>
  );
}

function VirtualListDemo() {
  const itemCount = 10000;
  const { setContainerRef, virtualItems, totalHeight, scrollToIndex } =
    useVirtualList({ itemCount, itemHeight: 36 });
  return (
    <HookDemoPanel title="Interactive demo">
      <p className="mb-4 text-sm text-slate-400">
        {itemCount.toLocaleString()} rows, but only{" "}
        <span className="font-mono text-cyan-200">{virtualItems.length}</span>{" "}
        are in the DOM.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={() => scrollToIndex(0)}>
          Top
        </Button>
        <Button
          type="button"
          size="sm"
          appearance="outline"
          onClick={() => scrollToIndex(5000)}
        >
          Row 5,000
        </Button>
        <Button
          type="button"
          size="sm"
          appearance="outline"
          onClick={() => scrollToIndex(itemCount - 1)}
        >
          Bottom
        </Button>
      </div>
      <div
        ref={setContainerRef}
        className="h-60 overflow-y-auto rounded-lg border border-white/10 bg-slate-900/40"
      >
        <div className="relative" style={{ height: totalHeight }}>
          {virtualItems.map((item) => (
            <div
              key={item.index}
              className="absolute inset-x-0 flex items-center border-b border-white/5 px-4 text-sm text-slate-300"
              style={{
                height: item.size,
                transform: `translateY(${item.start}px)`,
              }}
            >
              Row {item.index + 1}
            </div>
          ))}
        </div>
      </div>
    </HookDemoPanel>
  );
}
