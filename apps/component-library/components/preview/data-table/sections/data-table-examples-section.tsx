import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { DataTableDemo } from "../components/data-table-demo";
import { DataTablePlayground } from "../components/data-table-playground";

const dataTableSnippet = `${variantLeadComment(
  "DataTable · search, selection, visibility, sorting, pagination",
)}
<DataTable
  aria-label="Team members"
  columns={columns}
  data={members}
  enableColumnVisibility
  enableRowSelection
  getRowId={(row) => row.id}
  pagination={{ pageSize: 2 }}
  search={{ placeholder: "Search members" }}
  bulkActions={[
    {
      label: "Invite selected",
      onSelect: (rows) => inviteMembers(rows),
    },
  ]}
/>`;

export function DataTableExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Pro table workflow
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Search records, sort columns, select rows for bulk actions, hide
        optional fields, and paginate processed results from one typed
        component.
      </p>
      <div className="mt-6">
        <PreviewCodeShowcase code={dataTableSnippet}>
          <DataTableDemo />
        </PreviewCodeShowcase>
      </div>
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Appearance playground
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
          Change the table appearance, size, sticky header, selection, and
          column visibility controls while the code snippet updates with the
          selected options.
        </p>
        <DataTablePlayground />
      </div>
    </Section>
  );
}
