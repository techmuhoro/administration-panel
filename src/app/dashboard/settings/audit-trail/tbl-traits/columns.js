"use client";

// import TransactionDetails from "./details";

export const columns = [
  {
    assessor: "email",
    label: "User",
  },
  {
    assessor: "description",
    label: "Details",
  },
  {
    assessor: "ip",
    label: "IP adress",
  },
  {
    assessor: "browser",
    label: "User Agent",
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
