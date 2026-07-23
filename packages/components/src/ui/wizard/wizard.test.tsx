import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Wizard,
  WizardContent,
  WizardFooter,
  WizardHeader,
  WizardNavigation,
  WizardProgress,
  WizardSidebar,
  WizardStep,
} from "./wizard";
import { useWizard, useWizardProgress } from "./wizard-base";

describe("Wizard", () => {
  describe("public contract and metadata", () => {
    it("should expose displayName on compound parts", () => {
      expect(Wizard.displayName).toBe("Wizard");
      expect(WizardStep.displayName).toBe("WizardStep");
      expect(WizardHeader.displayName).toBe("WizardHeader");
      expect(WizardContent.displayName).toBe("WizardContent");
      expect(WizardNavigation.displayName).toBe("WizardNavigation");
      expect(WizardProgress.displayName).toBe("WizardProgress");
      expect(WizardFooter.displayName).toBe("WizardFooter");
      expect(WizardSidebar.displayName).toBe("WizardSidebar");
    });

    it("should stamp data-slot on the root container", () => {
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Content 1
          </WizardStep>
        </Wizard>,
      );
      const root = document.querySelector('[data-slot="wizard"]');
      expect(root).toBeTruthy();
    });
  });

  describe("navigation", () => {
    it("should render children of the current step", () => {
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Content 1
          </WizardStep>
          <WizardStep id="two" title="Two">
            Content 2
          </WizardStep>
          <WizardNavigation />
        </Wizard>,
      );
      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });

    it("should advance to the next step when next is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardStep id="two" title="Two">
            Step 2
          </WizardStep>
          <WizardNavigation />
        </Wizard>,
      );

      await user.click(screen.getByTestId("wizard-next-btn"));
      expect(screen.getByText("Step 2")).toBeInTheDocument();
    });

    it("should disable back on first step", () => {
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardStep id="two" title="Two">
            Step 2
          </WizardStep>
          <WizardNavigation />
        </Wizard>,
      );
      expect(screen.getByTestId("wizard-back-btn")).toBeDisabled();
    });

    it("should call onFinish when clicking next on the last step", async () => {
      const onFinish = vi.fn();
      const user = userEvent.setup();
      render(
        <Wizard onFinish={onFinish}>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardNavigation />
        </Wizard>,
      );

      await user.click(screen.getByTestId("wizard-next-btn"));
      expect(onFinish).toHaveBeenCalledOnce();
    });

    it("should call onStepChange when navigating", async () => {
      const onStepChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Wizard onStepChange={onStepChange}>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardStep id="two" title="Two">
            Step 2
          </WizardStep>
          <WizardNavigation />
        </Wizard>,
      );

      await user.click(screen.getByTestId("wizard-next-btn"));
      expect(onStepChange).toHaveBeenCalledWith(1);
    });

    it("should show the finish label on the last step", () => {
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardNavigation />
        </Wizard>,
      );
      expect(screen.getByText("Finish")).toBeInTheDocument();
    });

    it("should go back to previous step", async () => {
      const user = userEvent.setup();
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardStep id="two" title="Two">
            Step 2
          </WizardStep>
          <WizardNavigation />
        </Wizard>,
      );

      await user.click(screen.getByTestId("wizard-next-btn"));
      expect(screen.getByText("Step 2")).toBeInTheDocument();

      await user.click(screen.getByTestId("wizard-back-btn"));
      expect(screen.getByText("Step 1")).toBeInTheDocument();
    });
  });

  describe("WizardHeader", () => {
    it("should render step progress by default", () => {
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardStep id="two" title="Two">
            Step 2
          </WizardStep>
          <WizardStep id="three" title="Three">
            Step 3
          </WizardStep>
          <WizardHeader />
        </Wizard>,
      );
      expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
    });
  });

  describe("WizardProgress", () => {
    it("should render progress bar by default", () => {
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardStep id="two" title="Two">
            Step 2
          </WizardStep>
          <WizardProgress />
        </Wizard>,
      );
      const progress = document.querySelector('[data-slot="wizard-progress"]');
      expect(progress).toBeTruthy();
    });
  });

  describe("WizardFooter", () => {
    it("should render custom footer content", () => {
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardFooter data-testid="footer">Custom Footer</WizardFooter>
        </Wizard>,
      );
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(screen.getByText("Custom Footer")).toBeInTheDocument();
    });
  });

  describe("WizardSidebar", () => {
    it("should render step titles in the sidebar", () => {
      render(
        <Wizard>
          <WizardStep id="one" title="First Step">
            Step 1
          </WizardStep>
          <WizardStep id="two" title="Second Step">
            Step 2
          </WizardStep>
          <WizardSidebar />
        </Wizard>,
      );
      expect(screen.getByText("First Step")).toBeInTheDocument();
      expect(screen.getByText("Second Step")).toBeInTheDocument();
    });
  });

  describe("hidden steps", () => {
    it("should skip hidden steps from navigation", async () => {
      const user = userEvent.setup();
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardStep id="two" title="Two" hidden>
            Step 2 (hidden)
          </WizardStep>
          <WizardStep id="three" title="Three">
            Step 3
          </WizardStep>
          <WizardNavigation />
        </Wizard>,
      );

      expect(screen.getByText("Step 1")).toBeInTheDocument();
      await user.click(screen.getByTestId("wizard-next-btn"));
      expect(screen.getByText("Step 3")).toBeInTheDocument();
      expect(screen.queryByText("Step 2 (hidden)")).not.toBeInTheDocument();
    });
  });

  describe("hooks", () => {
    it("useWizard should provide current step context", () => {
      function TestConsumer() {
        const { currentStep, totalSteps, isFirst } = useWizard();
        return (
          <div data-testid="hook-result">
            {currentStep}-{totalSteps}-{isFirst ? "first" : "not-first"}
          </div>
        );
      }

      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardStep id="two" title="Two">
            Step 2
          </WizardStep>
          <TestConsumer />
        </Wizard>,
      );
      expect(screen.getByTestId("hook-result").textContent).toBe("0-2-first");
    });

    it("useWizardProgress should provide progress info", () => {
      function TestConsumer() {
        const { current, total, percentage } = useWizardProgress();
        return (
          <div data-testid="progress-result">
            {current}-{total}-{percentage}
          </div>
        );
      }

      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardStep id="two" title="Two">
            Step 2
          </WizardStep>
          <TestConsumer />
        </Wizard>,
      );
      expect(screen.getByTestId("progress-result").textContent).toBe("1-2-0");
    });
  });

  describe("ref forwarding", () => {
    it("should forward ref to WizardHeader", () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardHeader ref={ref} />
        </Wizard>,
      );
      expect(ref.current?.getAttribute("data-slot")).toBe("wizard-header");
    });

    it("should forward ref to WizardContent", () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardContent ref={ref}>Content</WizardContent>
        </Wizard>,
      );
      expect(ref.current?.getAttribute("data-slot")).toBe("wizard-content");
    });

    it("should forward ref to WizardFooter", () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Wizard>
          <WizardStep id="one" title="One">
            Step 1
          </WizardStep>
          <WizardFooter ref={ref}>Footer</WizardFooter>
        </Wizard>,
      );
      expect(ref.current?.getAttribute("data-slot")).toBe("wizard-footer");
    });
  });

  describe("className passthrough", () => {
    it("should pass className to the root", () => {
      render(
        <Wizard className="custom-class">
          <WizardStep id="one" title="One">
            Content
          </WizardStep>
        </Wizard>,
      );
      const root = document.querySelector('[data-slot="wizard"]');
      expect(root?.className).toContain("custom-class");
    });
  });

  describe("nested WizardStep children", () => {
    it("should detect WizardStep children nested inside wrappers like WizardContent and divs", () => {
      render(
        <Wizard>
          <WizardSidebar />
          <WizardContent>
            <WizardStep id="personal" title="Personal">
              Personal content
            </WizardStep>
            <WizardStep id="address" title="Address">
              Address content
            </WizardStep>
          </WizardContent>
          <WizardHeader />
        </Wizard>,
      );
      expect(screen.getByText("Personal content")).toBeInTheDocument();
      expect(
        document.querySelector('[data-slot="wizard-sidebar"]'),
      ).toBeTruthy();
      expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
    });

    it("should navigate nested WizardStep children correctly", async () => {
      const user = userEvent.setup();
      render(
        <Wizard>
          <WizardContent>
            <WizardStep id="one" title="One">
              Step 1
            </WizardStep>
            <WizardStep id="two" title="Two">
              Step 2
            </WizardStep>
          </WizardContent>
          <WizardNavigation />
        </Wizard>,
      );

      expect(screen.getByText("Step 1")).toBeInTheDocument();
      await user.click(screen.getByTestId("wizard-next-btn"));
      expect(screen.getByText("Step 2")).toBeInTheDocument();
    });
  });
});
