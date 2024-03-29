"use client";

import ActionsCell from "./components/actions-cell";

export const columns = [
  {
    assessor: "name",
    label: "Name",
  },
  {
    assessor: "createdAt",
    label: "Date Created",
  },
  {
    assessor: "",
    label: "Actions",
    cell: (rowData) => <ActionsCell data={rowData} />,
  },
];
