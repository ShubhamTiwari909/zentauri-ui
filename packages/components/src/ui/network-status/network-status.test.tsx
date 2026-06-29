import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NetworkStatus } from "./network-status";

describe("NetworkStatus", () => {
  it("should set displayName", () => {
    expect(NetworkStatus.displayName).toBe("NetworkStatus");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<NetworkStatus online />);
    const root = container.querySelector('[data-slot="network-status"]');
    expect(root).toBeTruthy();
  });

  it("should render the status dot", () => {
    const { container } = render(<NetworkStatus online />);
    const dot = container.querySelector('[data-slot="network-status-dot"]');
    expect(dot).toBeTruthy();
  });

  it("should show the online label by default when online", () => {
    const { container } = render(<NetworkStatus online />);
    const label = container.querySelector('[data-slot="network-status-label"]');
    expect(label?.textContent).toBe("Online");
    const root = container.querySelector('[data-slot="network-status"]');
    expect(root?.getAttribute("data-status")).toBe("online");
  });

  it("should reflect the offline state", () => {
    const { container } = render(<NetworkStatus online={false} />);
    const label = container.querySelector('[data-slot="network-status-label"]');
    expect(label?.textContent).toBe("Offline");
    const root = container.querySelector('[data-slot="network-status"]');
    expect(root?.getAttribute("data-status")).toBe("offline");
  });

  it("should not render a pulse ring when offline", () => {
    const { container } = render(<NetworkStatus online={false} pulse />);
    const ping = container.querySelector('[data-slot="network-status-ping"]');
    expect(ping).toBeFalsy();
  });

  it("should render a pulse ring when online and pulse is on", () => {
    const { container } = render(<NetworkStatus online pulse />);
    const ping = container.querySelector('[data-slot="network-status-ping"]');
    expect(ping).toBeTruthy();
  });

  it("should hide the label when showLabel is false", () => {
    const { container } = render(<NetworkStatus online showLabel={false} />);
    const label = container.querySelector('[data-slot="network-status-label"]');
    expect(label).toBeFalsy();
  });

  it("should treat a semantic appearance as a status override for label and pulse", () => {
    const { container } = render(<NetworkStatus online appearance="slow" />);
    const label = container.querySelector('[data-slot="network-status-label"]');
    expect(label?.textContent).toBe("Slow connection");
    // slow still pulses
    expect(
      container.querySelector('[data-slot="network-status-ping"]'),
    ).toBeTruthy();
  });

  it("should not pulse when a semantic offline appearance is forced", () => {
    const { container } = render(<NetworkStatus online appearance="offline" />);
    const label = container.querySelector('[data-slot="network-status-label"]');
    expect(label?.textContent).toBe("Offline");
    expect(
      container.querySelector('[data-slot="network-status-ping"]'),
    ).toBeFalsy();
  });

  it("should keep the live label for non-semantic palette appearances", () => {
    const { container } = render(<NetworkStatus online appearance="blue" />);
    const label = container.querySelector('[data-slot="network-status-label"]');
    expect(label?.textContent).toBe("Online");
  });

  it("should allow custom label copy", () => {
    const { container } = render(
      <NetworkStatus online={false} labels={{ offline: "No connection" }} />,
    );
    const label = container.querySelector('[data-slot="network-status-label"]');
    expect(label?.textContent).toBe("No connection");
  });

  it("should call onStatusChange with the current snapshot", () => {
    const onStatusChange = vi.fn();
    render(<NetworkStatus online onStatusChange={onStatusChange} />);
    expect(onStatusChange).toHaveBeenCalledTimes(1);
    expect(onStatusChange.mock.calls[0]?.[0]).toMatchObject({
      online: true,
      status: "online",
    });
  });

  it("should support a custom render prop", () => {
    const { container } = render(
      <NetworkStatus
        online
        render={(info) => <em>{info.status.toUpperCase()}</em>}
      />,
    );
    expect(container.querySelector("em")?.textContent).toBe("ONLINE");
    expect(
      container.querySelector('[data-slot="network-status-dot"]'),
    ).toBeFalsy();
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<NetworkStatus online ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("network-status");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <NetworkStatus online className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="network-status"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});
