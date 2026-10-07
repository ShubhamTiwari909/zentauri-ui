import { createRef, Fragment, StrictMode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  Form,
  Field,
  FieldControl,
  FieldGroup,
  FieldLegend,
  FieldLabel,
  FieldDescription,
  FieldError,
  useFieldControl,
} from "./index";
import type { FieldAppearance } from "./types";
import { zuiFieldAppearances } from "../../design-system/field";
import { Input } from "../inputs";
import { Checkbox } from "../checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../select";
import { assertNoAxeViolations } from "../../test-utils/axe";

function HookControl() {
  const props = useFieldControl();
  return <input {...props} />;
}

describe("Field", () => {
  it("connects the label to a control and keeps wrapper ids independent", async () => {
    const user = userEvent.setup();
    render(
      <Field id="wrapper" controlId="email" label="Email">
        <FieldControl>
          <input id="replaced" />
        </FieldControl>
      </Field>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input.id).toBe("email");
    expect(document.getElementById("wrapper")).toHaveAttribute(
      "data-slot",
      "field",
    );
    await user.click(screen.getByText("Email"));
    expect(input).toHaveFocus();
  });
  it("creates distinct ids for separate fields", () => {
    render(
      <>
        <Field label="First">
          <FieldControl>
            <input />
          </FieldControl>
        </Field>
        <Field label="Second">
          <FieldControl>
            <input />
          </FieldControl>
        </Field>
      </>,
    );
    expect(screen.getByLabelText("First").id).not.toBe(
      screen.getByLabelText("Second").id,
    );
  });
  it("connects description and error without dropping or duplicating external ids", () => {
    render(
      <>
        <p id="external">External help</p>
        <Field
          controlId="email"
          label="Email"
          description="Instructions"
          error="Invalid email"
        >
          <FieldControl>
            <input aria-describedby="external email-description external" />
          </FieldControl>
        </Field>
      </>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "external email-description email-error",
    );
    expect(input).toHaveAccessibleDescription(
      "External help Instructions Invalid email",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });
  it("updates relationships when descriptions and errors appear and disappear", () => {
    const { rerender } = render(
      <Field label="Email">
        <FieldControl>
          <input />
        </FieldControl>
      </Field>,
    );
    const input = screen.getByRole("textbox");
    const id = input.id;
    expect(input).not.toHaveAttribute("aria-describedby");
    rerender(
      <Field label="Email" description="Help" error="Problem">
        <FieldControl>
          <input />
        </FieldControl>
      </Field>,
    );
    expect(input.id).toBe(id);
    expect(input).toHaveAccessibleDescription("Help Problem");
    rerender(
      <Field label="Email">
        <FieldControl>
          <input />
        </FieldControl>
      </Field>,
    );
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("alert")).toBeNull();
  });
  it("allows invalid to be set independently and explicitly cleared", () => {
    const { rerender } = render(
      <Field label="Email" invalid>
        <FieldControl>
          <input />
        </FieldControl>
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    rerender(
      <Field label="Email" error="Server message" invalid={false}>
        <FieldControl>
          <input />
        </FieldControl>
      </Field>,
    );
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
    expect(screen.getByRole("alert")).toBeVisible();
  });
  it("preserves a control's explicit accessible name and invalid reason", () => {
    render(
      <Field>
        <FieldControl>
          <input aria-label="Custom name" aria-invalid="spelling" />
        </FieldControl>
      </Field>,
    );
    expect(
      screen.getByRole("textbox", { name: "Custom name" }),
    ).toHaveAttribute("aria-invalid", "spelling");
  });
  it("supports required validation with a decorative marker", () => {
    const { container } = render(
      <Field label="Email" required>
        <FieldControl>
          <input type="email" />
        </FieldControl>
      </Field>,
    );
    const input = screen.getByRole("textbox", {
      name: "Email",
    }) as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.checkValidity()).toBe(false);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent(
      "*",
    );
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input.checkValidity()).toBe(true);
  });
  it("disables native controls and restores them dynamically", async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Field label="Name" disabled>
        <FieldControl>
          <input onChange={onChange} />
        </FieldControl>
      </Field>,
    );
    await userEvent.setup().type(screen.getByRole("textbox"), "Ada");
    expect(onChange).not.toHaveBeenCalled();
    rerender(
      <Field label="Name">
        <FieldControl>
          <input onChange={onChange} />
        </FieldControl>
      </Field>,
    );
    expect(screen.getByRole("textbox")).not.toBeDisabled();
  });
  it("retains child disabled and required states when the field does not impose them", () => {
    render(
      <Field label="Name">
        <FieldControl>
          <input required disabled />
        </FieldControl>
      </Field>,
    );
    expect(screen.getByRole("textbox")).toBeRequired();
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
  it("retains value, name, event handlers and ref on an existing control", async () => {
    const ref = createRef<HTMLInputElement>();
    const change = vi.fn();
    const blur = vi.fn();
    render(
      <Field label="Name">
        <FieldControl>
          <input
            name="name"
            defaultValue="Ada"
            ref={ref}
            onChange={change}
            onBlur={blur}
          />
        </FieldControl>
      </Field>,
    );
    const input = screen.getByRole("textbox");
    expect(ref.current).toBe(input);
    expect(input).toHaveValue("Ada");
    await userEvent.setup().type(input, "!");
    fireEvent.blur(input);
    expect(change).toHaveBeenCalledTimes(1);
    expect(blur).toHaveBeenCalledTimes(1);
    expect(input).toHaveAttribute("name", "name");
  });
  it("forwards wrapper and slot refs and native attributes", () => {
    const root = createRef<HTMLDivElement>();
    const label = createRef<HTMLLabelElement>();
    const description = createRef<HTMLParagraphElement>();
    const error = createRef<HTMLParagraphElement>();
    const group = createRef<HTMLFieldSetElement>();
    const legend = createRef<HTMLLegendElement>();
    render(
      <Field ref={root} title="Details" className="custom">
        <FieldLabel ref={label}>Name</FieldLabel>
        <FieldControl>
          <input />
        </FieldControl>
        <FieldDescription ref={description}>Help</FieldDescription>
        <FieldError ref={error}>Problem</FieldError>
        <FieldGroup ref={group}>
          <FieldLegend ref={legend}>Group</FieldLegend>
        </FieldGroup>
      </Field>,
    );
    expect(root.current).toHaveClass("custom");
    expect(root.current).toHaveAttribute("title", "Details");
    for (const ref of [label, description, error, group, legend])
      expect(ref.current).not.toBeNull();
  });
  it.each(["sm", "md", "lg"] as const)("supports %s sizing", (size) => {
    const { container } = render(<Field size={size} />);
    expect(container.firstChild).toHaveClass(
      `gap-[var(--zui-field-gap-${size},${size === "sm" ? "0.375rem" : size === "md" ? "0.5rem" : "0.75rem"})]`,
    );
  });
  it.each(Object.keys(zuiFieldAppearances) as FieldAppearance[])(
    "renders the %s appearance",
    (appearance) => {
      const { container } = render(
        <Field appearance={appearance} label="Name">
          <FieldControl>
            <input />
          </FieldControl>
        </Field>,
      );
      expect(container.firstElementChild?.className).toContain(
        `--zui-field-${appearance}-`,
      );
      expect(container.firstElementChild?.className).toContain(
        `--zui-field-${appearance}-fg-dark`,
      );
    },
  );
  it("stacks by default and supports responsive and explicit horizontal orientations", () => {
    const { container, rerender } = render(<Field label="Name" />);
    expect(container.firstChild).toHaveClass("grid-cols-1");
    rerender(<Field label="Name" orientation="responsive" />);
    expect(container.firstElementChild?.className).toContain("sm:grid-cols-");
    rerender(<Field label="Name" orientation="horizontal" />);
    expect(container.firstElementChild?.className).toContain(
      "grid-cols-[minmax",
    );
    expect(container.firstChild).toHaveAttribute(
      "data-orientation",
      "horizontal",
    );
  });
  it("does not leave an empty label column when label is omitted", () => {
    const { container } = render(
      <Field orientation="horizontal">
        <FieldControl>
          <input aria-label="Name" />
        </FieldControl>
      </Field>,
    );
    expect(container.firstChild).toHaveClass("grid-cols-1");
    expect(container.querySelector("label")).toBeNull();
  });
  it("preserves zero in every optional text slot", () => {
    const { container } = render(
      <Field label={0} description={0} error={0}>
        <FieldControl>
          <input />
        </FieldControl>
      </Field>,
    );
    for (const slot of ["label", "description", "error"])
      expect(
        container.querySelector(`[data-slot="field-${slot}"]`),
      ).toHaveTextContent("0");
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });
  it.each([undefined, null, false, true])(
    "omits empty boolean/nullish content %s",
    (value) => {
      const { container } = render(
        <Field label={value} description={value} error={value} />,
      );
      expect(container.querySelector("label,p")).toBeNull();
      expect(container.firstChild).not.toHaveAttribute("data-invalid");
    },
  );
  it("retains empty strings as supplied content", () => {
    const { container } = render(<Field label="" description="" error="" />);
    expect(
      container.querySelector('[data-slot="field-description"]'),
    ).not.toBeNull();
  });
  it("supports native textarea and select controls", () => {
    render(
      <>
        <Field label="Bio" description="Short bio">
          <FieldControl>
            <textarea />
          </FieldControl>
        </Field>
        <Field label="Team">
          <FieldControl>
            <select>
              <option>Design</option>
            </select>
          </FieldControl>
        </Field>
      </>,
    );
    expect(
      screen.getByRole("textbox", { name: "Bio" }),
    ).toHaveAccessibleDescription("Short bio");
    expect(screen.getByRole("combobox", { name: "Team" })).toBeVisible();
  });
  it("integrates the library Input without losing hint relationships", () => {
    render(
      <Field label="Name" description="Field help">
        <FieldControl>
          <Input hint="Input help" />
        </FieldControl>
      </Field>,
    );
    expect(
      screen.getByRole("textbox", { name: "Name" }),
    ).toHaveAccessibleDescription("Field help Input help");
  });
  it("integrates the library Checkbox with native required and change handling", async () => {
    const change = vi.fn();
    render(
      <Field label="Accept terms" required>
        <FieldControl>
          <Checkbox onCheckedChange={change} />
        </FieldControl>
      </Field>,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).toBeRequired();
    await userEvent.setup().click(checkbox);
    expect(change).toHaveBeenCalledWith(true);
  });
  it("integrates Select through its shared triggerId and custom-control semantics", async () => {
    render(
      <Field controlId="team" label="Team" description="Choose a team" required>
        {({ id }) => (
          <Select triggerId={id}>
            <FieldControl native={false}>
              <SelectTrigger role="combobox">
                <SelectValue />
              </SelectTrigger>
            </FieldControl>
            <SelectContent>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        )}
      </Field>,
    );
    const trigger = screen.getByRole("combobox", { name: "Team" });
    expect(trigger).toHaveAttribute("id", "team");
    expect(trigger).toHaveAttribute("aria-required", "true");
    expect(trigger).not.toHaveAttribute("required");
    expect(trigger).toHaveAccessibleDescription("Choose a team");
    await userEvent.setup().click(trigger);
    expect(screen.getByRole("listbox")).toHaveAttribute(
      "aria-labelledby",
      "team",
    );
  });
  it("supports a render function with explicit attributes", () => {
    render(
      <Field label="Name" description="Help" required>
        {(control) => <input {...control} name="name" />}
      </Field>,
    );
    expect(
      screen.getByRole("textbox", { name: "Name" }),
    ).toHaveAccessibleDescription("Help");
    expect(screen.getByRole("textbox")).toBeRequired();
  });
  it("supports the field hook through a custom component", () => {
    render(
      <Field label="Name" error="Problem">
        <HookControl />
      </Field>,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
  it("rejects a control outside a Field with an actionable error", () => {
    expect(() =>
      render(
        <FieldControl>
          <input />
        </FieldControl>,
      ),
    ).toThrow(/inside Field/);
  });
  it("rejects fragments that cannot forward control attributes", () => {
    expect(() =>
      render(
        <Field>
          <FieldControl>
            <Fragment>
              <input />
            </Fragment>
          </FieldControl>
        </Field>,
      ),
    ).toThrow(/one control element/);
  });
  it("connects all ids in server markup without effects", () => {
    const markup = renderToString(
      <Field label="Name" description="Help" error="Problem">
        <FieldControl>
          <input />
        </FieldControl>
      </Field>,
    );
    const root = document.createElement("div");
    root.innerHTML = markup;
    const input = root.querySelector("input")!;
    expect(root.querySelector("label")).toHaveAttribute("for", input.id);
    for (const id of input.getAttribute("aria-describedby")!.split(" "))
      expect(
        [...root.querySelectorAll("[id]")].some((node) => node.id === id),
      ).toBe(true);
  });
  it("hydrates without changing server connections under StrictMode", async () => {
    const content = (
      <StrictMode>
        <Field label="Name" description="Help">
          <FieldControl>
            <input />
          </FieldControl>
        </Field>
      </StrictMode>
    );
    const host = document.createElement("div");
    host.innerHTML = renderToString(content);
    document.body.append(host);
    const id = host.querySelector("input")!.id;
    const error = vi.fn();
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => {
      root = hydrateRoot(host, content, { onRecoverableError: error });
    });
    expect(host.querySelector("input")!.id).toBe(id);
    expect(error).not.toHaveBeenCalled();
    await act(async () => root.unmount());
    host.remove();
  });
  it("has no detectable accessibility violations for the complete field", async () => {
    const { container } = render(
      <Form aria-label="Profile">
        <Field
          label="Email"
          description="Work address"
          error="Check the address"
          required
        >
          <FieldControl>
            <input type="email" />
          </FieldControl>
        </Field>
      </Form>,
    );
    await assertNoAxeViolations(container);
  });
});

describe("Form and field primitives", () => {
  it("preserves native form submission and successful control semantics", () => {
    const submit = vi.fn((e) => e.preventDefault());
    const ref = createRef<HTMLFormElement>();
    render(
      <Form
        ref={ref}
        onSubmit={submit}
        action="/profile"
        method="post"
        aria-label="Profile"
      >
        <Field label="Name">
          <FieldControl>
            <input name="name" defaultValue="Ada" />
          </FieldControl>
        </Field>
        <Field label="Secret" disabled>
          <FieldControl>
            <input name="secret" defaultValue="hidden" />
          </FieldControl>
        </Field>
        <button type="submit">Save</button>
      </Form>,
    );
    expect(new FormData(ref.current!).get("name")).toBe("Ada");
    expect(new FormData(ref.current!).has("secret")).toBe(false);
    fireEvent.submit(ref.current!);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(ref.current).toHaveAttribute("method", "post");
  });
  it("uses a native legend and description for grouped controls", () => {
    render(
      <FieldGroup legend="Notifications" description="Choose channels">
        <Checkbox label="Email" />
        <Checkbox label="SMS" />
      </FieldGroup>,
    );
    expect(
      screen.getByRole("group", { name: "Notifications" }),
    ).toHaveAccessibleDescription("Choose channels");
  });
  it("disables grouped native controls while respecting the first legend exception", () => {
    render(
      <FieldGroup disabled>
        <FieldLegend>
          Settings <input aria-label="Enable" />
        </FieldLegend>
        <Field label="Name">
          <FieldControl>
            <input />
          </FieldControl>
        </Field>
      </FieldGroup>,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "Enable" })).not.toBeDisabled();
  });
  it("preserves external group description ids", () => {
    render(
      <FieldGroup legend="Group" description="Help" aria-describedby="external">
        <input aria-label="Name" />
      </FieldGroup>,
    );
    expect(screen.getByRole("group").getAttribute("aria-describedby")).toMatch(
      /^external zui-field-group-/,
    );
  });
  it("preserves zero legends and group descriptions", () => {
    render(<FieldGroup legend={0} description={0} />);
    expect(
      screen.getByRole("group", { name: "0" }),
    ).toHaveAccessibleDescription("0");
  });
  it("renders standalone label, description and error with caller-owned ids", () => {
    render(
      <>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <input id="name" aria-describedby="help problem" />
        <FieldDescription id="help">Help</FieldDescription>
        <FieldError id="problem" role="status">
          Problem
        </FieldError>
        <FieldError>{null}</FieldError>
      </>,
    );
    expect(screen.getByLabelText("Name")).toHaveAccessibleDescription(
      "Help Problem",
    );
    expect(screen.getByRole("status")).toBeVisible();
    expect(screen.queryByRole("alert")).toBeNull();
  });
  it("keeps nested fields independent", () => {
    render(
      <FieldGroup legend="Address">
        <Field label="City" description="Your city">
          <FieldControl>
            <input />
          </FieldControl>
        </Field>
        <FieldGroup legend="Contact">
          <Field label="Email" error="Required">
            <FieldControl>
              <input />
            </FieldControl>
          </Field>
        </FieldGroup>
      </FieldGroup>,
    );
    expect(screen.getByLabelText("City")).not.toHaveAttribute("aria-invalid");
    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(
      "Required",
    );
  });
});
