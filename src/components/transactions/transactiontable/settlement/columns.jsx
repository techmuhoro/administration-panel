"use client";
//import TransactionDetails from "./details";
export const columns = [
  {
    assessor: "id",
    label: "S/N",
  },

  {
    assessor: "attributes.firstName",
    label: "FirstName",
  },
  {
    assessor: "attributes.lastName",
    label: "LastName",
  },
  {
    assessor: "attributes.amount",
    label: "Amount",
  },
  {
    assessor: "attributes.category",
    label: "Category",
  },

  {
    assessor: "attributes.orderid:",
    label: "Orderid:",
  },
  {
    assessor: "attributes.channel",
    label: "channel",
  },
  {
    assessor: "attributes.email",
    label: "Email",
    //cell: ({ row }) => <TransactionDetails row={row} />,
  },
];
