import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";

import { assertNoAxeViolations } from "../test-utils/axe";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/buttons/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
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
  Command,
  CommandContent,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { CopyButton } from "../ui/copy-button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "../ui/drawer";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../ui/dropdown";
import { DatePicker } from "../ui/date-picker";
import { DynamicStepper } from "../ui/dynamic-stepper";
import { FileUpload } from "../ui/file-upload";
import { Input } from "../ui/inputs/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from "../ui/modal";
import { OTPInput } from "../ui/otp-input";
import { Pagination } from "../ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Rating } from "../ui/rating";
import { SearchBar } from "../ui/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  RangeSlider,
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "../ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Toggle } from "../ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TreeView } from "../ui/tree-view";
import type { TreeNode } from "../ui/tree-view";

describe("axe-core accessibility coverage", () => {
  describe("form controls and actions", () => {
    it("passes axe checks for labeled form controls and actions", async () => {
      const { container } = render(
        <form aria-label="Account settings">
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" />

          <Checkbox defaultChecked>Send product updates</Checkbox>

          <Button type="submit">Save settings</Button>
        </form>,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for a toggle switch", async () => {
      const { container } = render(
        <Toggle defaultChecked aria-label="Email notifications" />,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for the copy button", async () => {
      const { container } = render(<CopyButton value="npm i zentauri-ui" />);

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for the OTP input", async () => {
      const { container } = render(<OTPInput label="Verification code" />);

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for the file upload control", async () => {
      const { container } = render(<FileUpload />);

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for the search bar", async () => {
      const { container } = render(
        <SearchBar
          value=""
          onValueChange={() => {}}
          aria-label="Search docs"
        />,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for radio-group and rating controls", async () => {
      const { container } = render(
        <section aria-label="Product preferences">
          <RadioGroup defaultValue="pro" aria-label="Plan">
            <RadioGroupItem value="starter">Starter</RadioGroupItem>
            <RadioGroupItem value="pro">Pro</RadioGroupItem>
          </RadioGroup>

          <Rating defaultValue={4} label="Product score" />
        </section>,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for single and range sliders", async () => {
      const { container } = render(
        <section aria-label="Slider preferences">
          <Slider defaultValue={40} aria-label="Volume">
            <SliderTrack>
              <SliderRange />
              <SliderThumb aria-label="Volume" />
            </SliderTrack>
          </Slider>

          <RangeSlider defaultValue={[20, 80]} aria-label="Budget" />
        </section>,
      );

      await assertNoAxeViolations(container);
    });
  });

  describe("navigation and disclosure", () => {
    it("passes axe checks for breadcrumb navigation", async () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Accessibility</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for pagination controls", async () => {
      const { container } = render(
        <Pagination pageCount={5} defaultPage={2} />,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for accordion disclosure markup", async () => {
      const { container } = render(
        <Accordion type="multiple" defaultValues={["shipping"]}>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping details</AccordionTrigger>
            <AccordionContent>
              Choose a delivery method before confirming the order.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="billing">
            <AccordionTrigger>Billing address</AccordionTrigger>
            <AccordionContent>
              Add the billing address used for the invoice.
            </AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for tablist and tabpanel relationships", async () => {
      const { container } = render(
        <Tabs defaultValue="overview">
          <TabsList aria-label="Package sections">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Install and usage details.</TabsContent>
          <TabsContent value="api">Props and public exports.</TabsContent>
        </Tabs>,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for tree-view markup", async () => {
      const data: TreeNode[] = [
        {
          id: "src",
          label: "src",
          children: [
            { id: "index", label: "index.ts" },
            { id: "button", label: "button.tsx" },
          ],
        },
        { id: "readme", label: "README.md" },
      ];

      const { container } = render(
        <TreeView data={data} aria-label="Project files" />,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for the dynamic stepper", async () => {
      const { container } = render(
        <DynamicStepper
          steps={[
            { id: "account", title: "Account", description: "Create login" },
            { id: "profile", title: "Profile", description: "Add details" },
            { id: "review", title: "Review", description: "Confirm" },
          ]}
          defaultActiveStep={1}
        />,
      );

      await assertNoAxeViolations(container);
    });
  });

  describe("overlays and popups", () => {
    it("passes axe checks for modal dialog markup", async () => {
      render(
        <Modal defaultOpen>
          <ModalContent>
            <ModalTitle>Confirm publish</ModalTitle>
            <ModalDescription>
              Review the release notes before publishing the package.
            </ModalDescription>
            <ModalBody>The package will be published to npm.</ModalBody>
          </ModalContent>
        </Modal>,
      );

      await screen.findByRole("dialog", { name: "Confirm publish" });
      await assertNoAxeViolations(document.body);
    });

    it("passes axe checks for drawer dialog markup", async () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerBody>Refine the result list.</DrawerBody>
            <DrawerClose />
          </DrawerContent>
        </Drawer>,
      );

      await screen.findByRole("dialog", { name: "Filters" });
      await assertNoAxeViolations(document.body);
    });

    it("passes axe checks for popover dialog markup", async () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger>
            <button type="button">Open panel</button>
          </PopoverTrigger>
          <PopoverContent aria-label="Quick settings">
            Interactive panel content.
          </PopoverContent>
        </Popover>,
      );

      await screen.findByRole("dialog");
      await assertNoAxeViolations(document.body);
    });

    it("passes axe checks for tooltip markup", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip delay={0}>
          <TooltipTrigger>
            <button type="button">Help</button>
          </TooltipTrigger>
          <TooltipContent>Opens the documentation.</TooltipContent>
        </Tooltip>,
      );

      await user.hover(screen.getByRole("button", { name: "Help" }));
      await screen.findByRole("tooltip");
      await assertNoAxeViolations(document.body);
    });

    it("passes axe checks for dropdown menu markup", async () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>Actions</DropdownTrigger>
          <DropdownContent>
            <DropdownItem value="edit">Edit</DropdownItem>
            <DropdownItem value="duplicate">Duplicate</DropdownItem>
            <DropdownItem value="delete">Delete</DropdownItem>
          </DropdownContent>
        </Dropdown>,
      );

      await screen.findByRole("menu");
      await assertNoAxeViolations(document.body);
    });

    it("passes axe checks for context menu markup", async () => {
      render(
        <ContextMenu defaultOpen>
          <ContextMenuTrigger>Right-click row</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Row actions</ContextMenuLabel>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      await screen.findByRole("menu");
      await assertNoAxeViolations(document.body);
    });

    it("passes axe checks for a context menu with a non-interactive trigger child", async () => {
      render(
        <ContextMenu defaultOpen>
          <ContextMenuTrigger>
            <div data-testid="surface">Right-click surface</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Row actions</ContextMenuLabel>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      await screen.findByRole("menu");
      await assertNoAxeViolations(document.body);
    });

    it("passes axe checks for command palette markup", async () => {
      render(
        <Command open>
          <CommandContent>
            <CommandInput placeholder="Search…" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem value="home">Home</CommandItem>
                <CommandItem value="settings">Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandContent>
        </Command>,
      );

      await screen.findByRole("dialog");
      await assertNoAxeViolations(document.body);
    });

    it("passes axe checks for opened select listbox markup", async () => {
      const user = userEvent.setup();

      render(
        <Select defaultValue={[]}>
          <SelectTrigger>
            <SelectValue placeholder="Select plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
          </SelectContent>
        </Select>,
      );

      await user.click(screen.getByRole("button", { name: "Select plan" }));
      await waitFor(() => {
        screen.getByRole("listbox");
      });

      await assertNoAxeViolations(document.body);
    });

    it("passes axe checks for opened combobox listbox markup", async () => {
      const user = userEvent.setup();

      render(
        <Combobox defaultValue={[]}>
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
      await screen.findByRole("listbox");

      await assertNoAxeViolations(document.body);
    });
  });

  describe("date components", () => {
    const calendarProps = {
      defaultMonth: new Date(2026, 6, 1),
      today: new Date(2026, 6, 7),
      locale: "en-US",
    } as const;

    it("passes axe checks for the calendar in single mode", async () => {
      const { container } = render(
        <Calendar {...calendarProps} defaultValue={new Date(2026, 6, 7)} />,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for the calendar in multiple mode", async () => {
      const { container } = render(
        <Calendar
          {...calendarProps}
          mode="multiple"
          defaultValue={[new Date(2026, 6, 7), new Date(2026, 6, 9)]}
        />,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for the calendar in range mode", async () => {
      const { container } = render(
        <Calendar
          {...calendarProps}
          mode="range"
          defaultValue={{
            from: new Date(2026, 6, 7),
            to: new Date(2026, 6, 12),
          }}
        />,
      );

      await assertNoAxeViolations(container);
    });

    it("passes axe checks for the open date picker dialog and grid", async () => {
      render(
        <DatePicker
          today={new Date(2026, 6, 7)}
          locale="en-US"
          defaultValue={new Date(2026, 6, 7)}
          defaultOpen
        />,
      );

      await screen.findByRole("dialog", { name: "Choose date" });
      await assertNoAxeViolations(document.body);
    });
  });
});
