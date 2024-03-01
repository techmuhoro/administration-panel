"use client";
import UsersActions from "./actions";

export const columns = [
  {
    assessor: "attributes.name",
    label: "Full Name",
  },
  {
    assessor: "attributes.email",
    label: "Email",
  },
  {
    assessor: "attributes.phone",
    label: "Phone",
  },
  {
    assessor: "attributes.roleName",
    label: "Role",
  },
  {
    assessor: "attributes.departmentName",
    label: "Department",
  },
  {
    assessor: "attributes.status",
    label: "Status",
  },

  {
    assessor: "Details",
    label: "details",
    cell: ({ row, cell }) => <UsersActions row={row} />,
  },
];
