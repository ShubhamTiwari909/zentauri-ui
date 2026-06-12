import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
} from "./combobox-base";
import {
  comboboxContentVariants,
  comboboxItemVariants,
  comboboxListVariants,
  comboboxTriggerVariants,
} from "./variants";

function BasicCombobox({
  multiple = false,
  defaultValue = [],
  onChange,
}: {
  multiple?: boolean;
  defaultValue?: string[];
  onChange?: (v: string[]) => void;
}) {
  return (
    <Combobox
      multiple={multiple}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      <ComboboxTrigger>
        <ComboboxValue placeholder="Pick a fruit" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxSearch placeholder="Search fruits..." />
        <ComboboxList>
          <ComboboxItem value="apple">Apple</ComboboxItem>
          <ComboboxItem value="banana">Banana</ComboboxItem>
          <ComboboxItem value="cherry">Cherry</ComboboxItem>
          <ComboboxItem value="disabled-grape" disabled>
            Grape
          </ComboboxItem>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

describe("Combobox", () => {
  it("renders the trigger as a button", () => {
    render(<BasicCombobox />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("shows placeholder when nothing is selected", () => {
    render(<BasicCombobox />);
    expect(
      screen.getByRole("button", { name: /pick a fruit/i }),
    ).toBeInTheDocument();
  });

  it("shows selected label in trigger after selection", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    await user.click(await screen.findByRole("option", { name: /apple/i }));
    expect(screen.getByRole("button")).toHaveTextContent("Apple");
  });

  it("opens the panel and lists options on trigger click", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    expect(
      await screen.findByRole("option", { name: /apple/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /banana/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /cherry/i })).toBeInTheDocument();
  });

  it("closes the panel on second trigger click", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    const trigger = screen.getByRole("button");
    await user.click(trigger);
    await screen.findByRole("option", { name: /apple/i });
    await user.click(trigger);
    expect(
      screen.queryByRole("option", { name: /apple/i }),
    ).not.toBeInTheDocument();
  });

  it("closes after picking one value in single mode", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox multiple={false} />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    await user.click(await screen.findByRole("option", { name: /banana/i }));
    expect(
      screen.queryByRole("option", { name: /banana/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Banana");
  });

  it("keeps panel open after picking in multiple mode", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox multiple />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    await user.click(await screen.findByRole("option", { name: /apple/i }));
    expect(screen.getByRole("option", { name: /banana/i })).toBeInTheDocument();
  });

  it("marks selected option with aria-selected=true", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox defaultValue={["apple"]} />);
    await user.click(screen.getByRole("button"));
    const apple = await screen.findByRole("option", { name: /apple/i });
    const banana = screen.getByRole("option", { name: /banana/i });
    expect(apple).toHaveAttribute("aria-selected", "true");
    expect(banana).toHaveAttribute("aria-selected", "false");
  });

  it("calls onChange when a value is toggled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BasicCombobox onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    await user.click(await screen.findByRole("option", { name: /cherry/i }));
    expect(onChange).toHaveBeenCalledWith(["cherry"]);
  });

  it("deselects a value in multiple mode on second click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <BasicCombobox multiple defaultValue={["apple"]} onChange={onChange} />,
    );
    await user.click(screen.getByRole("button"));
    await user.click(await screen.findByRole("option", { name: /apple/i }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("marks a disabled option with aria-disabled and ignores clicks", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BasicCombobox onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    const grape = await screen.findByRole("option", { name: /grape/i });
    expect(grape).toHaveAttribute("aria-disabled", "true");
    await user.click(grape);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("Combobox — search and filtering", () => {
  it("renders a search input inside the panel", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    const search = await screen.findByRole("combobox");
    expect(search).toBeInTheDocument();
  });

  it("auto-focuses the search input when panel opens", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    const search = await screen.findByRole("combobox");
    await waitFor(() => expect(search).toHaveFocus());
  });

  it("filters options as the user types", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    const search = await screen.findByRole("combobox");
    await user.type(search, "ban");
    expect(screen.getByRole("option", { name: /banana/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: /apple/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: /cherry/i }),
    ).not.toBeInTheDocument();
  });

  it("shows the empty state when no options match", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    const search = await screen.findByRole("combobox");
    await user.type(search, "xyz");
    expect(screen.getByText(/no fruit found/i)).toBeInTheDocument();
  });

  it("clears the filter and restores all options after closing and reopening", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    const trigger = screen.getByRole("button", { name: /pick a fruit/i });
    await user.click(trigger);
    await user.type(await screen.findByRole("combobox"), "ban");
    await user.click(trigger);
    await user.click(trigger);
    expect(
      await screen.findByRole("option", { name: /apple/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /banana/i })).toBeInTheDocument();
  });
});

