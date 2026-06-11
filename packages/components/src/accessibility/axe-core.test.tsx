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
import { Button } from "../ui/buttons/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/inputs/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from "../ui/modal";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Rating } from "../ui/rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

describe("axe-core accessibility smoke coverage", () => {
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
});
