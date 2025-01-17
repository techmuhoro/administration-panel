"use client";
import PermissionActions from "./actions";

export const columns = [
  {
    assessor: "autoincrement()",
    label: "S/N",
  },
  {
    assessor: "includes.attributes.parentName",
    label: "Group",
  },
  {
    assessor: "attributes.name",
    label: "Name",
  },
  {
    assessor: "attributes.slug",
    label: "Slug",
  },
  {
    assessor: "id",
    label: "Id",
  },
  {
    assessor: "attributes.createdAt",
    label: "Created At",
  },
  {
    assessor: "actions",
    cell: ({ row }) => <PermissionActions row={row} />,
  },
];
