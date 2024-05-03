"use client";

import DetailsCell from "./details-cell";

export const columns = [
  {
    assessor: "autoincrement()",
    label: "S/N",
  },
  {
    assessor: "attributes.businessInformation.businessName",
    label: "Business",
  },
  {
    assessor: "",
    label: "Town",
    cell: ({ row, value }) => {
      return `${row.attributes?.businessInformation?.city || "_ _\xa0"}, ${row.attributes?.businessInformation?.country || "_ _"}`;
    },
  },
  {
    assessor: "attributes.businessInformation.postalAddress",
    label: "Postal Code",
  },
  {
    assessor: "attributes.businessInformation.website",
    label: "Website",
  },
  {
    assessor: "attributes.accountHolder.firstName",
    label: "Account Holder",
    cell: ({ row, value }) => {
      return `${row.attributes?.accountHolder?.firstName || "_ _"} ${row?.attributes?.accountHolder?.lastName || "\xa0\xa0_ _"}`;
    },
  },
  {
    assessor: "",
    label: "Details",
    cell: ({ row: rowData }) => <DetailsCell data={rowData} />,
  },
];
