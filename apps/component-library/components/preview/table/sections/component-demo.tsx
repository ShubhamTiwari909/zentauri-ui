import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zentauri-ui/zentauri-components/ui/table";
import { SortableTableDemo } from "./components/sortable-demo";

const sortableTableSnippet = `${variantLeadComment(
  "useTableSort + sortable TableHead props",
)}
const { sortKey, sortDirection, getSortProps } = useTableSort({
  defaultSortKey: "customer",
  defaultSortDirection: "ascending",
});

const sortedRows = useMemo(() => {
  if (!sortKey || sortDirection === "none") return rows;
  return [...rows].sort((a, b) => {
    const result = String(a[sortKey]).localeCompare(String(b[sortKey]));
    return sortDirection === "ascending" ? result : -result;
  });
}, [sortDirection, sortKey]);

<Table appearance="bordered" stickyHeader>
  <TableHeader>
    <TableRow>
      <TableHead {...getSortProps("customer")}>Customer</TableHead>
      <TableHead {...getSortProps("status")}>Status</TableHead>
      <TableHead {...getSortProps("amount")}>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>{/* sorted rows */}</TableBody>
</Table>`;

export function TableExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Bordered appearance with sticky headers and composable sorting for data
        views.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase code={sortableTableSnippet}>
          <SortableTableDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          code={`${variantLeadComment(`appearance · bordered, stickyHeader · true, size · sm (preview)`)}
<Table appearance="bordered" stickyHeader>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>`}
        >
          <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-900/10 dark:border-white/10">
            <Table appearance="bordered" stickyHeader size="sm">
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Alpha</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Beta</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>Gamma</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
