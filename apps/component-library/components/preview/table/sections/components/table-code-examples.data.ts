import type {
  TableCellProps,
  TableProps,
} from "@zentauri-ui/zentauri-components/ui/table";

export const TABLE_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const TABLE_BODY_SNIPPET = `  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Age</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>User 1</TableCell>
      <TableCell>Admin</TableCell>
      <TableCell>user1a@example.com</TableCell>
      <TableCell>20</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>User 2</TableCell>
      <TableCell>Editor</TableCell>
      <TableCell>user2a@example.com</TableCell>
      <TableCell>25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>User 3</TableCell>
      <TableCell>User</TableCell>
      <TableCell>user3a@example.com</TableCell>
      <TableCell>30</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>User 4</TableCell>
      <TableCell>User</TableCell>
      <TableCell>user4a@example.com</TableCell>
      <TableCell>30</TableCell>
    </TableRow>
  </TableBody>`;

export const TABLE_APPEARANCES = [
  "default",
  "striped",
  "bordered",
  "ghost",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "amber",
  "violet",
] as const satisfies readonly NonNullable<TableProps["appearance"]>[];

export const TABLE_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<TableProps["size"]>[];

export const TABLE_TEXT_ALIGNS = [
  "left",
  "center",
  "right",
] as const satisfies readonly NonNullable<TableCellProps["textAlign"]>[];

export const TABLE_SNIPPET_BASE = {
  appearance: "default" as const,
  size: "md" as const,
  stickyHeader: false,
};
