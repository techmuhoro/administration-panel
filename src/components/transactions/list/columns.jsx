"use client";

import TransactionDetails from "./details";

export const columns = [
  {
    assessor: "id",
    label: "S/N",
  },
  {
    assessor: "date",
    label: "Date",
  },
  {
    assessor: "customer",
    label: "Customer",
  },
  {
    assessor: "channel",
    label: "Channel",
  },
  {
    assessor: "transaction_id",
    label: "Transaction id",
  },
  {
    assessor: "category",
    label: "Category",
  },
  {
    assessor: "amount",
    label: "Amount",
  },
  {
    assessor: "status",
    label: "Status",
  },
  {
    assessor: "details",
    label: "Details",
    cell: ({ row }) => <TransactionDetails row={row} />,
  },
];
