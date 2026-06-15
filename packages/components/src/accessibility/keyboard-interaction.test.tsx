import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
} from "../ui/combobox";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../ui/dropdown";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from "../ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

/**
 * Central keyboard-interaction coverage for compound components.
 *
 * Focus order, arrow-key roving, Home/End, and Enter/Escape activation are the
 * behaviors keyboard-only and assistive-technology users depend on. This file
 * concentrates that coverage for the components whose own suites did not yet
 * exercise it. Combobox arrow/Enter/Escape navigation, the command palette, and
 * context-menu Escape handling are verified in their own component test files;
 * a representative Combobox flow is repeated here so the keyboard contract reads
 * as one place.
 */

describe("Tabs keyboard interaction", () => {
  function renderTabs(orientation: "horizontal" | "vertical" = "horizontal") {
    return render(
      <Tabs defaultValue="a" orientation={orientation}>
        <TabsList aria-label="Sections">
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
          <TabsTrigger value="c">C</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
        <TabsContent value="c">Panel C</TabsContent>
      </Tabs>,
    );
  }

  it("applies roving tabindex so only the active tab is in the tab sequence", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
    expect(screen.getByRole("tab", { name: "C" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("moves focus across tabs with ArrowRight and ArrowLeft", async () => {
    const user = userEvent.setup();
    renderTabs();
    const [tabA, tabB] = [
      screen.getByRole("tab", { name: "A" }),
      screen.getByRole("tab", { name: "B" }),
    ];

    tabA.focus();
    await user.keyboard("{ArrowRight}");
    expect(tabB).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(tabA).toHaveFocus();
  });

  it("wraps focus from the last tab back to the first with ArrowRight", async () => {
    const user = userEvent.setup();
    renderTabs();
    const tabC = screen.getByRole("tab", { name: "C" });
    tabC.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "A" })).toHaveFocus();
  });

  it("jumps to the first and last tab with Home and End", async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByRole("tab", { name: "B" }).focus();

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "C" })).toHaveFocus();

    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "A" })).toHaveFocus();
  });

  it("uses ArrowDown and ArrowUp when the tablist is vertical", async () => {
    const user = userEvent.setup();
    renderTabs("vertical");
    const [tabA, tabB] = [
      screen.getByRole("tab", { name: "A" }),
      screen.getByRole("tab", { name: "B" }),
    ];

    tabA.focus();
    await user.keyboard("{ArrowDown}");
    expect(tabB).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(tabA).toHaveFocus();
  });

  it("skips disabled tabs during arrow navigation", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <TabsList aria-label="Sections">
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b" disabled>
            B
          </TabsTrigger>
          <TabsTrigger value="c">C</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
        <TabsContent value="c">Panel C</TabsContent>
      </Tabs>,
    );

    screen.getByRole("tab", { name: "A" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "C" })).toHaveFocus();
  });

  it("activates the focused tab with Enter", async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByRole("tab", { name: "A" }).focus();

    await user.keyboard("{ArrowRight}");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel B");
    });
  });
});

describe("Modal keyboard interaction", () => {
  it("moves initial focus into the dialog when it opens", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <ModalTrigger>Open</ModalTrigger>
        <ModalContent>
          <ModalTitle>Settings</ModalTitle>
          <ModalBody>
            <button type="button">Save</button>
          </ModalBody>
        </ModalContent>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = await screen.findByRole("dialog");

    await waitFor(() => {
      expect(dialog.contains(document.activeElement)).toBe(true);
    });
  });

  it("traps focus inside the dialog", async () => {
    render(
      <>
        <Modal defaultOpen>
          <ModalContent>
            <ModalTitle>Settings</ModalTitle>
            <ModalBody>
              <button type="button">Save</button>
            </ModalBody>
          </ModalContent>
        </Modal>
        <button type="button">Outside</button>
      </>,
    );

    const dialog = await screen.findByRole("dialog");
    // Attempting to move focus outside the dialog is redirected back inside.
    screen.getByRole("button", { name: "Outside" }).focus();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});

describe("Drawer keyboard interaction", () => {
  it("moves initial focus into the dialog when it opens", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerBody>
            <button type="button">Apply</button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = await screen.findByRole("dialog");

    await waitFor(() => {
      expect(dialog.contains(document.activeElement)).toBe(true);
    });
  });

  it("traps focus inside the dialog", async () => {
    render(
      <>
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerBody>
              <button type="button">Apply</button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <button type="button">Outside</button>
      </>,
    );

    const dialog = await screen.findByRole("dialog");
    screen.getByRole("button", { name: "Outside" }).focus();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("restores focus to the trigger after Escape closes it", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );

    const trigger = screen.getByRole("button", { name: "Open" });
    trigger.focus();
    await user.click(trigger);
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });
});

describe("Select keyboard interaction", () => {
  function renderSelect() {
    return render(
      <Select defaultValue={[]}>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Beta</SelectItem>
          <SelectItem value="c">Gamma</SelectItem>
        </SelectContent>
      </Select>,
    );
  }

  it("focuses the first option when the listbox opens", async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole("button", { name: /pick/i }));
    const alpha = await screen.findByRole("option", { name: /alpha/i });
    await waitFor(() => expect(alpha).toHaveFocus());
  });

  it("jumps to the last and first option with End and Home", async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole("button", { name: /pick/i }));
    const alpha = await screen.findByRole("option", { name: /alpha/i });
    const gamma = screen.getByRole("option", { name: /gamma/i });
    await waitFor(() => expect(alpha).toHaveFocus());

    await user.keyboard("{End}");
    expect(gamma).toHaveFocus();

    await user.keyboard("{Home}");
    expect(alpha).toHaveFocus();
  });
});

describe("Combobox keyboard interaction", () => {
  it("highlights options with arrows and selects on Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Combobox defaultValue={[]} onChange={onChange}>
        <ComboboxTrigger>
          <ComboboxValue placeholder="Pick a fruit" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxSearch placeholder="Search fruits…" />
          <ComboboxList>
            <ComboboxItem value="apple">Apple</ComboboxItem>
            <ComboboxItem value="banana">Banana</ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    );

    await user.click(screen.getByRole("button", { name: /pick a fruit/i }));
    const search = await screen.findByRole("combobox");
    await waitFor(() => expect(search).toHaveFocus());

    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(screen.getByRole("option", { name: /banana/i })).toHaveAttribute(
      "data-active",
      "true",
    );

    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith(["banana"]);
  });
});

describe("Menu (Dropdown) keyboard interaction", () => {
  it("activates a focused item with Enter", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Dropdown defaultOpen>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="edit" onSelect={onSelect}>
            Edit
          </DropdownItem>
          <DropdownItem value="delete">Delete</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const edit = screen.getByRole("menuitem", { name: "Edit" });
    edit.focus();
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("activates a focused item with Space", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Dropdown defaultOpen multiSelect>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="edit" onSelect={onSelect}>
            Edit
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const edit = screen.getByRole("menuitem", { name: "Edit" });
    edit.focus();
    await user.keyboard(" ");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("keeps menu items out of Tab order and navigates them with arrows", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown defaultOpen>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="edit">Edit</DropdownItem>
          <DropdownItem value="delete">Delete</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const editItem = screen.getByRole("menuitem", { name: "Edit" });
    const deleteItem = screen.getByRole("menuitem", { name: "Delete" });

    expect(editItem).toHaveAttribute("tabindex", "-1");
    expect(deleteItem).toHaveAttribute("tabindex", "-1");

    editItem.focus();
    await user.keyboard("{ArrowDown}");
    expect(deleteItem).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(editItem).toHaveFocus();
  });
});
