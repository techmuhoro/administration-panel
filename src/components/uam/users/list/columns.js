"use client";
import RolesActions from "../../roles/list/actions";

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
    assessor: "attributes.role",
    label: "Role",
  },
  {
    assessor: "attributes.department",
    label: "Department",
  },
  {
    assessor: "attributes.status",
    label: "Status",
  },

  {
    assessor: "Details",
    label: "details",
    cell: ({ row, cell }) => <RolesActions row={row} />,
  },
];
