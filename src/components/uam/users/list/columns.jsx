"use client";
import Chip from "@mui/material/Chip";
import UsersActions from "./actions";

export const columns = [
  {
    assessor: "autoincrement()",
    label: "S/N",
  },
  {
    assessor: "attributes.name",
    label: "Full Name",
  },
  {
    assessor: "attributes.email",
    label: "Email",
  },
  {
    assessor: "attributes.phone",
    label: "Phone",
  },
  {
    assessor: "attributes.roleName",
    label: "Role",
  },
  {
    assessor: "attributes.departmentName",
    label: "Department",
  },
  {
    assessor: "attributes.status",
    label: "Status",
    cell: ({ cell }) => {
      if (cell === "ACTIVE") {
        return (
          <Chip color="success" label={cell} size="small" variant="outlined" />
        );
      }

      if (cell === "INACTIVE") {
        return (
          <Chip color="error" label={cell} size="small" variant="outlined" />
        );
      }

      return cell;
    },
  },

  {
    assessor: "Details",
    label: "details",
    cell: ({ row, cell }) => <UsersActions row={row} />,
  },
];
