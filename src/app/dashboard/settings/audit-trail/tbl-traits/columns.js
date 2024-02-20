"use client";

import UserAgentCell from "../user-agent-cell";

// import TransactionDetails from "./details";

export const columns = [
  {
    assessor: "description",
    label: "Activity",
  },
  {
    assessor: "ip",
    label: "IP adress",
  },
  {
    assessor: "userAgent",
    label: "User Agent",
    cell: (celldata) => <UserAgentCell data={celldata} />,
  },
  {
    assessor: "createdAt",
    label: "Time",
  },
  //   {
  //     assessor: "details",
  //     label: "Details",
  //     cell: ({ row }) => <TransactionDetails row={row} />,
  //   },
];
