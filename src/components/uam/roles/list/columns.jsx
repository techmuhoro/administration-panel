"use client";
import RolesActions from "./actions";

export const columns = [
  {
    assessor: "id",
    label: "S/N",
  },
  {
    assessor: "role",
    label: "Role",
  },
  {
    assessor: "department",
    label: "Department",
  },
  {
    assessor: "description",
    label: "Description",
  },
  {
    assessor: "createdAt",
    label: "created At",
  },
  {
    assessor: "createdBy",
    label: "Created By",
  },

  {
    assessor: "actions",
    label: "Actions",
    cell: ({ row, cell }) => <RolesActions row={row} />,
  },
];
