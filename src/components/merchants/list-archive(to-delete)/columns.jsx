"use client";
import MerchantsActions from "./actions";

export const columns = [
  {
    assessor: "autoincrement()",
    label: "S/N",
  },
  {
    assessor: "name",
    label: "Name",
  },
  {
    assessor: "country",
    label: "Country",
  },
  {
    assessor: "email",
    label: "Email",
  },
  {
    assessor: "actions",
    label: "Actions",
    cell: ({ row, cell }) => <MerchantsActions row={row} />,
  },
];

export const data = [
  {
    id: "voipx",
    name: "1xbet",
    country: "KE",
    email: "support@1xbet.com",
  },
  {
    id: "wtruw",
    name: "Jumia",
    country: "KE",
    email: "help@jumia.co.ke",
  },
  {
    id: "mndfc",
    name: "Unaitas",
    country: "KE",
    email: "service@unaitas.com",
  },
  {
    id: "arbvc",
    name: "ABC tech",
    country: "KE",
    email: "client@abctech.com",
  },
  {
    id: "bvsdb",
    name: "Soni agri",
    country: "KE",
    email: "busi@socin.com",
  },
];
