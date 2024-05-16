"use client";

import DetailsCell from "./sub-components/details-cell";
import CreatedAtCell from "./sub-components/created-at-cell";

const columns = [
  {
    assessor: "autoincrement()",
    label: "S/N"
  },
  {
    assessor: "attributes.businessName",
    label: "Business"
  },
  {
    assessor: "attributes.businessCountry",
    label: "Country"
  },
  {
    assessor: "",
    label: "Created",
    cell: ({ row: rowData }) => <CreatedAtCell rowData={rowData} />
  },
  {
    assessor: "",
    label: "Account Holder",
    cell: ({ row }) => {
      const fullName = row.attributes?.accountHolderName || "_ _";
      const nameSections = String(fullName).trim().split(" ");
      const capitalizedNamesArr = nameSections.map(
        (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      );

      return capitalizedNamesArr.join(" ");
    }
  },
  {
    assessor: "",
    label: "Details",
    cell: ({ row: rowData }) => <DetailsCell data={rowData} />
  }
];

export default columns;
