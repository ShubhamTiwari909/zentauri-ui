"use client";

import { useState } from "react";

import { DataTable } from "@zentauri-ui/zentauri-components/ui/data-table";
import type { DataTableColumn } from "@zentauri-ui/zentauri-components/ui/data-table";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited";
  score: number;
};

export const members: TeamMember[] = [
  {
    id: "tm-1",
    name: "Ada Lovelace",
    email: "ada@example.com",
    role: "Engineer",
    status: "Active",
    score: 92,
  },
  {
    id: "tm-2",
    name: "Grace Hopper",
    email: "grace@example.com",
    role: "Architect",
    status: "Invited",
    score: 98,
  },
  {
    id: "tm-3",
    name: "Katherine Johnson",
    email: "katherine@example.com",
    role: "Analyst",
    status: "Active",
    score: 95,
  },
  {
    id: "tm-4",
    name: "Mary Jackson",
    email: "mary@example.com",
    role: "Manager",
    status: "Active",
    score: 89,
  },
  {
    id: "tm-5",
    name: "Dorothy Vaughan",
    email: "dorothy@example.com",
    role: "Operations Lead",
    status: "Active",
    score: 91,
  },
  {
    id: "tm-6",
    name: "Margaret Hamilton",
    email: "margaret@example.com",
    role: "Principal Engineer",
    status: "Active",
    score: 97,
  },
  {
    id: "tm-7",
    name: "Annie Easley",
    email: "annie@example.com",
    role: "Systems Analyst",
    status: "Invited",
    score: 88,
  },
  {
    id: "tm-8",
    name: "Radia Perlman",
    email: "radia@example.com",
    role: "Network Architect",
    status: "Active",
    score: 94,
  },
  {
    id: "tm-9",
    name: "Frances Allen",
    email: "frances@example.com",
    role: "Compiler Specialist",
    status: "Active",
    score: 96,
  },
  {
    id: "tm-10",
    name: "Jean Bartik",
    email: "jean@example.com",
    role: "Platform Engineer",
    status: "Invited",
    score: 87,
  },
  {
    id: "tm-11",
    name: "Hedy Lamarr",
    email: "hedy@example.com",
    role: "Research Strategist",
    status: "Active",
    score: 90,
  },
  {
    id: "tm-12",
    name: "Evelyn Boyd Granville",
    email: "evelyn@example.com",
    role: "Data Scientist",
    status: "Active",
    score: 93,
  },
  {
    id: "tm-13",
    name: "Sister Mary Kenneth Keller",
    email: "mary.keller@example.com",
    role: "Education Lead",
    status: "Invited",
    score: 86,
  },
  {
    id: "tm-14",
    name: "Adele Goldberg",
    email: "adele@example.com",
    role: "Product Architect",
    status: "Active",
    score: 92,
  },
];

export const columns: DataTableColumn<TeamMember>[] = [
  {
    id: "name",
    header: "Name",
    accessor: "name",
    sortable: true,
    filterable: true,
    cell: ({ value }) => <span className="font-medium">{String(value)}</span>,
  },
  {
    id: "email",
    header: "Email",
    accessor: "email",
    filterable: true,
  },
  {
    id: "role",
    header: "Role",
    accessor: "role",
    filterable: true,
  },
  {
    id: "status",
    header: "Status",
    accessor: "status",
    filterable: true,
  },
  {
    id: "score",
    header: "Score",
    accessor: "score",
    sortable: true,
    textAlign: "right",
  },
];

export function DataTableDemo() {
  const [lastAction, setLastAction] = useState("No bulk action yet");

  return (
    <div className="space-y-3">
      <DataTable
        aria-label="Team members"
        appearance="bordered"
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
            onSelect: (rows) =>
              setLastAction(
                `Invited ${rows.map((row) => row.name).join(", ")}`,
              ),
          },
        ]}
      />
      <p className="text-sm text-slate-700 dark:text-slate-300">{lastAction}</p>
    </div>
  );
}
