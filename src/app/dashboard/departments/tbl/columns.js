"use client";

import ActionsCell from "./tblComponents/actions-cell";

// import ActionsCell from "../user-agent-cell";

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
      assessor: "actions",
      label: "Actions",
      cell: (celldata) => <ActionsCell data={celldata} />,
    },
];
