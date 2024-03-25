"use client";

import ActionsCell from "./components/actions-cell";

export const columns = [
  {
    assessor: "attributes.name",
    label: "Name",
  },
  {
    assessor: "attributes.createdAt",
    label: "Date Created",
  },
  {
    assessor: "",
    label: "Actions",
    cell: (celldata) => <ActionsCell data={celldata} />,
  },
];
