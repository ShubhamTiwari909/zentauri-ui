import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zentauri-ui/zentauri-components/ui/table";
import { cn } from "@/lib/utils";

import type { TableDemoProps } from "./table-code-examples.types";

export function TableDemo({
  appearance,
  size,
  stickyHeader,
  textAlign,
  className,
}: TableDemoProps) {
  return (
    <div>
      <p className="mb-5 text-xs md:text-sm">
        Appearance: <span className="font-bold">{appearance}</span> | Size:{" "}
        <span className="font-bold">{size}</span> | Sticky Header:{" "}
        <span className="font-bold">{stickyHeader ? "true" : "false"}</span>
      </p>
      <div
        className={cn(
          stickyHeader &&
            "*:data-[slot=table-scroll]:max-h-35 *:data-[slot=table-scroll]:overflow-y-auto",
        )}
      >
        <Table
          appearance={appearance}
          size={size}
          stickyHeader={stickyHeader}
          textAlign={textAlign}
          className={className}
        >
          <TableHeader>
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
            </TableRow>
            <TableRow>
              <TableCell>User 2</TableCell>
              <TableCell>User</TableCell>
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
