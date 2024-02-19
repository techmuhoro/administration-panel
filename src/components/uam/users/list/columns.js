"use client";
import RolesActions from "../../roles/list/actions";

export const columns = [
  {
    assessor: "fullname",
    label: "Full Name",
  },
  {
    assessor: "email",
    label: "Email",
  },
  {
    assessor: "role",
    label: "Role",
  },
  {
    assessor: "status",
    label: "Status",
  },

  {
    assessor: "Details",
    label: "details",
    cell: ({ row, cell }) => <RolesActions row={row} />,
  },
];
