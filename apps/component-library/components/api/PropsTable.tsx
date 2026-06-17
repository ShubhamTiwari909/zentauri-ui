import Link from "next/link";

import { getComponentProps } from "@/lib/props-data";
import type {
  ComponentPropDoc,
  ComponentPropsDoc,
  ComponentSubcomponentDoc,
} from "@/lib/props-data";

const groupLabels: Record<ComponentPropDoc["group"], string> = {
  variant: "Variants",
  controlled: "State",
  behavior: "Behavior",
  content: "Content",
  dom: "Inherited HTML props",
};

const visibleGroups: ComponentPropDoc["group"][] = [
  "variant",
  "controlled",
  "behavior",
  "content",
];

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDefault(value: string | undefined) {
  return value || "none";
}

function OptionChips({ prop }: { prop: ComponentPropDoc }) {
  if (!prop.options?.length) {
    return (
      <code className="text-xs text-slate-700 dark:text-slate-300">
        {prop.type}
      </code>
    );
  }

  const visibleOptions = prop.options.slice(0, 12);
  const hiddenCount = prop.options.length - visibleOptions.length;

  return (
    <div className="flex max-w-xl flex-wrap gap-1.5">
      {visibleOptions.map((option) => (
        <code
          key={option}
          className="rounded border border-cyan-300/20 bg-cyan-400/10 px-1.5 py-0.5 text-xs text-cyan-950 dark:text-cyan-100"
        >
          {option}
        </code>
      ))}
      {hiddenCount > 0 ? (
        <span className="rounded border border-slate-300/40 px-1.5 py-0.5 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-400">
          +{hiddenCount}
        </span>
      ) : null}
    </div>
  );
}

function PropRows({ props }: { props: ComponentPropDoc[] }) {
  return (
    <tbody className="divide-y divide-slate-300/70 dark:divide-white/10">
      {props.map((prop) => (
        <tr key={prop.name}>
          <th
            scope="row"
            className="px-4 py-3 text-left align-top text-slate-950 dark:text-white"
          >
            <span className="font-mono text-xs font-semibold">
              {prop.name}
              {prop.required ? (
                <span className="ml-1 text-rose-700 dark:text-rose-300">*</span>
              ) : null}
            </span>
            {prop.description ? (
              <span className="mt-1 block text-sm font-normal leading-6 text-slate-600 dark:text-slate-400">
                {prop.description}
              </span>
            ) : null}
          </th>
          <td className="px-4 py-3 align-top">
            <OptionChips prop={prop} />
            {prop.tokenRef ? (
              <Link
                href="/preview/tokens"
                className="mt-2 block font-mono text-xs text-cyan-800 underline-offset-4 hover:underline dark:text-cyan-300"
              >
                {prop.tokenRef}
              </Link>
            ) : null}
          </td>
          <td className="px-4 py-3 align-top font-mono text-xs text-slate-700 dark:text-slate-300">
            {formatDefault(prop.default)}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function PropsTableElement({ props }: { props: ComponentPropDoc[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] table-fixed border-separate border-spacing-0 text-sm">
        <colgroup>
          <col className="w-[18rem]" />
          <col className="w-auto" />
          <col className="w-[12rem]" />
        </colgroup>
        <thead>
          <tr className="bg-slate-200/80 text-left text-xs uppercase tracking-normal text-slate-700 dark:bg-white/5 dark:text-slate-400">
            <th className="px-4 py-3 font-semibold">Prop</th>
            <th className="px-4 py-3 font-semibold">Type</th>
            <th className="px-4 py-3 font-semibold">Default</th>
          </tr>
        </thead>
        <PropRows props={props} />
      </table>
    </div>
  );
}

function PropsGroup({
  group,
  props,
}: {
  group: ComponentPropDoc["group"];
  props: ComponentPropDoc[];
}) {
  if (props.length === 0) return null;

  return (
    <div>
      <h4 className="border-b border-slate-300/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-normal text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
        {groupLabels[group]}
      </h4>
      <PropsTableElement props={props} />
    </div>
  );
}

function SubcomponentTable({
  subcomponent,
}: {
  subcomponent: ComponentSubcomponentDoc;
}) {
  const domProps = subcomponent.props.filter((prop) => prop.group === "dom");

  return (
    <section
      aria-label={`${subcomponent.displayName} props`}
      className="overflow-hidden rounded-lg border border-slate-300 bg-slate-100 text-slate-900 shadow-sm dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-50"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-900/80">
        <div>
          <h3 className="font-mono text-sm font-semibold">
            {subcomponent.displayName}
          </h3>
          <p className="mt-1 font-mono text-xs text-slate-600 dark:text-slate-400">
            {subcomponent.propsType}
          </p>
        </div>
        {subcomponent.source === "animated" ? (
          <span className="rounded border border-fuchsia-300/30 bg-fuchsia-300/10 px-2 py-1 text-xs font-medium text-fuchsia-900 dark:text-fuchsia-100">
            animated
          </span>
        ) : null}
      </div>

      {visibleGroups.map((group) => (
        <PropsGroup
          key={group}
          group={group}
          props={subcomponent.props.filter((prop) => prop.group === group)}
        />
      ))}

      {domProps.length > 0 ? (
        <details className="border-t border-slate-300/70 dark:border-white/10">
          <summary className="cursor-pointer bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-white/5 dark:text-slate-300">
            {groupLabels.dom}
          </summary>
          <PropsTableElement props={domProps} />
        </details>
      ) : null}
    </section>
  );
}

function PropsTableContent({ doc }: { doc: ComponentPropsDoc }) {
  return (
    <section id={`${doc.slug}-api`} className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {titleCase(doc.slug)} API
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Generated from the package prop types and variant definitions.
        </p>
      </div>

      <div className="space-y-4">
        {doc.subcomponents.map((subcomponent) => (
          <SubcomponentTable
            key={`${subcomponent.source}:${subcomponent.propsType}`}
            subcomponent={subcomponent}
          />
        ))}
      </div>
    </section>
  );
}

export function PropsTable({ slug }: { slug: string }) {
  const doc = getComponentProps(slug);

  if (!doc) {
    return null;
  }

  return <PropsTableContent doc={doc} />;
}
