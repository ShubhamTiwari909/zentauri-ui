import type { FieldOptions } from "./field-code-examples.data";
export const fieldBasicDemoSnippet = `"use client";
import { Field, FieldControl } from "@zentauri-ui/zentauri-components/ui/field";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";

export function FieldBasicDemo() {
  return (
    <Field
      label="Work email"
      description="We will only use this for account updates."
      required
      appearance="blue"
    >
      <FieldControl>
        <Input type="email" name="email" placeholder="you@company.com" />
      </FieldControl>
    </Field>
  );
}
`;
export const fieldFormDemoSnippet = `"use client";
import { useRef, useState } from "react";
import { Form, Field, FieldControl } from "@zentauri-ui/zentauri-components/ui/field";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";

export function FieldFormDemo() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>();
  const [saved, setSaved] = useState("");
  return (
    <Form
      aria-label="Contact form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const input = emailRef.current!;
        if (!input.checkValidity()) {
          setError(
            input.validity.valueMissing
              ? "Enter your email address."
              : "Enter a valid email address.",
          );
          setSaved("");
          input.focus();
          return;
        }
        setError(undefined);
        setSaved(\`Saved contact for \${input.value}.\`);
      }}
    >
      <Field
        label="Contact email"
        required
        description="Try submitting an empty or invalid address."
        error={error}
      >
        <FieldControl>
          <Input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="you@company.com"
            onChange={() => {
              setError(undefined);
              setSaved("");
            }}
          />
        </FieldControl>
      </Field>
      <Field label="Message" description="Optional context for the team.">
        <FieldControl>
          <Input
            as="textarea"
            name="message"
            rows={3}
            placeholder="How can we help?"
          />
        </FieldControl>
      </Field>
      <button
        type="submit"
        className="self-start rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        Save contact
      </button>
      <p role="status" className="text-sm">
        {saved}
      </p>
    </Form>
  );
}
`;
export const fieldGridDemoSnippet = `"use client";
import { Field, FieldControl, FieldGroup } from "@zentauri-ui/zentauri-components/ui/field";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import { Grid } from "@zentauri-ui/zentauri-components/ui/grid";

export function FieldGridDemo() {
  return (
    <FieldGroup
      legend="Profile details"
      description="Fields stack on small screens, with two columns on larger screens."
    >
      <Grid layout={{ mode: "fixed", columns: 2 }} gap="md">
        <Field label="First name" required appearance="subtle">
          <FieldControl>
            <Input
              name="firstName"
              autoComplete="given-name"
              placeholder="Ada"
            />
          </FieldControl>
        </Field>
        <Field label="Last name" required appearance="subtle">
          <FieldControl>
            <Input
              name="lastName"
              autoComplete="family-name"
              placeholder="Lovelace"
            />
          </FieldControl>
        </Field>
        <Field label="City" orientation="responsive" appearance="subtle">
          <FieldControl>
            <Input
              name="city"
              autoComplete="address-level2"
              placeholder="London"
            />
          </FieldControl>
        </Field>
        <Field label="Country" orientation="responsive" appearance="subtle">
          <FieldControl>
            <Input
              name="country"
              autoComplete="country-name"
              placeholder="United Kingdom"
            />
          </FieldControl>
        </Field>
      </Grid>
    </FieldGroup>
  );
}
`;
export const fieldChoicesDemoSnippet = `"use client";
import { FieldGroup } from "@zentauri-ui/zentauri-components/ui/field";
import { Checkbox } from "@zentauri-ui/zentauri-components/ui/checkbox";

export function FieldChoicesDemo() {
  return (
    <FieldGroup
      legend="Notification channels"
      description="Choose where you receive product updates."
    >
      <Checkbox
        name="channels"
        value="email"
        label="Email updates"
        defaultChecked
      />
      <Checkbox name="channels" value="sms" label="SMS updates" />
      <Checkbox name="channels" value="push" label="Push notifications" />
    </FieldGroup>
  );
}
`;
export const fieldSelectDemoSnippet = `"use client";
import { useState } from "react";
import { Field, FieldControl } from "@zentauri-ui/zentauri-components/ui/field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@zentauri-ui/zentauri-components/ui/select";

export function FieldSelectDemo() {
  const [team, setTeam] = useState<string[]>([]);
  return (
    <Field
      label="Team"
      description="A custom Select uses the Field control ID on its root."
    >
      {({ id }) => (
        <Select triggerId={id} value={team} onChange={setTeam}>
          <FieldControl native={false}>
            <SelectTrigger role="combobox" variant="outline" className="w-full">
              <SelectValue placeholder="Choose a team" />
            </SelectTrigger>
          </FieldControl>
          <SelectContent appearance="default">
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
          </SelectContent>
          <input type="hidden" name="team" value={team[0] ?? ""} />
        </Select>
      )}
    </Field>
  );
}
`;
export function fieldPlaygroundSnippet(options: FieldOptions) {
  const control =
    options.control === "textarea"
      ? '<Input as="textarea" rows={3} placeholder="Describe your project" />'
      : options.control === "select"
        ? '<select className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" defaultValue=""><option value="" disabled>Choose a project</option><option value="studio">Studio workspace</option><option value="portal">Customer portal</option></select>'
        : '<Input placeholder="Studio workspace" />';
  return `"use client";
import { Field, FieldControl } from "@zentauri-ui/zentauri-components/ui/field";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";

export function ProjectField() {
  return (
    <Field
      label="Project name"
      description="A short name makes your workspace easier to find."
      appearance="${options.appearance}" orientation="${options.orientation}" size="${options.size}"
      required={${options.required}} disabled={${options.disabled}}
      error={${options.invalid ? '"Enter a project name before continuing."' : "undefined"}}
    >
      <FieldControl>${control}</FieldControl>
    </Field>
  );
}`;
}
