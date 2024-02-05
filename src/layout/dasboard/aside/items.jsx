import DashboardIcon from "@mui/icons-material/Dashboard";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import GroupIcon from "@mui/icons-material/Group";

export const asideMenuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    to: "/dashboard",
  },

  {
    key: "transactions",
    label: "Transactions",
    icon: <CompareArrowsIcon />,
    to: "/dashboard/transactions",
  },
  {
    key: "merchants",
    label: "Merchants",
    icon: <LocalMallIcon />,
    to: "/dashboard/merchants",
  },
  {
    key: "settlements",
    label: "Settlements",
    icon: <PaymentsIcon />,
    to: "/dashboard/settlements",
  },

  {
    key: "card-review",
    label: "Card Review",
    icon: <CreditCardIcon />,
    to: "/dashboard/card-review",
  },

  {
    key: "pdqs",
    label: "PDQs",
    icon: <PhonelinkRingIcon />,
    to: "/dashboard/pdqs",
  },

  {
    key: "reports",
    label: "Reports",
    icon: <AutoGraphIcon />,
    to: "/dashboard/reports",
  },

  {
    key: "access-control",
    label: "Access control",
    icon: <GroupIcon size={16} />,

    links: [
      {
        key: "access-control-users",
        label: "User",
        to: "/dashboard/uam/users",
      },
      {
        key: "access-control-roles",
        label: "Roles",
        to: "/dashboard/uam/roles",
      },
      {
        key: "access-control-permissions",
        label: "Permission",
        to: "/setting/uam/permissions",
      },
    ],
  },
];
