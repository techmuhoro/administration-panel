"use client";
//import TransactionDetails from "./details";
export const columns = [
  {
    assessor: "autoincrement()",
    label: "S/N",
  },
  {
    assessor: "attributes.channelType",
    label: "Channel Type",
  },
  {
    assessor: "attributes.channel",
    label: "Channel Type",
  },
  {
    assessor: "attributes.status",
    label: "Status",
  },
  {
    assessor: "attributes.amount",
    label: "Amount",
  },
  {
    assessor: "attributes.debitedAmount",
    label: "DebitedAmount",
  },

  {
    assessor: "attributes.telephone",
    label: "Telephone",
    //cell: ({ row }) => <TransactionDetails row={row} />,
  },
];