describe("Combobox — keyboard navigation", () => {
  it("closes the panel on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    const trigger = screen.getByRole("button", { name: /pick a fruit/i });
    await user.click(trigger);
    await screen.findByRole("combobox");
    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("option", { name: /apple/i }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("moves highlight through options with ArrowDown/ArrowUp", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    const search = await screen.findByRole("combobox");
    await waitFor(() => expect(search).toHaveFocus());

    await user.keyboard("{ArrowDown}");
    const apple = screen.getByRole("option", { name: /apple/i });
    expect(apple).toHaveAttribute("data-active", "true");

    await user.keyboard("{ArrowDown}");
    const banana = screen.getByRole("option", { name: /banana/i });
    expect(banana).toHaveAttribute("data-active", "true");

    await user.keyboard("{ArrowUp}");
    expect(apple).toHaveAttribute("data-active", "true");
  });

  it("selects the highlighted option on Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BasicCombobox onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    const search = await screen.findByRole("combobox");
    await waitFor(() => expect(search).toHaveFocus());

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith(["apple"]);
  });

  it("skips disabled options during keyboard navigation", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BasicCombobox onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    const search = await screen.findByRole("combobox");
    await waitFor(() => expect(search).toHaveFocus());

    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("option", { name: /cherry/i })).toHaveAttribute(
      "data-active",
      "true",
    );
    expect(screen.getByRole("option", { name: /grape/i })).not.toHaveAttribute(
      "data-active",
    );

    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith(["cherry"]);
  });

  it("wires trigger aria attributes to the listbox", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    const listbox = screen.getByRole("listbox");
    const controls = trigger.getAttribute("aria-controls");
    expect(listbox).toHaveAttribute("id", controls);
  });
});

describe("Combobox — appearance variants", () => {
  it("applies matching tokenized classes for extended and gradient appearances", () => {
    expect(comboboxTriggerVariants({ variant: "forest" })).toContain(
      "--zui-combobox-trigger-forest-bg",
    );
    expect(comboboxTriggerVariants({ variant: "gradient-blue" })).toContain(
      "--zui-combobox-trigger-gradient-blue-border",
    );
    expect(comboboxTriggerVariants({ variant: "gradient-blue" })).toContain(
      "--zui-combobox-value-placeholder-fg",
    );

    expect(comboboxContentVariants({ appearance: "plum" })).toContain(
      "--zui-combobox-content-plum-bg",
    );
    expect(comboboxContentVariants({ appearance: "gradient-green" })).toContain(
      "--zui-combobox-content-gradient-green-from",
    );

    expect(comboboxListVariants({ appearance: "mint" })).toContain(
      "--zui-combobox-list-mint-border",
    );
    expect(comboboxItemVariants({ appearance: "forest" })).toContain(
      "--zui-combobox-item-forest-bg",
    );
  });

  it("provides readable child-slot tokens for gradient content", () => {
    const contentClasses = comboboxContentVariants({
      appearance: "gradient-red",
    });

    expect(contentClasses).toContain("--zui-combobox-search-placeholder");
    expect(contentClasses).toContain("--zui-combobox-empty-fg");
    expect(contentClasses).toContain("--zui-combobox-item-active-bg");
  });

  it("inherits content appearance for items when no item appearance is provided", async () => {
    const user = userEvent.setup();

    render(
      <Combobox defaultValue={["apple"]}>
        <ComboboxTrigger>
          <ComboboxValue placeholder="Pick a fruit" />
        </ComboboxTrigger>
        <ComboboxContent appearance="gradient-teal">
          <ComboboxSearch placeholder="Search fruits..." />
          <ComboboxList>
            <ComboboxItem value="apple">Apple</ComboboxItem>
            <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    );

    await user.click(screen.getByRole("button"));

    expect(
      (await screen.findByRole("option", { name: /apple/i })).className,
    ).toContain("--zui-combobox-item-gradient-teal-from");
  });
});
