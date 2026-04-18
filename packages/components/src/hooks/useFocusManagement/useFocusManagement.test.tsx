import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useFocusManagement } from "./useFocusManagement";

function Modal({ initialOpen }: { initialOpen: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const contentRef = createRef<HTMLDivElement>();
  useFocusManagement({
    open,
    setOpen,
    contentRef,
  });
  return (
    <div>
      <button type="button" data-testid="trigger">
        trigger
      </button>
      {open ? (
        <div ref={contentRef} tabIndex={-1} data-testid="dialog">
          <button type="button">first</button>
          <button type="button">second</button>
        </div>
      ) : null}
      <button type="button" data-testid="after">
        after
      </button>
    </div>
  );
}

describe("useFocusManagement", () => {
  it("should call setOpen false when Escape is pressed while open", () => {
    render(<Modal initialOpen />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });

  it("should not react to Escape when closed", () => {
    render(<Modal initialOpen={false} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });
});
