"use client";
import RolesActions from "./actions";

export const columns = [
  {
    assessor: "autoincrement()",
    label: "S/N",
  },
  {
    assessor: "attributes.name",
    label: "Role",
  },
  {
    assessor: "attributes.departmentName",
    label: "Department",
  },

  {
    assessor: "attributes.createdAt",
    label: "created At",
  },

  {
    assessor: "actions",
    label: "Actions",
    cell: ({ row, cell }) => <RolesActions row={row} />,
  },
];
